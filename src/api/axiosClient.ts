import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { navigate } from "../redux/navigation/navigationService";
const api = axios.create({
  baseURL: "https://sandbox-job-app.bosselt.com/api/v1",
  timeout: 20000,
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("token");

  if (token) {
    config.headers.authorization = token;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    if (error.response?.status === 401) {
      await SecureStore.deleteItemAsync("token");
      navigate("Login");
      console.log("Unauthorized → Redirect to login");
    }

    return Promise.reject(error);
  },
);

export default api;
