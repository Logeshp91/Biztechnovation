import { call, put } from 'redux-saga/effects';
import { ApiMethod, API } from "../../services/Apicall";
import actionTypes from "../actionTypes";

function* postIntegrationLoadDataForBodyWytEntrySaga(action) {
    console.log("Saga action received:", action);
    try {
       const { result, token } = action.payload;
        const response = yield call(ApiMethod.POST_WITH_TOKEN, API.integrationLoadDataForBodyWeightEntry, result, token);
        const responseString = JSON.stringify(response);
        console.log('api loadbodyweight:', responseString);
        if (response && response.status === 200) {
console.log("resposneeee",response.data)
            yield put({
                type: actionTypes.POST_INTEGRATION_LOAD_DATA_FOR_BODYWYTENTRY_SUCCESS,
                payload: response.data
            });
        } else {
            yield put({
                type: actionTypes.POST_INTEGRATION_LOAD_DATA_FOR_BODYWYTENTRY_FAILURE,
                payload: 'BAD REQUEST'
            });
        }
    } catch (err) {
        if (err.response && err.response.status === 401) {
            yield put({
                type: actionTypes.POST_INTEGRATION_LOAD_DATA_FOR_BODYWYTENTRY_FAILURE,
                payload: 'Invalid Request'
            });
        } else {
            yield put({
                type: actionTypes.POST_INTEGRATION_LOAD_DATA_FOR_BODYWYTENTRY_FAILURE_INVALID,
                payload: 'INTERNAL SERVER ERROR'
            });
        }
    }
}

export default postIntegrationLoadDataForBodyWytEntrySaga;
