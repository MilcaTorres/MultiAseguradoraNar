import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import AppColors from "../kernel/AppColors";
import { TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomHeader from "./CustomHeader";

export default function CustomersPolicies({ navigation }) {
  const [search, setSearch] = useState("");

  const policies = [
    {
      poliza: "Póliza No°1",
      seguro: "Seguro de vida",
      vigencia: "20/02/2025",
      mensualidad: 200,
    },
    {
      poliza: "Póliza No°2",
      seguro: "Seguro de viaje",
      vigencia: "30/03/2028",
      mensualidad: 800,
    },
    {
      poliza: "Póliza No°3",
      seguro: "Seguro de gastos médicos",
      vigencia: "16/10/2025",
      mensualidad: 600,
    },
    {
      poliza: "Póliza No°4",
      seguro: "Seguro de viaje",
      vigencia: "22/08/2026",
      mensualidad: 800,
    },
  ];

  const filteredPolicies = policies.filter((policy) => {
    const searchText = search.toLowerCase();

    return (
      policy.poliza.toLowerCase().includes(searchText) ||
      policy.seguro.toLowerCase().includes(searchText) ||
      policy.vigencia.toLowerCase().includes(searchText)
    );
  });

  return (
    <SafeAreaView style={styles.safeContainer}>
      <CustomHeader title="Clientes"/>
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
              placeholder="Buscar cliente..."
              placeholderTextColor={AppColors.TEXT_GRAY}
              value={search}
              onChangeText={setSearch}
            />
          </View>

          {filteredPolicies.map((policy, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.cardContent}>
                <View style={styles.textContainer}>
                  <Text style={styles.label}>{`Póliza No° ${index + 1}`}</Text>
                  <Text>{policy.seguro}</Text>
                  <Text>
                    <Text style={styles.label}>Vigencia: </Text>
                    {policy.vigencia}
                  </Text>
                  <Text>
                    <Text style={styles.label}>Monto total: </Text>$
                    {policy.mensualidad}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate("PolizasDetalles")}
                >
                  <Text style={styles.textButton}>Ver más</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
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
    // elevation: 15,
    // shadowColor: AppColors.SHADOW,
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
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
    // // Sombra en Android
    // elevation: 8,
    // // Sombra en iOS
    // shadowColor: AppColors.SHADOW,
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.3,
    // shadowRadius: 4,
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
});
