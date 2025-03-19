import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import AppColors from '../kernel/AppColors';

export default function InsuranceDetailScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Cotizar</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.subtitle}>Información sobre el seguro</Text>

        {/* Seguro de vida */}
        <View style={styles.card}>
          <Text style={styles.title}>Seguro de vida 1</Text>
          <View style={styles.dataContainer}>
            <Text style={styles.sectionTitle}>Datos del Asegurado</Text>
            <Text>Nombre: Juan Pérez López</Text>
            <Text>Edad: 35 años</Text>
            <Text>Teléfono: +52 55 1234 5678</Text>
            <Text>Correo: juan.perez@email.com</Text>
          </View>

          <View style={styles.dataContainer}>
            <Text style={styles.sectionTitle}>Coberturas:</Text>
            <Text>* Muerte Natural – Pago a beneficiarios por fallecimiento.</Text>
            <Text>* Muerte Accidental – Pago extra si la muerte es por accidente.</Text>
            <Text>* Invalidez Total – Indemnización si el asegurado queda incapacitado.</Text>
            <Text>* Enfermedad Terminal – Adelanto del seguro en vida.</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <Text>Clientes</Text>
        <Text>Cotizar</Text>
        <Text>Inicio</Text>
        <Text>Estadísticas</Text>
        <Text>Perfil</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: AppColors.BACKGROUND },
  header: { padding: 20, backgroundColor: AppColors.MAIN_COLOR, alignItems: 'center' },
  headerText: { color: 'white', fontSize: 26, fontWeight: 'bold' },
  container: { padding: 20 },
  subtitle: { textAlign: 'center', marginVertical: 10, fontSize: 16, color: '#333' },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  dataContainer: { marginVertical: 10 },
  sectionTitle: { fontWeight: 'bold', marginBottom: 5 },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
});
