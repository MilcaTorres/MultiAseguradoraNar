import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../kernel/Styles";
import CustomHeader from '../modules/CustomHeader';

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
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader title="Solicitud de cambio de contraseña" />
      <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.instruction}>
          Ingrese el correo electrónico asociado a la cuenta
        </Text>
        <Text style={styles.label}>Correo electrónico*</Text>
        <TextInput
          style={styles.input}
          placeholder="example@gmail.com"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity style={styles.button} onPress={handleSendEmail}>
          <Text style={styles.buttonText}>Enviar correo</Text>
        </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  );
}
