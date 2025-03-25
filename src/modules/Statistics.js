import React from "react";
import { View, Text, StyleSheet, Dimensions, SafeAreaView, ScrollView } from "react-native";
import { BarChart } from "react-native-chart-kit";
import AppColors from "../kernel/AppColors";
import CustomHeader from "./CustomHeader";

const screenWidth = Dimensions.get("window").width;

export default function Statistics() {
  const cuotasACumplir = 4;
  
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

  const data = {
    labels: ["Ene", "Feb", "Mar", "Abr", "May"],
    datasets: [
      {
        data: [5, 8, 10, 3, 6],
      },
    ],
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader title="Estadísticas"/>
      <ScrollView>
      <View style={styles.container}>
      <View style={styles.cuotasContainer}>
        <Text style={styles.cuotasText}>Cuotas a cumplir: {cuotasACumplir} emisiones</Text>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartLabel}>No. cotizaciones</Text>
        <BarChart
          data={data}
          width={screenWidth * 0.9}
          height={220}
          chartConfig={chartConfig}
          style={styles.chartStyle}
        />
        <Text style={styles.chartLabel}>Meses</Text>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartLabel}>No. ventas</Text>
        <BarChart
          data={data}
          width={screenWidth * 0.9}
          height={220}
          chartConfig={chartConfig}
          style={styles.chartStyle}
        />
        <Text style={styles.chartLabel}>Meses</Text>
      </View>
    </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: AppColors.BACKGROUND },
  container: {
    flex: 1,
    backgroundColor: AppColors.BACKGROUND,
    alignItems: "center",
    padding: 20,
  },
  cuotasContainer: {
    backgroundColor: AppColors.MAIN_COLOR,
    padding: 10,
    borderRadius: 8,
    marginBottom: 20
  },
  cuotasText: {
    color: AppColors.TEXT_WHITE,
    fontSize: 16,
    fontWeight: "bold",
  },
  chartContainer: {
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
  },
  chartLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 16,
  },
});
