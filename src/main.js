// src/main.js
import { createApp } from "vue";
import App from "./App.vue";

// Vuetify
import "vuetify/styles"; // <– this now works after vite-plugin-vuetify
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(vuetify).mount("#app");
