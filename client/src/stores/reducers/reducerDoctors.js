import { ActionTypeDoctor } from "../actions/actionDoctors";

const initialState = {
    allDoctor: [
        {
            _id: '',
            username: '',
            email: '',
            password: '',
            photo: '',
            specialist: '',
            price: null,
            role: 'Doctor',
            status: ''
        }
    ],
    loadingDoctor: false,
    errorDoctor: null,
    detailDoctor: {
        username: '',
        email: '',
        password: '',
        photo: '',
        specialist: '',
        price: null,
        role: '',
        status: '',
        address: ''
    },
    loggedIn: false,
    patchStatusDoctor: {
        message: 'failed'
    },
    patchPhotoDoctor: {
        message: 'failed'
    },
    updateDoctor: {
        email: ''
    }
}


export default function reducerDoctors(state= initialState, action){
    switch (action.type) {
        case ActionTypeDoctor.allDoctor:
            return {...state, allDoctor: action.payload}
        case ActionTypeDoctor.detailDoctor: 
            return {...state, detailDoctor: action.payload}
        case ActionTypeDoctor.errorDoctor:
            return {...state, errorDoctor: action.payload}
        case ActionTypeDoctor.updateDoctor:
            return {...state, updateDoctor: action.payload}
        case ActionTypeDoctor.patchPhoto:
            return {...state, patchPhotoDoctor: action.payload}
        case ActionTypeDoctor.patchStatus:
            return {...state, patchStatusDoctor: action.payload}
        case ActionTypeDoctor.updateDoctor:
            return {...state, updateDoctor: action.payload}    
        default:
            return state
    }
}