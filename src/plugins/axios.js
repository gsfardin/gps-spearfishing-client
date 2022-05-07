import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_GPS_GATEWAY_URL

Vue.use({
    install(Vue) {
        Vue.prototype.$http = axios
    },  
})