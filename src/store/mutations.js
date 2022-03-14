const mutations = {
  SET_WEATHERS(state, { weathers }) {
    state.weathers = weathers;
  },
  SET_WEATHER(state, { weather }) {
    state.weathers = state.weathers.map((element) =>
      element.name === weather.name ? weather : element
    );
  },
  SET_LOADING_WEATHER(state, { cityName, loading }) {
    state.weathers = state.weathers.map((element) => {
      if (element.name === cityName) {
        element.loading = loading;
        return element;
      }
      return element;
    })
  }
}

export default mutations;