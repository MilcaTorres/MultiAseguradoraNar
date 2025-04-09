import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from "react-native";
import AppColors from "../kernel/AppColors";
import CustomHeader from "./CustomHeader";
import { useEffect, useState } from "react";

export default function QuoteDetails({ route, navigation }) {
  const { quote } = route.params;
  const [quoteDetails, setQuoteDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuoteDetails = async () => {
      try {
        const response = await fetch(`http://192.168.1.73:3001/nar/cotizaciones/id/${quote.idCotizacion}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.statusText}`);
        }
        const data = await response.json();
        setQuoteDetails(data.data);
      } catch (error) {
        console.error("Error al obtener la cotización:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuoteDetails();
  }, [quote]);

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
              const response = await fetch(`http://192.168.1.73:3001/nar/cotizaciones/emitida/${quote.idCotizacion}`, {
                method: 'PUT',
              });
  
              // Obtener el texto de la respuesta
              const responseText = await response.text();
              console.log("Response Text:", responseText);
  
              // Analizar la respuesta como JSON
              const responseData = JSON.parse(responseText);
  
              if (responseData.success) {
                Alert.alert(
                  "¡Emitido!",
                  "La póliza ha sido emitida al correo del cliente.",
                  [{
                    text: "OK",
                    onPress: () => navigation.navigate("Cotizar") // Asegúrate de que "Cotizar" sea una pantalla válida en tu navegación
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
      <SafeAreaView style={styles.safeContainer}>
        <CustomHeader title="Detalles de la Cotización" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={AppColors.MAIN_COLOR} />
          <Text style={styles.loadingText}>Cargando detalles...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <CustomHeader title="Detalles de la Cotización" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.labelName}>
            <Text style={styles.textName}>
              {quoteDetails.nombreSeguro}
            </Text>
          </View>
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.textContainer}>
                <Text style={styles.text}>
                  <Text style={styles.label}>Tipo de seguro: </Text>
                  {quoteDetails.tipoSeguro || "Cargando..."}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.label}>Asegurado: </Text>
                  {quoteDetails.nombreAsegurado || "Cargando..."}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.label}>Teléfono del asegurado: </Text>
                  {quoteDetails.telefonoAsegurado || "Cargando..."}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.label}>Edad del asegurado: </Text>
                  {quoteDetails.edadAsegurado || "Cargando..."}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.label}>Correo del asegurado: </Text>
                  {quoteDetails.correoAsegurado || "Cargando..."}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.label}>Cobertura: </Text>
                  {quoteDetails.cobertura || "Cargando..."}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.label}>Precio final: </Text>$
                  {quoteDetails.precioFinal || "Cargando..."}
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleEmitir}
          >
            <Text style={styles.textButton}>Emitir</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: AppColors.BACKGROUND,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: AppColors.BACKGROUND,
  },
  labelName: {
    backgroundColor: AppColors.MAIN_COLOR,
    width: "90%",
    padding: 14,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  textName: {
    color: AppColors.TEXT_WHITE,
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    width: "90%",
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 20,
    borderColor: AppColors.MAIN_COLOR,
    backgroundColor: AppColors.TEXT_WHITE,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontWeight: "bold",
    fontSize: 20,
  },
  text: {
    fontSize: 18,
  },
  button: {
    padding: 10,
    backgroundColor: AppColors.MAIN_COLOR,
    width: "40%",
    alignItems: "center",
  },
  textButton: {
    color: AppColors.TEXT_WHITE,
    fontSize: 14,
    fontWeight: "bold",
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
});
