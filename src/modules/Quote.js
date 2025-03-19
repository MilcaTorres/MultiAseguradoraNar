import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import AppColors from '../kernel/AppColors';
import CustomHeader from '../modules/CustomHeader';

export default function QuoteScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* Header Azul */}
      <CustomHeader title="Cotizar"/>

      {/* Cards */}
      <View style={styles.container}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('DatosTitular')}>
          <Image source={require("../../assets/img/seguro-de-viaje.png")} style={styles.icon} />
          <Text style={styles.cardText}>Seguro de viaje</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('DatosTitular')}>
          <Image source={require("../../assets/img/gastos-medicos.png")} style={styles.icon} />
          <Text style={styles.cardText}>Seguro de gastos médicos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('DatosTitular')}>
          <Image source={require("../../assets/img/seguro-de-vida.png")} style={styles.icon} />
          <Text style={styles.cardText}>Seguro de vida</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.BACKGROUND,
  },
  header: {
    width: '100%',
    padding: 30,
    backgroundColor: AppColors.MAIN_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: AppColors.TEXT_WHITE,
    fontSize: 30,
    fontFamily: "InriaSerif_Bold",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    padding: 16,
    marginVertical: 12,
    borderRadius:12,
    
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardText: {
    fontSize: 18,
    marginLeft: 16,
    fontFamily: "InriaSerif_Bold",
    color: '#333',
  },
  icon: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
});
