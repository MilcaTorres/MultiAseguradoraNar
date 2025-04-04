import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Alert } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import AppColors from "../kernel/AppColors";
import CustomHeader from "../modules/CustomHeader";

export default function HolderDataScreen({ navigation, route }) {
  const { tipo, userId } = route.params || {};

  useEffect(() => {
    console.log("Params en HolderDataScreen:", route.params);
    console.log("Tipo recibido:", tipo);
    console.log("UserId recibido:", userId);
  }, [route.params]);

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

  const handleHolderInsuredChange = (value) => {
    setIsHolderInsured(value);
    if (value) {
      setInsuredData(holderData);
    } else {
      setInsuredData({
        nombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        rfc: "",
        telefono: "",
        correo: "",
        fechaNacimiento: new Date(),
      });
    }
  };

  const calculateAge = (birthdate) => {
    const diff = Date.now() - new Date(birthdate).getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const validateData = (data) => {
    const { nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento, correo, rfc, telefono } = data;
    if (!nombre || !apellidoPaterno || !apellidoMaterno || !fechaNacimiento || !correo || !rfc || !telefono) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return false;
    }
    return true;
  };

  const submitData = async () => {
    if (!validateData(holderData)) return;

    try {
      const holderDataWithUserId = {
        ...holderData,
        userId,
        edad: calculateAge(holderData.fechaNacimiento),
      };

      const responseHolder = await fetch("http://192.168.1.73:3000/nar/clientes/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(holderDataWithUserId),
      });

      const resultHolder = await responseHolder.json();
      console.log("Titular registrado:", resultHolder);

      if (!resultHolder || !resultHolder._id) {
        throw new Error("No se obtuvo el id del titular al registrar.");
      }

      const idCliente = resultHolder._id;
      let idAsegurado;

      if (!isHolderInsured) {
        if (!validateData(insuredData)) return;

        const insuredDataWithHolderId = {
          ...insuredData,
          userId: resultHolder._id,
          edad: calculateAge(insuredData.fechaNacimiento),
          idCliente: idCliente,
        };

        const responseInsured = await fetch("http://192.168.1.73:3000/nar/asegurados/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(insuredDataWithHolderId),
        });

        const resultInsured = await responseInsured.json();
        console.log("Asegurado registrado:", resultInsured);

        idAsegurado = resultInsured._id;
      } else {
        const insuredDataWithHolderId = {
          ...holderData,
          userId: resultHolder._id,
          edad: calculateAge(holderData.fechaNacimiento),
          idCliente: idCliente,
        };

        const responseInsured = await fetch("http://192.168.1.73:3000/nar/asegurados/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(insuredDataWithHolderId),
        });

        const resultInsured = await responseInsured.json();
        console.log("Asegurado registrado:", resultInsured);

        idAsegurado = resultInsured._id;
      }

      const responseSeguros = await fetch(`http://192.168.1.73:3000/nar/seguros/tipo/${tipo}`);
      const segurosResponse = await responseSeguros.json();
      console.log("Seguro encontrado:", JSON.stringify(segurosResponse.data, null, 2));


      if (!segurosResponse.success || !segurosResponse.data || segurosResponse.data.length === 0) {
        Alert.alert("Error", "No se encontraron seguros para el tipo seleccionado.");
        return;
      }

      console.log("Seguros disponibles:", segurosResponse.data);

      const cotizaciones = segurosResponse.data.map(async (seguro) => {
        const cotizacionData = {
          idUsuario: userId,
          idCliente: idCliente,
          idAsegurado: idAsegurado,
          idSeguro: seguro._id,
        };

        try {
          const responseCotizacion = await fetch("http://192.168.1.73:3000/nar/cotizaciones/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cotizacionData),
          });

          if (!responseCotizacion.ok) {
            throw new Error(`Error al crear cotización: ${responseCotizacion.statusText}`);
          }

          const resultCotizacion = await responseCotizacion.json();
          console.log("Cotización generada:", resultCotizacion);
        } catch (error) {
          console.error("Error al generar la cotización:", error);
          Alert.alert("Error", "Hubo un problema al generar la cotización.");
        }
      });

      await Promise.all(cotizaciones);

      navigation.navigate("Seguros", { tipo, userId });

    } catch (error) {
      console.error("Error al enviar los datos:", error);
      Alert.alert("Error", "Hubo un problema al registrar los datos. Intenta nuevamente.");
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
          <TextInput placeholder="Nombre" style={styles.input} onChangeText={(text) => handleInputChange(setHolderData, "nombre", text)} />
          <TextInput placeholder="Apellido paterno" style={styles.input} onChangeText={(text) => handleInputChange(setHolderData, "apellidoPaterno", text)} />
          <TextInput placeholder="Apellido materno" style={styles.input} onChangeText={(text) => handleInputChange(setHolderData, "apellidoMaterno", text)} />
          <TextInput placeholder="RFC" style={styles.input} onChangeText={(text) => handleInputChange(setHolderData, "rfc", text)} />
          <TextInput placeholder="Teléfono" style={styles.input} onChangeText={(text) => handleInputChange(setHolderData, "telefono", text)} />
          <TextInput placeholder="Correo electrónico" style={styles.input} onChangeText={(text) => handleInputChange(setHolderData, "correo", text)} />

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

          <View style={styles.radioContainer}>
            <Text style={styles.label}>¿El titular también será el asegurado?</Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity onPress={() => handleHolderInsuredChange(true)} style={styles.radioButton}>
                <View style={[styles.outerCircle, isHolderInsured && styles.outerCircleSelected]}>
                  {isHolderInsured && <View style={styles.innerCircle} />}
                </View>
                <Text style={styles.radioText}>Sí</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleHolderInsuredChange(false)} style={styles.radioButton}>
                <View style={[styles.outerCircle, !isHolderInsured && styles.outerCircleSelected]}>
                  {!isHolderInsured && <View style={styles.innerCircle} />}
                </View>
                <Text style={styles.radioText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>

          {!isHolderInsured && (
            <View style={styles.extraFormContainer}>
              <View style={styles.welcome}>
                <Text style={styles.text}>Datos Titular </Text>
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
