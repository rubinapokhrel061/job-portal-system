import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Status } from "@/app/globals/status";
import { API } from "@/app/http/index";

const initialState = {
  FavJobs: [],
  status: Status.LOADING,
};

const favouriteJobsSlice = createSlice({
  name: "favouriteJobs",
  initialState,
  reducers: {
    addFavourite: (state, action) => {
      if (
        !state.FavJobs.some(
          (favjob) => favjob.job._id === action.payload.job._id
        )
      ) {
        state.FavJobs.push(action.payload);
      }
    },
    removeFavourite: (state, action) => {
      state.FavJobs = state.FavJobs.filter(
        (favjob) => favjob.job._id !== action.payload._id
      );
    },
    setFavourites: (state, action) => {
      state.FavJobs = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { addFavourite, removeFavourite, setFavourites, setStatus } =
  favouriteJobsSlice.actions;
export default favouriteJobsSlice.reducer;

export function addToFavourites(favjob) {
  return async function addToFavouritesThunk(dispatch) {
    try {
      const response = await API.post("/favorite-job", favjob);
      if (response.status === 201) {
        dispatch(addFavourite(response.data.favouriteJob));
        toast.success(response?.data?.message);
        dispatch(setStatus(Status.SUCCESS));
      } else {
        toast.error("Failed to add job to favourites.");
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function removeFromFavourites(jobId, userEmail) {
  return async function removeFromFavouritesThunk(dispatch) {
    try {
      const response = await API.delete(`/favorite-job/${jobId}/${userEmail}`);
      if (response.status === 200) {
        dispatch(removeFavourite({ _id: jobId }));
        toast.success(response?.data?.message);
        dispatch(setStatus(Status.SUCCESS));
      } else {
        toast.error("Failed to remove job from favourites.");
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function fetchFavouriteJobsByEmail(email) {
  return async function fetchFavouriteJobsByEmailThunk(dispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.get(`/favorite-job/getbyemail/${email}`);
      if (response.status === 200) {
        const { favouriteJobs } = response.data;
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setFavourites(favouriteJobs));
      } else {
        dispatch(setStatus(Status.ERROR));
        toast.error("Failed to fetch favourite jobs.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
