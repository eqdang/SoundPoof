# json.extract! user, :id, :username, :email, :bio, :location, :profile_image, :banner

json.id user.id
json.email user.email
json.username user.username
json.bio user.bio
json.location user.location

# json.tracks user.tracks
json.trackIds user.tracks.pluck(:id)
# json.commentIds user.comments.pluck(:id)
json.commentIds user.comment_ids

json.likedTrackIds user.liked_track_ids
json.repostedTrackIds user.reposted_track_ids
json.followingIds user.user_following_ids
json.followerIds user.user_follower_ids

# json.profileImgUrl url_for(user.profile_image)
json.bannerUrl asset_path(user.banner.url)
json.profileUrl asset_path(user.profile.url)

if user.profile_image.attached?
	json.profileImgUrl url_for(user.profile_image)
else
	json.profileImgUrl "https://soundpoof.s3-us-west-2.amazonaws.com/tracks/placeholder.jpeg"
end