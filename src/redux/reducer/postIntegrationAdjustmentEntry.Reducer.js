import actionTypes from "../actionTypes"

const initial = {
    postIntegrationAdjustmentEntryData: [],
    postIntegrationAdjustmentEntryLoading: false,
    postIntegrationAdjustmentEntryError: null,
    postIntegrationAdjustmentEntryErrorInvalid: null
};

const postIntegrationAdjustmentEntryReducer = (state = initial, action) => {
    switch (action.type) {
        case actionTypes.POST_INTEGRATION_ADJUSTMENTENTRY_REQUEST:
            return {
                ...state,
                postIntegrationAdjustmentEntryLoading: true,
            }

        case actionTypes.POST_INTEGRATION_ADJUSTMENTENTRY_SUCCESS:
            return {
                ...state,
                postIntegrationAdjustmentEntryLoading: false,
                postIntegrationAdjustmentEntryData: action.payload,
                postIntegrationAdjustmentEntryError: null,
                postIntegrationAdjustmentEntryErrorInvalid: null
            }
        case actionTypes.POST_INTEGRATION_ADJUSTMENTENTRY_FAILURE:
            return {
                ...state,
                postIntegrationAdjustmentEntryLoading: false,
                postIntegrationAdjustmentEntryError: action.payload,
            }
        case actionTypes.POST_INTEGRATION_ADJUSTMENTENTRY_FAILURE_INVALID:
            return {
                ...state,
                postIntegrationAdjustmentEntryLoading: false,
                postIntegrationAdjustmentEntryError: null,
                postIntegrationAdjustmentEntryErrorInvalid: action.payload,
            }

        default:
            return state;
    }
}

export default postIntegrationAdjustmentEntryReducer;
