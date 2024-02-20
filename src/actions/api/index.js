import axios from "axios";
const API = import.meta.env.VITE_APP_API_BASE_URL;

export default (token = false) => {
  return axios.create({
    // baseURL: API,
    baseURL: "http://api.demo2.hidayahsmart.solutions/",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};
