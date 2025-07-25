import actionTypes from "./actionTypes";

export const postLogin = (params, id) => ({ type: actionTypes.POST_LOGIN_EMPLOYEE_REQUEST, payload: { params, id } });

export const postMpin = (token, mPin, geoLocation, paramStr) => ({
  type: actionTypes.POST_MPIN_EMPLOYEE_REQUEST,
  payload: { token, mPin: Number(mPin), geoLocation, paramStr },
});

export const postForgotPassword = (token, mPin, geoLocation, paramStr) => ({
  type: actionTypes.POST_FORGOT_PASSWORD_REQUEST,
  payload: { token, mPin: Number(mPin), geoLocation, paramStr }
});

export const postSetMpin = (token, mPin, geoLocation, paramStr) => ({
  type: actionTypes.POST_SET_MPIN_REQUEST,
  payload: { token, mPin: Number(mPin), geoLocation, paramStr }
});

export const postListLineRun = (token, result, Msg, Data) => ({
  type: actionTypes.POST_LIST_LINE_RUN_REQUEST,
  payload: { token, result, Msg, Data }
});

export const postIntegrationViewLineRun = (token, result, Msg, Data) => ({
  type: actionTypes.POST_INTEGRATION_VIEW_LINE_RUN_REQUEST,
  payload: { token, result, Msg, Data }
});

export const postIntegrationAddeditLineRun = (token, result) => ({
  type: actionTypes.POST_INTEGRATION_ADDEDIT_LINE_RUN_REQUEST,
  payload: { token, result }
});

export const postMastersLineList = (token, result, Msg, Data) => ({
  type: actionTypes.POST_MASTERS_LINE_LIST_REQUEST,
  payload: { token, result, Msg, Data }
});
export const postMastersLineRunPurpose = (token, result, Msg, Data) => ({
  type: actionTypes.POST_MASTERS_LINE_RUN_PURPOSE_REQUEST,
  payload: { token, result, Msg, Data }
});
export const postUserUserList = (token, result, Msg, Data) => ({
  type: actionTypes.POST_USER_USER_LIST_REQUEST,
  payload: { token, result, Msg, Data }
});

export const postIntegrationStartLineRun = (token, result, Data) => ({
  type: actionTypes.POST_INTEGRATION_START_LINE_RUN_REQUEST,
  payload: { token, result, Data },
});

export const postIntegrationGeteditLineRun = (token, result, Data) => ({
  type: actionTypes.POST_INTEGRATION_GETEDIT_LINE_RUN_REQUEST,
  payload: { token, result, Data },
});

export const postIntegrationPlacementsForLineRun = (token, result,Data) => ({
  type: actionTypes.POST_INTEGRATION_PLACEMENTS_FOR_LINE_RUN_REQUEST,
  payload: { token, result ,Data},
});

export const postIntegrationLoadDataForDataEntry = (token, result, Data) => ({
  type: actionTypes.POST_INTEGRATION_LOAD_DATA_FOR_DATAENTRY_REQUEST,
  payload: { token, result, Data },
});

export const postIntegrationDataEntry = (token, result, Data) => ({
  type: actionTypes.POST_INTEGRATION_DATAENTRY_REQUEST,
  payload: { token, result, Data },
});

export const postIntegrationBodyWeightEntry = (token, result, Data) => ({
  type: actionTypes.POST_INTEGRATION_BODY_WEIGHT_ENTRY_REQUEST,
  payload: { token, result, Data },
});

export const postIntegrationAdjustmentEntry = (token, result, Data) => ({
  type: actionTypes.POST_INTEGRATION_ADJUSTMENTENTRY_REQUEST,
  payload: { token, result, Data },
});


export const postIntegrationLoadDataForBodyWytEntry = (token, result, Data) => ({
  type: actionTypes.POST_INTEGRATION_LOAD_DATA_FOR_BODYWYTENTRY_REQUEST,
  payload: { token, result, Data },
});

export const addLocation = (location) => ({
  type: actionTypes.ADD_LOCATION,
  payload: location,
});

export const setUserLocations = (locations) => ({
  type: actionTypes.SET_USER_LOCATIONS,
  payload: locations,
});

export const getEventListing = (token) => ({ type: actionTypes.GET_EVENT_LISTING_REQUEST, payload: { token } });
export const getEventDescription = (token) => ({ type: actionTypes.GET_EVENT_DESCRIPTION_REQUEST, payload: { token } });
export const clearEventListingData = () => ({ type: actionTypes.GET_EVENT_LISTING_CLEAR_DATA, });
export const clearLoginFields = () => ({ type: actionTypes.CLEAR_LOGIN_FIELDS, });

