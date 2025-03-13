import React, { useState } from 'react'
import AppColors from '../kernel/AppColors';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Login({navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
        <Image source={require("../../assets/img/logo-blanco.png")} style={styles.logo}/>
        <Text style={styles.title}>Inicio de Sesión</Text>

        <Text style={styles.label}>Correo electrónico*</Text>
        <TextInput
            style={styles.input}
            keyboardType='email-address'
            value={email}
            onChangeText={setEmail}
        />

<       Text style={styles.label}>Contraseña*</Text>
        <TextInput
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
         />

        <TouchableOpacity
        onPress={() => navigation.navigate('Inicio')}> 
            <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity>
            <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.MAIN_COLOR,
        alignItems: "center",
        justifyContent: 'center',
        paddingHorizontal: 20,
        width: '100%'
      },
      logo: {
        width: 260,
        height: 260,
        marginBottom: 20
      },
      title: {
        fontSize: 24,
        color: AppColors.TEXT_WHITE,
        fontFamily: "InriaSerif_Bold",
        marginBottom: 40
      },
      label: {
        alignSelf: "flex-start",
        color: AppColors.TEXT_WHITE,
        fontFamily: "InriaSerif_Regular",
        fontSize: 16,
        marginBottom: 14
      },
      input: {
        width: "100%",
        backgroundColor: AppColors.INPUT_BACKGROUND,
        padding: 10,
        borderRadius: 3,
        marginBottom: 15
      },
      button: {
        backgroundColor: AppColors.BUTTON_BACKGROUND,
        padding: 12,
        borderRadius: 5,
        width: "40%",
        alignItems: "center",
        
      },
      buttonText: {
        color: AppColors.TEXT_WHITE,
        fontSize: 16,
        fontFamily: "InriaSerif_Bold",
        marginTop: 40
      },
      forgotPassword: {
        marginTop: 60,
        color: AppColors.TEXT_WHITE,
        textDecorationLine: "underline",
        fontFamily: "InriaSerif_Regular"
      }
});


