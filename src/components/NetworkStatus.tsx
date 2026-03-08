import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { Ionicons } from "@expo/vector-icons";
import { syncJobs } from "../services/syncService";

export default function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(state.isConnected ?? false);
      if (state.isConnected) {
        syncJobs();
      }
    });

    return () => unsubscribe();
  }, []);

  if (!isOnline) {
    return (
      <View style={styles.cardOffline}>
        <Ionicons name="wifi-outline" size={24} color="#ef4444" />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.title}>Offline Mode</Text>
          <Text style={styles.subtitle}>Changes will sync later</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.cardOnline}>
      <Ionicons name="wifi" size={24} color="#10b981" />
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.title}>Back Online</Text>
        <Text style={styles.subtitle}>All changes synced</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardOnline: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    padding: 16,
    borderRadius: 16,
    marginBottom: 15,
    elevation: 2,
  },

  cardOffline: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF2F2",
    padding: 16,
    borderRadius: 16,
    marginBottom: 15,
    elevation: 2,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
  },

  subtitle: {
    color: "#64748b",
    marginTop: 2,
  },
});
