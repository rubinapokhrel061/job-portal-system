import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Status } from "@/app/globals/status";
import { API } from "@/app/http/index";

const initialState = {
  jobs: [],
  status: Status.LOADING,
  singleJob: null,
  totalJobs: 0,
  totalPages: 0,
  currentPage: 1,
  jobByEmail: [],
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setJobs(state, action) {
      state.jobs = action.payload;
    },
    setJobByEmail(state, action) {
      state.jobByEmail = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setSingleJob(state, action) {
      state.singleJob = action.payload;
    },
    setTotalJobs(state, action) {
      state.totalJobs = action.payload;
    },
    setTotalPages(state, action) {
      state.totalPages = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setDeleteJob(state, action) {
      const index = state.jobByEmail.findIndex(
        (item) => item._id === action.payload.jobId
      );
      if (index !== -1) {
        state.jobByEmail.splice(index, 1);
      }
    },
    setUpdateJob(state, action) {
      const index = state.jobByEmail.findIndex(
        (item) => item._id === action.payload._id
      );
      if (index !== -1) {
        state.jobByEmail[index] = action.payload;
      }
    },
  },
});

export const {
  setJobs,
  setStatus,
  setSingleJob,
  setCurrentPage,
  setTotalJobs,
  setTotalPages,
  setJobByEmail,
  setDeleteJob,
} = jobSlice.actions;
export default jobSlice.reducer;

export function addJob(formData) {
  return async function addJobThunk(dispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.post("/jobs", formData);
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

export function fetchJobs(page = 1) {
  return async function fetchJobsThunk(dispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const limit = 5;
      const response = await API.get(`/jobs/all-Job/${page}/${limit}`);
      if (response.status === 200 && response.data) {
        const { jobs, totalJobs, totalPages } = response.data;
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setJobs(jobs));
        dispatch(setTotalJobs(totalJobs));
        dispatch(setTotalPages(totalPages));
        dispatch(setCurrentPage(page));
      } else {
        dispatch(setStatus(Status.ERROR));
        toast.error("Failed to fetch jobs.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function fetchJobById(jobId) {
  return async function fetchJobByIdThunk(dispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.get(`/jobs/${jobId}`);
      if (response.status === 200) {
        const { job } = response.data;
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setSingleJob(job));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function fetchJobByemail(email) {
  return async function fetchJobByIdThunk(dispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.get(`/jobs/email/${email}`);
      console.log(response);
      if (response.status === 200) {
        const { job } = response.data;
        console.log(job);
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setJobByEmail(job));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function updateJob({ id, jobData }) {
  return async function addJobThunk(dispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.put(`/jobs/${id}`, jobData);
      if (response.status === 201) {
        dispatch(setStatus(Status.SUCCESS));
        toast.success(response?.data?.message);
        dispatch(setJobByEmail(response.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function deleteJob(jobId) {
  return async function fetchJobByIdThunk(dispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.delete(`/jobs/${jobId}`);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setDeleteJob({ jobId: jobId }));
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
