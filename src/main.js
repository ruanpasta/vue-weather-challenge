import { createApp } from "vue";
import { createStore } from "vuex"
import App from "@/App.vue";
import router from "@/router";
import injectDirectives from "./directives";
import globalStore from "@/store";

const app = createApp(App);

const store = createStore(globalStore);

injectDirectives(app);

app.use(router);
app.use(store);

app.mount("#app");
