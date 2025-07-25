import actionTypes from "../actionTypes"

const initial = {
    getEventListingLoading: false,
    getEventListingData: null,
    getEventListingError: null,
    getEventListingErrorInvalid: null,

}

const getEventListingReducer = (state=initial, action) => {
    switch(action.type){
        case actionTypes.GET_EVENT_LISTING_REQUEST:
            return {
                ...state,
                getEventListingLoading: true,
            }
        case actionTypes.GET_EVENT_LISTING_SUCCESS:
            return {
                ...state,
                getEventListingLoading: false,
                getEventListingData: action.payload,
                getEventListingError: null,
                getEventListingErrorInvalid: null
            }
        case actionTypes.GET_EVENT_LISTING_FAILURE:
            return {
                ...state,
                getEventListingLoading: false,
                getEventListingData: [],
                getEventListingError: action.payload,
            }
        case actionTypes.GET_EVENT_LISTING_FAILURE_INVALID:
            return {
                ...state,
                getEventListingLoading: false,
                getEventListingData: [],
                getEventListingError: null,
                getEventListingErrorInvalid: action.payload,
            }
        case actionTypes.GET_EVENT_LISTING_CLEAR_DATA:
            return {
                ...state,
                getEventListingLoading: false,
                getEventListingData: [],
                getEventListingError: null,
                getEventListingErrorInvalid: null, 
            }
            
        default:
            return state;
    }
}

export default getEventListingReducer;