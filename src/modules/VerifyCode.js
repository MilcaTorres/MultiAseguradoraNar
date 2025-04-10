import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, SafeAreaView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import styles from "../kernel/Styles";
import CustomHeader from "./CustomHeader";

export default function VerifyCode() {
  const [code, setCode] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const route = useRoute();
  const navigation = useNavigation();
  const email = route.params?.email || "";

  const handleVerifyCode = async () => {
    const enteredCode = code.join("");
    if (enteredCode.length !== 4) {
      Alert.alert("Error", "Ingrese el código completo.");
      return;
    }

    try {
      const response = await fetch('http://192.168.100.15:3001/nar/usuarios/recuperacion/validar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo: email, codigoRecuperacion: enteredCode }),
      });

      if (response.ok) {
        Alert.alert("Éxito", "Código verificado correctamente.", [
          { text: "OK", onPress: () => navigation.navigate("NewPass", { email, codigoRecuperacion: enteredCode }) },
        ]);
      } else {
        Alert.alert("Error", "Código incorrecto.");
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error al verificar el código.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader title="Verificar Código" />
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.instruction}>Ingrese el código enviado a:</Text>
          <Text style={styles.emailText}>{email}</Text>
          <View style={styles.codeContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                style={styles.codeInput}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={(text) => {
                  const newCode = [...code];
                  newCode[index] = text;
                  setCode(newCode);

                  if (text && index < 3) {
                    inputRefs.current[index + 1].focus();
                  }
                }}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === "Backspace" && index > 0 && !code[index]) {
                    inputRefs.current[index - 1].focus();
                  }
                }}
              />
            ))}
          </View>
          <TouchableOpacity style={styles.button} onPress={handleVerifyCode}>
            <Text style={styles.buttonText}>Verificar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
