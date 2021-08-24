import {ActionTypeUserDoctor} from "../../stores/actions/actionDoctorUser.js";

const initialState = {
    allUserDoctors: [
        {
            userId: "",
            userName: "",
            userGender: "",
            userPhoto: "",
            doctorId: "",
            doctorName: "",
            doctorPhoto: "",
            doctorSpecialist: "",
        },
    ],
    filterUserDoctor: {
        userId: "",
        userName: "",
        userGender: "",
        userPhoto: "",
        doctorId: "",
        doctorName: "",
        doctorPhoto: "",
        doctorSpecialist: "",
    },
};

export default function ReducerDoctorUser(state = initialState, action) {
    switch (ActionTypeUserDoctor.allUserDoctor) {
        case ActionTypeUserDoctor.allUserDoctor:
            return {
                ...state,
                allUserDoctors: [...state.allUserDoctors, action.payload],
            };
        case ActionTypeUserDoctor.filterUserDoctor:
            let filter = state.allUserDoctors.find(
                (userDoctor) => userDoctor.doctorId === action.payload
            );
            return { ...state, filterUserDoctor: filter };
        default:
            return state;
    }
}