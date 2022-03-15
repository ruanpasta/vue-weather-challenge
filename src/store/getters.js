export default {
  getWeathersState(state) {
    return state.weathers;
  },
  getWeatherFromCity: (state) => (cityName) =>
    state.weathers.find((element) => element.name === cityName),
  getLastUpdatedFromCity: (state) => (cityName) => {
    const weather = state.weathers.find((element) => element.name === cityName);
    return weather ? weather.lastUpdate : null;
  },
};
