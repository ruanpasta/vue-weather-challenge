import axios from "axios";

const http = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/",
});

const apiWeatherKey = "7281b6b6274a041cb4b666406e120705";

http.interceptors.request.use(
  (config) => {
    config.url += `&appid=${apiWeatherKey}`;
    return config;
  },
  (err) => Promise.reject(err)
);

export default http;
