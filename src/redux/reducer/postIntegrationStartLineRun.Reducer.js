import actionTypes from "../actionTypes"

const initial = {
    postIntegrationStartLineRunData: [],
    postIntegrationStartLineRunLoading: false,
    postIntegrationStartLineRunError: null,
    postIntegrationStartLineRunErrorInvalid: null
};

const postIntegrationStartLineRunReducer = (state = initial, action) => {
    switch (action.type) {
        case actionTypes.POST_INTEGRATION_START_LINE_RUN_REQUEST:
            return {
                ...state,
                postIntegrationStartLineRunLoading: true,
            }

        case actionTypes.POST_INTEGRATION_START_LINE_RUN_SUCCESS:
            return {
                ...state,
                postIntegrationStartLineRunLoading: false,
                postIntegrationStartLineRunData: action.payload,
                postIntegrationStartLineRunError: null,
                postIntegrationStartLineRunErrorInvalid: null
            }
        case actionTypes.POST_INTEGRATION_START_LINE_RUN_FAILURE:
            return {
                ...state,
                postIntegrationStartLineRunLoading: false,
                postIntegrationStartLineRunError: action.payload,
            }
        case actionTypes.POST_INTEGRATION_START_LINE_RUN_FAILURE_INVALID:
            return {
                ...state,
                postIntegrationStartLineRunLoading: false,
                postIntegrationStartLineRunError: null,
                postIntegrationStartLineRunErrorInvalid: action.payload,
            }

        default:
            return state;
    }
}

export default postIntegrationStartLineRunReducer;
