import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Alert } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import AppColors from "../kernel/AppColors";
import CustomHeader from "../modules/CustomHeader";

const getDateWithCero = (day) => (day < 10 ? `0${day}` : day);
const getMonthAsText = (month) => ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"][month];

export default function HolderDataScreen({ navigation, route }) {

  const { tipo, userId } = route.params || {};

  useEffect(() => {
    //console.log("Params en HolderDataScreen:", route.params);
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

      // Registrar al titular como cliente
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

      if (isHolderInsured) {
        // ✅ Registrar explícitamente al titular también como asegurado
        const insuredHolderData = {
          ...holderDataWithUserId,
          idCliente, // Relacionado con el mismo cliente
        };

        const responseInsuredHolder = await fetch("http://192.168.1.73:3000/nar/asegurados/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(insuredHolderData),
        });

        const resultInsuredHolder = await responseInsuredHolder.json();
        console.log("Titular registrado también como asegurado:", resultInsuredHolder);

        if (!resultInsuredHolder || !resultInsuredHolder._id) {
          throw new Error("No se obtuvo el id del asegurado al registrar.");
        }

        idAsegurado = resultInsuredHolder._id;
      } else {
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

        if (!resultInsured || !resultInsured._id) {
          throw new Error("No se obtuvo el id del asegurado al registrar.");
        }

        idAsegurado = resultInsured._id;
      }

      // Consultar seguros disponibles
      const responseSeguros = await fetch(`http://192.168.1.73:3000/nar/seguros/tipo/${tipo}`);
      const segurosResponse = await responseSeguros.json();

      if (!segurosResponse.success || !segurosResponse.data || segurosResponse.data.length === 0) {
        Alert.alert("Error", "No se encontraron seguros para el tipo seleccionado.");
        return;
      }

      console.log("Seguros disponibles:", segurosResponse.data);

      // Crear cotizaciones
      const cotizaciones = segurosResponse.data.map(async (seguro) => {
        const cotizacionData = {
          idUsuario: userId,
          idCliente,
          idAsegurado, // ✅ Ahora el ID está garantizado
          idSeguro: seguro.idSeguro,
        };

        try {
          const responseCotizacion = await fetch("http://192.168.1.73:3000/nar/cotizaciones/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cotizacionData),
          });

          const responseText = await responseCotizacion.text();

          if (!responseCotizacion.ok) {
            throw new Error(`Error ${responseCotizacion.status}: ${responseText}`);
          }

          const resultCotizacion = JSON.parse(responseText);
          console.log("Cotización generada:", resultCotizacion);
        } catch (error) {
          console.error("Error al generar la cotización:", error);
          Alert.alert("Error", `Hubo un problema al generar la cotización: ${error.message}`);
        }
      });

      await Promise.all(cotizaciones);

      navigation.navigate("Seguros", { tipo, userId, idAsegurado });
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      Alert.alert("Error", "Hubo un problema al registrar los datos. Intenta nuevamente.");
    }
  };
  /*
  const formatDate = (date) => {
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };
*/


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

          {/* Fecha de nacimiento Titular */}
          <TouchableOpacity onPress={() => setShowDatePickerHolder(true)}>
            <TextInput
              style={styles.input}
              value={`${getDateWithCero(holderData.fechaNacimiento.getDate())}/${getMonthAsText(holderData.fechaNacimiento.getMonth())}/${holderData.fechaNacimiento.getFullYear()}`}
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

              {/* Fecha de nacimiento Asegurado */}
              <TouchableOpacity onPress={() => setShowDatePickerInsured(true)}>
                <TextInput
                  style={styles.input}
                  value={`${getDateWithCero(insuredData.fechaNacimiento.getDate())}/${getMonthAsText(insuredData.fechaNacimiento.getMonth())}/${insuredData.fechaNacimiento.getFullYear()}`}
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
