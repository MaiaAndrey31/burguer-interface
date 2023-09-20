import axios from 'axios'

const apiBurguer = axios.create({
    baseURL: 'http://localhost:3001'
})

apiBurguer.interceptors.request.use(async config => {

     const userData = await localStorage.getItem('burger:userInfo')
     const token = userData && JSON.parse(userData).token
     config.headers.Authorization = `Bearer ${token}` 
     return config

})

export default apiBurguer