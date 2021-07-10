import { combineReducers } from "redux";

import {setCurrentUser} from "./reducers/user.reducer";

export default combineReducers({
    user:setCurrentUser
})

