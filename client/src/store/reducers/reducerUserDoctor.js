import { ActionTypeUserDoctor } from "../actions/actionUserDoctor";

const initialState = {
	allUserDoctor: [
		{
			userId: "6120d2c530d05d0013c78f35",
			userName: "test",
			userGender: "male",
			userPhoto:
				"https://ik.imagekit.io/gubdxdpscil/Screenshot_20190618-201202_2_ZqWKa7ZEy.jpg",
			doctorId: "612149abf8ef170020f572b5",
			doctorName: "test",
			doctorPhoto:
				"https://ik.imagekit.io/gubdxdpscil/giphy_Dr116artZ.gif",
			doctorSpecialist: "ginjal",
		},
	],
	filterUserDoctor: {
		userId: "6120d2c530d05d0013c78f35",
		userName: "test",
		userGender: "male",
		userPhoto:
			"https://ik.imagekit.io/gubdxdpscil/Screenshot_20190618-201202_2_ZqWKa7ZEy.jpg",
		doctorId: "612149abf8ef170020f572b5",
		doctorName: "test",
		doctorPhoto: "https://ik.imagekit.io/gubdxdpscil/giphy_Dr116artZ.gif",
		doctorSpecialist: "ginjal",
	},
};

export default function ReducerUserDoctor(state = initialState, action) {
	switch (ActionTypeUserDoctor) {
		case ActionTypeUserDoctor.allUserDoctor:
			return (state = {
				...state,
				allUserDoctor: state.allUserDoctor.push(action.payload),
			});
		case ActionTypeUserDoctor.filterUserDoctor:
			let filter = state.allUserDoctor.filter(
				(el) => el.DoctorId === action.payload
			);
			return (state = {
				...state,
				filterUserDoctor: filter[0],
			});
		default:
			break;
	}
}
