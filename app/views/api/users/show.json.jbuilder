json.partial! "api/users/user", user: @user 

# json.user do
# 	# json.set! @user.id do
# 		json.id @user.id
# 		json.username @user.username
# 		json.email @user.email
# 		json.location @user.location
# 		json.bio @user.bio
# 		json.tracks @user.tracks
# 		json.trackIds @user.tracks.pluck(:id)
# 		json.likedTrackIds @user.liked_track_ids
# 		json.numLiked @user.liked_track_ids.length
# 		# json.commentedTrackIds @user.commented_track_ids
# 		json.commentIds @user.comments.pluck(:id)
# 		json.repostedTrackIds @user.reposted_track_ids

# 		# if @user.profile.attached?
# 		# 	json.profileUrl asset_path(@user.profile.url)
# 		# else
# 		# 	json.profileUrl ''
# 		# end
# 		if @user.profile_image.attached?
# 			json.profileImgUrl url_for(@user.profile_image)
# 		else
# 			json.profileImgUrl 'https://soundpoof.s3-us-west-2.amazonaws.com/tracks/placeholder.jpeg'
# 		end

# 		json.bannerUrl asset_path(@user.banner.url)

# 	# end
# end

# json.tracks do
# 	@user.tracks.each do |track|
# 		json.set! track.id do
# 			json.extract! track, :id, :title, :artist, :user_id, :description

# 			json.id track.id
# 			json.user_id track.user.id
# 			json.title track.title
# 			json.artist track.artist
# 			json.created_at track.created_at
# 			json.numComments track.comments.length
# 			json.numLikes track.likes.length
# 			json.numReposts track.reposts.length

# 			if track.audio.attached?
# 					json.audioUrl url_for(track.audio)
# 			else
# 					json.audioUrl ''
# 			end

# 			if track.artwork.attached?
# 					json.artworkUrl url_for(track.artwork)  
# 			else
# 					json.artworkUrl ''
# 			end

# 		end
# 	end
# end
