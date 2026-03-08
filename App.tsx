import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { persistor, store } from "./src/redux/store";
import AppNavigator from "./src/redux/navigation/AppNavigator";
import { initDB } from "./src/database/database";
import { listenNetwork } from "./src/services/networkService";
import { syncJobs } from "./src/services/syncService";
import { StatusBar, View } from "react-native";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { PersistGate } from "redux-persist/lib/integration/react";
import { navigationRef } from "./src/redux/navigation/navigationService";
import { ToastProvider } from "./src/ToastManager";

export default function App() {
  useEffect(() => {
    initDB();
    listenNetwork(() => {
      syncJobs();
    });
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <NavigationContainer ref={navigationRef}>
        <PersistGate loading={null} persistor={persistor}>
          <Provider store={store}>
            <ToastProvider>
              <AppNavigator />
            </ToastProvider>
          </Provider>
        </PersistGate>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
