import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppColors from "../kernel/AppColors"; // Asegúrate de tener los colores definidos
import CustomHeader from "../modules/CustomHeader"; // Componente de encabezado personalizado

export default function InsuranceDetailsScreen() {
  const navigation = useNavigation();
  const [cotizaciones, setCotizaciones] = useState([]);
  const API_URL = "http://192.168.1.73:3000/nar/cotizaciones"; // URL de las cotizaciones

  // Obtener cotizaciones usando fetch
  useEffect(() => {
    const fetchCotizaciones = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (data.success) {
          setCotizaciones(data.data); // Asumimos que 'data' contiene las cotizaciones
        } else {
          console.error("La respuesta de la API no contiene datos válidos:", data);
        }
      } catch (error) {
        console.error("Error al obtener las cotizaciones", error);
      }
    };

    fetchCotizaciones();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader title="Cotizaciones de Seguro" />

      <View style={styles.welcome}>
        <Text style={styles.text}>Opciones de cotización: </Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {cotizaciones.map((cotizacion, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.insuranceContainer}>
              <Image
                source={require("../../assets/img/life-insurance.png")}
                style={styles.insuranceImage}
              />
              <View style={styles.textContainer}>
                <Text style={styles.insuranceTitle}>{cotizacion.nombreSeguro}</Text>
                <Text style={styles.priceText}>Monto de la prima: ${cotizacion.precioFinal}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate("DatosSeguro", { idCotizacion: cotizacion.id })
              }
            >
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
  },
  text: {
    color: AppColors.TEXT_WHITE,
    fontSize: 20,
    fontFamily: "InriaSerif_Bold",
  },
  container: { paddingHorizontal: 20 },
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
});
