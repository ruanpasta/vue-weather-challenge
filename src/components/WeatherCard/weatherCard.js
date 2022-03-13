const weatherCardProps = {
  title: {
    type: String,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
  temperatureColor: {
    type: String,
    default: "",
  },
  informations: {
    type: Array,
  },
  lastUpdate: {
    type: String,
  },
  loading: {
    type: Boolean,
  },
  errorMessage: {
    type: String,
  },
};

export default weatherCardProps;
