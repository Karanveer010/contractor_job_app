import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import OverviewTab from "../components/Overviewtab";
import NotesTab from "../components/NoteTab";
import CustomHeader from "../components/Customheader";
import { useSelector } from "react-redux";
import api from "../api/axiosClient";
import NetworkStatus from "../components/NetworkStatus";

export default function JobDetailScreen({ route }: any) {
  const jobData = route?.params?.job ?? {};
  const [job, setJob] = useState(jobData ?? {});
  const user = useSelector((state: any) => state.userData?.user);
  const [tab, setTab] = useState("overview");

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
    console.log("calling fetch details");
  }, [jobData]);

  return (
    <View style={styles.container}>
      <CustomHeader title={job?.title} subtitle={user?.name} />

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, tab === "overview" && styles.activeTab]}
          onPress={() => setTab("overview")}
        >
          <Text style={{ color: tab === "overview" ? "#FFFFFF" : "#000000" }}>
            Overview
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, tab === "notes" && styles.activeTab]}
          onPress={() => setTab("notes")}
        >
          <Text style={{ color: tab === "notes" ? "#FFFFFF" : "#000000" }}>
            Notes
          </Text>
        </TouchableOpacity>
      </View>

      {tab === "overview" && <OverviewTab job={job} />}

      {tab === "notes" && <NotesTab job={job} />}

      <NetworkStatus />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#f2f4f7",
  },

  tabContainer: {
    flexDirection: "row",
    marginVertical: 15,
  },

  tab: {
    padding: 10,
    backgroundColor: "#e5e7eb",
    borderRadius: 10,
    marginRight: 10,
  },

  activeTab: {
    backgroundColor: "#3b82f6",
    color: "#FFFFFFF",
  },
});
