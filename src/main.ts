import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { Form, Field, CellGroup, Cell } from "vant";
import { Icon } from "vant";
import { Empty } from "vant";
import { Tag } from "vant";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(Form);
app.use(Field);
app.use(Cell);
app.use(CellGroup);
app.use(Tag);
app.use(Icon);
app.use(Empty);

app.mount("#app");
