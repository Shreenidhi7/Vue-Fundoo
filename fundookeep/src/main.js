import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import Apps from "./Apps.vue";

Vue.config.productionTip = false;

export const serverBus = new Vue();

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

new Vue({
  router,
  render: h => h(Apps)
}).$mount("#apps");
