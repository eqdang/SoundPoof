import React from 'react';
import CommentIndexItem from './comment_index_item';

class CommentIndex extends React.Component {
	constructor(props) {
		super(props);
	}

trackComments() {
	let trackComments = track.comments.map(id => (
		<CommentIndexItem key={id} track={track} currentUser={currentUser} id={id} deleteComment={deleteComment} comment={comments[id]} />
	));
}

	render() {
		// let { track, comments, currentUser, deleteComment } = this.props;
		// if (comments.length > 0) {
			// return this.trackComments();
		// } else {
		// 	return "null";
		// };

		return (
			<div className='tsc-container'>
			</div>
		);
	}

}

export default CommentIndex; 