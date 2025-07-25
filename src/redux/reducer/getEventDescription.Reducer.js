import actionTypes from "../actionTypes"

const initial = {
    getEventDescriptionLoading: false,
    getEventDescriptionLoadingData: null,
    getEventDescriptionLoadingError: null,
    getEventDescriptionLoadingErrorInvalid: null,
}

const getEventDescriptionReducer = (state=initial, action) => {
    switch(action.type){
        case actionTypes.GET_EVENT_DESCRIPTION_REQUEST:
            return {
                ...state,
                getEventGET_EVENT_DESCRIPTIONLoading: true,
            }
        case actionTypes.GET_EVENT_DESCRIPTION_SUCCESS:
            return {
                ...state,
                getEventDescriptionLoading: false,
                getEventDescriptionData: action.payload,
                getEventDescriptionError: null,
                getEventDescriptionErrorInvalid: null
            }
        case actionTypes.GET_EVENT_DESCRIPTION_FAILURE:
            return {
                ...state,
                getEventDescriptionLoading: false,
                getEventDescriptionData: [],
                getEventDescriptionError: action.payload,
            }
        case actionTypes.GET_EVENT_DESCRIPTION_FAILURE_INVALID:
            return {
                ...state,
                getEventDescriptionLoading: false,
                getEventDescriptionData: [],
                getEventDescriptionError: null,
                getEventDescriptionErrorInvalid: action.payload,
            }
        
        case actionTypes.CLEAR_EVENT_DATA:
            return {
                ...state,
                getEventDescriptionLoading: false,
                getEventDescriptionData: [],
                getEventDescriptionError: null,
                getEventDescriptionErrorInvalid: action.payload,
                    };
               
        case actionTypes.CLEAR_EVENT_DATA:
            return {
                ...state,
                getEventDescriptionLoading: false,
                getEventDescriptionData: [],
                getEventDescriptionError: null,
                getEventDescriptionErrorInvalid: null,
                    };
        default:
            return state;
    }
}

export default getEventDescriptionReducer;