import axios from 'axios'

const url = axios.create({
    baseURL: 'http://localhost:4000'
})

export default url