

import actionTypes from "../actionTypes"

const initial = {
    postMpinEmployeeLoading: false,
    userToken: null,
    postMpinEmployeeData: null,
    postMpinEmployeeError: null,
    postMpinEmployeeErrorInvalid: null,
}

const postMpinEmployeeReducer = (state=initial, action) => {
    switch(action.type){
        case actionTypes.POST_MPIN_EMPLOYEE_REQUEST:
            return {
                ...state,
                postMpinEmployeeLoading: true,
                userToken: null
            }
        case actionTypes.POST_MPIN_EMPLOYEE_SUCCESS:
            return {
                ...state,
                postMpinEmployeeLoading: false,
                postMpinEmployeeData: action.payload,
                userToken: action.payload?.jwttoken || undefined,
                postMpinEmployeeError: null,
            }
        case actionTypes.POST_MPIN_EMPLOYEE_FAILURE:
            return {
                ...state,
                postMpinEmployeeLoading: false,
                postMpinEmployeeData: [],
                postMpinEmployeeError: action.payload,
                userToken: null
            }
        case actionTypes.POST_MPIN_EMPLOYEE_FAILURE_INVALID:
            return {
                ...state,
                postMpinEmployeeLoading: false,
                postMpinEmployeeData: [],
                postMpinEmployeeError: null,
                postMpinEmployeeErrorInvalid: action.payload,
                userToken: null
            }
        default:
            return state;
    }
}

export default postMpinEmployeeReducer;