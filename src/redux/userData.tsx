import { createSlice } from "@reduxjs/toolkit";
export const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    auth: false,
    token: "",
    user: {},
    netInfo: false,
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
    setNetInfO: (state, action) => {
      state.netInfo = action.payload;
    },
  },
});
export const { setAuth, setUser, setToken, setNetInfO } = userDataSlice.actions;

export default userDataSlice.reducer;
