import { ActionTypeUser } from "../actions/actionUsers";

const initialState = {
    allUser: [
        {
            email: 'test',
            password: 'test',
            username: 'test',
            weight: 'test',
            age: 17,
            phone_number: '0242424',
            gender: 'male',
            height: '186',
            display_picture: 'wkwkwk'
        }
    ],
    detailUser:         
    {
        email: 'test',
        password: 'test',
        username: 'test',
        weight: 'test',
        age: 17,
        phone_number: '0242424',
        gender: 'male',
        height: '186',
        display_picture: 'wkwkwk'
    },
    loadingUser: false,
    errorUser: null
}

export default function ReducerUsers(state= initialState, action){
    switch (action.type) {
        case ActionTypeUser.allUser:
            return state = {...state, allUser: action.payload}
        case ActionTypeUser.detailUser:
            return state = {...state, detailUser: action.payload}
        case ActionTypeUser.loadingUser:
            return state = {...state, loadingUser: action.payload}
        case ActionTypeUser.errorUser:
            return state = {...state, errorUser: action.payload}
        default:
            break;
    }
}