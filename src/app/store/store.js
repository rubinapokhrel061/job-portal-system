import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "@/app/store/slices/jobSlice";
import favouriteJobsReducer from "@/app/store/slices/favouriteJobsSlice";
import jobApplyReducer from "@/app/store/slices/JobApplySlice";
export const store = configureStore({
  reducer: {
    jobs: jobReducer,
    favJob: favouriteJobsReducer,
    jobApply: jobApplyReducer,
  },
});
