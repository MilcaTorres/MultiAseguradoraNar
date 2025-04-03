import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import AppColors from '../kernel/AppColors';
import CustomHeader from '../modules/CustomHeader';

export default function QuoteScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSeguros = async (tipo) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://192.168.100.15:3000/nar/seguros/tipo/${tipo}`);
      const data = await response.json();
      navigation.navigate('DatosTitular', { seguros: data, tipo });
    } catch (err) {
      setError('Error al obtener los seguros');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader title="Cotizar" />
      <View style={styles.container}>
        {loading && <ActivityIndicator size="large" color={AppColors.MAIN_COLOR} />}
        {error && <Text style={styles.errorText}>{error}</Text>}
        
        <TouchableOpacity style={styles.card} onPress={() => fetchSeguros('viaje')}>
          <Image source={require("../../assets/img/seguro-de-viaje.png")} style={styles.icon} />
          <Text style={styles.cardText}>Seguro de viaje</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.card} onPress={() => fetchSeguros('medico')}>
          <Image source={require("../../assets/img/gastos-medicos.png")} style={styles.icon} />
          <Text style={styles.cardText}>Seguro de gastos médicos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => fetchSeguros('vida')}>
          <Image source={require("../../assets/img/seguro-de-vida.png")} style={styles.icon} />
          <Text style={styles.cardText}>Seguro de vida</Text>
        </TouchableOpacity>
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
