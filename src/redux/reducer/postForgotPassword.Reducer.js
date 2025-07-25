import actionTypes from "../actionTypes"

const initial = {
    postForgotPasswordLoading: false,
    userToken: null,
    postForgotPasswordData: null,
    postForgotPasswordError: null,
    postForgotPasswordErrorInvalid: null,
}

const postForgotPasswordReducer = (state=initial, action) => {
    switch(action.type){
        case actionTypes.POST_FORGOT_PASSWORD_REQUEST:
            return {
                ...state,
                postForgotPasswordLoading: true,
                userToken: null
            }
        case actionTypes.POST_FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                postForgotPasswordLoading: false,
                postForgotPasswordData: action.payload,
                userToken: action.payload?.AccessToken || undefined, 
                postForgotPasswordError: null,
                postForgotPasswordInvalid: null
            }
        case actionTypes.POST_FORGOT_PASSWORD_FAILURE:
            return {
                ...state,
                postForgotPasswordLoading: false,
                postForgotPasswordData: [],
                postForgotPasswordError: action.payload,
                userToken: null
            }
        case actionTypes.POST_FORGOT_PASSWORD_FAILURE_INVALID:
            return {
                ...state,
                postForgotPasswordLoading: false,
                postForgotPasswordData: [],
                postForgotPasswordrror: null,
                postForgotPasswordErrorInvalid: action.payload,
                userToken: null
            }
        case actionTypes.CLEAR_LOGIN_FIELDS:
            return {
                postForgotPasswordLoading: false,
                userToken: null,
                postForgotPasswordData: null,
                postForgotPasswordError: null,
                postForgotPasswordErrorInvalid: null,
            }
        default:
            return state;
    }
}

export default postForgotPasswordReducer;
