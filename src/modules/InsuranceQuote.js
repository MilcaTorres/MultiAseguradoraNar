import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import AppColors from '../kernel/AppColors';
import CustomHeader from '../modules/CustomHeader';

export default function InsuranceQuote({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <CustomHeader title="Cotizar"/>
      
      {/* Information Section */}
      <View style={styles.infoSection}>
        <TouchableOpacity style={styles.infoButton}>
          <Text style={styles.infoButtonText}>Información sobre el seguro</Text>
        </TouchableOpacity>
        <View style={styles.insuranceContainer}>
        <Image source={require('../../assets/img/life-insurance.png')} style={styles.insuranceImage} />
          <Text style={styles.insuranceType}>Seguro de vida 1</Text>
          
        </View>
      </View>
      
      {/* Insured Person Details */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Datos del Asegurado</Text>
        <Text>Nombre: Juan Pérez López</Text>
        <Text>Edad: 35 años</Text>
        <Text>Teléfono: +52 55 1234 5678</Text>
        <Text>Correo: juan.perez@email.com</Text>
      </View>
      
      {/* Coverages */}
      <ScrollView contentContainerStyle={styles.coverages}>
        <Text style={styles.coverageTitle}>Coberturas:</Text>
        <Text>* Muerte Natural – Pago a beneficiarios.</Text>
        <Text>* Muerte Accidental – Pago extra.</Text>
        <Text>* Invalidez Total – Indemnización.</Text>
        <Text>* Enfermedad Terminal – Adelanto del seguro.</Text>
        <Text>* Gastos Funerarios – Cobertura de costos.</Text>
        <Text>* Doble Indemnización – Pago doble si es accidental.</Text>
      </ScrollView>
      
      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Emitir</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: AppColors.BACKGROUND },
  infoSection: { alignItems: 'center', marginVertical: 10 },
  infoButton: { backgroundColor: AppColors.MAIN_COLOR, padding: 10,  },
  infoButtonText: { color: 'white', fontWeight: 'bold', fontSize: 24 },
  insuranceContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  insuranceType: { fontSize: 24, fontWeight: 'bold', marginRight: 10 },
  insuranceImage: { width: 80, height: 80, resizeMode: 'contain' },
  card: { backgroundColor: '#fff', padding: 16, margin: 10, borderRadius: 12, borderWidth: 1, borderColor: '#ccc' },
  cardTitle: { fontWeight: 'bold', marginBottom: 8 },
  coverages: { padding: 16 },
  coverageTitle: { fontWeight: 'bold', marginBottom: 8 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-evenly', padding: 16 },
  button: { backgroundColor: AppColors.MAIN_COLOR, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  buttonText: { color: 'white', fontWeight: 'bold' }
});
