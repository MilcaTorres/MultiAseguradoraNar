import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import AppColors from "../kernel/AppColors";
import { TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomHeader from "./CustomHeader";

export default function CustomersPolicies({ route, navigation }) {
  const { cliente } = route.params; // Recibir el cliente
  const [search, setSearch] = useState("");
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log("Cliente recibido: ", cliente);
    // console.log("ID del cliente:", cliente._id);
    const fetchPolicies = async () => {
      try {
        const response = await fetch(
          `http://192.168.100.15:3000/nar/emisiones/cliente/${cliente._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // console.log("Response Status: ", response.status);

        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.statusText}`);
        }
        const data = await response.json();
        // console.log("Data recibida: ", data);
        setPolicies(data.data);
      } catch (error) {
        console.error("Error al obtener las pólizas: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPolicies();
  }, [cliente]);

  // Filtrar pólizas por búsqueda
  const filteredPolicies = policies.filter((policy) => {
    const searchText = search.toLowerCase();
    return (
      policy.numeroPoliza.toString().includes(searchText) || // Convierte numeroPoliza a string
      policy.nombreSeguro?.toLowerCase().includes(searchText) ||
      policy.vigencia?.toLowerCase().includes(searchText)
    );
  });

  return (
    <SafeAreaView style={styles.safeContainer}>
      <CustomHeader title={`${cliente.nombre} ${cliente.apellidoPaterno}`} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {/* Barra de búsqueda */}
          <View style={styles.searchContainer}>
            <Ionicons
              name="search"
              size={20}
              color={AppColors.TEXT_GRAY}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchBar}
              placeholder="Buscar póliza..."
              placeholderTextColor={AppColors.TEXT_GRAY}
              value={search}
              onChangeText={setSearch}
            />
          </View>

          {loading ? (
            <ActivityIndicator size="large" color={AppColors.MAIN_COLOR} />
          ) : filteredPolicies.length > 0 ? (
            filteredPolicies.map((policy, index) => (
              <View key={index} style={styles.card}>
                <View style={styles.cardContent}>
                  <View style={styles.textContainer}>
                    <Text style={styles.label}>
                      Póliza No° {policy.numeroPoliza}
                    </Text>
                    <Text>{policy.nombreSeguro}</Text>
                    <Text>
                      <Text style={styles.label}>Vigencia: </Text>
                      {policy.vigencia}
                    </Text>
                    <Text>
                      <Text style={styles.label}>Monto total: </Text>$
                      {policy.montoTotal}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("PolizasDetalles", {policy: policy})}
                  >
                    <Text style={styles.textButton}>Ver más</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noDataText}>
              No hay pólizas registradas para este cliente
            </Text>
          )}
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
    justifyContent: "flex-start",
    backgroundColor: AppColors.BACKGROUND,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: AppColors.MAIN_COLOR,
    borderRadius: 20,
    backgroundColor: AppColors.TEXT_WHITE,
    marginTop: 24,
    alignSelf: "center",
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    paddingVertical: 10,
    color: AppColors.TEXT_BLACK,
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
  noDataText: {
    marginTop: 20,
    fontSize: 16,
    color: AppColors.TEXT_GRAY,
  },
});
