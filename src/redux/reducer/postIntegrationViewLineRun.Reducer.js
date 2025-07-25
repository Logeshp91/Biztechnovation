import actionTypes from "../actionTypes"

const initial = {
    postIntegrationViewLineRunData: [],
    postIntegrationViewLineRunLoading: false,
    postIntegrationViewLineRunError: null,
    postIntegrationViewLineRunErrorInvalid: null
};

const postIntegrationViewLineRunReducer = (state = initial, action) => {
    switch (action.type) {
        case actionTypes.POST_INTEGRATION_VIEW_LINE_RUN_REQUEST:
            return {
                ...state,
                postIntegrationViewLineRunLoading: true,
            }

        case actionTypes.POST_INTEGRATION_VIEW_LINE_RUN_SUCCESS:
            return {
                ...state,
                postIntegrationViewLineRunLoading: false,
                postIntegrationViewLineRunData: action.payload,
                postIntegrationViewLineRunError: null,
                postIntegrationViewLineRunErrorInvalid: null
            }
        case actionTypes.POST_INTEGRATION_VIEW_LINE_RUN_FAILURE:
            return {
                ...state,
                postIntegrationViewLineRunLoading: false,
                postIntegrationViewLineRunError: action.payload,
            }
        case actionTypes.POST_INTEGRATION_VIEW_LINE_RUN_FAILURE_INVALID:
            return {
                ...state,
                postIntegrationViewLineRunLoading: false,
                postIntegrationViewLineRunError: null,
                postIntegrationViewLineRunErrorInvalid: action.payload,
            }

        default:
            return state;
    }
}

export default postIntegrationViewLineRunReducer;
