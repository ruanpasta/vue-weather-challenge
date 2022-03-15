export const weatherCardProps = {
  name: { type: String, required: true },
  title: { type: String, required: true },
  temperature: { type: Number, required: true },
  informations: { type: Array },
  lastUpdate: { type: Date },
  loading: { type: Boolean },
  errorMessage: { type: String },
};

export default class Weather {
  constructor({
    name = "",
    title = "",
    temperature = 0,
    informations = [],
    lastUpdate = "",
    loading = false,
    errorMessage = "",
  }) {
    this.name = name;
    this.title = title;
    this.temperature = temperature;
    this.informations = informations;
    this.lastUpdate = lastUpdate;
    this.loading = loading;
    this.errorMessage = errorMessage;
  }
}
