import { ActionTypeUserDoctor } from "../actions/actionUserDoctor";

const initialState = {
    allUserDoctor: [
        {
            UserId: '6120d2c530d05d0013c78f35',
            UserName: 'test',
            UserGender: 'male',
            UserPhoto: "https://ik.imagekit.io/gubdxdpscil/Screenshot_20190618-201202_2_ZqWKa7ZEy.jpg",
            DoctorId: '612149abf8ef170020f572b5',
            DoctorName: 'test',
            DoctorPhoto: 'https://ik.imagekit.io/gubdxdpscil/giphy_Dr116artZ.gif',
            DoctorSpecialist: 'ginjal'
        }
    ],
    filterUserDoctor: {
        UserId: '6120d2c530d05d0013c78f35',
        UserName: 'test',
        UserGender: 'male',
        UserPhoto: "https://ik.imagekit.io/gubdxdpscil/Screenshot_20190618-201202_2_ZqWKa7ZEy.jpg",
        DoctorId: '612149abf8ef170020f572b5',
        DoctorName: 'test',
        DoctorPhoto: 'https://ik.imagekit.io/gubdxdpscil/giphy_Dr116artZ.gif',
        DoctorSpecialist: 'ginjal'
    }
}

export default function ReducerUserDoctor(state= initialState, action){
    switch (ActionTypeUserDoctor) {
        case ActionTypeUserDoctor.allUserDoctor:
            return state = {...state, allUserDoctor: state.allUserDoctor.push(action.payload)}
        case ActionTypeUserDoctor.filterUserDoctor:
            let filter = state.allUserDoctor.filter(el => el.DoctorId === action.payload)
            return state = {
                ...state,
                filterUserDoctor: filter[0]
            }    
        default:
            break;
    }
}