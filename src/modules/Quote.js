import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import AppColors from '../kernel/AppColors';
import CustomHeader from '../modules/CustomHeader';

export default function QuoteScreen({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userId = route?.params?.userId || null;

  const fetchSeguros = async (tipo) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://192.168.1.73:3000/nar/seguros/tipo/${tipo}`);
      const data = await response.json();
      navigation.navigate('DatosTitular', { seguros: data, tipo, userId });
    } catch (err) {
      setError('Error al obtener los seguros');
    } finally {
      setLoading(false);
    }
  };

  const aseguradoras = [
    { nombre: "Seguro de vida", tipo: "vida", imagen: require("../../assets/img/seguro-de-vida.png") },
    { nombre: "Seguro de gastos médicos", tipo: "salud", imagen: require("../../assets/img/gastos-medicos.png") },
    { nombre: "Seguro de viaje", tipo: "viaje", imagen: require("../../assets/img/seguro-de-viaje.png") },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader title="Cotizar" />
      <View style={styles.container}>
        {loading && <ActivityIndicator size="large" color={AppColors.MAIN_COLOR} />}
        {error && <Text style={styles.errorText}>{error}</Text>}
        {aseguradoras.map((aseguradora, index) => (
          <TouchableOpacity key={index} style={styles.card} onPress={() => fetchSeguros(aseguradora.tipo)}>
            <Image source={aseguradora.imagen} style={styles.icon} />
            <Text style={styles.cardText}>{aseguradora.nombre}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: AppColors.BACKGROUND },
  container: { flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center' },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', width: '100%', padding: 16, marginVertical: 12, borderRadius: 12, borderWidth: 1, borderColor: AppColors.MAIN_COLOR },
  cardText: { fontSize: 18, marginLeft: 16, fontFamily: "InriaSerif_Bold", color: '#333' },
  icon: { width: 45, height: 45, resizeMode: 'contain' },
  errorText: { color: 'red', marginVertical: 10 },
});
