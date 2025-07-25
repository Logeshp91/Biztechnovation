import actionTypes from "../actionTypes"

const initial = {
    postIntegrationPlacementsForLineRunData:null,
    postIntegrationPlacementsForLineRunLoading: false,
    postIntegrationPlacementsForLineRunError: null,
    postIntegrationPlacementsForLineRunErrorInvalid: null
};

const postIntegrationPlacementsForLineRunReducer = (state = initial, action) => {
    switch (action.type) {
        case actionTypes.POST_INTEGRATION_PLACEMENTS_FOR_LINE_RUN_REQUEST:
            return {
                ...state,
                postIntegrationPlacementsForLineRunLoading: true,
            }

        case actionTypes.POST_INTEGRATION_PLACEMENTS_FOR_LINE_RUN_SUCCESS:
            return {
                ...state,
                postIntegrationPlacementsForLineRunLoading: false,
                postIntegrationPlacementsForLineRunData: action.payload,
                postIntegrationPlacementsForLineRunError: null,
                postIntegrationPlacementsForLineRunErrorInvalid: null
            }
        case actionTypes.POST_INTEGRATION_PLACEMENTS_FOR_LINE_RUN_FAILURE:
            return {
                ...state,
                postIntegrationPlacementsForLineRunLoading: false,
                postIntegrationPlacementsForLineRunError: action.payload,
            }
        case actionTypes.POST_INTEGRATION_PLACEMENTS_FOR_LINE_RUN_FAILURE_INVALID:
            return {
                ...state,
                postIntegrationPlacementsForLineRunLoading: false,
                postIntegrationPlacementsForLineRunError: null,
                postIntegrationPlacementsForLineRunErrorInvalid: action.payload,
            }

        default:
            return state;
    }
}

export default postIntegrationPlacementsForLineRunReducer;
