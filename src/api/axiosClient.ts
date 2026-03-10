import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { navigate } from "../redux/navigation/navigationService";
import AppRoutes from "../redux/navigation/RouteKeys/appRoutes";
import { store } from "../redux/store";

const api = axios.create({
  baseURL: "https://sandbox-job-app.bosselt.com/api/v1",
  timeout: 20000,
});

api.interceptors.request.use(async (config) => {

  const reduxToken = store.getState()?.userData?.token;
    const secureToken = await SecureStore.getItemAsync("token");

    const token = typeof reduxToken === "string" ? reduxToken : secureToken;

  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: token, 
    };
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401) {
      await SecureStore.deleteItemAsync("token");
      navigate(AppRoutes.Login);
    }
    return Promise.reject(error);
  }
);

export default api;