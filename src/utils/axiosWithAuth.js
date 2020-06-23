import axios from "axios";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    // baseURL: "https://xh84o.sse.codesandbox.io/api/",
    baseURL: "",
    headers: {
      Authorization: token,
    },
  });
};