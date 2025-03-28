import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, SafeAreaView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import styles from "../kernel/Styles";
import CustomHeader from "./CustomHeader";

export default function NewPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const route = useRoute();
  const navigation = useNavigation();

  // Verifica que el código de recuperación llega correctamente
  const email = route.params?.email || "";
  const codigoRecuperacion = route.params?.codigoRecuperacion || ""; // Asegúrate de recibirlo

  const handlePasswordChange = async () => {
    if (password.length < 6) {
      Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }
    if (!codigoRecuperacion) { // Validamos que el código esté presente
      Alert.alert("Error", "Código de recuperación no encontrado.");
      return;
    }

    try {
      const response = await fetch('http://192.168.100.5:3000/nar/usuarios/recuperacion/cambiar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          correo: email,
          codigoRecuperacion, // Se debe enviar este código dinámico
          nuevaContrasena: password
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        Alert.alert("Éxito", "Contraseña actualizada correctamente.", [
          { text: "OK", onPress: () => navigation.navigate("Login") },
        ]);
      } else {
        Alert.alert("Error", responseData.mensaje || "No se pudo actualizar la contraseña.");
      }
    } catch (error) {
      console.log("Error:", error);
      Alert.alert("Error", "Ocurrió un error al actualizar la contraseña.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader title="Nueva Contraseña" />
      <View style={styles.container}>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="Nueva contraseña"
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity style={styles.button} onPress={handlePasswordChange}>
            <Text style={styles.buttonText}>Actualizar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
