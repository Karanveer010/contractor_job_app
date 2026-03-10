import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { persistor, store } from "./src/redux/store";
import AppNavigator from "./src/redux/navigation/AppNavigator";
import { initDB } from "./src/database/database";
import { listenNetwork } from "./src/services/networkService";
import { syncJobs } from "./src/services/syncService";
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
    
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer ref={navigationRef}>
        
        <ToastProvider>
          <AppNavigator />
        </ToastProvider>
      </NavigationContainer>
    </PersistGate>
  </Provider>
</SafeAreaProvider>
  );
}
