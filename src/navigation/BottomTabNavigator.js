import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../modules/Profile";
import { Ionicons } from "@expo/vector-icons";
import Statistics from "../modules/Statistics";
import HomeScreen from "../modules/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import AppColors from "../kernel/AppColors";
import CustomersStack from "./CustomersStackNavigator";
import QuoteStack from "./QuoteStackNavigator";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false, tabBarStyle: { display: "none" } }}
      />
    </Stack.Navigator>
  );
}

function getTabBarVisibility(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "HomeScreen";
  if (routeName === "HomeScreen") {
    return { display: "none" };
  }
  return { display: "flex" };
}

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Customers") {
            iconName = "people";
          } else if (route.name === "Quote") {
            iconName = "cash";
          } else if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Statistics") {
            iconName = "bar-chart";
          } else if (route.name === "Profile") {
            iconName = "person";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#878484",
        tabBarStyle: {
          backgroundColor: AppColors.MAIN_COLOR,
          paddingBottom: 5,
          height: 60,
          //position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0
        },
        keyboardHidesTabBar: false,
      })}
    >
      <Tab.Screen
        name="Customers"
        component={CustomersStack}
        options={{ headerShown: false, title: "Clientes" }}
      />
      <Tab.Screen
        name="Quote"
        component={QuoteStack}
        options={{ headerShown: false, title: "Cotizar" }}
      />
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={({ route }) => ({
          headerShown: false,
          title: "Inicio",
          tabBarStyle: getTabBarVisibility(route),
        })}
      />
      <Tab.Screen
        name="Statistics"
        component={Statistics}
        options={{ headerShown: false, title: "Estadísticas" }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false, title: "Perfil" }}
      />
    </Tab.Navigator>
  );
}
