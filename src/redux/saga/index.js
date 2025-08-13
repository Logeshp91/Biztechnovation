import { takeLatest } from "redux-saga/effects";
import actionType from "../actionTypes";
import postauthendicationSaga from "./postauthendication.Saga";
import postcreatevisitSaga from "./postcreatevisit.Saga";
import odooCallSaga from "./oodoCall.Saga";

export default function* (){
   
    yield takeLatest(actionType.POST_POSTAUTHENDICATION_REQUEST,postauthendicationSaga)
    yield takeLatest(actionType.POST_CREATEVISIT_REQUEST,postcreatevisitSaga)
  yield takeLatest(actionType.ODOO_CALL_REQUEST, odooCallSaga);

}