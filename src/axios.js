import axios from "axios";

export const api = axios.create({
  baseURL: `https://api.clinicaltrialskorea.com/api/v1/search-conditions/?name=`,
  headers: {
    "Content-Type": "application/json",
  },
});
