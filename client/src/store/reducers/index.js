import { combineReducers } from 'redux'
import ReducerDoctors from './reducerDoctors'
import ReducerHistory from './reducerHistory'
import ReducerUserDoctor from './reducerUserDoctor'
import ReducerUsers from './reducerUsers'

const allReducer = combineReducers({
    doctors: ReducerDoctors,
    histories: ReducerHistory,
    users: ReducerUsers,
    userDoctor: ReducerUserDoctor
})

export default allReducer