import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image, ActivityIndicator } from "react-native";
import CustomHeader from "../modules/CustomHeader";
import AppColors from "../kernel/AppColors";

export default function Insurance({ navigation, route }) {
  const { tipo = "", id = "", idCotizacion = "" } = route?.params || {};
  const [cotizaciones, setCotizaciones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // Nuevo estado para manejar errores
  const API_URL = "http://192.168.1.73:3000/nar/cotizaciones";

  useEffect(() => {
    const fetchCotizaciones = async () => {
      try {
        setIsLoading(true);
        setError(null); // Limpiar cualquier error previo

        // Estructura del objeto de datos
        const holderDataWithUserId = {
          idCotizacion: idCotizacion,
          tipo: tipo,
          id: id,
        };

        // Construir la URL con parámetros de consulta (query string)
        let endpoint = API_URL;
        const queryParams = new URLSearchParams();

        // Agregar los parámetros al query string
        if (holderDataWithUserId.idCotizacion) queryParams.append('idCotizacion', holderDataWithUserId.idCotizacion);
        if (holderDataWithUserId.tipo) queryParams.append('tipo', holderDataWithUserId.tipo);
        if (holderDataWithUserId.id) queryParams.append('id', holderDataWithUserId.id);

        if (queryParams.toString()) {
          endpoint = `${API_URL}?${queryParams.toString()}`;
        }

        // Usar fetch para realizar una solicitud GET con los parámetros en la URL
        const response = await fetch(endpoint);

        if (!response.ok) { // Verifica si la respuesta no fue exitosa
          throw new Error('No se pudo obtener las cotizaciones');
        }

        const data = await response.json();

        if (data.success && data.data) {
          setCotizaciones(idCotizacion ? [data.data] : data.data);
        } else {
          console.error("La respuesta de la API no contiene datos válidos:", data);
          setCotizaciones([]); // No hay cotizaciones
        }
      } catch (error) {
        console.error("Error al obtener las cotizaciones", error);
        setError(error.message); // Guardar el mensaje de error
        setCotizaciones([]); // No hay cotizaciones disponibles
      } finally {
        setIsLoading(false);
      }
    };

    fetchCotizaciones();
  }, [idCotizacion, tipo, id]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <CustomHeader title="Cotizaciones de Seguro" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={AppColors.MAIN_COLOR} />
          <Text style={styles.loadingText}>Cargando cotizaciones...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <CustomHeader title="Cotizaciones de Seguro" />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Error: {error}</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Regresar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!cotizaciones?.length) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <CustomHeader title="Cotizaciones de Seguro" />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No hay cotizaciones disponibles</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Regresar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader title="Cotizaciones de Seguro" />
      <View style={styles.welcome}>
        <Text style={styles.text}>Opciones de cotización:</Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        {cotizaciones.map((cotizacion) => (
          <View key={cotizacion._id || cotizacion.id} style={styles.card}>
            <View style={styles.insuranceContainer}>
              <Image source={require("../../assets/img/life-insurance.png")} style={styles.insuranceImage} />
              <View style={styles.textContainer}>
                <Text style={styles.insuranceTitle}>{cotizacion.nombreSeguro || `Seguro de ${tipo || "Vida"}`}</Text>
                <Text style={styles.priceText}>Monto de la prima: ${cotizacion.precioFinal ?? "1,000"}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("DatosSeguro", { idCotizacion: cotizacion._id || cotizacion.id })}>
              <Text style={styles.buttonText}>Seleccionar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: AppColors.BACKGROUND },
  welcome: {
    backgroundColor: AppColors.MAIN_COLOR,
    width: "96%",
    padding: 14,
    borderRadius: 3,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    alignSelf: "center",
  },
  text: {
    color: AppColors.TEXT_WHITE,
    fontSize: 20,
    fontFamily: "InriaSerif_Bold",
  },
  container: { paddingHorizontal: 20, paddingBottom: 20 },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 10,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  insuranceContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  insuranceImage: { width: 50, height: 50 },
  textContainer: { marginLeft: 16 },
  insuranceTitle: { fontWeight: "bold", fontSize: 16 },
  priceText: { marginTop: 4, color: "#666" },
  button: {
    backgroundColor: AppColors.MAIN_COLOR,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    flexShrink: 1,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  backButton: {
    backgroundColor: AppColors.MAIN_COLOR,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
});

