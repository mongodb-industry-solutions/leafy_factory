import { createSlice } from "@reduxjs/toolkit";

const JobSlice = createSlice({
  name: "Jobs",
  initialState: {
    jobs: [],
    treeJobs: []
  },
  reducers: {
    addJob: (state, action) => {
      state.jobs.push(action.payload);
    },
    removeJob: (state, action) => {
      return state;
    },
    setAllJobs: (state, action) => {
      return {
        ...state,
        jobs: action.payload,
      };
    },
    setTreeJobs: (state, action) => {
      state.treeJobs = action.payload;
  },
  },
});

export const {
  addJob,
  removeJob,
  setAllJobs,
  setTreeJobs
} = JobSlice.actions;

export default JobSlice.reducer;
