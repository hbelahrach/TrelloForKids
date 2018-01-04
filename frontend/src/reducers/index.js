/*
* @author  Hamid belahrach
*/

import { combineReducers } from "redux";
import boards from "./boards";
import sessions from "./session";

export default combineReducers({
	boards,
	session: sessions
});
