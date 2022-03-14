import http from "@/http";

export default class WeatherService {
  getWeatherByCityName(cityName, unit = "metric", lang = "pt_br") {
    return http
      .get(`weather?q=${cityName}&units=${unit}&lang=${lang}`)
      .then((res) => res)
      .catch((err) => {
        console.log(err);
        throw new Error("Something went wrong");
      });
  }
}
