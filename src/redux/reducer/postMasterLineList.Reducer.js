import actionTypes from "../actionTypes"

const initial = {
    postMastersLineListData: [],
    postMastersLineListLoading: false,
    postMastersLineListError: null,
    postMastersLineListErrorInvalid: null
};


const postMastersLineListReducer = (state=initial, action) => {
      
    switch(action.type){
        case actionTypes.POST_MASTERS_LINE_LIST_REQUEST:
            return {
                ...state,
                postMastersLineListLoading: true,
            }

        case actionTypes.POST_MASTERS_LINE_LIST_SUCCESS:
            return {
                ...state,
                postMastersLineListLoading: false,
                postMastersLineListData: action.payload.Data,
                postMastersLineListError: null,
                postMastersLineListErrorInvalid: null
            }
        case actionTypes.POST_MASTERS_LINE_LIST_FAILURE:
            return {
                ...state,
                postMastersLineListLoading: false,
                postMastersLineListError: action.payload,
            }
        case actionTypes.POST_MASTERS_LINE_LIST_FAILURE_INVALID:
            return {
                ...state,
                postMastersLineListLoading: false,
                postMastersLineListError: null,
                postMastersLineListErrorInvalid: action.payload,
            }
            
        default:
            return state;
    }
}

export default postMastersLineListReducer;