import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import AppColors from "../kernel/AppColors"; // Asegúrate de tener los colores definidos

export default function InsuranceQuote() {
  const navigation = useNavigation();
  const route = useRoute();
  const { idCotizacion } = route.params;

  const [emision, setEmisiones] = useState(null);
  const API_URL = `http://192.168.100.15:3000/nar/cotizaciones/id/${idCotizacion}`; // URL de detalles de la cotización

  useEffect(() => {
    const fetchCotizacionDetails = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (data.success) {
          setEmisiones(data.data); // Asumimos que 'data' contiene la cotización seleccionada
        } else {
          console.error("La respuesta de la API no contiene datos válidos:", data);
        }
      } catch (error) {
        console.error("Error al obtener la cotización detallada", error);
      }
    };

    fetchCotizacionDetails();
  }, [idCotizacion]);

  const handleEmitir = () => {
    Alert.alert(
      "¿Estás seguro de emitir la acción?",
      "Una vez emitido, no podrás revertir esta acción.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sí, emitir",
          onPress: async () => {
            try {
              const response = await fetch(`http://192.168.100.15:3000/nar/cotizaciones/emitida/${idCotizacion}`, {
                method: 'PUT',
              });
              if (response.status === 200) {
                Alert.alert("¡Emitido!", "La póliza ha sido emitida al correo del cliente.", [{ text: "OK" }]);
              } else {
                Alert.alert("Error", "Hubo un problema al emitir la póliza.", [{ text: "OK" }]);
              }
            } catch (error) {
              console.error("Error al emitir la póliza:", error);
              Alert.alert("Error", "Ocurrió un error inesperado.", [{ text: "OK" }]);
            }
          },
        },
      ]
    );
  };

  if (!emision) {
    return <Text style={styles.loadingText}>Cargando...</Text>;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.insuranceTitle}>{emision.nombreSeguro}</Text>

      {/* Información del asegurado */}
      <View style={styles.infoCard}>
        <Text style={styles.infoCardText}>Nombre: {emision.nombreAsegurado}</Text>
        <Text style={styles.infoCardText}>Teléfono: {emision.telefonoAsegurado}</Text>
        <Text style={styles.infoCardText}>Edad: {emision.edadAsegurado} años</Text>
        <Text style={styles.infoCardText}>Correo: {emision.correoAsegurado}</Text>
      </View>

      {/* Coberturas */}
      <View style={styles.infoCard}>
        <Text style={styles.infoCardText}>Coberturas:</Text>
        <Text style={styles.infoCardText}>{emision.cobertura}</Text>
      </View>

      {/* Precio final */}
      <View style={styles.infoCard}>
        <Text style={styles.infoCardText}>Precio Final: ${emision.precioFinal}</Text>
      </View>

      {/* Botones */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Regresar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleEmitir}>
          <Text style={styles.buttonText}>Emitir</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: AppColors.BACKGROUND },
  infoCard: {
    backgroundColor: AppColors.MAIN_COLOR,
    padding: 12,
    marginVertical: 10,
    alignItems: "center",
  },
  infoCardText: { color: "white", fontWeight: "bold", fontSize: 18, textAlign: "center" },
  insuranceTitle: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
  button: {
    backgroundColor: AppColors.MAIN_COLOR,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  loadingText: { textAlign: "center", marginTop: 20, fontSize: 18 },
});
