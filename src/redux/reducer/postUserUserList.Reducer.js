import actionTypes from "../actionTypes"

const initial = {
    postUserUserListData: [],
    postUserUserListLoading: false,
    postUserUserListError: null,
    postUserUserListErrorInvalid: null
};


const postUserUserListReducer = (state=initial, action) => {
      
    switch(action.type){
        case actionTypes.POST_USER_USER_LIST_REQUEST:
            return {
                ...state,
                postUserUserListLoading: true,
            }

        case actionTypes.POST_USER_USER_LIST_SUCCESS:
            return {
                ...state,
                postUserUserListLoading: false,
                postUserUserListData: action.payload.Data,
                postUserUserListError: null,
                postUserUserListErrorInvalid: null
            }
        case actionTypes.POST_USER_USER_LIST_FAILURE:
            return {
                ...state,
                postUserUserListLoading: false,
                postUserUserListError: action.payload,
            }
        case actionTypes.POST_USER_USER_LIST_FAILURE_INVALID:
            return {
                ...state,
                postUserUserListLoading: false,
                postUserUserListError: null,
                postUserUserListErrorInvalid: action.payload,
            }
            
        default:
            return state;
    }
}

export default postUserUserListReducer;