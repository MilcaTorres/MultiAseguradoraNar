import React, { useState, useEffect } from "react";
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppColors from "../kernel/AppColors";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const checkUserSession = async () => {
      const storedUser = await AsyncStorage.getItem("usuario");
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        const estado = userData?.data?._doc?.estado;

        if (estado === "activo") {
          navigation.reset({ index: 0, routes: [{ name: "Inicio" }] });
        } else if (estado === "inactivo") {
          navigation.reset({ index: 0, routes: [{ name: "InicioBloqueado" }] });
        }
      }
    };
    checkUserSession();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor, ingrese correo y contraseña");
      return;
    }

    try {
      const response = await fetch("http://192.168.100.15:3001/nar/usuarios/login/agente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: email, contrasena: password }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem("usuario", JSON.stringify(data));
        const estado = data?.data?._doc.estado;
        if (estado === "activo") {
          navigation.reset({ index: 0, routes: [{ name: "Inicio" }] });
        } else if (estado === "inactivo") {
          navigation.reset({ index: 0, routes: [{ name: "InicioBloqueado" }] });
        }
      } else {
        Alert.alert("Error", data.message || "Error en el login");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo conectar con el servidor");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Image
            source={require("../../assets/img/logo-blanco.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>Inicio de Sesión</Text>

          <Text style={styles.label}>Correo electrónico*</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />

          <Text style={styles.label}>Contraseña*</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Contra")}>
            <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.MAIN_COLOR,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    width: "100%",
  },
  logo: {
    width: 260,
    height: 260,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: AppColors.TEXT_WHITE,
    fontFamily: "InriaSerif_Bold",
    marginBottom: 40,
  },
  label: {
    alignSelf: "flex-start",
    color: AppColors.TEXT_WHITE,
    fontFamily: "InriaSerif_Regular",
    fontSize: 16,
    marginBottom: 14,
  },
  input: {
    width: "100%",
    backgroundColor: AppColors.INPUT_BACKGROUND,
    padding: 10,
    borderRadius: 3,
    marginBottom: 15,
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
    marginTop: 40,
  },
  forgotPassword: {
    marginTop: 60,
    color: AppColors.TEXT_WHITE,
    textDecorationLine: "underline",
    fontFamily: "InriaSerif_Regular",
  },
});
