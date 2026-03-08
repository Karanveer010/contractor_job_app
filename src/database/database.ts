import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("jobs.db");

export const initDB = () => {
  // create jobs table if not exists
  db.execSync(`
  CREATE TABLE IF NOT EXISTS jobs(
    id TEXT PRIMARY KEY NOT NULL,
    title TEXT,
    description TEXT
  );
  `);

  // add new columns if missing
  try {
    db.execSync(`ALTER TABLE jobs ADD COLUMN client TEXT`);
  } catch {}

  try {
    db.execSync(`ALTER TABLE jobs ADD COLUMN city TEXT`);
  } catch {}

  try {
    db.execSync(`ALTER TABLE jobs ADD COLUMN budget TEXT`);
  } catch {}

  try {
    db.execSync(`ALTER TABLE jobs ADD COLUMN startDate TEXT`);
  } catch {}

  try {
    db.execSync(`ALTER TABLE jobs ADD COLUMN syncStatus TEXT`);
  } catch {}

  try {
    db.execSync(`ALTER TABLE jobs ADD COLUMN updatedAt INTEGER`);
  } catch {}

  // notes table
  db.execSync(`
  CREATE TABLE IF NOT EXISTS notes(
    id TEXT PRIMARY KEY NOT NULL,
    jobId TEXT,
    content TEXT,
    syncStatus TEXT,
    updatedAt INTEGER
  );
  `);
};

export default db;
