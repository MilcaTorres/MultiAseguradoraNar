import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import AppColors from "../kernel/AppColors";
import CustomHeader from "../modules/CustomHeader";

export default function HolderDataScreen({ navigation, route }) {
  const { tipo, userId } = route.params;  // Obtener userId

  const [isHolderInsured, setIsHolderInsured] = useState(true);

  const [holderData, setHolderData] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    rfc: "",
    telefono: "",
    correo: "",
    fechaNacimiento: new Date(),
  });

  const [insuredData, setInsuredData] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    rfc: "",
    telefono: "",
    correo: "",
    fechaNacimiento: new Date(),
  });

  const [showDatePickerHolder, setShowDatePickerHolder] = useState(false);
  const [showDatePickerInsured, setShowDatePickerInsured] = useState(false);

  const handleInputChange = (setState, field, value) => {
    setState(prevState => ({ ...prevState, [field]: value }));
  };

  const submitData = async () => {
    try {
      const holderDataWithUserId = { ...holderData, userId };  // Incluir userId
  
      const responseHolder = await fetch("http://192.168.1.73:3000/nar/clientes/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(holderDataWithUserId),
      });
  
      const resultHolder = await responseHolder.json();
      console.log("Titular registrado:", resultHolder);
  
      if (!isHolderInsured) {
        const insuredDataWithUserId = { ...insuredData, userId };  // Incluir userId en asegurado
  
        const responseInsured = await fetch("http://192.168.1.73:3000/nar/asegurados/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(insuredDataWithUserId),
        });
  
        const resultInsured = await responseInsured.json();
        console.log("Asegurado registrado:", resultInsured);
      }
  
      navigation.navigate("Seguros", { tipo });
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
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
          <TextInput placeholder="Nombre" style={styles.input} onChangeText={(text) => handleInputChange(setHolderData, "nombre", text)} />
          <TextInput placeholder="Apellido paterno" style={styles.input} onChangeText={(text) => handleInputChange(setHolderData, "apellidoPaterno", text)} />
          <TextInput placeholder="Apellido materno" style={styles.input} onChangeText={(text) => handleInputChange(setHolderData, "apellidoMaterno", text)} />
          <TextInput placeholder="RFC" style={styles.input} onChangeText={(text) => handleInputChange(setHolderData, "rfc", text)} />
          <TextInput placeholder="Teléfono" style={styles.input} onChangeText={(text) => handleInputChange(setHolderData, "telefono", text)} />
          <TextInput placeholder="Correo electrónico" style={styles.input} onChangeText={(text) => handleInputChange(setHolderData, "correo", text)} />
          {/* Campo de fecha de nacimiento */}
          <TouchableOpacity onPress={() => setShowDatePickerHolder(true)}>
            <TextInput
              style={styles.input}
              value={holderData.fechaNacimiento.toLocaleDateString("es-MX")}
              editable={false}
              placeholder="Selecciona una fecha"
            />
          </TouchableOpacity>
          <DateTimePicker
            isVisible={showDatePickerHolder}
            mode="date"
            locale="es-MX"
            date={holderData.fechaNacimiento}
            onConfirm={(date) => {
              handleInputChange(setHolderData, "fechaNacimiento", date);
              setShowDatePickerHolder(false);
            }}
            onCancel={() => setShowDatePickerHolder(false)}
            confirmTextIOS="Listo"
            cancelTextIOS="Cancelar"
          />
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
              <TextInput placeholder="Nombre" style={styles.input} onChangeText={(text) => handleInputChange(setInsuredData, "nombre", text)} />
              <TextInput placeholder="Apellido paterno" style={styles.input} onChangeText={(text) => handleInputChange(setInsuredData, "apellidoPaterno", text)} />
              <TextInput placeholder="Apellido materno" style={styles.input} onChangeText={(text) => handleInputChange(setInsuredData, "apellidoMaterno", text)} />
              <TextInput placeholder="RFC" style={styles.input} onChangeText={(text) => handleInputChange(setInsuredData, "rfc", text)} />
              <TextInput placeholder="Teléfono" style={styles.input} onChangeText={(text) => handleInputChange(setInsuredData, "telefono", text)} />
              <TextInput placeholder="Correo electrónico" style={styles.input} onChangeText={(text) => handleInputChange(setInsuredData, "correo", text)} />
              <TouchableOpacity onPress={() => setShowDatePickerInsured(true)}>
                <TextInput
                  style={styles.input}
                  value={insuredData.fechaNacimiento.toLocaleDateString("es-MX")}
                  editable={false}
                  placeholder="Selecciona una fecha"
                />
              </TouchableOpacity>
              <DateTimePicker
                isVisible={showDatePickerInsured}
                mode="date"
                locale="es-MX"
                date={insuredData.fechaNacimiento}
                onConfirm={(date) => {
                  handleInputChange(setInsuredData, "fechaNacimiento", date);
                  setShowDatePickerInsured(false);
                }}
                onCancel={() => setShowDatePickerInsured(false)}
                confirmTextIOS="Listo"
                cancelTextIOS="Cancelar"
              />
            </View>
          )}
          <TouchableOpacity style={styles.button} onPress={submitData}>
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
