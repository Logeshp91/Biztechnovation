import { combineReducers } from "redux";
import postMpinEmployeeReducer from "./postMpinEmployee.Reducer";
import postLoginEmployeeReducer from "./postLoginEmployee.Reducer";
import getEventListingReducer from "./getEventListing.Reducer";
import getEventDescriptionReducer from "./getEventDescription.Reducer";
import postSetMpinReducer from "./postSetMpin.Reducer";
import LocationReducer from "./Location.Reducer";
import postForgotPasswordReducer from "./postForgotPassword.Reducer";
import postListLineRunReducer from "./postListLineRun.Reducer";
import postIntegrationStartLineRunReducer from "./postIntegrationStartLineRun.Reducer";
import postIntegrationAddeditLineRunReducer from "./postIntegrationAddeditLineRun.Reducer";
import postUserUserListReducer from "./postUserUserList.Reducer"; 
import postMastersLineListReducer from "./postMasterLineList.Reducer";
import postMastersLineRunPurposeReducer from "./postMastersLineRunPurpose.Reducer";
import postIntegrationViewLineRunReducer from "./postIntegrationViewLineRun.Reducer"
import postIntegrationGeteditLineRunReducer from "./postIntegrationGeteditLineRun.Reducer";
import postIntegrationPlacementsForLineRunReducer from "./postIntegrationPlacementsForLineRun.Reducer";
import postIntegrationLoadDataForDataEntryReducer from "./postIntegrationLoadDataForDataEntry.Reducer";
import postIntegrationDataEntryReducer from "./postIntegrationDataEntry.Reducer";
import postIntegrationBodyWeightEntryReducer from "./postIntegrationBodyWeightEntry.Reducer";
import postIntegrationLoadDataForBodyWytEntryReducer from "./postIntegrationLoadDataForBodyWytEntry.Reducer";
import postIntegrationAdjustmentEntryReducer from "./postIntegrationAdjustmentEntry.Reducer";

const reducer =combineReducers({

    
postLoginEmployeeReducer,
postMpinEmployeeReducer,
getEventListingReducer,
getEventDescriptionReducer,
postSetMpinReducer,
location: LocationReducer,
postForgotPasswordReducer,
postListLineRunReducer,
postIntegrationStartLineRunReducer,
postIntegrationAddeditLineRunReducer,
postIntegrationViewLineRunReducer,
postUserUserListReducer,
postMastersLineListReducer,
postMastersLineRunPurposeReducer,
postIntegrationGeteditLineRunReducer,
postIntegrationPlacementsForLineRunReducer,
postIntegrationLoadDataForDataEntryReducer,
postIntegrationDataEntryReducer,
postIntegrationBodyWeightEntryReducer,
postIntegrationLoadDataForBodyWytEntryReducer,
postIntegrationAdjustmentEntryReducer,

})

export default reducer;