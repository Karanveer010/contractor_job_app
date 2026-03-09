import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";

interface JobCardProps {
  job: any;
  onPress: () => void;
  onpressEdit: () => void;
  netInfo?: any;
}

const getStatusUI = (status: string) => {
  if (status === "pending") {
    return { text: "🟡 pending", color: "#f59e0b" };
  }

  if (status === "synced") {
    return { text: "🟢 synced", color: "#388d70" };
  }

  if (status === "failed") {
    return { text: "🔴 failed", color: "#ef4444" };
  }

  return { text: "", color: "#000" };
};
const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

const JobCard: React.FC<JobCardProps> = ({
  job,
  onPress,
  onpressEdit,
  netInfo = false,
}) => {
  const status = getStatusUI(job?.syncStatus);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* Title + Status */}
      <View style={styles.rowBetween}>
        <Text style={styles.title}>{job?.title}</Text>

        {netInfo === false && (
          <View style={[styles.status, { backgroundColor: status.color }]}>
            <Text style={styles.statusText}>{status.text}</Text>
          </View>
        )}
      </View>

      {/* Client */}
      <Text style={styles.subtitle}>{job?.description ?? ""}</Text>

      {/* Budget + Location */}
      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <View style={styles.iconCircle}>
            <Text>$</Text>
          </View>
          <Text style={styles.infoText}>${String(job?.budget) || "0"}</Text>
        </View>

        <View style={styles.infoItem}>
          <View style={styles.iconCircleGreen}>
            <Text>📍</Text>
          </View>
          <Text style={styles.infoText}>{job?.city || job?.location}</Text>
        </View>
        <Pressable style={styles.edit} onPress={onpressEdit}>
          <Text style={{ fontSize: 10 }}>Edit</Text>
        </Pressable>
      </View>

      <View style={styles.divider} />

      {/* <Text style={styles.date}>
        Started {job?.startDate || formatDate(job?.createdAt)}
      </Text> */}
    </TouchableOpacity>
  );
};

export default JobCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    marginVertical: 8,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  edit: {
    backgroundColor: "#E8F1FF",
    justifyContent: "center",
    borderRadius: 10,
    padding: 5,
    alignItems: "center",
  },
  subtitle: {
    color: "#7A7A7A",
    marginTop: 4,
  },

  status: {
    backgroundColor: "#FFF3CD",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  statusText: {
    color: "#f3efea",
    fontSize: 12,
    fontWeight: "600",
  },

  infoRow: {
    flexDirection: "row",
    marginTop: 14,
  },

  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },

  iconCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#E8F1FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },

  iconCircleGreen: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#E6F7EE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },

  infoText: {
    fontSize: 14,
    color: "#333",
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginVertical: 12,
  },

  date: {
    color: "#8A8A8A",
    fontSize: 12,
  },
});
