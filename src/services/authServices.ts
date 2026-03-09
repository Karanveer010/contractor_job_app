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

export const addNoteApi = (jobId: string, data: any) => {
  return api.post(`/jobs/${jobId}/notes`, data);
};

export const updateNoteApi = (jobId: string, noteId: string, data: any) => {
  return api.put(`/jobs/${jobId}/notes/${noteId}`, data);
};
