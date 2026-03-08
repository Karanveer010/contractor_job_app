import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import JobsListScreen from "../../screens/JobsListScreen";
import CreateJobScreen from "../../screens/CreateJobScreen";
import AppRoutes from "./RouteKeys/appRoutes";
import JobDetailScreen from "../../screens/JobDetailScreen";

export default function NonAuthStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={AppRoutes.JobList} component={JobsListScreen} />
      <Stack.Screen name={AppRoutes.CreateJob} component={CreateJobScreen} />
      <Stack.Screen name={AppRoutes.JobDetail} component={JobDetailScreen} />
    </Stack.Navigator>
  );
}
