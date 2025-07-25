import { call, put } from 'redux-saga/effects';
import { ApiMethod, API } from '../../services/Apicall';
import actionTypes from '../actionTypes';

function* postIntegrationPlacementsForLineRunSaga(action) {
    console.log('Saga action received:', action);
    try {
        const { result, token } = action.payload;
        console.log('Request payload:', result, token);

        const response = yield call(ApiMethod.POST_WITH_TOKEN, API.integrationPlacementsForLineRun, result, token);
        const responseString = JSON.stringify(response);
        console.log('API response:', responseString);
        if (response && response.status === 200) {
            yield put({
                type: actionTypes.POST_INTEGRATION_PLACEMENTS_FOR_LINE_RUN_SUCCESS,
                payload: response.data
            });
        } else {
            yield put({
                type: actionTypes.POST_INTEGRATION_PLACEMENTS_FOR_LINE_RUN_FAILURE,
                payload: 'BAD REQUEST',
            });
        }
    } catch (err) {
        if (err.response && err.response.status === 401) {
            console.log('Unauthorized request');
            yield put({
                type: actionTypes.POST_INTEGRATION_PLACEMENTS_FOR_LINE_RUN_FAILURE_INVALID,
                payload: 'Invalid Request',
            });
        } else {
            yield put({
                type: actionTypes.POST_INTEGRATION_PLACEMENTS_FOR_LINE_RUN_FAILURE,
                payload: 'INTERNAL SERVER ERROR',
            });
        }
    }
}

export default postIntegrationPlacementsForLineRunSaga;
