import actionTypes from "../actionTypes"

const initial = {
    postIntegrationDataEntryData: [],
    postIntegrationDataEntryLoading: false,
    postIntegrationDataEntryError: null,
    postIntegrationDataEntryErrorInvalid: null
};

const postIntegrationDataEntryReducer = (state = initial, action) => {
    switch (action.type) {
        case actionTypes.POST_INTEGRATION_DATAENTRY_REQUEST:
            return {
                ...state,
                postIntegrationDataEntryLoading: true,
            }

        case actionTypes.POST_INTEGRATION_DATAENTRY_SUCCESS:
            return {
                ...state,
                postIntegrationDataEntryLoading: false,
                postIntegrationDataEntryData: action.payload,
                postIntegrationDataEntryError: null,
                postIntegrationDataEntryErrorInvalid: null
            }
        case actionTypes.POST_INTEGRATION_DATAENTRY_FAILURE:
            return {
                ...state,
                postIntegrationDataEntryLoading: false,
                postIntegrationDataEntryError: action.payload,
            }
        case actionTypes.POST_INTEGRATION_DATAENTRY_FAILURE_INVALID:
            return {
                ...state,
                postIntegrationDataEntryLoading: false,
                postIntegrationDataEntryError: null,
                postIntegrationDataEntryErrorInvalid: action.payload,
            }

        default:
            return state;
    }
}

export default postIntegrationDataEntryReducer;
