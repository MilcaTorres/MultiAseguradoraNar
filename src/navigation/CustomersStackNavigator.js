import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Customers from '../modules/Customers';
import CustomersPolicies from '../modules/CustomersPolicies';
import PolicyDetails from "../modules/PolicyDetails";

const Stack = createNativeStackNavigator();

export default function CustomersStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Clientes" component={Customers} options={{ title: "Clientes" }} />
      <Stack.Screen name="PolizasClientes" component={CustomersPolicies} options={{ title: "Clientes" }} />
      <Stack.Screen name="PolizasDetalles" component={PolicyDetails} options={{ title: "Clientes" }} />
    </Stack.Navigator>
  );
}
