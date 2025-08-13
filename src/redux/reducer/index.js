import { combineReducers } from "redux";
import postauthendicationReducer from "./postauthendication.Reducer";
import postcreatevisitReducer from "./postcreatevisit.Reducer";
import odooReducer from "./oodo.Reducer";
import postAccessReadReducer from "./postAccessRead.Reducer";

const reducer =combineReducers({


postauthendicationReducer,   
postcreatevisitReducer,
odooReducer,
postAccessReadReducer

})

export default reducer;