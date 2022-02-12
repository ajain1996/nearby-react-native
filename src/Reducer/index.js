// import ACTION from "./Action"
import {LOGGED_IN_USER_DETAIL, IS_USER_LOGGED_IN} from './Action';

const initialState = {
  is_logged_in: false,
  logged_in_user_details: null,
};

const rootReducer = (state = initialState, Action) => {
  switch (Action.type) {
    case IS_USER_LOGGED_IN:
      return {...state, is_logged_in: Action.payload};
      break;
    case LOGGED_IN_USER_DETAIL:
      return {...state, logged_in_user_details: Action.payload};

    default:
      return state;
  }
};
export default rootReducer;
