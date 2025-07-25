import actionTypes from "../actionTypes"

const initial = {
    postIntegrationBodyWeightEntryData: [],
    postIntegrationBodyWeightEntryLoading: false,
    postIntegrationBodyWeightEntryError: null,
    postIntegrationBodyWeightEntryErrorInvalid: null
};

const postIntegrationBodyWeightEntryReducer = (state = initial, action) => {
    switch (action.type) {
        case actionTypes.POST_INTEGRATION_BODY_WEIGHT_ENTRY_REQUEST:
            return {
                ...state,
                postIntegrationBodyWeightEntryLoading: true,
            }

        case actionTypes.POST_INTEGRATION_BODY_WEIGHT_ENTRY_SUCCESS:
            return {
                ...state,
                postIntegrationBodyWeightEntryLoading: false,
                postIntegrationBodyWeightEntryData: action.payload,
                postIntegrationBodyWeightEntryError: null,
                postIntegrationBodyWeightEntryErrorInvalid: null
            }
        case actionTypes.POST_INTEGRATION_BODY_WEIGHT_ENTRY_FAILURE:
            return {
                ...state,
                postIntegrationBodyWeightEntryLoading: false,
                postIntegrationBodyWeightEntryError: action.payload,
            }
        case actionTypes.POST_INTEGRATION_BODY_WEIGHT_ENTRY_FAILURE_INVALID:
            return {
                ...state,
                postIntegrationBodyWeightEntryLoading: false,
                postIntegrationBodyWeightEntryError: null,
                postIntegrationBodyWeightEntryErrorInvalid: action.payload,
            }

        default:
            return state;
    }
}

export default postIntegrationBodyWeightEntryReducer;
