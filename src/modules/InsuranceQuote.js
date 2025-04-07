import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, ActivityIndicator, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import AppColors from "../kernel/AppColors";
import CustomHeader from "../modules/CustomHeader";

export default function InsuranceQuote({ navigation }) {
  const route = useRoute();
  const { idCotizacion } = route.params;

  const [emision, setEmisiones] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const API_URL = `http://192.168.1.73:3000/nar/cotizaciones/id/${idCotizacion}`;

  useEffect(() => {
    const fetchCotizacionDetails = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error("Error de red, por favor intenta de nuevo");
        }

        const data = await response.json();

        if (data.success) {
          setEmisiones(data.data);
        } else {
          throw new Error("No se encontraron datos válidos");
        }
      } catch (error) {
        console.error("Error al obtener la cotización detallada", error);
        Alert.alert("Error", error.message || "Ocurrió un error inesperado.");
      } finally {
        setIsLoading(false);
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
              setIsLoading(true);
              const response = await fetch(`http://192.168.1.73:3000/nar/cotizaciones/emitida/${idCotizacion}`, {
                method: 'PUT',
              });
  
              const responseText = await response.text();
              const responseData = JSON.parse(responseText);  // Aquí agregamos la comprobación
  
              if (responseData.success) {
                Alert.alert(
                  "¡Emitido!",
                  "La póliza ha sido emitida al correo del cliente.",
                  [{
                    text: "OK",
                    onPress: () => navigation.navigate("Cotizar") //Duda a donde lo re direcciona
                  }]
                );
              } else {
                Alert.alert("Error", "Hubo un problema al emitir la póliza.", [{ text: "OK" }]);
              }
            } catch (error) {
              console.error("Error al emitir la póliza:", error);
              Alert.alert("Error", "Ocurrió un error inesperado.", [{ text: "OK" }]);
            } finally {
              setIsLoading(false);
            }
          },
        },
      ]
    );
  };
  
  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <CustomHeader title="Detalle de Cotización" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={AppColors.MAIN_COLOR} />
          <Text style={styles.loadingText}>Cargando detalles...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!emision) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <CustomHeader title="Detalle de Cotización" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No se encontraron datos de la cotización</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Regresar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader title="Detalle de Cotización" />

      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Image
            source={require("../../assets/img/life-insurance.png")}
            style={styles.headerImage}
          />
          <Text style={styles.insuranceTitle}>{emision.nombreSeguro || "Seguro de Vida"}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Datos del Asegurado</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Nombre:</Text>
            <Text style={styles.infoValue}>{emision.nombreAsegurado || "No disponible"}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Teléfono:</Text>
            <Text style={styles.infoValue}>{emision.telefonoAsegurado || "No disponible"}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Edad:</Text>
            <Text style={styles.infoValue}>{emision.edadAsegurado || "N/A"} años</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Correo:</Text>
            <Text style={styles.infoValue}>{emision.correoAsegurado || "No disponible"}</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Coberturas</Text>
          <View style={styles.coverageItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.coverageText}>{emision.cobertura || "Cobertura básica"}</Text>
          </View>
        </View>

        <View style={styles.priceCard}>
          <Text style={styles.priceLabel}>Precio Final:</Text>
          <Text style={styles.priceValue}>${emision.precioFinal || "1,000"}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.actionButton, styles.backButton]} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Regresar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.emitButton]} onPress={handleEmitir}>
            <Text style={styles.buttonText}>Emitir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.BACKGROUND,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  headerImage: {
    width: 60,
    height: 60,
    marginRight: 16,
  },
  insuranceTitle: {
    fontSize: 22,
    fontWeight: "bold",
    flex: 1,
    fontFamily: "InriaSerif_Bold",
  },
  infoCard: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    fontFamily: "InriaSerif_Bold",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  infoLabel: {
    fontWeight: "bold",
    width: "30%",
  },
  infoValue: {
    flex: 1,
  },
  coverageItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingLeft: 8,
  },
  bulletPoint: {
    marginRight: 8,
    fontSize: 16,
  },
  coverageText: {
    flex: 1,
  },
  priceCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: AppColors.MAIN_COLOR,
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  priceLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  priceValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
  },
  backButton: {
    backgroundColor: "#6c757d",
  },
  emitButton: {
    backgroundColor: AppColors.MAIN_COLOR,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
});
