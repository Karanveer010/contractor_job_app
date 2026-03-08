import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import db from "../database/database";
import { useSelector } from "react-redux";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import JobCard from "../components/JobCard";
import NetworkStatus from "../components/NetworkStatus";
import NetInfo from "@react-native-community/netinfo";
import { getJobList } from "../services/authServices";

export default function JobsListScreen({ navigation }: any) {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const user = useSelector((state: any) => state.userData.user);
  const state: any = NetInfo.fetch();
  useFocusEffect(
    useCallback(() => {
      loadJobs();
    }, []),
  );
  const loadJobs = async () => {
    const data: any = db?.getAllSync("SELECT * FROM jobs");
    setJobs(data);
    // // if (state?.isConnected) {
    // const res: any = await getJobList();
    // const apiJobs = res?.data?.data || [];
    // setJobs(apiJobs);
    // console.log("working", apiJobs);
    // }
  };

  const renderJob = ({ item }: any) => {
    return (
      <JobCard
        job={item}
        key={item?.id ?? item?.clientJobId}
        onPress={() => navigation.navigate("JobDetail", { job: item })}
      />
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcome}>Welcome back,</Text>
          <Text style={styles.name}>{user?.name}</Text>
        </View>

        <View style={styles.avatar}>
          <Text style={{ color: "#fff" }}>{user?.name?.charAt(0)}</Text>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} />
        <TextInput
          placeholder="Search jobs..."
          value={search}
          onChangeText={setSearch}
          style={{ flex: 1, marginLeft: 10 }}
        />
      </View>

      {/* Job Title */}
      <View style={styles.rowBetween}>
        <Text style={styles.sectionTitle}>Your Jobs ({jobs?.length})</Text>

        <Text style={{ color: "#3b82f6" }}>View All</Text>
      </View>

      {/* Job List */}
      <FlatList
        data={jobs}
        keyExtractor={(item: any) => item.id}
        renderItem={renderJob}
        showsVerticalScrollIndicator={false}
      />
      <NetworkStatus />

      {/* Floating Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("CreateJob")}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f4f7",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "#e2f3f8",
  },

  welcome: {
    color: "#888",
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#3b82f6",
    justifyContent: "center",
    alignItems: "center",
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eaecef",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#666",
    marginTop: 5,
  },

  status: {
    backgroundColor: "#d1fae5",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },

  statusText: {
    fontSize: 12,
    color: "#065f46",
  },

  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#3b82f6",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});
