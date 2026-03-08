import api from "../api/axiosClient";

export const signupApi = (data: any) => {
  return api?.post("/auth/register", data);
};

export const loginApi = (data: any) => {
  return api?.post("/auth/login", data);
};

export const getJobList = () => {
  return api?.get("/jobs");
};
