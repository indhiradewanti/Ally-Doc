import { ActionTypeDoctor } from "../actions/actionDoctors";

const initialState = {
    allDoctor: [
        {
            _id: '073767',
            username: 'test',
            email: 'test@mail.com',
            password: 'test',
            photo: 'balala.jpg',
            specialist: 'test',
            price: 20000,
            role: 'Doctor',
            status: 'online'
        }
    ],
    loadingDoctor: false,
    errorDoctor: null,
    detailDoctor: {
        username: 'test',
        email: 'test@mail.com',
        password: 'test',
        photo: 'balala.jpg',
        specialist: 'test',
        price: 20000,
        role: 'Doctor',
        status: 'online'
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


export default function ReducerDoctors(state= initialState, action){
    switch (action.type) {
        case ActionTypeDoctor.allDoctor:
            return state = {...state, allDoctor: action.payload}
        case ActionTypeDoctor.detailDoctor: 
            return state = {...state, detailDoctor: action.payload}
        case ActionTypeDoctor.errorDoctor:
            return state = {...state, errorDoctor: action.payload}
        case ActionTypeDoctor.updateDoctor:
            return state = {...state, updateDoctor: action.payload}
        case ActionTypeDoctor.patchPhoto:
            return state = {...state, patchPhotoDoctor: action.payload}
        case ActionTypeDoctor.patchStatus:
            return state = {...state, patchStatusDoctor: action.payload}
        case ActionTypeDoctor.updateDoctor:
            return state = {...state, updateDoctor: action.payload}    
        default:
            break;
    }
}