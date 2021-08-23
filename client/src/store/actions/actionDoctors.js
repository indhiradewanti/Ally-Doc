import axios from '../../url/axios'

export const ActionTypeDoctor = {
    allDoctor: 'ALL_DOCTOR',
    detailDoctor: 'DETAIL_DOCTOR',
    createDoctor: 'CREATE_DOCTOR',
    removeDoctor: 'REMOVE_DOCTOR',
    updateDoctor: 'UPDATE_DOCTOR',
    patchStatus: 'PATCH_STATUS_DOCTOR',
    patchPhoto: 'PATCH_PHOTO_DOCTOR',
    errorDoctor: 'ERROR_DOCTOR',
    loadingDoctor: 'LOADING_DOCTOR',
}

export const allDoctor = (payload) => {
    return {
        type: ActionTypeDoctor.allDoctor,
        payload
    }
}

export const detailDoctor = (payload) => {
    return {
        type: ActionTypeDoctor.detailDoctor,
        payload
    }
}

export const createDoctor = (payload) => {
    return {
        type: ActionTypeDoctor.createDoctor,
        payload
    }
}

export const removeDoctor = (payload) => {
    return {
        type: ActionTypeDoctor.removeDoctor,
        payload
    }
}

export const errorDoctor = (payload) => {
    return {
        type: ActionTypeDoctor.errorDoctor,
        payload
    }
}

export const loadingDoctor = (payload) => {
    return {
        type: ActionTypeDoctor.loadingDoctor,
        payload
    }
}

export const updateDoctor = (payload) => {
    return {
        type: ActionTypeDoctor.updateDoctor,
        payload
    }
}

export const patchStatusDoctor = (payload) => {
    return {
        type: ActionTypeDoctor.patchStatusDoctor,
        payload
    }
}

export const patchPhotoDoctor = (payload) => {
    return {
        type: ActionTypeDoctor.patchPhotoDoctor,
        payload
    }
}
export const fetchDataDoctor = () => async (dispatch) => {
    try {
        dispatch(loadingDoctor(true))
        const {data} = await axios.get('/doctor/')
        console.log(data)
        dispatch(loadingDoctor(false))
        dispatch(allDoctor(data))
    } catch (err) {
        console.log(err)        
    }
}

export const fetchDetailDoctor = (id) => async (dispatch) => {
    try {
        dispatch(loadingDoctor(true))
        const {data} = await axios.get(`/doctor/${id}`)
        dispatch(loadingDoctor(false))
        dispatch(detailDoctor(data))
    } catch (err) {
        console.log(err)
    }
}

export const createNewDoctor = (doctor) => async (dispatch) => {
    try {
        const {data} = await axios.post(`/doctor/`, doctor)
        console.log(data)
        dispatch(fetchDataDoctor())
    } catch (err) {
        console.log(err)
    }
}

export const updateRecentDoctor = (doctor) => async (dispatch) => {
    try {
        const {data} = await axios.put(`/doctor/${doctor._id}`, doctor)
        dispatch(updateDoctor(data))
    } catch (err) {
        console.log(err)
    }
}

export const updateStatusDoctor = (doctor) => async (dispatch) => {
    try {
        const {data} = await axios.patch(`/doctor/status/${doctor._id}`, doctor)
        dispatch(patchStatusDoctor(data))
    } catch (err) {
        console.log(err)       
    }
}

export const updatePhotoDoctor = (doctor) => async (dispatch) => {
    try {
        const {data} = await axios.patch(`/doctor/photo/${doctor._id}`, doctor)
        dispatch(patchPhotoDoctor(data))
    } catch (err) {
        console.log(err)
    }
}

export const removeRecentDoctor = (doctor) => async (dispatch) => {
    try {
        const {data} = await axios.delete(`/doctor/${doctor._id}`)
        dispatch(fetchDataDoctor())
    } catch (err) {
        console.log(err)
    }
}


