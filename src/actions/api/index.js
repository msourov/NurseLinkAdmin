import axios from "axios";
const API = import.meta.env.VITE_APP_API_BASE_URL;
console.log(API);
export default (token = false) => {
  return axios.create({
    baseURL: API,
    headers: {
      "Content-type": "application/json",
      authorization: `bearer ${token}`,
    },
  });
};
