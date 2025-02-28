import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import AppColors from '../kernel/AppColors';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
        <View style={styles.welcome}>
            <Text style={styles.text}>Bienvenido Juan Pérez</Text>
        </View>
        <View>
        <Image source={require("../../assets/img/seguros.jpg")} style={styles.img}/>
        </View>
        <View style={styles.welcome}>
            <Text style={styles.text}>¿Qué desea hacer?</Text>
        </View>
        <View>
            <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate('Clientes')}>
                <Image source={require("../../assets/img/customers.png")} style={styles.imgButton}/>
                <Text style={styles.buttonText}>Clientes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate('Cotizar')}>
                <Image source={require("../../assets/img/quote.png")} style={styles.imgButton}/>
                <Text style={styles.buttonText}>Cotizar</Text>
            </TouchableOpacity>
        </View>
            <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate('Estadísticas')}>
                <Image source={require("../../assets/img/statistics.png")} style={styles.imgButton}/>
                <Text style={styles.buttonText}>Estadísticas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate('Perfil')}>
                <Image source={require("../../assets/img/profile.png")} style={styles.imgButton}/>
                <Text style={styles.buttonText}>Perfil</Text>
            </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: AppColors.BACKGROUND,
        //alignItems: "center",
        paddingHorizontal: 20,
        width: '100%'
    },
    welcome: {
        backgroundColor: AppColors.MAIN_COLOR,
        width: '96%',
        padding: 14,
        borderRadius: 3,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    text: {
        color: AppColors.TEXT_WHITE,
        fontSize: 20,
        fontFamily: "InriaSerif_Bold"
    },
    img: {
        width: 340,
        height: 180,
        marginBottom: 20,
        marginTop: 20,
        borderRadius: 20
    },
    buttonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    button: {
        backgroundColor: AppColors.MAIN_COLOR,
        width: 160,
        height: 140,
        padding: 14,
        borderRadius: 20,
        marginBottom: 10,
        alignItems: 'center'
    },
    buttonText: {
        color: AppColors.TEXT_WHITE,
        fontSize: 16,
        fontFamily: "InriaSerif_Bold"
    },
    imgButton: {
        width: 62,
        height: 62,
        marginBottom: 20,
        marginTop: 20,
        borderRadius: 20
    },
});