import { ActionTypeUserDoctor } from "../../stores/actions/actionDoctorUser.js";

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
	isLogin: "",
};

export default function ReducerDoctorUser(state = initialState, action) {
	switch (action.type) {
		case ActionTypeUserDoctor.allUserDoctor:
			return {
				...state,
				allUserDoctors: [action.payload],
			};
		case ActionTypeUserDoctor.filterUserDoctor:
			let filter = state.allUserDoctors.find(
				(userDoctor) => userDoctor.doctorId === action.payload
			);
			return { ...state, filterUserDoctor: filter };
		case ActionTypeUserDoctor.isLogin:
			console.log(action.payload);
			return { ...state, isLogin: action.payload };
		default:
			return state;
	}
}
