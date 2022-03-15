import getters from "@/store/getters.js";
import { describe, expect, it } from "vitest";
import { Weather } from "@/components/WeatherCard";

const { getWeathersState, getWeatherFromCity, getLastUpdatedFromCity } =
  getters;

const state = {
  weathers: [
    new Weather({
      name: "getter",
      title: "Getter",
      temperature: 1,
      informations: [],
      lastUpdate: new Date(),
    }),
    new Weather({
      name: "mutation",
      title: "Mutation",
      temperature: 100,
      informations: [],
      lastUpdate: new Date(),
    }),
  ],
};

describe("Getters", () => {
  it("get_weathers_state", () => {
    const result = getWeathersState(state);

    expect(result).toHaveLength(2);
    expect(result).to.deep.equal(state.weathers);
  });
  it("get_weather_fromCity", () => {
    const result = getWeatherFromCity(state, { cityName: "mutations" });

    expect(result).toHaveLength(1);
    expect(result).toBeTypeOf("function");
  });

  it("get_lastUpdated_fromCity", () => {
    const result = getLastUpdatedFromCity(state, { cityName: "getter" });

    expect(result).toHaveLength(1);
    expect(result).toBeTypeOf("function");
  });
});
