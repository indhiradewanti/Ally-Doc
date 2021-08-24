import ActionTypeUserDoctor from "../../";

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

export default function ReducerUserDoctor(state = initialState, action) {
	switch (ActionTypeUserDoctor.allUserDoctor) {
		case ActionTypeUserDoctor.allUserDoctor:
			return {
				...state,
				allUserDoctors: [...state.allUserDoctors, action.payload],
			};
		case ActionTypeUserDoctor.filterUserDoctor:
			let filter = allUserDoctors.find(
				(userDoctor) => userDoctor.doctorId === action.payload
			);
			return { ...state, filterUserDoctor: filter };
		default:
			return state;
	}
}
