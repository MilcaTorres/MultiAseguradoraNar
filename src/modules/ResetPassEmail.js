import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../kernel/Styles";
import CustomHeader from '../modules/CustomHeader';

export default function ResetPassEmail() {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const handleSendEmail = async () => {
    if (!email.includes("@") || !email.includes(".")) {
      Alert.alert("Error", "Ingrese un correo electrónico válido.");
      return;
    }

    try {
      const response = await fetch('http://192.168.100.5:3000/nar/usuarios/recuperacion/generar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo: email }), // Ajuste para coincidir con el backend
      });

      if (response.ok) {
        Alert.alert("Éxito", "Código enviado a " + email, [
          { text: "OK", onPress: () => navigation.navigate("Code", { email }) },
        ]);
      } else {
        Alert.alert("Error", "No se pudo enviar el código.");
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error al enviar el código.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader title="Recuperación de Contraseña" />
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.instruction}>Ingrese su correo electrónico:</Text>
          <TextInput
            style={styles.input}
            placeholder="example@gmail.com"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TouchableOpacity style={styles.button} onPress={handleSendEmail}>
            <Text style={styles.buttonText}>Enviar código</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
