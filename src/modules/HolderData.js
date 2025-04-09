import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Alert, Platform } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import AppColors from "../kernel/AppColors";
import CustomHeader from "../modules/CustomHeader";
import { getDateWithCero, getMonthAsText } from "./DateFormatter";

export default function HolderDataScreen({ navigation, route }) {
  const { tipo, userId } = route.params || {};

  const [showDatePickerHolder, setShowDatePickerHolder] = useState(false);
  const [showDatePickerInsured, setShowDatePickerInsured] = useState(false);
  const [isExistingHolder, setIsExistingHolder] = useState(false);
  const [existingHolderRFC, setExistingHolderRFC] = useState("");
  const [existingHolderData, setExistingHolderData] = useState(null);

  useEffect(() => {
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

  const [errors, setErrors] = useState({
    holder: {
      nombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      fechaNacimiento: "",
      telefono: "",
      correo: "",
      rfc: "",
    },
    insured: {
      nombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      fechaNacimiento: "",
      telefono: "",
      correo: "",
      rfc: "",
    },
    existingHolderRFC: "",
  });

  const validateInput = (name, value, isHolder = true) => {
    let error = "";

    // Validación de longitud máxima para campos específicos
    if (["nombre", "apellidoPaterno", "apellidoMaterno"].includes(name)) {
      if (value.length > 20) {
        error = "No debe exceder 20 caracteres";
      }
    }

    // Validación máxima de campos en teléfono
    if (["telefono"].includes(name)) {
      if (value.length > 10) {
        error = "No debe exceder 10 caracteres";
      }
    }

    // Validación para campos que no deben contener números
    if (["nombre", "apellidoPaterno", "apellidoMaterno"].includes(name)) {
      if (/\d/.test(value)) {
        error = "No se permiten números en este campo";
      }
    }

    // Validación específica para teléfono
    if (name === "telefono") {
      if (!/^\d{0,10}$/.test(value)) {
        error = "Solo se permiten números y máximo 10 dígitos";
      }
    }

    // Validación de correo electrónico
    if (name === "correo" && value) {
      if (value.length > 35) {
        error = "No debe exceder 35 caracteres";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        error = "Formato de correo electrónico inválido";
      }
    }

    // Validación de RFC
    if (name === "rfc" && value) {
      if (value.length !== 13) {
        error = "El RFC debe tener exactamente 13 caracteres";
      }
    }

    return error;
  };

  const handleInputChange = (setState, field, value) => {
    const error = validateInput(field, value, setState === setHolderData);
    setErrors((prev) => ({
      ...prev,
      [setState === setHolderData ? "holder" : "insured"]: {
        ...prev[setState === setHolderData ? "holder" : "insured"],
        [field]: error,
      },
    }));
    setState((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleDateChange = (setState, field, date) => {
    setState((prevState) => ({ ...prevState, [field]: date }));
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

  const searchExistingHolder = async () => {
    if (!existingHolderRFC) {
      setErrors((prev) => ({
        ...prev,
        existingHolderRFC: "El RFC es obligatorio",
      }));
      return;
    }

    const error = validateInput("rfc", existingHolderRFC);
    if (error) {
      setErrors((prev) => ({
        ...prev,
        existingHolderRFC: error,
      }));
      return;
    }

    try {
      const response = await fetch(`http://192.168.1.73:3001/nar/clientes/rfc/${existingHolderRFC}`);
      const result = await response.json();

      if (result) {
        setExistingHolderData(result);
        setHolderData(result);
        setIsExistingHolder(true);
        Alert.alert("Titular encontrado", "Se encontró el titular con el RFC proporcionado");
      } else {
        setExistingHolderData(null);
        setIsExistingHolder(false);
        Alert.alert("Titular no encontrado", "No se encontró ningún titular con el RFC proporcionado");
      }
    } catch (error) {
      console.error("Error al buscar titular:", error);
      Alert.alert("Error", "Ocurrió un error al buscar el titular");
    }
  };

  const submitData = async () => {
    if (isExistingHolder && !existingHolderData) {
      Alert.alert("Error", "Debe buscar un titular existente antes de continuar");
      return;
    }
  
    if (!isExistingHolder && !validateData(holderData)) return;
  
    try {
      const holderDataWithUserId = {
        ...holderData,
        userId,
        edad: calculateAge(holderData.fechaNacimiento),
      };
  
      let idCliente;
  
      if (isExistingHolder) {
        idCliente = existingHolderData._id;
      } else {
        // Registrar al titular como cliente
        const responseHolder = await fetch("http://192.168.1.73:3001/nar/clientes/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(holderDataWithUserId),
        });
  
        if (!responseHolder.ok) {
          throw new Error(`Error al registrar el titular: ${responseHolder.statusText}`);
        }
  
        const resultHolder = await responseHolder.json();
        console.log("Titular registrado:", resultHolder);
  
        if (!resultHolder || !resultHolder._id) {
          throw new Error("No se obtuvo el id del titular al registrar.");
        }
  
        idCliente = resultHolder._id;
      }
  
      let idAsegurado;
  
      if (isHolderInsured) {
        const insuredHolderData = {
          ...holderDataWithUserId,
          idCliente,
        };
  
        const responseInsuredHolder = await fetch("http://192.168.1.73:3001/nar/asegurados/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(insuredHolderData),
        });
  
        if (!responseInsuredHolder.ok) {
          throw new Error(`Error al registrar el asegurado: ${responseInsuredHolder.statusText}`);
        }
  
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
          userId,
          edad: calculateAge(insuredData.fechaNacimiento),
          idCliente,
        };
  
        const responseInsured = await fetch("http://192.168.1.73:3001/nar/asegurados/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(insuredDataWithHolderId),
        });
  
        if (!responseInsured.ok) {
          throw new Error(`Error al registrar el asegurado: ${responseInsured.statusText}`);
        }
  
        const resultInsured = await responseInsured.json();
        console.log("Asegurado registrado:", resultInsured);
  
        if (!resultInsured || !resultInsured._id) {
          throw new Error("No se obtuvo el id del asegurado al registrar.");
        }
  
        idAsegurado = resultInsured._id;
      }
  
      // Consultar seguros disponibles
      const responseSeguros = await fetch(`http://192.168.1.73:3001/nar/seguros/tipo/${tipo}`);
      const segurosResponse = await responseSeguros.json();
  
      if (!segurosResponse.success || !segurosResponse.data || segurosResponse.data.length === 0) {
        Alert.alert("Error", "No se encontraron seguros para el tipo seleccionado.");
        return;
      }
  
      console.log("Seguros disponibles:", segurosResponse.data);
  
      // Registrar cotizaciones para cada seguro disponible
      const cotizaciones = segurosResponse.data.map(async (seguro) => {
        const cotizacionData = {
          idUsuario: userId,
          idCliente,
          idAsegurado,
          idSeguro: seguro.idSeguro,
        };
  
        try {
          const responseCotizacion = await fetch("http://192.168.1.73:3001/nar/cotizaciones/", {
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
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <CustomHeader title="Cotizar" />
        <View style={styles.container}>
          <View style={styles.welcome}>
            <Text style={styles.text}>Datos Titular </Text>
          </View>

          <View style={styles.radioContainer}>
            <Text style={styles.label}>¿Ya ha sido titular antes?</Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity onPress={() => setIsExistingHolder(true)} style={styles.radioButton}>
                <View style={[styles.outerCircle, isExistingHolder && styles.outerCircleSelected]}>
                  {isExistingHolder && <View style={styles.innerCircle} />}
                </View>
                <Text style={styles.radioText}>Sí</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsExistingHolder(false)} style={styles.radioButton}>
                <View style={[styles.outerCircle, !isExistingHolder && styles.outerCircleSelected]}>
                  {!isExistingHolder && <View style={styles.innerCircle} />}
                </View>
                <Text style={styles.radioText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>

          {isExistingHolder && (
            <View>
              <TextInput
                placeholder="Ingrese el RFC del titular existente"
                value={existingHolderRFC}
                onChangeText={(text) => {
                  setExistingHolderRFC(text);
                  setErrors((prev) => ({
                    ...prev,
                    existingHolderRFC: validateInput("rfc", text),
                  }));
                }}
                style={styles.input}
              />
              {errors.existingHolderRFC && <Text style={styles.errorText}>{errors.existingHolderRFC}</Text>}
              <TouchableOpacity style={styles.button} onPress={searchExistingHolder}>
                <Text style={styles.buttonText}>Buscar</Text>
              </TouchableOpacity>
            </View>
          )}

          {!isExistingHolder && (
            <>
              <TextInput placeholder="Nombre" style={styles.input} onChangeText={(text) => handleInputChange(setHolderData, "nombre", text)} />
              {errors.holder.nombre && <Text style={styles.errorText}>{errors.holder.nombre}</Text>}
              <TextInput placeholder="Apellido Paterno" style={styles.input} onChangeText={(text) => handleInputChange(setHolderData, "apellidoPaterno", text)} />
              {errors.holder.apellidoPaterno && <Text style={styles.errorText}>{errors.holder.apellidoPaterno}</Text>}
              <TextInput placeholder="Apellido Materno" style={styles.input} onChangeText={(text) => handleInputChange(setHolderData, "apellidoMaterno", text)} />
              {errors.holder.apellidoMaterno && <Text style={styles.errorText}>{errors.holder.apellidoMaterno}</Text>}
              <TextInput placeholder="RFC" style={styles.input} onChangeText={(text) => handleInputChange(setHolderData, "rfc", text)} />
              {errors.holder.rfc && <Text style={styles.errorText}>{errors.holder.rfc}</Text>}
              <TextInput placeholder="Teléfono" style={styles.input} onChangeText={(text) => handleInputChange(setHolderData, "telefono", text)} />
              {errors.holder.telefono && <Text style={styles.errorText}>{errors.holder.telefono}</Text>}
              <TextInput placeholder="Correo Electrónico" style={styles.input} onChangeText={(text) => handleInputChange(setHolderData, "correo", text)} />
              {errors.holder.correo && <Text style={styles.errorText}>{errors.holder.correo}</Text>}

              {/* Fecha de Nacimiento Titular */}
              <TouchableOpacity onPress={() => setShowDatePickerHolder(true)}>
                <TextInput
                  style={styles.input}
                  value={`${getDateWithCero(holderData.fechaNacimiento.getDate())}/${getMonthAsText(holderData.fechaNacimiento.getMonth())}/${holderData.fechaNacimiento.getFullYear()}`}
                  editable={false}
                  placeholder="Selecciona una fecha"
                />
              </TouchableOpacity>
              {errors.holder.fechaNacimiento && <Text style={styles.errorText}>{errors.holder.fechaNacimiento}</Text>}

              <DateTimePicker
                mode="date"
                locale="es-MX"
                date={holderData.fechaNacimiento}
                isVisible={showDatePickerHolder}
                onConfirm={(date) => {
                  handleDateChange(setHolderData, "fechaNacimiento", date);
                  setShowDatePickerHolder(false);
                }}
                onCancel={() => setShowDatePickerHolder(false)}
                confirmTextIOS="Listo"
                cancelTextIOS="Cancelar"
              />
            </>
          )}

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
                <Text style={styles.text}>Datos Asegurado </Text>
              </View>
              <TextInput placeholder="Nombre" style={styles.input} onChangeText={(text) => handleInputChange(setInsuredData, "nombre", text)} />
              {errors.insured.nombre && <Text style={styles.errorText}>{errors.insured.nombre}</Text>}
              <TextInput placeholder="Apellido Paterno" style={styles.input} onChangeText={(text) => handleInputChange(setInsuredData, "apellidoPaterno", text)} />
              {errors.insured.apellidoPaterno && <Text style={styles.errorText}>{errors.insured.apellidoPaterno}</Text>}
              <TextInput placeholder="Apellido Materno" style={styles.input} onChangeText={(text) => handleInputChange(setInsuredData, "apellidoMaterno", text)} />
              {errors.insured.apellidoMaterno && <Text style={styles.errorText}>{errors.insured.apellidoMaterno}</Text>}
              <TextInput placeholder="RFC" style={styles.input} onChangeText={(text) => handleInputChange(setInsuredData, "rfc", text)} />
              {errors.insured.rfc && <Text style={styles.errorText}>{errors.insured.rfc}</Text>}
              <TextInput placeholder="Teléfono" style={styles.input} onChangeText={(text) => handleInputChange(setInsuredData, "telefono", text)} />
              {errors.insured.telefono && <Text style={styles.errorText}>{errors.insured.telefono}</Text>}
              <TextInput placeholder="Correo Electrónico" style={styles.input} onChangeText={(text) => handleInputChange(setInsuredData, "correo", text)} />
              {errors.insured.correo && <Text style={styles.errorText}>{errors.insured.correo}</Text>}

              {/* Fecha de Nacimiento Asegurado */}
              <TouchableOpacity onPress={() => setShowDatePickerInsured(true)}>
                <TextInput
                  style={styles.input}
                  value={`${getDateWithCero(insuredData.fechaNacimiento.getDate())}/${getMonthAsText(insuredData.fechaNacimiento.getMonth())}/${insuredData.fechaNacimiento.getFullYear()}`}
                  editable={false}
                  placeholder="Selecciona una fecha"
                />
              </TouchableOpacity>
              {errors.insured.fechaNacimiento && <Text style={styles.errorText}>{errors.insured.fechaNacimiento}</Text>}

              <DateTimePicker
                mode="date"
                locale="es-MX"
                date={insuredData.fechaNacimiento}
                isVisible={showDatePickerInsured}
                onConfirm={(date) => {
                  handleDateChange(setInsuredData, "fechaNacimiento", date);
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
  errorText: { color: "red", marginBottom: 5 },
});
