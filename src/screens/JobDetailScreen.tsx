import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";

import db from "../database/database";
import uuid from "react-native-uuid";

export default function JobDetailScreen({ route }: any) {
  const { job } = route.params;

  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState("");

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = () => {
    const data = db.getAllSync("SELECT * FROM notes WHERE jobId=?", [job.id]);

    setNotes(data);
  };

  const addNote = () => {
    db.runSync(
      `INSERT INTO notes
(id,jobId,content,syncStatus,updatedAt)
VALUES (?,?,?,?,?)`,
      [uuid.v4(), job.id, note, "pending", Date.now()],
    );

    setNote("");

    loadNotes();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{job.title}</Text>

      <Text style={styles.description}>{job.description}</Text>

      <View style={styles.card}>
        <Text style={styles.section}>Notes</Text>

        <TextInput
          placeholder="Add note..."
          style={styles.input}
          value={note}
          onChangeText={setNote}
        />

        <TouchableOpacity style={styles.button} onPress={addNote}>
          <Text style={{ color: "#fff" }}>Add Note</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notes}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }: any) => (
          <View style={styles.noteCard}>
            <Text>{item.content}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f4f7",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
  },

  description: {
    color: "#666",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },

  section: {
    fontWeight: "bold",
    marginBottom: 10,
  },

  input: {
    backgroundColor: "#f1f3f6",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  noteCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
});
