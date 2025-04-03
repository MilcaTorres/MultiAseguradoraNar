import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Customers from '../modules/Customers';
import CustomersPolicies from '../modules/CustomersPolicies';
import PolicyDetails from "../modules/PolicyDetails";
import CustomersQuotes from "../modules/CustomersQuotes";

const Stack = createNativeStackNavigator();

export default function CustomersStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Clientes" component={Customers} options={{ headerShown: false }} />
      <Stack.Screen name="PolizasClientes" component={CustomersPolicies} options={{ headerShown: false }} />
      <Stack.Screen name="PolizasDetalles" component={PolicyDetails} options={{ headerShown: false }} />
      <Stack.Screen name="CotizacionesClientes" component={CustomersQuotes} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
