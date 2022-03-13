import { createApp } from "vue";
import App from "./App.vue";
import injectDirectives from "./directives";

const app = createApp(App);

injectDirectives(app);

app.mount("#app");
