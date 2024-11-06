import axios from "axios";
export default () => {
  const API_URL = import.meta.env.VITE_API_URL
  const token = window.localStorage.getItem("token");
  if (token) {
    return axios.create({
      baseURL: API_URL,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
  return axios.create({
    baseURL: API_URL,
  })

}
