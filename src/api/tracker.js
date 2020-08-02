import axios from 'axios';

const KEY = '3cl0we7vmj5r4derkck6rt388qgmi4'

export default axios.create({
    baseURL: `https://api.barcodelookup.com/v2/products?key=${KEY}`,
    headers: {
        Authorization: 
        'Client-ID sS_HFwBwDLegtQCBv7JsucA9d7gwHerXVKGUAbbpjmA'
    }
});