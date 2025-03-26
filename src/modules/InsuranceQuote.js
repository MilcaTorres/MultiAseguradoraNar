import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import AppColors from "../kernel/AppColors";
import CustomHeader from "../modules/CustomHeader";

export default function InsuranceQuote({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <CustomHeader title="Cotizar" />

      {/* Information Section */}
      <View style={styles.infoSection}>
        <View style={styles.welcome}>
          <Text style={styles.text}>Información sobre el seguro: </Text>
        </View>

        <View style={styles.insuranceContainer}>
          <Image
            source={require("../../assets/img/life-insurance.png")}
            style={styles.insuranceImage}
          />
          <Text style={styles.insuranceType}>Seguro de vida 1</Text>
        </View>
      </View>

      {/* Insured Person Details */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Datos del Asegurado</Text>
        <Text>Nombre: Juan Pérez López</Text>
        <Text>Edad: 35 años</Text>
        <Text>Teléfono: +52 55 1234 5678</Text>
        <Text>Correo: juan.perez@email.com</Text>
      </View>

      {/* Coverages */}
      <ScrollView contentContainerStyle={styles.coverages}>
        <Text style={styles.coverageTitle}>Coberturas:</Text>
        <Text>* Muerte Natural – Pago a beneficiarios.</Text>
        <Text>* Muerte Accidental – Pago extra.</Text>
        <Text>* Invalidez Total – Indemnización.</Text>
        <Text>* Enfermedad Terminal – Adelanto del seguro.</Text>
        <Text>* Gastos Funerarios – Cobertura de costos.</Text>
        <Text>* Doble Indemnización – Pago doble si es accidental.</Text>
      </ScrollView>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Emitir</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: AppColors.BACKGROUND },
  infoSection: { alignItems: "center", marginVertical: 10 },
  infoCard: {
    backgroundColor: AppColors.MAIN_COLOR, // Fondo azul
    padding: 12,
    marginVertical: 10, // Espaciado superior e inferior
    alignItems: "center", // Centrar el texto
    justifyContent: "center",
  },
  infoCardText: {
    color: "white", // Texto blanco
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  insuranceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
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
  insuranceType: { fontSize: 24, fontWeight: "bold", marginRight: 10 },
  insuranceImage: { width: 80, height: 80, resizeMode: "contain" },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    margin: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  cardTitle: { fontWeight: "bold", marginBottom: 8 },
  coverages: { padding: 16 },
  coverageTitle: { fontWeight: "bold", marginBottom: 8 },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 16,
  },
  button: {
    backgroundColor: AppColors.MAIN_COLOR,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: { color: "white", fontWeight: "bold" },
});
