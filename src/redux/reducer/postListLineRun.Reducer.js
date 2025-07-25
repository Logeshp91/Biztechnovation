import actionTypes from "../actionTypes"

const initial = {
    postListLineRunData: [],
    postListLineRunLoading: false,
    postListLineRunError: null,
    postListLineRunErrorInvalid: null
};


const postListLineRunReducer = (state=initial, action) => {
      
    switch(action.type){
        case actionTypes.POST_LIST_LINE_RUN_REQUEST:
            return {
                ...state,
                postListLineRunLoading: true,
            }

        case actionTypes.POST_LIST_LINE_RUN_SUCCESS:
            return {
                ...state,
                postListLineRunLoading: false,
                postListLineRunData: action.payload.Data,
                postListLineRunError: null,
                postListLineRunErrorInvalid: null
            }
        case actionTypes.POST_LIST_LINE_RUN_FAILURE:
            return {
                ...state,
                postListLineRunLoading: false,
                postListLineRunError: action.payload,
            }
        case actionTypes.POST_LIST_LINE_RUN_FAILURE_INVALID:
            return {
                ...state,
                postListLineRunLoading: false,
                postListLineRunError: null,
                postListLineRunErrorInvalid: action.payload,
            }
            
        default:
            return state;
    }
}

export default postListLineRunReducer;