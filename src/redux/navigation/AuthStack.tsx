import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppRoutes from "./RouteKeys/appRoutes";
import Welcome from "../../screens/authScreen/Welcome";
import CreateAccount from "../../screens/authScreen/CreateAccount";
import Login from "../../screens/authScreen/Login";

export default function AuthStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={AppRoutes.Welcome} component={Welcome} />
      <Stack.Screen name={AppRoutes.CreateAccount} component={CreateAccount} />
      <Stack.Screen name={AppRoutes.Login} component={Login} />
    </Stack.Navigator>
  );
}
