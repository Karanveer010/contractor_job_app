import db from "../database/database";
import api from "../api/axiosClient";
import NetInfo from "@react-native-community/netinfo";
import AppUtils from "../appUtils";

export const updateJob = async (job: any) => {
  const network = await NetInfo.fetch();

  let status = "pending";

  // 1️⃣ Try API only if online
  if (network?.isConnected) {
    try {
      const res = await api.put(`/jobs/${job._id}`, {
        clientJobId: job.id,
        title: job.title,
        location: job.city,
        description: job.description,
        budget: Number(job.budget),
      });

      console.log("API Update Success:", res.data);

      AppUtils.showToast(res.data.message, "green");

      status = "synced";
    } catch (error: any) {
      console.log("API Update Error:", error?.response?.data || error);

      status = "pending";
    }
  }

  // 2️⃣ ALWAYS update SQLite (online or offline)
  try {
    await db.runSync(
      `UPDATE jobs
       SET  _id=?, title=?, description=?, city=?, budget=?, updatedAt=?, syncStatus=?
       WHERE id=?`,
      [
        job._id ?? null,
        job.title,
        job.description,
        job.city,
        job.budget,
        Date.now(),
        status,
        job.id,
      ],
    );

    console.log("SQLite job updated:", job.id);
  } catch (err) {
    console.log("SQLite update error:", err);
  }
};
