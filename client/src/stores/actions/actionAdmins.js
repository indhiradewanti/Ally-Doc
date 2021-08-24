import axios from '../../url/axios'

export const regisAdmin = (user) => async (dispatch) => {
    try {
        const {data} = await axios.post('/admin/register', user)
        // console.log(data)
        localStorage.setItem('access_token', data.access_token)
    } catch (err) {
        console.log(err)
    }
}

export const loginAdmin = (user) => async (dispatch) => {
    try {
        const {data} = await axios.post('/admin/login', {
        email: user.email, password: user.password
        })
        console.log(data,'data admin')
      //   localStorage.setItem('access_token', data.access_token)
    } catch (err) {
        console.log(err)
    }
}