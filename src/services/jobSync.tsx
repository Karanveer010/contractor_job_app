import NetInfo from "@react-native-community/netinfo";
import db from "../database/database";
import { getJobList } from "./authServices";

export const loadJobsWithSync = async (setJobs: any) => {
  try {
    // 1️⃣ Load DB data first
    const localJobs: any = db.getAllSync(`SELECT * FROM jobs`);
    setJobs(localJobs);

    // 2️⃣ Check internet
    const state = await NetInfo.fetch();

    if (!state.isConnected) {
      console.log("Offline mode → showing DB jobs");
      return;
    }

    // 3️⃣ Fetch API
    const res: any = await getJobList();
    const apiJobs = res?.data || [];

    if (!apiJobs.length) return;

    // 4️⃣ Update DB
    apiJobs.forEach((job: any) => {
      db.runSync(
        `INSERT OR REPLACE INTO jobs
        (id,title,description,client,city,budget,startDate,syncStatus,updatedAt)
        VALUES (?,?,?,?,?,?,?,?,?)`,
        [
          String(job?.id),
          job?.title || "",
          job?.description || "",
          job?.client || "",
          job?.city || "",
          job?.budget || "",
          job?.startDate || "",
          "synced",
          Date.now(),
        ],
      );
    });

    // 5️⃣ Reload DB after update
    const updatedJobs = db.getAllSync(`SELECT * FROM jobs`);
    setJobs(updatedJobs);
  } catch (error) {
    console.log("Sync error:", error);
  }
};
