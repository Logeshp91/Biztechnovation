import { call, put } from 'redux-saga/effects';
import { ApiMethod, API } from "../../services/Apicall";
import actionTypes from "../actionTypes";

function* postSetMpinSaga(action) {
    console.log("Saga triggered with action:", action.payload);

    try {
        const { token, mPin, geoLocation, paramStr } = action.payload;
        console.log("token, mPin, geoLocation, paramStr ",token, mPin, geoLocation, paramStr )
        const data = { mPin, geoLocation, paramStr };
        console.log("daaaaata",data)
        const response = yield call(ApiMethod.POST_WITH_TOKEN, API.empSetMpin, data, token,paramStr);
        console.log("API Response:", response);

        if (response.status === 200) {
            if (response.data.result === "Success") {
                yield put({
                    type: actionTypes.POST_SET_MPIN_SUCCESS,
                    payload: response.data
                });
            } else {
                yield put({
                    type: actionTypes.POST_SET_MPIN_FAILURE,
                    payload: response.data.Msg || 'Unknown error occurred'
                });
            }
        } else {
            yield put({
                type: actionTypes.POST_SET_MPIN_FAILURE,
                payload: 'BAD REQUEST'
            });
        }
    } catch (err) {
        console.error("Saga error:", err);

        if (err.response) {
            console.error("Error response data:", err.response.data);
        }
        if (err.toString().includes("401")) {
            yield put({
                type: actionTypes.POST_SET_MPIN_FAILURE_INVALID,
                payload: 'Invalid data'
            });
        } else {
            yield put({
                type: actionTypes.POST_SET_MPIN_FAILURE,
                payload: 'INTERNAL SERVER ERROR'
            });
        }
    }
}

export default postSetMpinSaga;
