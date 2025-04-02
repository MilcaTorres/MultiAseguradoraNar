import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  DatePickerIOS,
  DateTimePickerAndroid,
  ScrollView,
} from "react-native";
import AppColors from "../kernel/AppColors";
import CustomHeader from "../modules/CustomHeader";

export default function HolderDataScreen({ navigation, route }) {
  const { tipo } = route.params; // Recibe el tipo de seguro seleccionado
  const [isHolderInsured, setIsHolderInsured] = useState(true);
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const showDatePickerAndroid = () => {
    DateTimePickerAndroid.open({
      value: dateOfBirth,
      onChange: (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
          setDateOfBirth(selectedDate);
        }
      },
      mode: "date",
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <CustomHeader title="Cotizar" />
        <View style={styles.container}>
          <View style={styles.welcome}>
            <Text style={styles.text}>Datos Titular </Text>
          </View>

          {/* Campos del formulario */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nombre</Text>
            <TextInput placeholder="Nombre" style={styles.input} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Apellido paterno</Text>
            <TextInput placeholder="Apellido paterno" style={styles.input} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Apellido materno</Text>
            <TextInput placeholder="Apellido materno" style={styles.input} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Teléfono</Text>
            <TextInput placeholder="Teléfono" style={styles.input} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Correo electrónico</Text>
            <TextInput placeholder="Correo electrónico" style={styles.input} />
          </View>

          {/* Pregunta sobre el asegurado */}
          <View style={styles.radioContainer}>
            <Text style={styles.label}>¿El titular también será el asegurado?</Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity onPress={() => setIsHolderInsured(true)} style={styles.radioButton}>
                <View style={[styles.outerCircle, isHolderInsured && styles.outerCircleSelected]}>
                  {isHolderInsured && <View style={styles.innerCircle} />}
                </View>
                <Text style={styles.radioText}>Sí</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsHolderInsured(false)} style={styles.radioButton}>
                <View style={[styles.outerCircle, !isHolderInsured && styles.outerCircleSelected]}>
                  {!isHolderInsured && <View style={styles.innerCircle} />}
                </View>
                <Text style={styles.radioText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Formulario del asegurado (si es diferente del titular) */}
          {!isHolderInsured && (
            <View style={styles.extraFormContainer}>
              <View style={styles.welcome}>
                <Text style={styles.text}>Datos Asegurado</Text>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Nombre</Text>
                <TextInput placeholder="Nombre" style={styles.input} />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Apellido paterno</Text>
                <TextInput placeholder="Apellido paterno" style={styles.input} />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Apellido materno</Text>
                <TextInput placeholder="Apellido materno" style={styles.input} />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Teléfono</Text>
                <TextInput placeholder="Teléfono" style={styles.input} />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Correo electrónico</Text>
                <TextInput placeholder="Correo electrónico" style={styles.input} />
              </View>
            </View>
          )}

          {/* Botón Cotizar */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Seguros", { tipo })} // Pasa el tipo de seguro
          >
            <Text style={styles.buttonText}>Cotizar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: AppColors.BACKGROUND },
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: AppColors.MAIN_COLOR,
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    alignItems: "center",
  },
  buttonText: {
    color: AppColors.TEXT_WHITE,
    fontSize: 18,
    fontFamily: "InriaSerif_Bold",
  },
  welcome: {
    backgroundColor: AppColors.MAIN_COLOR,
    width: "96%",
    padding: 14,
    borderRadius: 3,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  text: {
    color: AppColors.TEXT_WHITE,
    fontSize: 20,
    fontFamily: "InriaSerif_Bold",
  },
  radioContainer: { marginTop: 20 },
  label: { fontSize: 16, marginBottom: 10 },
  radioGroup: { flexDirection: "row", justifyContent: "space-around", alignItems: "center" },
  radioButton: { flexDirection: "row", alignItems: "center", gap: 8 },
  outerCircle: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: "#ccc", justifyContent: "center", alignItems: "center" },
  outerCircleSelected: { borderColor: AppColors.MAIN_COLOR },
  innerCircle: { width: 12, height: 12, borderRadius: 6, backgroundColor: AppColors.MAIN_COLOR },
  extraFormContainer: { marginTop: 30, paddingTop: 20, borderTopWidth: 1, borderTopColor: "#ccc" },
});
