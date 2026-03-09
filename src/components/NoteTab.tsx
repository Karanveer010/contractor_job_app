import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { addNoteApi, updateNoteApi } from "../services/authServices";
import AppUtils from "../appUtils";
import uuid from "react-native-uuid";
import api from "../api/axiosClient";
import { useIsFocused } from "@react-navigation/native";

export default function NotesTab({ job }: any) {
  const [jobData, setJob] = useState(job ?? {});
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState(jobData?.notes ?? []);
  const [noteId, setNoteId] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);
  const focus = useIsFocused();

  const fetchJobs = async () => {
    try {
      const res = await api.get(`/job-details/${job?._id}`);
      setJob(res.data.data ?? {});
    } catch (error) {
      console.log("API error", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [focus, jobData]);

  const addOrUpdateNote = async () => {
    if (!note.trim()) return;

    // EDIT NOTE
    if (editingNoteId) {
      const updated = notes?.map((n: any) =>
        n.clientNoteId === editingNoteId ? { ...n, text: note } : n,
      );

      setNotes(updated);

      try {
        const res: any = await updateNoteApi(jobData?._id, noteId, {
          text: note,
        });
        if (res.status == 200) {
          AppUtils.showToast(res.data.message, "green");
          fetchJobs();
        } else {
          AppUtils.showToast(res.data.message);
        }
      } catch (e) {
        console.log("update note error", e);
      }

      setEditingNoteId(null);
    }

    // ADD NOTE
    else {
      const newNoteId: any = uuid.v4();
      const newNote: any = {
        id: jobData?._id,
        clientNoteId: newNoteId,
        text: note,
      };

      try {
        const res = await addNoteApi(jobData?._id, {
          clientNoteId: newNoteId,
          text: note?.trim(),
        });
        if (res.status == 201) {
          AppUtils.showToast(res.data.message, "green");
          fetchJobs();
        } else {
          AppUtils.showToast(res.data.message);
        }
      } catch (e) {
        console.log("add note error", e);
      }
    }

    setNote("");
  };

  const editNote = (item: any) => {
    setNote(item?.text);
    setEditingNoteId(item?.clientNoteId);
    setNoteId(item?._id);
  };

  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity style={styles.noteCard} onPress={() => editNote(item)}>
        <Text style={styles.noteText}>{item?.text}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        placeholder="Add a new note..."
        style={styles.input}
        value={note}
        multiline
        textAlignVertical="top"
        onChangeText={setNote}
      />

      <TouchableOpacity style={styles.button} onPress={addOrUpdateNote}>
        <Text style={{ color: "#fff" }}>
          {editingNoteId ? "Update Note" : "+ Add Note"}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={jobData?.notes}
        keyExtractor={(item: any) =>
          item?.id?.toString() ?? item?._id?.toString()
        }
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#ffffff",
    padding: 12,
    minHeight: 80,
    borderRadius: 10,
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#3b82f6",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },

  noteCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  noteText: {
    fontSize: 14,
  },
});
