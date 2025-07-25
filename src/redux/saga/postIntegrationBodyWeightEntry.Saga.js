import { call, put } from 'redux-saga/effects';
import { ApiMethod, API } from "../../services/Apicall";
import actionTypes from "../actionTypes";

function* postIntegrationBodyWeightEntrySaga(action) {
    console.log("Saga action received:", action);
    try {
       const { result, token } = action.payload;
        const response = yield call(ApiMethod.POST_WITH_TOKEN, API.integrationBodyWeightEntry, result, token);
        console.log("BODYWEIGHT",response);
        if (response && response.status === 200) {
            yield put({
                type: actionTypes.POST_INTEGRATION_BODY_WEIGHT_ENTRY_SUCCESS,
                payload: response.data
            });
        } else {
            yield put({
                type: actionTypes.POST_INTEGRATION_BODY_WEIGHT_ENTRY_FAILURE,
                payload: 'BAD REQUEST'
            });
        }
    } catch (err) {
        if (err.response && err.response.status === 401) {
            yield put({
                type: actionTypes.POST_INTEGRATION_BODY_WEIGHT_ENTRY_FAILURE,
                payload: 'Invalid Request'
            });
        } else {
            yield put({
                type: actionTypes.POST_INTEGRATION_BODY_WEIGHT_ENTRY_FAILURE_INVALID,
                payload: 'INTERNAL SERVER ERROR'
            });
        }
    }
}

export default postIntegrationBodyWeightEntrySaga;
