// axios
import axios from 'axios'

const _owned_API = axios.create({
    baseURL: import.meta.env.VITE_OWN_API_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
    },
    proxyHeaders: false,
    credentials: false,
})

export { _owned_API }