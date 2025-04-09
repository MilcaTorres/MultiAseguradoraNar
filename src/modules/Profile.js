import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
} from "react-native";
import CustomHeader from "./CustomHeader";
import AppColors from "../kernel/AppColors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";

export default function Profile({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  // Estado para almacenar los datos del usuario
  const [userData, setUserData] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    email: "",
    rfc: "",
    domicilio: "",
    telefono: "",
    nuevaContrasena: "",
    confirmarContrasena: "",
  });

  const [passwordUpdated, setPasswordUpdated] = useState(false);

  // Efecto para obtener los datos del usuario almacenados en AsyncStorage
  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const usuarioJSON = await AsyncStorage.getItem("usuario");
        //console.log("Datos obtenidos de AsyncStorage: ", usuarioJSON);

        if (usuarioJSON) {
          const usuario = JSON.parse(usuarioJSON);

          if (usuario.data && usuario.data._doc) {
            const datosUsuario = usuario.data._doc;

            setUserData((prevState) => ({
              ...prevState,
              nombre: datosUsuario.nombre || "",
              apellidoPaterno: datosUsuario.apellidoPaterno || "",
              apellidoMaterno: datosUsuario.apellidoMaterno || "",
              email: datosUsuario.correo || "",
              rfc: datosUsuario.rfc || "",
              telefono: datosUsuario.telefono || "",
            }));
          } else {
            console.log("Estructura de usuario inesperada:", usuario);
          }
        }
      } catch (error) {
        console.log("Error al obtener los datos del usuario:", error);
      }
    };
    obtenerUsuario();
  }, []);

  // Función para manejar la actualización de la contraseña
  const handleSave = async () => {
    if (passwordUpdated) {
      Alert.alert("Aviso", "La contraseña ya fue actualizada.");
      return;
    }

    const { contrasenaActual, nuevaContrasena, confirmarContrasena } = userData;

    if (!contrasenaActual || !nuevaContrasena || !confirmarContrasena) {
      Alert.alert("Error", "Todos los campos de contraseña son obligatorios.");
      return;
    }

    if (nuevaContrasena !== confirmarContrasena) {
      Alert.alert("Error", "Las nuevas contraseñas no coinciden.");
      return;
    }

    try {
      setIsLoading(true);

      const usuarioJSON = await AsyncStorage.getItem("usuario");
      const usuario = JSON.parse(usuarioJSON);
      const userId = usuario?.data?._doc._id;

      if (!userId) {
        Alert.alert("Error", "No se pudo obtener el ID del usuario.");
        return;
      }

      const response = await fetch(
        `http://192.168.106.15:3001/nar/usuarios/updPostulante/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contrasenaActual,
            nuevaContrasena,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        Alert.alert("Éxito", "Contraseña actualizada correctamente.");
        setUserData({
          ...userData,
          contrasenaActual: "",
          nuevaContrasena: "",
          confirmarContrasena: "",
        });
        setPasswordUpdated(true);
      } else {
        Alert.alert(
          "Error",
          result.message || "No se pudo actualizar la contraseña."
        );
      }
    } catch (error) {
      console.error("Error al actualizar contraseña: ", error);
      Alert.alert("Error", "Ocurrió un error inesperado.");
    } finally {
      setIsLoading(false);
    }
  };

  // Función para cerrar sesión y limpiar AsyncStorage
  const doLogout = async () => {
    await AsyncStorage.clear();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Login" }],
      })
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <CustomHeader title="Perfil" />
        <View style={styles.container}>
          {/* Fila Nombre y Apellido Paterno */}
          <View style={styles.inputRow}>
            <View style={styles.inputContainer}>
              <Text>Nombre*</Text>
              <TextInput
                style={styles.input}
                value={userData.nombre}
                editable={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text>Apellido paterno*</Text>
              <TextInput
                style={styles.input}
                value={userData.apellidoPaterno}
                editable={false}
              />
            </View>
          </View>

          {/* Fila Apellido Materno y RFC */}
          <View style={styles.inputRow}>
            <View style={styles.inputContainer}>
              <Text>Apellido materno*</Text>
              <TextInput
                style={styles.input}
                value={userData.apellidoMaterno}
                editable={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text>RFC*</Text>
              <TextInput
                style={styles.input}
                value={userData.rfc}
                editable={false}
              />
            </View>
          </View>

          {/* Correo Electrónico */}
          <View style={styles.inputRow}>
            <View style={styles.inputContainer}>
              <Text>Correo electrónico*</Text>
              <TextInput
                style={styles.input}
                value={userData.email}
                editable={false}
              />
            </View>
          </View>

          {/* Teléfono */}
          <View style={styles.inputRow}>
            <View style={styles.inputContainer}>
              <Text>Teléfono*</Text>
              <TextInput
                style={styles.input}
                value={userData.telefono}
                editable={false}
              />
            </View>
          </View>

          {/* Contraseña Actual */}
          <View style={styles.inputRow}>
            <View style={styles.inputContainer}>
              <Text>Contraseña actual:</Text>
              <TextInput
                style={[styles.input, styles.editableInput]}
                secureTextEntry={true}
                value={userData.contrasenaActual}
                onChangeText={(text) =>
                  setUserData({ ...userData, contrasenaActual: text })
                }
              />
            </View>
          </View>

          {/* Nueva Contraseña */}
          <View style={styles.inputRow}>
            <View style={styles.inputContainer}>
              <Text>Nueva contraseña:</Text>
              <TextInput
                style={[styles.input, styles.editableInput]}
                secureTextEntry={true}
                value={userData.nuevaContrasena}
                onChangeText={(text) =>
                  setUserData({ ...userData, nuevaContrasena: text })
                }
              />
            </View>
          </View>

          {/* Confirmar Contraseña */}
          <View style={styles.inputRow}>
            <View style={styles.inputContainer}>
              <Text>Confirmar Contraseña*</Text>
              <TextInput
                style={[styles.input, styles.editableInput]}
                secureTextEntry={true}
                value={userData.confirmarContrasena}
                onChangeText={(text) =>
                  setUserData({ ...userData, confirmarContrasena: text })
                }
              />
            </View>
          </View>

          {/* Botón Guardar */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleSave}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Guardar</Text>
            )}
          </TouchableOpacity>

          {/* Botón Cerrar Sesión */}
          <TouchableOpacity style={styles.logoutButton} onPress={doLogout}>
            <Text style={styles.buttonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: AppColors.BACKGROUND },
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  inputContainer: { flex: 1, marginHorizontal: 5 },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 8,
    borderRadius: 5,
    backgroundColor: "#eee",
  },
  editableInput: { backgroundColor: "#fff" },
  button: {
    backgroundColor: "#002366",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  logoutButton: {
    backgroundColor: "#DA1E28",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
