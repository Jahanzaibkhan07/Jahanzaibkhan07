import {
  SUBSCRIPTION_ADD_REQUEST,
  SUBSCRIPTION_ADD_SUCCESS,
  SUBSCRIPTION_ADD_FAIL,
  SUBSCRIPTION_ADD_RESET,
  SUBSCRIPTION_GET_REQUEST,
  SUBSCRIPTION_GET_SUCCESS,
  SUBSCRIPTION_GET_FAIL,
  SUBSCRIPTION_UPDATE_REQUEST,
  SUBSCRIPTION_UPDATE_SUCCESS,
  SUBSCRIPTION_UPDATE_FAIL,
  SUBSCRIPTION_SEARCH_REQUEST,
  SUBSCRIPTION_SEARCH_SUCCESS,
  SUBSCRIPTION_SEARCH_FAIL,
  SUBSCRIPTION_UPDATE_RESET,
  SUBSCRIPTION_TOGGLE_REQUEST,
  SUBSCRIPTION_TOGGLE_SUCCESS,
  SUBSCRIPTION_TOGGLE_FAIL,
} from "../constants/subscriptionConstants.js";

export const addSubscriptionReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBSCRIPTION_ADD_REQUEST:
      return { loading: true };
    case SUBSCRIPTION_ADD_SUCCESS:
      return { loading: false, subscription: action.payload };
    case SUBSCRIPTION_ADD_FAIL:
      return { loading: false, error: action.payload };
    case SUBSCRIPTION_ADD_RESET:
      return { loading: false, error: false, success: false };
    default:
      return state;
  }
};
export const getSubscriptionReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBSCRIPTION_GET_REQUEST:
      return { loading: true };
    case SUBSCRIPTION_GET_SUCCESS:
      return { loading: false, subscription: action.payload };
    case SUBSCRIPTION_GET_FAIL:
      return { loading: false, error: action.payload };
    //   case CLIENTS_ADD_RESET:
    //     return { loading: false, error: false };
    default:
      return state;
  }
};
export const updateSubscriptionReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBSCRIPTION_UPDATE_REQUEST:
      return { loading: true };
    case SUBSCRIPTION_UPDATE_SUCCESS:
      return { loading: false, subscription: action.payload };
    case SUBSCRIPTION_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case SUBSCRIPTION_UPDATE_RESET:
      return { loading: false, error: false, success: false };
    default:
      return state;
  }
};

// export const subscriptionToggleReducer = (state = {}, action) => {
//   switch (action.type) {
//     case SUBSCRIPTION_TOGGLE_REQUEST:
//       return { loading: true };
//     case SUBSCRIPTION_TOGGLE_SUCCESS:
//       return { loading: false, Clients: action.payload };
//     case SUBSCRIPTION_TOGGLE_FAIL:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// export const searchSubscriptionReducer = (state = {}, action) => {
//   switch (action.type) {
//     case SUBSCRIPTION_SEARCH_REQUEST:
//       return { loading: true };
//     case SUBSCRIPTION_SEARCH_SUCCESS:
//       return { loading: false, Clients: action.payload };
//     case SUBSCRIPTION_SEARCH_FAIL:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };
