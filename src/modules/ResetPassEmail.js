import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../kernel/Styles";

export default function ResetPassEmail() {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const handleSendEmail = () => {
    if (!email.includes("@") || !email.includes(".")) {
      Alert.alert("Error", "Ingrese un correo electrónico válido.");
      return;
    }

    Alert.alert("Éxito", "Código enviado a " + email, [
      { text: "OK", onPress: () => navigation.navigate("Code", { email }) },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Solicitud de cambio de contraseña</Text>
      <View style={styles.card}>
        <Text style={styles.instruction}>
          Ingrese el correo electrónico asociado a la cuenta
        </Text>
        <Text style={styles.label}>Correo electrónico*</Text>
        <TextInput
          style={styles.input}
          placeholder="example@mail.com"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity style={styles.button} onPress={handleSendEmail}>
          <Text style={styles.buttonText}>Enviar correo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
