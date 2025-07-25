// Saga function to handle post MPIN request
import { call, put } from 'redux-saga/effects';
import { ApiMethod, API } from "../../services/Apicall";
import actionTypes from "../actionTypes";

function* postMpinEmployeeSaga(action) {
    console.log("Saga triggered with action:", action.payload);
    try {
        const { token, mPin, geoLocation, paramStr } = action.payload;
        console.log("token, mPin, geoLocation, paramStr ", token, mPin, geoLocation, paramStr);
        const data = { mPin, geoLocation, paramStr };
        console.log("daaaaata", data);
        const response = yield call(ApiMethod.POST_WITH_TOKEN, API.empMpin, data, token);
        console.log("API Response:", response);

        if (response.status === 200) {
            yield put({
                type: actionTypes.POST_MPIN_EMPLOYEE_SUCCESS,
                payload: response.data
            });
                } else {
            yield put({
            type: actionTypes.POST_MPIN_EMPLOYEE_FAILURE,
             payload: 'BAD REQUEST'
            });
        }
    } catch (err) {
        if (err.response && err.response.status === 401) {
            yield put({
                type: actionTypes.POST_MPIN_EMPLOYEE_FAILURE_INVALID,
                payload: 'Invalid Request'
            });
        } else {
            yield put({
                type: actionTypes.POST_MPIN_EMPLOYEE_FAILURE,
                payload: 'INTERNAL SERVER ERROR'
            });
        }
    }
}
export default postMpinEmployeeSaga;