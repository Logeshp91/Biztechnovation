import actionTypes from "../actionTypes"

const initial = {
    postIntegrationAddeditLineRunData: [],
    postIntegrationAddeditLineRunLoading: false,
    postIntegrationAddeditLineRunError: null,
    postIntegrationAddeditLineRunErrorInvalid: null
};

const postIntegrationAddeditLineRunReducer = (state = initial, action) => {
    switch (action.type) {
        case actionTypes.POST_INTEGRATION_ADDEDIT_LINE_RUN_REQUEST:
            return {
                ...state,
                postIntegrationAddeditLineRunLoading: true,
            }

        case actionTypes.POST_INTEGRATION_ADDEDIT_LINE_RUN_SUCCESS:
            return {
                ...state,
                postIntegrationAddeditLineRunLoading: false,
                postIntegrationAddeditLineRunData: action.payload,
                postIntegrationAddeditLineRunError: null,
                postIntegrationAddeditLineRunErrorInvalid: null
            }
        case actionTypes.POST_INTEGRATION_ADDEDIT_LINE_RUN_FAILURE:
            return {
                ...state,
                postIntegrationAddeditLineRunLoading: false,
                postIntegrationAddeditLineRunError: action.payload,
            }
        case actionTypes.POST_INTEGRATION_ADDEDIT_LINE_RUN_FAILURE_INVALID:
            return {
                ...state,
                postIntegrationAddeditLineRunLoading: false,
                postIntegrationAddeditLineRunError: null,
                postIntegrationAddeditLineRunErrorInvalid: action.payload,
            }

        default:
            return state;
    }
}

export default postIntegrationAddeditLineRunReducer;
