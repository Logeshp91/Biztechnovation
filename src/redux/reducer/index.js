import { combineReducers } from "redux";
import postauthendicationReducer from "./postauthendication.Reducer";
import postcreatevisitReducer from "./postcreatevisit.Reducer";
import odooReducer from "./oodo.Reducer";
const reducer =combineReducers({


postauthendicationReducer,   
postcreatevisitReducer,
odooReducer,


})

export default reducer;