import { ActionTypeHistory } from "../actions/actionHistory";

const initialState = {
	allHistory: [
		{
			name: "test",
			age: 17,
			gender: "male",
			status: "in progress",
		},
	],
};

export default function ReducerHistory(state = initialState, action) {
	switch (action.type) {
		case ActionTypeHistory.allHistory:
			return (state = { ...state, allHistory: action.payload });
		default:
			return state;
	}
}
