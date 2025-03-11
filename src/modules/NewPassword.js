import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import styles from "../kernel/Styles";

export default function NewPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const route = useRoute();
  const navigation = useNavigation(); 
  const email = route.params?.email || "tu correo";

  const handlePasswordChange = () => {
    if (password.length < 6) {
      Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    Alert.alert("Éxito", "Contraseña actualizada correctamente.", [
      { 
        text: "OK", 
        onPress: () => navigation.navigate("Login") 
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Solicitud de cambio de contraseña</Text>
      <View style={styles.card}>
        <Text style={styles.instruction}>Ingrese su nueva contraseña</Text>
        <Text style={styles.label}>Contraseña*</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="Nueva contraseña"
          value={password}
          onChangeText={setPassword}
        />
        <Text style={styles.label}>Confirmar Contraseña*</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handlePasswordChange}>
          <Text style={styles.buttonText}>Verificar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}