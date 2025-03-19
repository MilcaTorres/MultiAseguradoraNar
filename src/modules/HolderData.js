import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import AppColors from '../kernel/AppColors';
import CustomHeader from '../modules/CustomHeader';

export default function HolderDataScreen({ navigation }) {
  const [isHolderInsured, setIsHolderInsured] = useState(true); // Por default en "Sí"

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <CustomHeader title="Cotizar"/>
        <View style={styles.container}>
          

          {['Nombre', 'Apellido paterno', 'Apellido materno', 'Teléfono', 'Correo electrónico'].map((field) => (
            <TextInput key={field} placeholder={field} style={styles.input} />
          ))}

          <TextInput placeholder="Fecha de nacimiento" style={styles.input} />

          <View style={styles.radioContainer}>
            <Text style={styles.label}>¿El titular también será el asegurado?</Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity
                onPress={() => setIsHolderInsured(true)}
                style={styles.radioButton}
              >
                <View style={[styles.outerCircle, isHolderInsured && styles.outerCircleSelected]}>
                  {isHolderInsured && <View style={styles.innerCircle} />}
                </View>
                <Text style={styles.radioText}>Sí</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsHolderInsured(false)}
                style={styles.radioButton}
              >
                <View style={[styles.outerCircle, !isHolderInsured && styles.outerCircleSelected]}>
                  {!isHolderInsured && <View style={styles.innerCircle} />}
                </View>
                <Text style={styles.radioText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Mostrar el formulario de asegurado solo si NO es el titular */}
          {!isHolderInsured && (
            <View style={styles.extraFormContainer}>
              <Text style={styles.title}>Datos del asegurado</Text>

              {['Nombre', 'Apellido paterno', 'Apellido materno', 'Teléfono', 'Correo electrónico'].map((field) => (
                <TextInput key={field} placeholder={field} style={styles.input} />
              ))}

              <TextInput placeholder="Fecha de nacimiento" style={styles.input} />
            </View>
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Insurence')} // O 'InsuredData' si quieres mantener ese flujo
          >
            <Text style={styles.buttonText}>Cotizar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: AppColors.BACKGROUND },
  scrollContainer: { paddingVertical: 20 },
  container: { padding: 20 },
  title: { fontSize: 24, color: AppColors.MAIN_COLOR, marginBottom: 20, fontFamily: "InriaSerif_Bold" },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, marginVertical: 10, borderRadius: 8, backgroundColor: '#fff' },
  radioContainer: { marginTop: 20 },
  label: { fontSize: 16, marginBottom: 10 },
  radioGroup: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  radioButton: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  outerCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerCircleSelected: {
    borderColor: AppColors.MAIN_COLOR,
  },
  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: AppColors.MAIN_COLOR,
  },
  radioText: { fontSize: 16, color: '#333' },
  button: { backgroundColor: AppColors.MAIN_COLOR, padding: 15, borderRadius: 10, marginTop: 30, alignItems: 'center' },
  buttonText: { color: AppColors.TEXT_WHITE, fontSize: 18, fontFamily: "InriaSerif_Bold" },
  extraFormContainer: { marginTop: 30, paddingTop: 20, borderTopWidth: 1, borderTopColor: '#ccc' }
});
  