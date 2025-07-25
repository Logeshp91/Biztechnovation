import { call, put } from 'redux-saga/effects';
import { ApiMethod, API } from "../../services/Apicall";
import actionTypes from "../actionTypes";

function* postIntegrationAddeditLineRunSaga(action) {
    try {
        const { result, token } = action.payload;
        const response = yield call(ApiMethod.POST_WITH_TOKEN, API.integrationAddeditLineRun, result, token);
        console.log("reeeeeeeeeeee",response)
        if (response.status === 200) {
            yield put({
                type: actionTypes.POST_INTEGRATION_ADDEDIT_LINE_RUN_SUCCESS,
                payload: response.data
            });
        } else {
            yield put({
                type: actionTypes.POST_INTEGRATION_ADDEDIT_LINE_RUN_FAILURE,
                payload: 'BAD REQUEST'
            });
        }
    } catch (err) {
        console.error("API Call Error:", err);
        if (err.response && err.response.status === 401) {
            yield put({
                type: actionTypes.POST_INTEGRATION_ADDEDIT_LINE_RUN_FAILURE_INVALID,
                payload: 'Invalid email or password'
            });
        } else {
            yield put({
                type: actionTypes.POST_INTEGRATION_ADDEDIT_LINE_RUN_FAILURE,
                payload: 'INTERNAL SERVER ERROR'
            });
        }
    }
}

export default postIntegrationAddeditLineRunSaga;

