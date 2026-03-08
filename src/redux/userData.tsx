import { createSlice } from "@reduxjs/toolkit";
export const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    auth: false,
    token: "",
    user: {},
  },
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});
export const { setAuth, setUser, setToken } = userDataSlice.actions;

export default userDataSlice.reducer;
