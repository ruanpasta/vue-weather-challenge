import { createApp } from "vue";
import { createStore } from "vuex";
import App from "./App.vue";
import router from "./router";
import globalStore from "./store";

const app = createApp(App);

const store = createStore(globalStore);

app.use(router);
app.use(store);

app.mount("#app");
