import { call, put } from 'redux-saga/effects';
import { ApiMethod, API } from "../../services/Apicall";
import actionTypes from "../actionTypes";

function* postIntegrationGetEditLineRunSaga(action) {
    try {
       const { result, token } = action.payload;
        const response = yield call(ApiMethod.POST_WITH_TOKEN, API.integrationGeteditLineRun, result, token);
        console.log("res",response)
        if (response && response.status === 200) {
            yield put({
                type: actionTypes.POST_INTEGRATION_GETEDIT_LINE_RUN_SUCCESS,
                payload: response.data
            });
        } else {
            yield put({
                type: actionTypes.POST_INTEGRATION_GETEDIT_LINE_RUN_FAILURE,
                payload: 'BAD REQUEST'
            });
        }
    } catch (err) {
        if (err.response && err.response.status === 401) {
            yield put({
                type: actionTypes.POST_INTEGRATION_GETEDIT_LINE_RUN_FAILURE_INVALID,
                payload: 'Invalid Request'
            });
        } else {
            yield put({
                type: actionTypes.POST_INTEGRATION_GETEDIT_LINE_RUN_FAILURE,
                payload: 'INTERNAL SERVER ERROR'
            });
        }
    }
}

export default postIntegrationGetEditLineRunSaga;
