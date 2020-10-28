import {createApp} from 'vue'
import App from './App.vue'
import { Button } from 'vant';

createApp(App)
    .use(Button)
    .mount('#app');