import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import AppColors from '../kernel/AppColors';
import CustomHeader from '../modules/CustomHeader';

export default function LifeInsuranceQuoteScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <CustomHeader title="Cotizar"/>

      <Text style={styles.subtitle}>Cotización del seguro: vida</Text>

      <ScrollView contentContainerStyle={styles.container}>
        {[1, 2, 3, 4].map((item, index) => (
          <View key={index} style={styles.card}>
            <View>
              <Text style={styles.insuranceTitle}>Aseguradora {item}</Text>
              <Text style={styles.priceText}>Monto de la prima: $50,160</Text>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('InsuranceDetail')}
            >
              <Text style={styles.buttonText}>Seleccionar</Text>
            </TouchableOpacity>
          </View>
        ))}
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
  subtitle: { textAlign: 'center', marginVertical: 10, fontSize: 16, color: '#333' },
  container: { paddingHorizontal: 20 },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 10,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  insuranceTitle: { fontWeight: 'bold', fontSize: 16 },
  priceText: { marginTop: 4, color: '#666' },
  button: {
    backgroundColor: AppColors.MAIN_COLOR,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
});
