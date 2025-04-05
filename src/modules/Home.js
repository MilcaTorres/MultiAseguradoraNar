import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import AppColors from '../kernel/AppColors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const[nombre, setNombre] = useState("");
  const[apellidoPaterno, setApellidoPaterno] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const usuarioJSON = await AsyncStorage.getItem("usuario");
        if (usuarioJSON) {
          const usuario = JSON.parse(usuarioJSON);
  
          // Extraer los datos correctos dentro de `data._doc`
          const usuarioData = usuario.data?._doc;
  
          if (usuarioData) {
            setNombre(usuarioData.nombre);
            setApellidoPaterno(usuarioData.apellidoPaterno);
            setUserId(usuarioData._id);  // Aquí extraemos el userId
            console.log("ID del usuario obtenido:", usuarioData._id);
            
          } else {
            console.log("Error: Estructura de datos inesperada", usuario);
          }
        }
      } catch (error) {
        console.log("Error al obtener datos del usuario: ", error);
      }
    };
    obtenerUsuario();
  }, []);
  

  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
        <View style={styles.welcome}>
            <Text style={styles.text}>Bienvenid@ {nombre} {apellidoPaterno}</Text>
        </View>
        <View>
        <Image source={require("../../assets/img/seguros.jpg")} style={styles.img}/>
        </View>
        <View style={styles.welcome}>
            <Text style={styles.text}>¿Qué desea hacer?</Text>
        </View>

         {/* Contenedor de botones en filas */}
        <View style={styles.buttonsContainer}>
          {/* Primera fila */}
          <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.replace('MainApp', { screen: 'Customers' })}>
              <Image source={require("../../assets/img/customers.png")} style={styles.imgButton}/>
              <Text style={styles.buttonText}>Clientes</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.button} onPress={() => navigation.replace('MainApp', { screen: 'Quote', params: { userId } })}>
              <Image source={require("../../assets/img/quote.png")} style={styles.imgButton}/>
              <Text style={styles.buttonText}>Cotizar</Text>
            </TouchableOpacity>
          </View>

          {/* Segunda fila */}
          <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.replace('MainApp', { screen: 'Statistics' })}>
              <Image source={require("../../assets/img/statistics.png")} style={styles.imgButton}/>
              <Text style={styles.buttonText}>Estadísticas</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.replace('MainApp', { screen: 'Profile' })}>
              <Image source={require("../../assets/img/profile.png")} style={styles.imgButton}/>
              <Text style={styles.buttonText}>Perfil</Text>
            </TouchableOpacity>
          </View>
        </View>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: AppColors.BACKGROUND,
      },
    container: {
        flex: 1,
        backgroundColor: AppColors.BACKGROUND,
        paddingHorizontal: 20,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    welcome: {
        backgroundColor: AppColors.MAIN_COLOR,
        width: '96%',
        padding: 14,
        borderRadius: 3,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    text: {
        color: AppColors.TEXT_WHITE,
        fontSize: 20,
        //fontFamily: "InriaSerif_Bold",
        fontWeight: 'bold'
    },
    img: {
        width: 340,
        height: 180,
        marginBottom: 20,
        marginTop: 20,
        borderRadius: 20
    },
    buttonsContainer: {
        alignItems: 'center', 
        marginTop: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 15,
      },
    button: {
        backgroundColor: AppColors.MAIN_COLOR,
        width: 160,
        height: 140,
        padding: 14,
        borderRadius: 20,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10, 
    },
    buttonText: {
        color: AppColors.TEXT_WHITE,
        fontSize: 16,
        //fontFamily: "InriaSerif_Bold",
        textAlign: 'center',
        fontWeight: 'bold'
    },
    imgButton: {
        width: 62,
        height: 62,
        marginBottom: 20,
        marginTop: 20,
        borderRadius: 20
    },
});