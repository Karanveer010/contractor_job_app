import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import NetworkStatus from "./NetworkStatus";

export default function OverviewTab({ job }: any) {
  const user = useSelector((state: any) => state.userData?.user);
  return (
    <View style={styles.container}>
      <View style={styles.cardBlue}>
        <Text style={styles.budget}>$ {job.budget}</Text>
      </View>

      <View style={styles.row}>
        <View style={styles.box}>
          <Text style={styles.label}>Location</Text>
          <Text>{job?.location ?? job?.city}</Text>
        </View>
      </View>

      <View style={styles.box2}>
        <Text style={styles.label}>Client Information</Text>
        <Text>{user?.name}</Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.label}>Description</Text>
        <Text>{job.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  cardBlue: {
    backgroundColor: "#3b82f6",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
  },

  budget: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  box: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginVertical: 8,
    flex: 1,
    marginRight: 5,
  },
  box2: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginVertical: 8,
    marginRight: 5,
  },

  label: {
    fontWeight: "600",
    marginBottom: 5,
  },
});
