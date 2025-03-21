import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

export default function Profile() {
  const [userData, setUserData] = useState({
    nombre: "Juan",
    apellidoPaterno: "Perez",
    apellidoMaterno: "Sosa",
    email: "juanperez@example.com",
    rfc: "YTJDPJJD940954",
    domicilio: "Calle lirios No.12 Temixco",
    telefono: "734 325 56 89",
    nuevaContrasena: "",
    confirmarContrasena: "",
  });

  const [passwordUpdated, setPasswordUpdated] = useState(false);

  const handleSave = () => {
    if (passwordUpdated) {
      Alert.alert("Aviso", "La contraseña ya fue actualizada.");
      return;
    }

    if (!userData.nuevaContrasena || !userData.confirmarContrasena) {
      Alert.alert("Error", "Los campos de contraseña no pueden estar vacíos.");
      return;
    }

    if (userData.nuevaContrasena !== userData.confirmarContrasena) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    // Simulación de petición al backend
    setTimeout(() => {
      Alert.alert("Éxito", "Contraseña actualizada correctamente.");
      setUserData({
        ...userData,
        nuevaContrasena: "",
        confirmarContrasena: "",
      });
      setPasswordUpdated(true);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>

      <View style={styles.inputRow}>
        <View style={styles.inputContainer}>
          <Text>Nombre*</Text>
          <TextInput style={styles.input} value={userData.nombre} editable={false} />
        </View>

        <View style={styles.inputContainer}>
          <Text>Apellido paterno*</Text>
          <TextInput style={styles.input} value={userData.apellidoPaterno} editable={false} />
        </View>
      </View>

      <View style={styles.inputRow}>
        <View style={styles.inputContainer}>
          <Text>Apellido materno*</Text>
          <TextInput style={styles.input} value={userData.apellidoMaterno} editable={false} />
        </View>

        <View style={styles.inputContainer}>
          <Text>Correo electrónico*</Text>
          <TextInput style={styles.input} value={userData.email} editable={false} />
        </View>
      </View>

      <View style={styles.inputRow}>
        <View style={styles.inputContainer}>
          <Text>RFC*</Text>
          <TextInput style={styles.input} value={userData.rfc} editable={false} />
        </View>

        <View style={styles.inputContainer}>
          <Text>Domicilio*</Text>
          <TextInput style={styles.input} value={userData.domicilio} editable={false} />
        </View>
      </View>

      <View style={styles.inputRow}>
        <View style={styles.inputContainer}>
          <Text>Teléfono*</Text>
          <TextInput style={styles.input} value={userData.telefono} editable={false} />
        </View>
      </View>

      <View style={styles.inputRow}>
        <View style={styles.inputContainer}>
          <Text>Nueva contraseña:</Text>
          <TextInput
            style={[styles.input, styles.editableInput]}
            secureTextEntry={true}
            value={userData.nuevaContrasena}
            onChangeText={(text) => setUserData({ ...userData, nuevaContrasena: text })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Confirmar Contraseña*</Text>
          <TextInput
            style={[styles.input, styles.editableInput]}
            secureTextEntry={true}
            value={userData.confirmarContrasena}
            onChangeText={(text) => setUserData({ ...userData, confirmarContrasena: text })}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 8,
    borderRadius: 5,
    backgroundColor: "#eee",
  },
  editableInput: {
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#002366",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
