import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from "react-native";
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
  const [cuotasACumplir, setCuotasACumplir] = useState(4);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = "67e645d14d0391f2e051db0f";
        const response = await fetch(
          `http://192.168.100.15:3000/nar/usuarios/cotizacionesYEmisiones/${id}`
        );
        const result = await response.json();

        const currentMonth = new Date().getMonth();

        const cotizaciones = new Array(12).fill(0);
        cotizaciones[currentMonth] = Number(result.cotizaciones);

        const emisiones = new Array(12).fill(0);
        emisiones[currentMonth] = Number(result.emisiones);

        setCotizacionesPorMes(cotizaciones);
        setEmisionesPorMes(emisiones);
      } catch (error) {
        console.error("Error al obtener estadísticas: ", error);
      }
    };
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
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#0B1956",
    },
  };

  const cotizacionesData = {
    labels: meses,
    datasets: [{ data: cotizacionesPorMes }],
  };

  const emisionesData = {
    labels: meses,
    datasets: [{ data: emisionesPorMes }],
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader title="Estadísticas" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
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
                  data={cotizacionesData}
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
                  data={emisionesData}
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
    textAlign: 'center'
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

