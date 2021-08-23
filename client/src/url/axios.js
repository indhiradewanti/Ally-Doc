import axios from 'axios'

const url = axios.create({
    baseURL: 'http://34.207.67.233:3000'
})

export default url