import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import AppColors from "../kernel/AppColors";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BlockedHome({ navigation }) {
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [reactivacionSolicitada, setReactivacionSolicitada] = useState(false);

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const usuarioJSON = await AsyncStorage.getItem("usuario");
        if (usuarioJSON) {
          const usuario = JSON.parse(usuarioJSON);
          const usuarioData = usuario.data?._doc;

          if (usuarioData) {
            setNombre(usuarioData.nombre);
            setApellidoPaterno(usuarioData.apellidoPaterno);
            //console.log("Nombre del usuario obtenido:", usuarioData);
            setReactivacionSolicitada(
              usuarioData.reactivacionSolicitada === "activa"
            );
          } else {
            console.log("Error: Estructura de datos inesperada", usuario);
          }
        }
      } catch (error) {
        console.log("Error al obtener datos del usuario: ", error);
      }
    };
    obtenerUsuario();
  }, []);

  const solicitarReactivacion = async () => {
    try {
      const usuarioJSON = await AsyncStorage.getItem("usuario");
      const usuario = JSON.parse(usuarioJSON);
      const id = usuario?.data?._doc?._id;

      if (!id) {
        console.log("ID de usuario no encontrado.");
        return;
      }

      const response = await fetch(
        `http://192.168.100.15:3000/nar/usuarios/reactivacionesActive/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("Reactivación solicitada: ", data);
        alert("Solicitud de reactivación enviada con éxito");
        setReactivacionSolicitada(true);
      } else {
        console.error("Error en la solicitud: ", data.message);
        alert("No se pudo solicitar la reactivación");
      }
    } catch (error) {
      console.error("Error al solicitar reactivación: ", error);
      alert("Hubo un error al enviar la solicitud");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.welcome}>
          <Text style={styles.text}>
            Bienvenid@ {nombre} {apellidoPaterno}
          </Text>
        </View>
        <View>
          <Image
            source={require("../../assets/img/seguros-bloqueado.jpg")}
            style={styles.img}
          />
        </View>
        <View style={styles.welcome}>
          <Text style={styles.text}>
            Acciones bloqueadas debido al incumplimiento de la cuota
          </Text>
        </View>

        {/* Contenedor de botones en filas */}
        <View style={styles.buttonsContainer}>
          {/* Primera fila */}
          <View style={styles.row}>
            <TouchableOpacity style={styles.button}>
              <Image
                source={require("../../assets/img/customers-blocked.png")}
                style={styles.imgButton}
              />
              <Text style={styles.buttonText}>Clientes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
              <Image
                source={require("../../assets/img/quote-blocked.png")}
                style={styles.imgButton}
              />
              <Text style={styles.buttonText}>Cotizar</Text>
            </TouchableOpacity>
          </View>

          {/* Segunda fila */}
          <View style={styles.row}>
            <TouchableOpacity style={styles.button}>
              <Image
                source={require("../../assets/img/statistics-blocked.png")}
                style={styles.imgButton}
              />
              <Text style={styles.buttonText}>Estadísticas</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.Profilebutton}
              onPress={() => navigation.navigate("PerfilInactivo")}
            >
              <Image
                source={require("../../assets/img/profile.png")}
                style={styles.imgButton}
              />
              <Text style={styles.buttonText}>Perfil</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={[
            styles.Reactivatingbutton,
            reactivacionSolicitada && {
              backgroundColor: AppColors.BUTTON_GRAY,
            },
          ]}
          onPress={solicitarReactivacion}
          disabled={reactivacionSolicitada}
        >
          <Text style={styles.buttonText}>
            {reactivacionSolicitada
              ? "Solicitud enviada"
              : "Solicitar reactivación"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.BACKGROUND,
  },
  container: {
    flex: 1,
    backgroundColor: AppColors.BACKGROUND,
    paddingHorizontal: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  welcome: {
    backgroundColor: AppColors.LABEL_GRAY,
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
    //fontFamily: "InriaSerif_Bold",
    fontWeight: "bold",
    textAlign: "center",
  },
  img: {
    width: 340,
    height: 180,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 20,
  },
  buttonsContainer: {
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  button: {
    backgroundColor: AppColors.BORDER_GRAY,
    width: 160,
    height: 140,
    padding: 14,
    borderRadius: 20,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  Profilebutton: {
    backgroundColor: AppColors.MAIN_COLOR,
    width: 160,
    height: 140,
    padding: 14,
    borderRadius: 20,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  Reactivatingbutton: {
    padding: 10,
    backgroundColor: AppColors.MAIN_COLOR,
    width: "60%",
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: AppColors.TEXT_WHITE,
    fontSize: 16,
    //fontFamily: "InriaSerif_Bold",
    textAlign: "center",
    fontWeight: "bold",
  },
  imgButton: {
    width: 62,
    height: 62,
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 20,
  },
});
