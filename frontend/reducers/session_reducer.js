import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from "../actions/session_actions";
import { RECEIVE_LIKE, REMOVE_LIKE, RECEIVE_REPOST, REMOVE_REPOST, RECEIVE_FOLLOW, REMOVE_FOLLOW} from '../actions/user_actions';

const _nullUser = {
	currentUser: null,
};

const sessionReducer = (state = _nullUser, action) => {
  Object.freeze(state);
	let newState = Object.assign({}, state);
	let idx;

  switch(action.type) {
    case RECEIVE_CURRENT_USER:
				newState.currentUser = action.currentUser;
			return newState;
    case LOGOUT_CURRENT_USER:
      return {
				currentUser: action.currentUser
			}
		case RECEIVE_LIKE:
			newState = _.merge({}, state);
			newState.currentUser.likedTrackIds.push(action.trackId);
			return newState;
		case REMOVE_LIKE:
			newState = _.merge({}, state);
			idx = newState.currentUser.likedTrackIds.indexOf(action.trackId);
			newState.currentUser.likedTrackIds.splice(idx, 1); 
			return newState;
		case RECEIVE_REPOST:
			newState = _.merge({}, state);
			newState.currentUser.repostedTrackIds.push(action.trackId);
			return newState;
		case REMOVE_REPOST:
			newState = _.merge({}, state);
			idx = newState.currentUser.repostedTrackIds.indexOf(action.trackId);
			newState.currentUser.repostedTrackIds.splice(idx, 1);
			return newState;
		case RECEIVE_FOLLOW:
			newState = _.merge({}, state);
			newState.currentUser.followingIds.push(action.userId);
			return newState;
		case REMOVE_FOLLOW:
			newState = _.merge({}, state);
			idx = newState.currentUser.followingIds.indexOf(action.userId);
			newState.currentUser.followingIds.splice(idx, 1);
			return newState;
		default:
			return state;
  }
};

export default sessionReducer;
