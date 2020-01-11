import { combineReducers } from 'redux';
import TuneReducer from './TuneReducer'
import UserReducer from './UserReducer'

const rootReducer = combineReducers({
  tune: TuneReducer,
  user: UserReducer
})

export default rootReducer;