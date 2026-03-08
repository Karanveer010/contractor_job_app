import db from "../database/database";
import api from "../api/axiosClient";

export const syncJobs = async () => {
  try {
    const jobs: any = db.getAllSync(
      "SELECT * FROM jobs WHERE syncStatus='pending' OR syncStatus='failed'",
    );

    for (const job of jobs) {
      try {
        await api.post("/jobs", {
          clientJobId: job.id,
          title: job.title,
          description: job.description,
          // client: job.client,
          location: job.city,
          budget: job.budget,
          // startDate: job.startDate
        });

        db.runSync(
          "UPDATE jobs SET syncStatus='synced', updatedAt=? WHERE id=?",
          [Date.now(), job.id],
        );
      } catch (error) {
        console.log("Job sync failed:", job.id);
        db.runSync("UPDATE jobs SET syncStatus='failed' WHERE id=?", [job.id]);
      }
    }
  } catch (err) {
    console.log("Sync error:", err);
  }
};
