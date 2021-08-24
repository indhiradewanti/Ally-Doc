import { combineReducers } from "redux";
import ReducerDoctors from "./reducerDoctors";
import ReducerHistory from "./reducerHistory";
import ReducerUsers from "./reducerUsers";
import ReducerUserDoctor from "./reducerDoctorUser";

const allReducer = combineReducers({
	doctors: ReducerDoctors,
	histories: ReducerHistory,
	users: ReducerUsers,
	userDoctor: ReducerUserDoctor,
});

export default allReducer;
