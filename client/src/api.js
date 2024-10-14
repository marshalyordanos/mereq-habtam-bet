import axios from "axios";
// const accessToken = useLocalStorageGetter("auth");

const api = axios.create({
  baseURL: "https://mereq-habtam-bet-1.onrender.com/api/v1",
  // baseURL: "http://localhost:8000/api/v1",
});

export default api;
