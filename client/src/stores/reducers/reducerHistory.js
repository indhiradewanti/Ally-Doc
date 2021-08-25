import { ActionTypeHistory } from "../actions/actionHistory.js";

const initialState = {
	allHistory: [],
};

export default function ReducerHistory(state = initialState, action) {
	switch (action.type) {
		case ActionTypeHistory.allHistory:
			console.log(action.payload, `ini action payload`);
			return (state = { ...state, allHistory: action.payload });
		default:
			return state;
	}
}
