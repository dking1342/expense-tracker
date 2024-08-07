import './assets/styles.css';
import type { PluginOptions } from 'vue-toastification';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import { createApp } from 'vue';
import App from './App.vue';

const options: PluginOptions = {};

const app = createApp(App);
app.use(Toast, options);
app.mount('#app');
