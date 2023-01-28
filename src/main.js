import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
export const baseUrl = import.meta.env.VITE_LOCATION_IQ_API_URL
createApp(App).mount('#app')
