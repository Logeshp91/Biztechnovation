import { call, put } from 'redux-saga/effects';
import { ApiMethod, API } from "../../services/Apicall";
import actionTypes from "../actionTypes";

function* postListLineRunSaga(action) {

    try {
        const { token,result,Msg,Data } = action.payload;
        const response = yield call(ApiMethod.POST_WITH_TOKEN, API.emplistlinerun, { token }, token,result,Msg,Data);
        if (response.status === 200) {
            yield put({
                type: actionTypes.POST_LIST_LINE_RUN_SUCCESS,
                payload: response.data
            });
                } else {
            yield put({
            type: actionTypes.POST_LIST_LINE_RUN_FAILURE,
             payload: 'BAD REQUEST'
            });
        }
    } catch(err) {
        if (err.response && err.response.status === 401) {

            yield put({
                type: actionTypes.POST_LIST_LINE_RUN_FAILURE_INVALID,
                payload: 'Invalid email or password'
            });
        } else {
            yield put({
                type: actionTypes.POST_LIST_LINE_RUN_FAILURE,
                payload: 'INTERNAL SERVER ERROR'
            });
        }
    }
}

export default postListLineRunSaga;
