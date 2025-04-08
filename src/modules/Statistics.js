import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BarChart } from "react-native-chart-kit";
import AppColors from "../kernel/AppColors";
import CustomHeader from "./CustomHeader";

const screenWidth = Dimensions.get("window").width;

const meses = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

export default function Statistics() {
  const [cotizacionesPorMes, setCotizacionesPorMes] = useState(
    new Array(12).fill(0)
  );
  const [emisionesPorMes, setEmisionesPorMes] = useState(new Array(12).fill(0));
  const [cuotasACumplir, setCuotasACumplir] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      setRefreshing(true);
      const storedUser = await AsyncStorage.getItem("usuario");
      const parsedUser = JSON.parse(storedUser);
      const id = parsedUser?.data?._doc?._id;

      if (!id) throw new Error("No se encontró ID del usuario");

      // Obtener cotizaciones y emisiones
      const response = await fetch(
        `http://192.168.106.15:3001/nar/usuarios/cotizacionesYEmisiones/${id}`
      );
      const result = await response.json();

      const currentMonth = new Date().getMonth();

      const cotizaciones = new Array(12).fill(0);
      cotizaciones[currentMonth] = Number(result.cotizaciones);
      const emisiones = new Array(12).fill(0);
      emisiones[currentMonth] = Number(result.emisiones);

      setCotizacionesPorMes(cotizaciones);
      setEmisionesPorMes(emisiones);

      // Obtener cuota mensual
      const cuotaResponse = await fetch(
        "http://192.168.106.15:3001/nar/cuotas/"
      );
      const cuotaResult = await cuotaResponse.json();
      if (Array.isArray(cuotaResult) && cuotaResult[0]?.cuotaMensual) {
        setCuotasACumplir(cuotaResult[0].cuotaMensual);
      }
    } catch (error) {
      console.error("Error al obtener estadísticas: ", error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = useCallback(() => {
    fetchData();
  }, []);

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(11, 25, 86, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader title="Estadísticas" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container}>
          <View style={styles.cuotasContainer}>
            <Text style={styles.cuotasText}>
              Cuotas a cumplir: {cuotasACumplir} emisiones
            </Text>
          </View>

          <View style={styles.chartContainer}>
            <Text style={styles.chartLabel}>No. cotizaciones</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ minWidth: screenWidth * 1.8 }}>
                <BarChart
                  data={{
                    labels: meses,
                    datasets: [{ data: cotizacionesPorMes }],
                  }}
                  width={screenWidth * 1.8}
                  height={220}
                  chartConfig={chartConfig}
                  style={styles.chartStyle}
                />
              </View>
            </ScrollView>
            <Text style={styles.chartLabel}>Meses</Text>
          </View>

          <View style={styles.chartContainer}>
            <Text style={styles.chartLabel}>No. ventas</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ minWidth: screenWidth * 1.8 }}>
                <BarChart
                  data={{
                    labels: meses,
                    datasets: [{ data: emisionesPorMes }],
                  }}
                  width={screenWidth * 1.8}
                  height={220}
                  chartConfig={chartConfig}
                  style={styles.chartStyle}
                />
              </View>
            </ScrollView>
            <Text style={styles.chartLabel}>Meses</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.BACKGROUND,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  container: {
    flex: 1,
    backgroundColor: AppColors.BACKGROUND,
    padding: 20,
    width: "100%",
  },
  cuotasContainer: {
    backgroundColor: AppColors.MAIN_COLOR,
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  cuotasText: {
    color: AppColors.TEXT_WHITE,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  chartContainer: {
    width: "100%",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
  },
  chartLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 16,
  },
});
