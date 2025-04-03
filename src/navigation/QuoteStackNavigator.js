import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QuoteScreen from "../modules/Quote";
import HolderDataScreen from "../modules/HolderData";
import InsuranceQuote from "../modules/InsuranceQuote";
import InsuranceDetailsScreen from "../modules/Insurence";

const Stack = createNativeStackNavigator();

export default function QuoteStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Cotizar" component={QuoteScreen} options={{ headerShown: false}} />
      <Stack.Screen name="DatosTitular" component={HolderDataScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Seguros" component={InsuranceDetailsScreen} options={{ headerShown: false}} />
      <Stack.Screen name="DatosSeguro" component={InsuranceQuote} options={{ headerShown: false}} />
    </Stack.Navigator>
  );
}
