import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";

import uuid from "react-native-uuid";
import db from "../database/database";
import CustomHeader from "../components/Customheader";
import DatePicker from "../components/DatePicker";
import AppUtils from "../appUtils";
import { syncJobs } from "../services/syncService";
import NetInfo from "@react-native-community/netinfo";

export default function CreateJobScreen({ navigation }: any) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [client, setClient] = useState("");
  const [city, setCity] = useState("");
  const [budget, setBudget] = useState("");
  const [date, setDate] = React.useState(new Date());
  const [showPicker, setShowPicker] = React.useState(false);
  const [formatDate, setFormatDate] = useState("");

  const createJob = async () => {
    const network = await NetInfo.fetch();

    if (!title.trim()) {
      AppUtils.showToast("Please enter job title");
      return;
    }

    if (!description.trim()) {
      AppUtils.showToast("Please enter job description");
      return;
    }

    if (!client.trim()) {
      AppUtils.showToast("Please enter client name");
      return;
    }

    if (!city.trim()) {
      AppUtils.showToast("Please enter city");
      return;
    }

    if (!budget.trim()) {
      AppUtils.showToast("Please enter budget");
      return;
    }

    if (!formatDate) {
      AppUtils.showToast("Please select start date");
      return;
    }

    const id = uuid?.v4();

    db?.runSync(
      `INSERT INTO jobs
    (id,title,description,client,city,budget,startDate,syncStatus,updatedAt)
    VALUES (?,?,?,?,?,?,?,?,?)`,
      [
        id,
        title,
        description,
        client,
        city,
        budget,
        formatDate,
        "pending",
        Date.now(),
      ],
    );

    if (network?.isConnected) {
      syncJobs();
    }
    navigation.goBack();
  };

  const handleConfirm = (selectedDate: Date) => {
    setShowPicker(false);
    setDate(selectedDate);

    const formatted: any =
      selectedDate.getFullYear() +
      "-" +
      String(selectedDate.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(selectedDate.getDate()).padStart(2, "0");

    setFormatDate(formatted);
  };

  return (
    <ScrollView style={styles.container}>
      <CustomHeader
        title="Create New Job"
        subtitle="Fill in the details below"
      />
      <View style={styles.card}>
        <Text style={styles.label}>Job Title</Text>

        <TextInput
          placeholder="Job name"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Description</Text>

        <TextInput
          placeholder="Add job description..."
          style={styles.input}
          value={description}
          onChangeText={setDescription}
        />
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Client Name</Text>

        <TextInput
          placeholder="Name"
          style={styles.input}
          value={client}
          onChangeText={setClient}
        />

        <Text style={styles.label}>City</Text>

        <TextInput
          placeholder="City"
          style={styles.input}
          value={city}
          onChangeText={setCity}
        />
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Budget</Text>

        <TextInput
          placeholder="$"
          style={styles.input}
          keyboardType={"numeric"}
          value={budget}
          onChangeText={setBudget}
        />
        <Text style={styles.label}>Start Date</Text>
        <Pressable onPress={() => setShowPicker(true)}>
          <TextInput
            placeholder="YYYY-MM-DD"
            style={styles.input}
            value={String(formatDate)}
            pointerEvents="none"
            editable={false}
          />
        </Pressable>
      </View>

      <DatePicker
        isVisible={showPicker}
        mode="date"
        selectedDate={date}
        onConfirm={handleConfirm}
        onCancel={() => setShowPicker(false)}
      />

      <TouchableOpacity style={styles.button} onPress={createJob}>
        <Text style={styles.buttonText}>Create Job</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#f2f4f7",
  },

  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginVertical: 25,
  },

  label: {
    fontWeight: "600",
    marginBottom: 5,
  },

  input: {
    backgroundColor: "#f1f3f6",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
