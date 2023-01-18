import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import './index.css'


import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { Bootstrap5Pagination } from 'laravel-vue-pagination';


import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'



const app = createApp(App)
app.use(router)
app.use(Bootstrap5Pagination)
app.use(VueSweetalert2);
app.mount('#app')
