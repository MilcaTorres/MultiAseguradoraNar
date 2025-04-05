import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import AppColors from "../kernel/AppColors";
import CustomHeader from "./CustomHeader";
import { useEffect, useState } from "react";

export default function PolicyDetails({ route, navigation }) {
  const { policy } = route.params;
  const [policyDetails, setPolicyDetails] = useState({});

  useEffect(() => {
    const fetchPolicyDetails = async () => {
      try {
        const response = await fetch(`http://192.168.100.15:3000/nar/emisiones/id/${policy.idPoliza}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.statusText}`);
        }
        const data = await response.json();
        setPolicyDetails(data.data);
      } catch (error) {
        console.error("Error al obtener la póliza:", error.message);
      }
    };
  
    fetchPolicyDetails();
  }, [policy]);
  

  return (
    <SafeAreaView style={styles.safeContainer}>
      <CustomHeader title="Detalles de la Póliza" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.labelName}>
            <Text style={styles.textName}>
              Póliza No° {policy.numeroPoliza}
            </Text>
          </View>
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.textContainer}>
                <Text style={styles.text}>
                  <Text style={styles.label}>Asegurado: </Text>
                  {policyDetails.nombreAsegurado || "Cargando..."}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.label}>RFC: </Text>
                  {policyDetails.rfc || "Cargando..."}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.label}>Teléfono: </Text>
                  {policyDetails.telefono || "Cargando..."}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.label}>Nombre del seguro: </Text>
                  {policyDetails.nombreSeguro || "Cargando..."}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.label}>Tipo de seguro: </Text>
                  {policyDetails.tipoSeguro || "Cargando..."}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.label}>Cobertura: </Text>
                  {policyDetails.cobertura || "Cargando..."}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.label}>Vigencia: </Text>
                  {policyDetails.vigencia || "Cargando..."}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.label}>Monto total: </Text>$
                  {policyDetails.montoTotal || "Cargando..."}
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.textButton}>Regresar</Text>
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
});
