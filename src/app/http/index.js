import axios from "axios";

export const API = axios.create({
  baseURL: "https://job-portal-system-seven.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
