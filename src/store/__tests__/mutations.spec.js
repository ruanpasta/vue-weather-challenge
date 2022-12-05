// mutations.spec.js
import { describe, expect, it } from "vitest";
import mutations from "../../store/mutations.js";
import { Weather } from "../../components/WeatherCard";

// destructure assign `mutations`
const {
  SET_WEATHERS: setWeathers,
  SET_WEATHER: setWeather,
  UPDATE_WEATHER_LOADING: updateWeatherLoading,
} = mutations;

describe("Mutations", () => {
  it("set_weathers", () => {
    const state = { weathers: [] };

    const weathers = [];
    const weather = new Weather({
      name: "mutation",
      title: "Mutation",
      temperature: 100,
      informations: [],
      lastUpdate: new Date(),
    });

    weathers.push(weather);

    setWeathers(state, { weathers });

    expect(state.weathers).toHaveLength(1);
  });

  it("set_weather", () => {
    const state = { weathers: [] };

    const weather = new Weather({
      name: "mutation",
      title: "Mutation",
      temperature: 100,
      informations: [],
      lastUpdate: new Date(),
    });

    setWeather(state, { weather });

    expect(state.weathers).toHaveLength(1);
  });

  it("update_weather_loading", () => {
    const weather = new Weather({
      name: "mutation",
      title: "Mutation",
      temperature: 100,
      informations: [],
      loading: false,
      lastUpdate: new Date(),
    });

    const state = { weathers: [weather] };

    updateWeatherLoading(state, { cityName: weather.name, loading: true });

    expect(state.weathers).toHaveLength(1);
    expect(state.weathers[0].loading).toBe(true);

    updateWeatherLoading(state, { cityName: weather.name, loading: false });
    expect(state.weathers[0].loading).toBe(false);
  });
});
