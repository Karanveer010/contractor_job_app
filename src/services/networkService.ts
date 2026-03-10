import NetInfo from "@react-native-community/netinfo";
import { syncJobs } from "./syncService";

export const listenNetwork = (callback: Function) => {
  NetInfo.addEventListener(async(state) => {
   if (state?.isConnected) {
  try {
    await syncJobs();
  } catch (e) {
    console.log("Sync failed", e);
  }
}
  });
};
