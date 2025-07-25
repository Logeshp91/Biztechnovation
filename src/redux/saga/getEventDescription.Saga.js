import { call, put } from 'redux-saga/effects';
import { API, ApiMethod } from "../../services/Apicall"; 
import actionTypes from "../actionTypes";

function* getEventDescriptionSaga(action) {

    if (action.type === actionTypes.CLEAR_EVENT_DATA) {
        return;
    }
    try {  
        const response = yield call(ApiMethod.GET_WITH_TOKEN, API.eventDescription,action.payload.token.token); 
  
        if (response.status === 200) {
            yield put({
                type: actionTypes.GET_EVENT_DESCRIPTION_SUCCESS,
                payload: response.data
            });
        } else {
            yield put({
                type: actionTypes.GET_EVENT_DESCRIPTION_FAILURE,
                payload: 'BAD REQUEST'
            });
        }
    } catch(err) {

        if(err.toString().includes("401")){
            yield put({
                type: actionTypes.GET_EVENT_DESCRIPTION_FAILURE_INVALID,
                payload: 'Invalid data'
            });
        } else{ 
            yield put({
                type: actionTypes.GET_EVENT_DESCRIPTION_FAILURE,
                payload: 'INTERNAL SERVER ERROR'
            });
        }
        
    }
    
}

export default getEventDescriptionSaga;