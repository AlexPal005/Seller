import a from 'axios'

import config from './config.json'


const baseurl: string = `${config.host}/api`;

const Axios = a.create({
    baseURL: baseurl
})

Axios.interceptors.request.use(config => {
        if (config.url !== '/auth/login' && config.url !== '/auth/register') {
            const accessToken = localStorage.getItem("accessToken")
            if (accessToken) {
                config.headers["Authorization"] = `Bearer ${accessToken}`
            }
        }
        return config
    }
)


Axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default Axios