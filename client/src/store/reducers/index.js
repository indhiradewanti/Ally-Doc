import { combineReducers } from 'redux'
import ReducerDoctors from './reducerDoctors'
import ReducerHistory from './reducerHistory'
import ReducerUsers from './reducerUsers'

const allReducer = combineReducers({
    doctors: ReducerDoctors,
    histories: ReducerHistory,
    users: ReducerUsers
})

export default allReducer