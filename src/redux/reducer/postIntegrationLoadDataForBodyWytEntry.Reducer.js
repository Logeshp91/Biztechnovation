import actionTypes from "../actionTypes"

const initial = {
    postIntegrationLoadDataForBodyWytEntryData: [],
    postIntegrationLoadDataForBodyWytEntryLoading: false,
    postIntegrationLoadDataForBodyWytEntryError: null,
    postIntegrationLoadDataForBodyWytEntryErrorInvalid: null
};

const postIntegrationLoadDataForBodyWytEntryReducer = (state = initial, action) => {
    switch (action.type) {
        case actionTypes.POST_INTEGRATION_LOAD_DATA_FOR_BODYWYTENTRY_REQUEST:
            return {
                ...state,
                postIntegrationLoadDataForBodyWytEntryLoading: true,
            }

        case actionTypes.POST_INTEGRATION_LOAD_DATA_FOR_BODYWYTENTRY_SUCCESS:
            return {
                ...state,
                postIntegrationLoadDataForBodyWytEntryLoading: false,
                postIntegrationLoadDataForBodyWytEntryData: action.payload,
                postIntegrationLoadDataForBodyWytEntryError: null,
                postIntegrationLoadDataForBodyWytEntryErrorInvalid: null
            }
        case actionTypes.POST_INTEGRATION_LOAD_DATA_FOR_BODYWYTENTRY_FAILURE:
            return {
                ...state,
                postIntegrationLoadDataForBodyWytEntryLoading: false,
                postIntegrationLoadDataForBodyWytEntryError: action.payload,
            }
        case actionTypes.POST_INTEGRATION_LOAD_DATA_FOR_BODYWYTENTRY_FAILURE_INVALID:
            return {
                ...state,
                postIntegrationLoadDataForBodyWytEntryLoading: false,
                postIntegrationLoadDataForBodyWytEntryError: null,
                postIntegrationLoadDataForBodyWytEntryErrorInvalid: action.payload,
            }

        default:
            return state;
    }
}

export default postIntegrationLoadDataForBodyWytEntryReducer;
