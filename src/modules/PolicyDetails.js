import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AppColors from '../kernel/AppColors';
import { Ionicons } from '@expo/vector-icons';


export default function PolicyDetails({navigation}) {

  const policies = [
    {poliza: "Póliza No°1", excylimi: ["Enfermedades preexistentes no cubiertas", " Deportes extremos o actividades de alto riesgo (si no están contratadas)"," Pérdidas por actos de guerra o terrorismo", " Incumplimiento de normas del seguro"], vigencia: "20/02/2025", mensualidad: 200},
  ];

  return (
    <ScrollView>
      <View style={styles.container}>
        {policies.map((policy, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.textContainer}>
              <Text style={styles.label}>Exclusiones y limitaciones</Text>
                <Text style={styles.text}>{policy.excylimi}</Text>
                <Text style={styles.text}><Text style={styles.label}>Vigencia: </Text>{policy.vigencia}</Text>
                <Text style={styles.text}><Text style={styles.label}>Mensualidad: </Text>${policy.mensualidad}</Text>
              </View>
            </View>
          </View>
        ))}
         <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('PolizasClientes')}
              >
                <Text style={styles.textButton}>Regresar</Text>
              </TouchableOpacity>
      </View>
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.BACKGROUND
  },
  card: {
    width: '90%',
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 20,
    borderColor: AppColors.MAIN_COLOR,
    backgroundColor: AppColors.TEXT_WHITE,
    // Sombra en Android
    elevation: 8,
    // Sombra en iOS
    shadowColor: AppColors.SHADOW,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1
  },
  label: {
      fontWeight: 'bold',
      fontSize: 20
  },
  text: {
    fontSize: 18
},
  button: {
    padding: 10,
    backgroundColor: AppColors.MAIN_COLOR,
    width: '40%',
    alignItems: 'center'
  },
  textButton: {
      color: AppColors.TEXT_WHITE,
      fontSize: 14,
      fontWeight: 'bold'
  }
});