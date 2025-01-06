import { createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import { Status } from "@/app/globals/status";
import { API } from "@/app/http/index";

const initialState = {
  jobApply: [],
  status: Status.LOADING,
};

// Redux slice
const jobApplySlice = createSlice({
  name: "jobApply",
  initialState,
  reducers: {
    setJobApply(state, action) {
      state.jobApply = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { setJobApply, setStatus } = jobApplySlice.actions;
export default jobApplySlice.reducer;

// Async thunk action
export function JobApply(formData) {
  return async function JobApplyThunk(dispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.post("/job-apply", formData);
      if (response.status === 201) {
        dispatch(setStatus(Status.SUCCESS));
        toast.success(response?.data?.message);
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
