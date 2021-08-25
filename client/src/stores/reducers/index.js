import { combineReducers } from "redux";
import ReducerDoctors from "./reducerDoctors";
import ReducerDoctorUser from "./reducerDoctorUser";
import ReducerHistory from "./reducerHistory";
import ReducerUsers from "./reducerUsers";

const allReducer = combineReducers({
	doctors: ReducerDoctors,
	histories: ReducerHistory,
	users: ReducerUsers,
	doctorUser: ReducerDoctorUser,
});

export default allReducer;
