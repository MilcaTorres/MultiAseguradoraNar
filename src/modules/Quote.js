import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppColors from '../kernel/AppColors';
import CustomHeader from '../modules/CustomHeader';

export default function QuoteScreen({ navigation }) {
  // Estados para manejar la carga, errores y el ID del usuario
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  // Efecto para obtener el ID del usuario almacenado en AsyncStorage
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userData = await AsyncStorage.getItem("usuario");
        if (userData) {
          const user = JSON.parse(userData);
          setUserId(user._id);
        }
      } catch (error) {
        console.error("Error al obtener el ID del usuario", error);
      }
    };
    fetchUserId();
  }, []);

  // Función para obtener los seguros según el tipo seleccionado
  const fetchSeguros = async (tipo) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://192.168.100.15:3000/nar/seguros/tipo/${tipo}`);
      const data = await response.json();
      // Navega a la pantalla DatosTitular con los datos de seguros obtenidos
      navigation.navigate('DatosTitular', { seguros: data, tipo });
    } catch (err) {
      setError('Error al obtener los seguros');
    } finally {
      setLoading(false);
    }
  };

  // Lista de aseguradoras con su nombre, tipo y la imagen correspondiente
  const aseguradoras = [
    { nombre: "Seguro de vida", tipo: "Vida", imagen: require("../../assets/img/seguro-de-vida.png") },
    { nombre: "Seguro de gastos médicos", tipo: "Salud", imagen: require("../../assets/img/gastos-medicos.png") },
    { nombre: "Seguro de viaje", tipo: "Viaje", imagen: require("../../assets/img/seguro-de-viaje.png") },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader title="Cotizar" />
      <View style={styles.container}>
        {/* Indicador de carga */}
        {loading && <ActivityIndicator size="large" color={AppColors.MAIN_COLOR} />}
        {/* Mensaje de error si hay problemas al obtener datos */}
        {error && <Text style={styles.errorText}>{error}</Text>}

        {/* Renderizado de tarjetas de aseguradoras */}
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
