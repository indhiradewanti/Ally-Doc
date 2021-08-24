import { ActionTypeUser } from "../actions/actionUsers";

const initialState = {
	allUser: [
		{
			email: "",
			password: "",
			username: "",
			weight: null,
			age: null,
			phone_number: "",
			gender: "",
			height: null,
			display_picture: "",
		},
	],
	detailUser: {
		email: "",
		password: "",
		username: "",
		weight: null,
		age: null,
		phone_number: "",
		gender: "",
		height: null,
		display_picture: "",
	},
	loadingUser: false,
	errorUser: null,
	accessToken: null,
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypeUser.allUser:
			return {
				...state,
				allUser: action.payload,
			};
		case ActionTypeUser.detailUser:
			return { ...state, detailUser: action.payload };
		case ActionTypeUser.errorUser:
			return { ...state, errorUser: action.payload };
		case ActionTypeUser.loadingUser:
			return { ...state, loadingUser: action.payload };
		case ActionTypeUser.isLogin:
			return { ...state, accessToken: action.payload };
		default:
			return state;
	}
}
