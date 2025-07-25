import actionTypes from "../actionTypes"

const initial = {
    postLoginEmployeeLoading: false,
    userToken: null,
    postLoginEmployeeData: null,
    postLoginEmployeeError: null,
    postLoginEmployeeErrorInvalid: null,
}

const postLoginEmployeeReducer = (state=initial, action) => {
    switch(action.type){
        case actionTypes.POST_LOGIN_EMPLOYEE_REQUEST:
            return {
                ...state,
                postLoginEmployeeLoading: true,
                userToken: action.payload.token 
            }
        case actionTypes.POST_LOGIN_EMPLOYEE_SUCCESS:
            return {
                ...state,
                postLoginEmployeeLoading: false,
                postLoginEmployeeData: action.payload,
                userToken: action.payload?.AccessToken || undefined,
                postLoginEmployeeError: null,
                postLoginEmployeeErrorInvalid: null
            }
            case 'SET_AUTH_TOKEN':
                return{
                    ...state,
                    userToken: action.payload.token || undefined,
                    postLoginEmployeeData: {Data: action.payload.userdata} || undefined,

                }
        case actionTypes.POST_LOGIN_EMPLOYEE_FAILURE:
            return {
                ...state,
                postLoginEmployeeLoading: false,
                postLoginEmployeeData: [],
                postLoginEmployeeError: action.payload,
                userToken: null
            }
        case actionTypes.POST_LOGIN_EMPLOYEE_FAILURE_INVALID:
            return {
                ...state,
                postLoginEmployeeLoading: false,
                postLoginEmployeeData: [],
                postLoginEmployeeError: null,
                postLoginEmployeeErrorInvalid: action.payload,
                userToken: null
            }
        case actionTypes.CLEAR_LOGIN_FIELDS:
            return {
                postLoginEmployeeLoading: false,
                userToken: null,
                postLoginEmployeeData: null,
                postLoginEmployeeError: null,
                postLoginEmployeeErrorInvalid: null,
            }
        default:
            return state;
    }
}

export default postLoginEmployeeReducer;
