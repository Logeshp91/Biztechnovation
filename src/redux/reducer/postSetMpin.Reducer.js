// reducer.js

const initialState = {
    postSetMpinLoading: false,
    postSetMpinData: null,
    postSetMpinError: null,
    postSetMpinErrorInvalid: null,
    userToken: null,
    postLoginEmployeeData: null
  };
  
  const postLoginEmployeeReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'POST_SET_MPIN_REQUEST':
        return {
          ...state,
          postSetMpinLoading: true
        };
      case 'POST_SET_MPIN_SUCCESS':
        return {
          ...state,
          postSetMpinLoading: false,
          postSetMpinData: action.payload,
          postSetMpinError: null,
          postSetMpinErrorInvalid: null
        };
      case 'POST_SET_MPIN_FAILURE':
        return {
          ...state,
          postSetMpinLoading: false,
          postSetMpinError: action.payload,
          postSetMpinErrorInvalid: action.payload.invalid ? action.payload : null
        };
      default:
        return state;
    }
  };
  
  export default postLoginEmployeeReducer;
  