import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./AuthStack";
import NonAuthStack from "./NonAuthStack";
import { syncJobs } from "../../services/syncService";
import { useDispatch } from "react-redux";
import { setNetInfO } from "../userData";
import NetInfo from "@react-native-community/netinfo";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = NetInfo?.addEventListener((state) => {
      dispatch(setNetInfO(state.isConnected ?? false));
      if (state?.isConnected) {
        syncJobs();
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={"AuthStack"} component={AuthStack} />
      <Stack.Screen name={"NonAuthStack"} component={NonAuthStack} />
    </Stack.Navigator>
  );
}
