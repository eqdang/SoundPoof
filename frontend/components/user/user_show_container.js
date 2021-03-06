import { connect } from "react-redux";
import { fetchSingleUser, updateUser, createLike, deleteLike, createRepost, deleteRepost, createFollow, deleteFollow} from "../../actions/user_actions";
import { fetchAllTracks, fetchTrack, deleteTrack } from "../../actions/track_actions";
import { withRouter, Route } from "react-router-dom";
import { setCurrentTrack, setPlayPause, setProg, seekTrack, seekWaveForm, seekPlayer } from '../../actions/trackplayer_actions';
import UserShow from "./user_show";

const mapStateToProps = (state, ownProps) => {
	// const userId = ownProps.match.params.userId;
	const currentUser = (state.session.currentUser) || {};
	const users = state.users || {};
	// const user = state.users[ownProps.match.params.userId] || {};
	// const tracks = state.tracks || {};
	const userId = (window.location.hash.split("/").slice(-1));
	return {
		users: state.users || {},
		currentUser: state.session.currentUser || {},
		// userId: userId,
		user: state.users[ownProps.match.params.userId] || {},
		// user: state.users[userId],
		// userId: ownProps.match.params.id,
		tracks: state.tracks || {},
		// userTracks: user.tracks || {},
		// users: state. users || {},
		// tracks: user.tracks || {},
		// followed: currentUser.followingIds.includes(userId) ? true : false,
		trackplayer: state.trackplayer || {},
		loggedIn: Boolean(state.session.currentUser),
	};
};

const mapDispatchToProps = (dispatch, ownProps) => ({
	fetchSingleUser: (userId) => dispatch(fetchSingleUser(userId)),
	fetchTrack: (trackId) => dispatch(fetchTrack(trackId)),
	fetchAllTracks: () => dispatch(fetchAllTracks()),
	updateUser: (userId, user) => dispatch(updateUser(userId, user)),
	setCurrentTrack: (track) => dispatch(setCurrentTrack(track)),
	setPlayPause: (boolean, trackId, progress) => dispatch(setPlayPause(boolean, trackId, progress)),
	setProg: (trackId, progress) => dispatch(setProg(trackId, progress)),
	endCurrentTrack: () => dispatch(endCurrentTrack()),
	seekTrack: (seconds) => dispatch(seekTrack(seconds)),
	seekWaveForm: (progress) => dispatch(seekWaveForm(progress, ownProps.track.id)),
	createLike: (trackId) => dispatch(createLike(trackId)),
	deleteLike: (trackId) => dispatch(deleteLike(trackId)),
	createRepost: (trackId) => dispatch(createRepost(trackId)),
	deleteRepost: (trackId) => dispatch(deleteRepost(trackId)),
	createFollow: (userId) => dispatch(createFollow(userId)),
	deleteFollow: (userId) => dispatch(deleteFollow(userId)),
	deleteTrack: (trackId) => dispatch(deleteTrack(trackId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserShow);