import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AppColors from "../kernel/AppColors";
import { TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomHeader from "./CustomHeader";

export default function Customers({ navigation }) {
  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://192.168.100.15:3000/nar/clientes/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error(`Error en la solicitud: ${response.statusText}`);
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error("Error al obtener los clientes: ", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData(); // Carga los datos cuando la pantalla vuelve a enfocarse
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const filteredCustomers = customers.filter((customer) => {
    const searchText = search.toLowerCase();
    return (
      (customer.nombre?.toLowerCase().includes(searchText) ?? false) ||
      (customer.rfc?.toLowerCase().includes(searchText) ?? false) ||
      (customer.correo?.toLowerCase().includes(searchText) ?? false)
    );
  });

  return (
    <SafeAreaView style={styles.safeContainer}>
      <CustomHeader title="Clientes" />
      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={AppColors.TEXT_GRAY} style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Buscar cliente..."
          placeholderTextColor={AppColors.TEXT_GRAY}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.container}>
          {loading ? (
            <ActivityIndicator size="large" color={AppColors.MAIN_COLOR} />
          ) : (
            filteredCustomers.map((customer, index) => (
              <View key={index} style={styles.card}>
                <View style={styles.cardContent}>
                  <View style={styles.textContainer}>
                    <Text style={styles.label}>{customer.nombre} {customer.apellidoPaterno}</Text>
                    <Text><Text style={styles.label}>RFC: </Text>{customer.rfc}</Text>
                    <Text><Text style={styles.label}>Edad: </Text>{customer.edad} años</Text>
                    <Text><Text style={styles.label}>Correo: </Text>{customer.correo}</Text>
                  </View>
                  <View>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("CotizacionesClientes", { cliente: customer })}
                  >
                    <Text style={styles.textButton}>Ver Cotizaciones</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("PolizasClientes", { cliente: customer })}
                  >
                    <Text style={styles.textButton}>Ver Pólizas</Text>
                  </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
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
    fontFamily: "InriaSerif_Regular",
  },
  button: {
    padding: 10,
    backgroundColor: AppColors.MAIN_COLOR,
    width: "100%",
    alignItems: "center",
    marginTop: 15
  },
  textButton: {
    color: AppColors.TEXT_WHITE,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: 'center'
  }
});
