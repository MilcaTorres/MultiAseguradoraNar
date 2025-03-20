import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import styles from "../kernel/Styles";

export default function VerifyCode() {
  const [code, setCode] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const route = useRoute();
  const navigation = useNavigation();
  const email = route.params?.email || "tu correo";

  const handleVerifyCode = () => {
    const enteredCode = code.join("");
    if (enteredCode.length < 4) {
      Alert.alert("Error", "Ingrese el código completo.");
      return;
    }

    Alert.alert("Éxito", "Código verificado correctamente.", [
      { text: "OK", onPress: () => navigation.navigate("NewPass", { email }) },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Solicitud de cambio de contraseña</Text>
      <View style={styles.card}>
        <Text style={styles.instruction}>Ingrese el código enviado al correo:</Text>
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
                  inputRefs.current[index + 1].focus(); // Mover al siguiente campo
                }
              }}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace" && index > 0 && !code[index]) {
                  inputRefs.current[index - 1].focus(); // Volver al campo anterior
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
  );
}
