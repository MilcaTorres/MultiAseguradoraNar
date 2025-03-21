import React, { useState } from "react";
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView} from "react-native";
import AppColors from "../kernel/AppColors";
import { TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Customers({ navigation }) {
  const [search, setSearch] = useState("");

  const customers = [
    {
      nombre: "Juan Pérez",
      rfc: "JUPEN13E3R4",
      curp: "JUPE009080808E",
      edad: 45,
    },
    {
      nombre: "Alexis Campos",
      rfc: "ALCAN13E3R4",
      curp: "ALCA009080808E",
      edad: 32,
    },
    {
      nombre: "Aurora Escalante",
      rfc: "AUESN13E3R4",
      curp: "AUES009080808E",
      edad: 26,
    },
    {
      nombre: "Sergio Hernández",
      rfc: "SEHEN13E3R4",
      curp: "SEHE009080808E",
      edad: 56,
    },
    {
      nombre: "Fernanda Franco",
      rfc: "FEFRN13E3R4",
      curp: "FEFR009080808E",
      edad: 24,
    },
    {
      nombre: "Fabiola Estrada",
      rfc: "FAESN13E3R4",
      curp: "FAES009080808E",
      edad: 38,
    },
  ];

  const filteredCustomers = customers.filter((customer) => {
    const searchText = search.toLowerCase();

    return (
      customer.nombre.toLowerCase().includes(searchText) ||
      customer.rfc.toLowerCase().includes(searchText) ||
      customer.curp.toLowerCase().includes(searchText)
    );
  });

  return (
    <SafeAreaView style={styles.safeContainer}>
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

          {filteredCustomers.map((customer, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.cardContent}>
                <View style={styles.textContainer}>
                  <Text style={styles.label}>{customer.nombre}</Text>
                  <Text>
                    <Text style={styles.label}>RFC: </Text>
                    {customer.rfc}
                  </Text>
                  <Text>
                    <Text style={styles.label}>CURP: </Text>
                    {customer.curp}
                  </Text>
                  <Text>
                    <Text style={styles.label}>Edad: </Text>
                    {customer.edad} años
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate("PolizasClientes")}
                >
                  <Text style={styles.textButton}>Ver Pólizas</Text>
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
    justifyContent: "center",
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
    elevation: 15,
    shadowColor: AppColors.SHADOW,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
    // Sombra en Android
    elevation: 8,
    // Sombra en iOS
    shadowColor: AppColors.SHADOW,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
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
    fontFamily: "InriaSerif_Regular"
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
    fontFamily: "InriaSerif_Bold"
  },
});
