import { call, put } from 'redux-saga/effects';
import { API, ApiMethod } from "../../services/Apicall"; 
import actionTypes from "../actionTypes";

function* getEventListingSaga(action) {
    try {  
        const response = yield call(ApiMethod.GET_WITH_TOKEN, API.eventListing,action.payload.token.token); 
        if (response.status === 200) {
            yield put({
                type: actionTypes.GET_EVENT_LISTING_SUCCESS,
                payload: response.data
            });
        } else {
            yield put({
                type: actionTypes.GET_EVENT_LISTING_FAILURE,
                payload: 'BAD REQUEST'
            });
        }
    } catch(err) {
        if(err.toString().includes("401")){
            yield put({
                type: actionTypes.GET_EVENT_LISTING_FAILURE_INVALID,
                payload: 'Invalid data'
            });
        } else{ 
            yield put({
                type: actionTypes.GET_EVENT_LISTING_FAILURE,
                payload: 'INTERNAL SERVER ERROR'
            });
        }
        
    }
    
}


export default getEventListingSaga;