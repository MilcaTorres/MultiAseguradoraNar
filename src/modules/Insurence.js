import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image, ActivityIndicator } from "react-native";
import { useRoute } from "@react-navigation/native"; // Para recibir parámetros de navegación
import CustomHeader from "../modules/CustomHeader";
import AppColors from "../kernel/AppColors";


export default function Insurance({ navigation }) {
  const route = useRoute(); // Obtener parámetros de navegación
  const { idAsegurado } = route.params || {}; // Obtener el idAsegurado dinámico

  const [cotizaciones, setCotizaciones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!idAsegurado) {
      setError("No se encontró el ID del asegurado");
      setIsLoading(false);
      return;
    }

    const fetchCotizaciones = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const API_URL = `http://192.168.100.15:3000/nar/cotizaciones/asegurado/${idAsegurado}`;
        console.log("Consultando API:", API_URL); // Verifica que la URL es correcta

        const response = await fetch(API_URL);

        if (!response.ok) { 
          const errorText = await response.text();
          throw new Error(`Error ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        console.log("Respuesta de la API:", data); // Imprimir datos para depuración

        setCotizaciones(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error al obtener las cotizaciones:", error);
        setError(error.message);
        setCotizaciones([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCotizaciones();
  }, [idAsegurado]); // Se ejecuta cuando cambia el `idAsegurado`
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
                <Text style={styles.insuranceTitle}>{cotizacion.nombreSeguro || `Seguro de Vida`}</Text>
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
