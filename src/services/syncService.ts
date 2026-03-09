import db from "../database/database";
import api from "../api/axiosClient";

export const syncJobs = async () => {
  try {
    const jobs: any = db.getAllSync(
      "SELECT * FROM jobs WHERE syncStatus='pending' OR syncStatus='failed'",
    );

    for (const job of jobs) {
      try {
        let res;

        console.log("Syncing job:", job._id);

        // if job already exists on server → UPDATE
        if (job?._id) {
          res = await api.put(`/jobs/${job?._id}`, {
            clientJobId: job.id,
            title: job.title,
            description: job.description,
            location: job.city,
            budget: Number(job.budget),
          });
        } else {
          // new job → CREATE
          res = await api.post("/jobs", {
            clientJobId: job.id,
            title: job.title,
            description: job.description,
            location: job.city,
            budget: Number(job.budget),
          });

          // save server id after create
          const serverId = res?.data?.data?._id;

          if (serverId) {
            db.runSync("UPDATE jobs SET _id=? WHERE id=?", [serverId, job.id]);
          }
        }

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
