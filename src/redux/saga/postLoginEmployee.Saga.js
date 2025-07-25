import { call, put } from 'redux-saga/effects';
import { API, ApiMethod } from "../../services/Apicall"; 
import actionTypes from "../actionTypes";

function* postLoginEmployeeSaga(action) {
    try {  
        const response = yield call(ApiMethod.POST, API.empLogin, action.payload.params);
        if (response.status === 200) {
            yield put({
                type: actionTypes.POST_LOGIN_EMPLOYEE_SUCCESS,
                payload: response.data
            });
        } else {
            yield put({
                type: actionTypes.POST_LOGIN_EMPLOYEE_FAILURE,
                payload: 'BAD REQUEST'
            });
        }
    } catch(err) {
        if (err.response && err.response.status === 401) {

            yield put({
                type: actionTypes.POST_LOGIN_EMPLOYEE_FAILURE_INVALID,
                payload: 'Invalid email or password'
            });
        } else {
            yield put({
                type: actionTypes.POST_LOGIN_EMPLOYEE_FAILURE,
                payload: 'INTERNAL SERVER ERROR'
            });
        }
    }
}

export default postLoginEmployeeSaga;
