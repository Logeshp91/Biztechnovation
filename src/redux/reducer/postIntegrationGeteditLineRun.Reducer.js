import actionTypes from "../actionTypes"

const initial = {
    postIntegrationGeteditLineRunData: [],
    postIntegrationGeteditLineRunLoading: false,
    postIntegrationGeteditLineRunError: null,
    postIntegrationGeteditLineRunErrorInvalid: null
};

const postIntegrationGeteditLineRunReducer = (state = initial, action) => {
    switch (action.type) {
        case actionTypes.POST_INTEGRATION_GETEDIT_LINE_RUN_REQUEST:
            return {
                ...state,
                postIntegrationGeteditLineRunLoading: true,
            }

        case actionTypes.POST_INTEGRATION_GETEDIT_LINE_RUN_SUCCESS:
            return {
                ...state,
                postIntegrationGeteditLineRunLoading: false,
                postIntegrationGeteditLineRunData: action.payload,
                postIntegrationGeteditLineRunError: null,
                postIntegrationGeteditLineRunErrorInvalid: null
            }
        case actionTypes.POST_INTEGRATION_GETEDIT_LINE_RUN_FAILURE:
            return {
                ...state,
                postIntegrationGeteditLineRunLoading: false,
                postIntegrationGeteditLineRunError: action.payload,
            }
        case actionTypes.POST_INTEGRATION_GETEDIT_LINE_RUN_FAILURE_INVALID:
            return {
                ...state,
                postIntegrationGeteditLineRunLoading: false,
                postIntegrationGeteditLineRunError: null,
                postIntegrationGeteditLineRunErrorInvalid: action.payload,
            }

        default:
            return state;
    }
}

export default postIntegrationGeteditLineRunReducer;
