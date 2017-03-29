/*jshint esversion: 6 */
console.log('---Video View');

/**
 * View for Video Playlist
 * Revealing Module Pattern
 * 
 */
var videoView = (function() {

	_playlistID = 'PLRhET9MFZHSJoCXIpYBSOdtYth17XC8KJ';

	var getPlaylistId = function(){
		return _playlistID;
	};		

	/**
	 * Handler on load YouTube playlist
	 * @param {Object} json - json data
	 */ 
	var handleYtPlaylistLoaded = function(json) {
		//console.log(json.items);
	    videoApi.setNextPageToken(json.nextPageToken);
	    videoApi.setPrevPageToken(json.prevPageToken);
	    videoApi.setCurrentPlaylist(json.items);

	    var playlistItems = json.items;
	    if (playlistItems) {
      		document.getElementById('playlistContainer').innerHTML = videoTemplate.playlist(json);
      		addPlaylistEventHandlers();

			if(! document.querySelector('iframe#player') || ''){
				videoApi.createYTPlayer();
			}else{
				videoApi.cuePlaylist(getPlaylistId(), 'playlist', playlistItems[0].snippet.position);
			}
			document.getElementById('videoInfo').innerHTML = videoTemplate.meta(videoApi.getCurrentVideo(videoApi.getCurrentPlaylist(), playlistItems[0].snippet.resourceId.videoId));      		
	    } else {
	    	view.showErrorAlert('Sorry, something went wrong when fetching videos. Please try again later');
	    }

	    view.delayFadeInContent('.video-wrapper');
	    _scrollToPlayer();
	};

	/**
	 * Add eventhandlers for buttons
	 */ 
	var addPlaylistEventHandlers = function(){
	    document.querySelector('#prevButton').addEventListener('click', previousPage, 'false');
 		document.querySelector('#nextButton').addEventListener('click', nextPage, 'false');
		Array.prototype.slice.call(document.querySelectorAll('.video-title-link'))
		.forEach(function(videoLink){
			videoLink.addEventListener('click', videoTitleLinkOnClick, 'false');
		}); 

		Array.prototype.slice.call(document.querySelectorAll('.playlist .media'))
		.forEach(function(playlistItem){
			playlistItem.addEventListener('mouseenter', playListItemOnMouseEnter, 'false');
			playlistItem.addEventListener('mouseleave', playListItemOnMouseLeave, 'false');	
			playlistItem.addEventListener('click', playListItemOnClick, 'false');			
		}); 		
	};

	/**
	 * Handler for video links
	 * {Event} e - the event that was triggered
	 */ 
	var videoTitleLinkOnClick = function(e){
		e.preventDefault();
		let videoId = this.parentNode.parentNode.parentNode.parentNode.dataset.id;
		//videoApi.cueVideoById(videoId);
		//console.log(videoApi.getCurrentVideo(videoApi.getCurrentPlaylist(), videoId).snippet.position);
		videoApi.cuePlaylist(getPlaylistId(), 'playlist', videoApi.getCurrentVideo(videoApi.getCurrentPlaylist(), videoId).snippet.position);
		document.getElementById('videoInfo').innerHTML = videoTemplate.meta(videoApi.getCurrentVideo(videoApi.getCurrentPlaylist(), videoId));
		_scrollToPlayer();
	};	

	/**
	 * Handler for playlist item on mouseenter
	 * {Event} e - the event that was triggered
	 */ 
	var playListItemOnMouseEnter = function(e){
		e.preventDefault();
		this.classList.add('playlist-hover');
	};

	/**
	 * Handler for playlist item on mouseleave
	 * {Event} e - the event that was triggered
	 */ 
	var playListItemOnMouseLeave = function(e){
		e.preventDefault();
		this.classList.remove('playlist-hover');
	};	

	/**
	 * Handler for playlist item on click
	 * {Event} e - the event that was triggered
	 */
	var playListItemOnClick = function(e){
		e.preventDefault();
		this.querySelector('.video-title-link').click();
	};	

	/**
	 * Retrieve the next page of videos in the playlist.
	 * {Event} e - the event that was triggered
	 */ 	
	var nextPage = function(e) {
		e.preventDefault();
		videoApi.getPlaylistFromApi(getPlaylistId(), videoApi.getNextPageToken());
	};

	/**
	 * Retrieve the previous page of videos in the playlist.

	 */ 	
	var previousPage = function(e) {
		e.preventDefault();
		videoApi.getPlaylistFromApi(getPlaylistId(), videoApi.getPrevPageToken());
	};	

	/**
	 * Scroll to video player
	 */ 
	var _scrollToPlayer = function() {
		zenscroll.to(document.getElementById('videoContainer'), 500);
	};

    // Reveal public pointers to
    // private functions and properties
    return {
		handleYtPlaylistLoaded: handleYtPlaylistLoaded,
		getPlaylistId: getPlaylistId
    };	
})();	