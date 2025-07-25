import { takeLatest } from "redux-saga/effects";
import actionType from "../actionTypes";


import postMpinEmployeeSaga from "./postMpinEmployee.saga";
import postLoginEmployeeSaga from "./postLoginEmployee.Saga";
import getEventListingSaga from "./getEventListing.Saga";
import getEventDescriptionSaga from "./getEventDescription.Saga";
import postSetMpinSaga from "./postSetMpin.Saga";
import postForgotPasswordSaga from "./postForgotPassword.saga";
import postListLineRunSaga from "./postListLineRun.Saga";
import postIntegrationStartLineRunSaga from "./postIntegrationStartLineRun.Saga";
import postIntegrationAddeditLineRunSaga from "./postIntegrationAddeditLineRun.Saga";
import postMastersLineListSaga from "./postMasterLineList.Saga";
import postMastersLineRunPurposeSaga from "./postMastersLineRunPurpose.Saga";
import postUserUserListSaga from "./postUserUserList.Saga";
import postIntegrationViewLineRunSaga from "./postIntegrationViewLineRun.Saga"
import postIntegrationGeteditLineRunSaga from "./postIntegrationGeteditLineRun.Saga";
import postIntegrationPlacementsForLineRunSaga from "./postIntegrationPlacementsForLineRun.Saga";
import postIntegrationLoadDataForDataEntrySaga from "./postIntegrationLoadDataForDataEntry.Saga";
import postIntegrationDataEntrySaga from "./postIntegrationDataEntry.Saga";
import postIntegrationBodyWeightEntrySaga from "./postIntegrationBodyWeightEntry.Saga";
import postIntegrationLoadDataForBodyWytEntrySaga from "./postIntegrationLoadDataForBodyWytEntry.Saga";
import postIntegrationAdjustmentEntrySaga from "./postIntegrationAdjustmentEntry.Saga";



export default function* (){
   
    yield takeLatest(actionType.POST_MPIN_EMPLOYEE_REQUEST,postMpinEmployeeSaga)
    yield takeLatest(actionType.POST_LOGIN_EMPLOYEE_REQUEST,postLoginEmployeeSaga)  
    yield takeLatest(actionType.GET_EVENT_LISTING_REQUEST,getEventListingSaga)
    yield takeLatest(actionType.GET_EVENT_DESCRIPTION_REQUEST,getEventDescriptionSaga)
    yield takeLatest(actionType.POST_SET_MPIN_REQUEST,postSetMpinSaga)
    yield takeLatest(actionType.POST_FORGOT_PASSWORD_REQUEST,postForgotPasswordSaga)
    yield takeLatest(actionType.POST_LIST_LINE_RUN_REQUEST,postListLineRunSaga)
    yield takeLatest(actionType.POST_INTEGRATION_START_LINE_RUN_REQUEST,postIntegrationStartLineRunSaga)
    yield takeLatest(actionType.POST_INTEGRATION_VIEW_LINE_RUN_REQUEST,postIntegrationViewLineRunSaga)
    yield takeLatest(actionType.POST_INTEGRATION_ADDEDIT_LINE_RUN_REQUEST,postIntegrationAddeditLineRunSaga)
    yield takeLatest(actionType.POST_INTEGRATION_GETEDIT_LINE_RUN_REQUEST,postIntegrationGeteditLineRunSaga)
    yield takeLatest(actionType.POST_MASTERS_LINE_LIST_REQUEST,postMastersLineListSaga)
    yield takeLatest(actionType.POST_MASTERS_LINE_RUN_PURPOSE_REQUEST,postMastersLineRunPurposeSaga)
    yield takeLatest(actionType.POST_USER_USER_LIST_REQUEST,postUserUserListSaga)
    yield takeLatest(actionType.POST_INTEGRATION_PLACEMENTS_FOR_LINE_RUN_REQUEST,postIntegrationPlacementsForLineRunSaga)
    yield takeLatest(actionType.POST_INTEGRATION_LOAD_DATA_FOR_DATAENTRY_REQUEST,postIntegrationLoadDataForDataEntrySaga)
    yield takeLatest(actionType.POST_INTEGRATION_DATAENTRY_REQUEST,postIntegrationDataEntrySaga)
    yield takeLatest(actionType.POST_INTEGRATION_BODY_WEIGHT_ENTRY_REQUEST,postIntegrationBodyWeightEntrySaga)
    yield takeLatest(actionType.POST_INTEGRATION_LOAD_DATA_FOR_BODYWYTENTRY_REQUEST,postIntegrationLoadDataForBodyWytEntrySaga)
    yield takeLatest(actionType.POST_INTEGRATION_ADJUSTMENTENTRY_REQUEST,postIntegrationAdjustmentEntrySaga)

}