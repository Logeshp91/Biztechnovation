import { call, put } from 'redux-saga/effects';
import { API, ApiMethod } from "../../services/Apicall"; 
import actionTypes from "../actionTypes";

function* postForgotPasswordSaga(action) {
    console.log("ACTION",action)
    try {  
        const response = yield call(ApiMethod.POST, API.empForgotPassword, action.payload.params);
        if (response.status === 200) {
            yield put({
                type: actionTypes.POST_FORGOT_PASSWORD_SUCCESS,
                payload: response.data
            });
        } else {
            yield put({
                type: actionTypes.POST_FORGOT_PASSWORD_FAILURE,
                payload: 'BAD REQUEST'
            });
        }
    } catch(err) {
        if (err.response && err.response.status === 401) {

            yield put({
                type: actionTypes.POST_FORGOT_PASSWORD_FAILURE_INVALID,
                payload: 'Invalid email or password'
            });
        } else {
            yield put({
                type: actionTypes.POST_FORGOT_PASSWORD_FAILURE,
                payload: 'INTERNAL SERVER ERROR'
            });
        }
    }
}

export default postForgotPasswordSaga;
