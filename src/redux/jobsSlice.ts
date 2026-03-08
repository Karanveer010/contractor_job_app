
import { createSlice } from '@reduxjs/toolkit';

const jobsSlice = createSlice({
  name: 'jobs',
  initialState: { list: [] },
  reducers: {
    setJobs(state, action) {
      state.list = action.payload;
    }
  }
});

export const { setJobs } = jobsSlice.actions;
export default jobsSlice.reducer;
