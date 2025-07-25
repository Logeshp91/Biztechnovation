import { call, put } from 'redux-saga/effects';
import { ApiMethod, API } from "../../services/Apicall";
import actionTypes from "../actionTypes";

function* postIntegrationStartLineRunSaga(action) {
    try {
       const { result, token } = action.payload;
        const response = yield call(ApiMethod.POST_WITH_TOKEN, API.integrationStartLineRun, result, token);

        if (response && response.status === 200) {
            yield put({
                type: actionTypes.POST_INTEGRATION_START_LINE_RUN_SUCCESS,
                payload: response.data.Data
            });
        } else {
            yield put({
                type: actionTypes.POST_INTEGRATION_START_LINE_RUN_FAILURE,
                payload: 'BAD REQUEST'
            });
        }
    } catch (err) {
        if (err.response && err.response.status === 401) {
            yield put({
                type: actionTypes.POST_INTEGRATION_START_LINE_RUN_FAILURE_INVALID,
                payload: 'Invalid Request'
            });
        } else {
            yield put({
                type: actionTypes.POST_INTEGRATION_START_LINE_RUN_FAILURE,
                payload: 'INTERNAL SERVER ERROR'
            });
        }
    }
}

export default postIntegrationStartLineRunSaga;
