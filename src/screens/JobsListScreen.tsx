import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import db from "../database/database";
import { useDispatch, useSelector } from "react-redux";
import JobCard from "../components/JobCard";
import NetworkStatus from "../components/NetworkStatus";
import NetInfo from "@react-native-community/netinfo";
import AppRoutes from "../redux/navigation/RouteKeys/appRoutes";
import api from "../api/axiosClient";
import { useIsFocused } from "@react-navigation/native";
import { syncJobs } from "../services/syncService";
import { setAuth, setUser } from "../redux/userData";
import { setToken } from "../redux/userData";
import * as SecureStore from "expo-secure-store";
import AppUtils from "../appUtils";

export default function JobsListScreen({ navigation }: any) {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const user = useSelector((state: any) => state.userData.user);
  const internet = useSelector((state: any) => state.userData.netInfo);
  const focus = useIsFocused();
  const dispatch = useDispatch();
  
  const filteredJobs = jobs?.filter((job: any) => {
    const text = search?.toLowerCase();
    return (
      job?.title?.toLowerCase().includes(text) ||
      job?.description?.toLowerCase().includes(text) ||
      job?.location?.toLowerCase().includes(text)
    );
  });

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs");
      setJobs(res.data.data ?? []);
    } catch (error) {
      console.log("API error", error);
    }
  };

 
  const logout = async () => {
  try {
    const res = await api.post("/auth/logout");
    if (res?.status === 200) {
       AppUtils.showToast(res?.data?.message,"green");
       navigation.reset({
        index: 0,
        routes: [
          {
            name: "AuthStack",
            state: {
              routes: [
                {
                  name: AppRoutes.Login,
                  params: { from: "JobList" },
                },
              ],
            },
          },
        ],
      });
      await dispatch(setUser({}));
      await dispatch(setToken(""));
      await dispatch(setAuth(false));
      await SecureStore.deleteItemAsync("token");
    }
  } catch (error:any) {
    console.log("Logout API ERROR:", error?.response?.data);
     await dispatch(setToken(""));
    await SecureStore.deleteItemAsync("token");
  navigation.reset({
    index: 0,
    routes: [
      {
        name: "AuthStack",
        state: {
          routes: [{ name: AppRoutes.Login , params: { from: "JobList" }}],
        },
      },
    ],
  });
  }
};

  useEffect(() => {

 loadJobs();
    syncJobs();
   
  }, [focus, internet]);

  const loadJobs = async () => {
    const state = await NetInfo.fetch();

    if (state?.isConnected) {
      await fetchJobs();
    } else {
      const jobData: any = db.getAllSync("SELECT * FROM jobs WHERE userId=?", [
        user?._id,
      ]);
      setJobs(jobData);
    }
  };

  const renderJob = ({ item }: any) => {
    return (
      <JobCard
        job={item}
        key={item?.id ?? item?._id}
        netInfo={internet}
        onpressEdit={() =>
          navigation.navigate(AppRoutes.CreateJob, { job: item })
        }
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

        <Pressable
          onPress={logout}
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            justifyContent: "center",
            backgroundColor: "red",
          }}
        >
          <Ionicons
            name="log-out"
            size={25}
            color="white"
            style={{ alingSelf: "center" }}
          />
        </Pressable>
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
        <Text style={styles.sectionTitle}>
          Your Jobs ({filteredJobs?.length})
        </Text>

        <Text style={{ color: "#3b82f6" }}>View All</Text>
      </View>

      {/* Job List */}
      <FlatList
        data={filteredJobs}
        keyExtractor={(item: any) =>
          item?._id?.toString() ??
          item?.id?.toString() ??
          Math?.random()?.toString()
        }
        renderItem={renderJob}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => {
          return (
            <Text style={{ textAlign: "center", alignSelf: "center" }}>
              no jobs available
            </Text>
          );
        }}
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
