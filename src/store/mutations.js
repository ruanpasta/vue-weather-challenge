const mutations = {
  SET_WEATHERS(state, { weathers }) {
    state.weathers = weathers;
  },
  SET_WEATHER(state, { weather }) {
    const index = state.weathers.findIndex((res) => res.name === weather.name);
    if (index === -1) return state.weathers.push(weather);
    state.weathers.splice(index, 1, weather);
  },
  UPDATE_WEATHER_LOADING(state, { cityName, loading }) {
    const weather = state.weathers.find((res) => res.name === cityName);
    if (weather) weather.loading = loading;
  },
};

export default mutations;
