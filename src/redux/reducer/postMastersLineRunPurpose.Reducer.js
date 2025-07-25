import actionTypes from "../actionTypes"

const initial = {
    postMastersLineRunPurposeData: [],
    postMastersLineRunPurposeLoading: false,
    postMastersLineRunPurposeError: null,
    postMastersLineRunPurposeErrorInvalid: null
};


const postMastersLineRunPurposeReducer = (state=initial, action) => {
      
    switch(action.type){
        case actionTypes.POST_MASTERS_LINE_RUN_PURPOSE_REQUEST:
            return {
                ...state,
                postMastersLineRunPurposeLoading: true,
            }

        case actionTypes.POST_MASTERS_LINE_RUN_PURPOSE_SUCCESS:
            return {
                ...state,
                postMastersLineRunPurposeLoading: false,
                postMastersLineRunPurposeData: action.payload.Data,
                postMastersLineRunPurposeError: null,
                postMastersLineRunPurposeErrorInvalid: null
            }
        case actionTypes.POST_MASTERS_LINE_RUN_PURPOSE_FAILURE:
            return {
                ...state,
                postMastersLineRunPurposeLoading: false,
                postMastersLineRunPurposeError: action.payload,
            }
        case actionTypes.POST_MASTERS_LINE_RUN_PURPOSE_FAILURE_INVALID:
            return {
                ...state,
                postMastersLineRunPurposeLoading: false,
                postMastersLineRunPurposeError: null,
                postMastersLineRunPurposeErrorInvalid: action.payload,
            }
            
        default:
            return state;
    }
}

export default postMastersLineRunPurposeReducer;