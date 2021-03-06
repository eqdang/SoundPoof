import React from "react";
import { NavLink, Link, withRouter } from "react-router-dom";
import moment from 'moment';
import NavbarContainer from "../navbar/navbar_container";
import CommentIndexContainer from "../comments/comment_index_container";
import CommentFormContainer from '../comments/comment_form_container';
import CommentIndexItem from "../comments/comment_index_item";
import TrackSidebar from "./track_sidebar";
import WaveFormContainer from "../track_player/waveform";

class TrackShowPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showStream: false,
			showSearch: false,
			showProfile: false,
		};
		this.playButton = this.playButton.bind(this);
		this.trackButtonBar = this.trackButtonBar.bind(this);
		this.toggleLike = this.toggleLike.bind(this);
		this.toggleRepost = this.toggleRepost.bind(this);
		this.deleteTrack = this.deleteTrack.bind(this);
		this.toggleFollow = this.toggleFollow.bind(this);
		this.userFollowBtn = this.userFollowBtn.bind(this);
		this.clickUser = this.clickUser.bind(this);
	}
	componentDidMount() {
		let trackId = this.props.match.params.trackId;
		let track = this.props.fetchTrack(trackId);
		this.setState({track: track});
		// this.props.fetchUser(this.props.user);
	}
		
	componentDidUpdate(prevProps) {
		// debugger
		// const trackId = this.props.trackId;
		if (prevProps.match.params.trackId !== this.props.match.params.trackId) {
			this.props.fetchTrack(this.props.match.params.trackId);
		}

		if (this.props.track === undefined || this.props.trackplayer === undefined) return;
		
		let { playing, trackId, player, progressTrackId } = this.props.trackplayer;
		let trackProg = progressTrackId[this.props.track.id];
		let thisId = (this.props.track ? this.props.track.id : prevProps.match.params.trackId);

		if (playing && (trackId == thisId) && (thisId !== prevProps.trackplayer.trackId)) {
			let prog = trackProg ? trackProg : player.getCurrentTime() / player.getDuration();
			this.props.setProg(thisId, prog);
		}
	}

	playButton(track, e) {
		e.preventDefault();
		const { setCurrentTrack, setPlayPause } = this.props; 
		let { tpPlayer, tpCurrentTrack, tpPlaying, tpTrackId } = this.props.trackplayer;
		// let tpPlayer = this.props.trackplayer.player;
		let trackProg = this.props.trackplayer.progressTrackId[this.props.track.id];

		if (tpTrackId == 0) {
			//  no track
			// this.props.setCurrentTrack(track);
			this.props.setPlayPause(!tpPlaying, track.id, 0);
		} else if (tpTrackId === this.props.track.id) { 
			//  same track => play/pause
			let progress = (trackProg ? trackProg : tpPlayer.getCurrentTime() / tpPlayer.getDuration());
			this.props.setPlayPause(!tpPlaying, track.id, progress);
		} else { 
			// change to diff track
			let progress = (trackProg ? trackProg : 0);
			this.props.setPlayPause(!tpPlaying, track.id, progress);
		}
	}

	deleteTrack(e) {
		e.preventDefault();
		const { deleteTrack, track } = this.props;
		deleteTrack(track.id).then(() => this.props.history.push('/stream'));
	}

	clickUser(e, link) {
		e.preventDefault();
    window.location.hash = (link);
		console.log(link);
		this.setState({showProfile: true});
	}
	
	toggleLike(e) {
		e.preventDefault();
		const { track, deleteLike, createLike, currentUser, fetchTrack} = this.props;

		if (currentUser.likedTrackIds.includes(track.id)) {
			deleteLike(track.id).then(
				() => fetchTrack(track.id),
				() => fetchSingleTrack(track.id),
				this.trackButtonBar()
			);
		} else {
			createLike(track.id).then(
				() => fetchTrack(track.id),
				() => fetchSingleTrack(track.id),
				this.trackButtonBar()
			);;
		}
	}

	toggleRepost(e) {
		e.preventDefault();
		const { track, deleteRepost, createRepost, currentUser, fetchTrack } = this.props;

		if (currentUser.repostedTrackIds.includes(track.id)) {
			deleteRepost(track.id).then(
				() => fetchTrack(track.id),
				this.trackButtonBar()
			);
		} else {
			createRepost(track.id).then(
				() => fetchTrack(track.id),
				this.trackButtonBar()
			);
		}
	}

	toggleFollow(e) {
		e.preventDefault();
		const { track, fetchTrack, deleteFollow, createFollow, currentUser, fetchUser, user } = this.props;
		let followingId = track.user_id;

		if (currentUser.followingIds.includes(track.user_id)) {
			deleteFollow(track.user_id).then(
				() => fetchTrack(track.id)
			);
		} else {
			createFollow(track.user_id).then(
				() => fetchTrack(track.id)
			);
		}
	}

	userFollowBtn() {
		const {track, currentUser } = this.props;
		let followBtn = (currentUser.followingIds.includes(track.user_id)) ? 'user-follow-btn active followed active' : ' user-follow-btn';
		let followText = ((currentUser.followingIds.includes(track.user_id)) ? 'Following' : "Follow");

		if (currentUser.id !== track.user_id) {
			return (
				<button className={`user-suggestion-follow-btn ${followBtn}`} onClick={(e) => this.toggleFollow(e)}>{followText}</button>
			)
		} else {
			return (
				<div></div>
			)
		}
	}
	trackButtonBar() {
		const { track, currentUser } = this.props;
		const likeButton = (this.props.currentUser.likedTrackIds.includes(this.props.track.id)) ? 'controller-btn like-btn liked active' : 'controller-btn like-btn';
		const repostButton = (currentUser.repostedTrackIds.includes(track.id)) ? 'controller-btn like-btn liked active' : 'controller-btn like-btn';
		const numLikes = (track && track.numLikes ? `${(track.numLikes)}` : '0');
		const numReposts = (track && track.numReposts ? `${(track.numReposts)}` : '0');
		const numComments = (track && track.numComments ? `${(track.numComments)}` : '0');
		// console.log((Object.values(track)).numLikes);

		if (currentUser.id === track.user_id) {
			return (
				<div className='track-show-button-bar'>
					<div className={`sound-actions-btn action-like ${likeButton}`} onClick={(e) => this.toggleLike(e)}>Like</div>
					<div className={`sound-actions-btn action-repost ${repostButton}`} onClick={(e) => this.toggleRepost(e)}>Repost</div>
					<div className='sound-actions-btn controller-btn action-delete delete-btn' onClick={(e) => this.deleteTrack(e)}>Delete</div>
					
					<div className='track-right-btns like-stat'>{numLikes}</div>
					<div className='track-right-btns repost-stat'>{numReposts}</div>
					<div className='track-right-btns comment-btn'>{numComments}</div>
				</div>
			);
		} else {
			return (
				<div className='track-show-button-bar'>
					<div className={`track-show sound-actions-btn action-like ${likeButton}`} onClick={(e) => this.toggleLike(e)}>Like</div>
					<div className={`track-show sound-actions-btn action-repost ${repostButton}`} onClick={(e) => this.toggleRepost(e)}>Repost</div>
					
						<div className='track-right-btns like-stat'>{numLikes}</div>
						<div className='track-right-btns repost-stat'>{numReposts}</div>
						<div className='track-right-btns comment-btn'>{numComments}</div>
				</div>
			);
		}
	}

	render() {
		const { track, currentUser } = this.props;
		if (this.props.track === undefined) {
			console.log(this.props.track);
			return (
				<div></div>
			)
		} else {
			const { comments, track, tracks, users, currentUser, trackplayer, deleteComment, seekWaveForm, seekTrack, trackId } = this.props;
			let user = (users[this.props.track.user_id]);
			let commentLength = ((comments.length === 1) ? "1 Comment" : `${comments.length} Comments`);
			let buttonPlaying = (trackplayer.playing && trackplayer.trackId === track.id) ? 'playing' : 'ts-play';
			let userFollowBtn = this.userFollowBtn();
			let trackButtonBar = this.trackButtonBar();
			let numTracks = this.props.track.numTracks;
			let numFollowers = this.props.track.numFollowers;
			// let numTracks = ((track.numTracks ? track.numTracks : "0"));
			// let numFollowers = ((track.numFollowers ? track.numFollowers: "0"));
			let followBtn = (currentUser.followingIds.includes(track.user_id)) ? 'controller-btn user-suggestion-follow-btn active' : 'controller-btn user-suggestion-follow-btn';
			let followText= ((currentUser.followingIds.includes(track.user_id)) ? 'Following' : "Follow");
			// console.log("numTracks, numFollowers", track, numTracks, numFollowers);

			let trackNavbar = (
				<NavbarContainer currentUser={currentUser} />
			);
			let commentForm = (
				<CommentFormContainer track={track} user={user} currentUser={currentUser} />
			);
			let trackComments = (
				(comments).map((comment, idx) => (
				<CommentIndexItem id={comment.id} key={idx} currentUser={currentUser || {}} deleteComment={deleteComment} comment={comment} users={users} track={track} />
			)));
			let trackSidebar = (
				<TrackSidebar users={users} currentUser={currentUser || {}} tracks={tracks} track={track} user={user} />
			)
			// let waveForm = (
			// 	<WaveFormContainer track={track} height={100} color={'#fff'} currentUser={currentUser} seekWaveForm={seekWaveForm} seekTrack={seekTrack} trackplayer={trackplayer} />
			// );

			return (
				<div className='track-show-page'>
					<div className="track-show-navbar-container">
						{trackNavbar}
					</div>
					<div className='track-show-container'>
						<div className='track-show-detail'>
							<div className='track-sd-top'>
								<div className={buttonPlaying} onClick={(e) => this.playButton(track, e)}></div>
								<div className='track-sd-info'>
									{/* <a href={`/#/users/${track.user_id}`} onClick={(e) => this.clickLink(e, `/users/${track.user_id}`)}><div className='track-sd-uploader'>{track.artist}</div></a> */}
									<NavLink exact to={`/users/${track.user_id}`}onClick={(e) => this.clickUser(e, `/users/${track.user_id}`)}>
										<div className='track-sd-uploader'>{track.artist}</div>
										</NavLink>
									<div className='track-sd-title'>{track.title}</div>
								</div>
								<div className="track-timestamp">
									{moment(new Date(track.created_at)).fromNow()}
								</div>
							</div>
							<div className='track-sd-bott'>
								{/* {waveForm} */}
							</div>
						</div>
						<div className='track-show-image-container'>
							<img src={track.artworkUrl ? track.artworkUrl : "https://soundpoof-seeds.s3-us-west-2.amazonaws.com/placeholder.jpeg"} />
						</div>
					</div>
					<div className='track-show-container-bottom'>
						<div className='tscb-left'>
							<div className='track-show-comment-form'>
								{commentForm}
							</div>
							{/* {this.trackButtonBar()} */}
							{trackButtonBar}
							<div className='ts-uploader-ci'>
								<div className='ts-uc-left'>
									<div className='ts-artist-circle'>
										<img src={track.profileImgUrl} />
										<NavLink exact to={`/users/${track.user_id}`}onClick={(e) => this.clickUser(e, `/users/${track.user_id}`)}>
											<img src={track.profileImgUrl} />
										</NavLink>
										{/* <a href={`/users/${track.user_id}`}><img src={track.profileImgUrl} /></a> */}
									</div>
									<NavLink exact to={`/users/${track.user_id}`} onClick={(e) => this.clickUser(e, `/users/${track.user_id}`)}>
										<div className='ts-artist-name'>{track.userEmail}</div>
									</NavLink>
										{/* <a href={`/users/${track.user_id}`}><div className='ts-artist-name'>{track.userEmail}</div></a> */}
									<div className='ts-artist-stats'> 
										<div className='user-suggestion-followers'>{numFollowers}</div>
										<div className='user-suggestion-tracks'>{numTracks}</div>
									</div>
									{/* <button className={`ts-follow-btn ${followBtn}`} value="Follow" onClick={(e) => this.toggleFollow(e)}>{followText}</button> */}
									{userFollowBtn}
								</div>
								<div className='ts-uc-right'>
									<div className='ts-track-description'>{track.description ? track.description : "DESCRIPTION"}</div>
									<div className='ts-track-numComments comment-btn'>{commentLength}</div>
									<div className='track-show-comment-index'>
										{trackComments}
									</div>
								</div>
							</div>
						</div>
						<div className='trackshow-sidebar-right'>
							{/* <TrackSidebar users={users} currentUser={currentUser || {}} tracks={tracks} track={track} user={user} /> */}
							{trackSidebar}
						</div>
					</div>
				</div>
		)};
	}
}

export default withRouter(TrackShowPage);