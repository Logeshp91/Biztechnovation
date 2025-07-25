import actionTypes from "../actionTypes"

const initial = {
    postIntegrationLoadDataForDataEntryData: [],
    postIntegrationLoadDataForDataEntryLoading: false,
    postIntegrationLoadDataForDataEntryError: null,
    postIntegrationLoadDataForDataEntryErrorInvalid: null
};

const postIntegrationLoadDataForDataEntryReducer = (state = initial, action) => {
    switch (action.type) {
        case actionTypes.POST_INTEGRATION_LOAD_DATA_FOR_DATAENTRY_REQUEST:
            return {
                ...state,
                postIntegrationLoadDataForDataEntryLoading: true,
            }

        case actionTypes.POST_INTEGRATION_LOAD_DATA_FOR_DATAENTRY_SUCCESS:
            return {
                ...state,
                postIntegrationLoadDataForDataEntryLoading: false,
                postIntegrationLoadDataForDataEntryData: action.payload,
                postIntegrationLoadDataForDataEntryError: null,
                postIntegrationLoadDataForDataEntryErrorInvalid: null
            }
        case actionTypes.POST_INTEGRATION_LOAD_DATA_FOR_DATAENTRY_FAILURE:
            return {
                ...state,
                postIntegrationLoadDataForDataEntryLoading: false,
                postIntegrationLoadDataForDataEntryError: action.payload,
            }
        case actionTypes.POST_INTEGRATION_LOAD_DATA_FOR_DATAENTRY_FAILURE_INVALID:
            return {
                ...state,
                postIntegrationLoadDataForDataEntryLoading: false,
                postIntegrationLoadDataForDataEntryError: null,
                postIntegrationLoadDataForDataEntryErrorInvalid: action.payload,
            }

        default:
            return state;
    }
}

export default postIntegrationLoadDataForDataEntryReducer;
