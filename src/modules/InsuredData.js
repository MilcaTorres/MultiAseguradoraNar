import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import AppColors from '../kernel/AppColors';
//Eliminar 
export default function InsuredDataScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Datos del asegurado</Text>

        {['Nombre', 'Apellido paterno', 'Apellido materno', 'Teléfono', 'Correo electrónico'].map((field) => (
          <TextInput key={field} placeholder={field} style={styles.input} />
        ))}

        <TextInput placeholder="Fecha de nacimiento" style={styles.input} />

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Summary')}>
          <Text style={styles.buttonText}>Cotizar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: AppColors.BACKGROUND },
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, color: AppColors.MAIN_COLOR, marginBottom: 20, fontFamily: "InriaSerif_Bold" },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, marginVertical: 10, borderRadius: 8, backgroundColor: '#fff' },
  button: { backgroundColor: AppColors.MAIN_COLOR, padding: 15, borderRadius: 10, marginTop: 30, alignItems: 'center' },
  buttonText: { color: AppColors.TEXT_WHITE, fontSize: 18, fontFamily: "InriaSerif_Bold" }
});
