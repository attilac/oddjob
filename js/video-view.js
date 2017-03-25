/*jshint esversion: 6 */
console.log('---App');

/**
 * View for Video Playlist
 * Revealing Module Pattern
 * 
 */
var videoView = (function() {

	var _nextPageToken = 0;
	var _prevPageToken = 0;

	/**
	 * 
	 */ 
	var getNextPageToken = function(){
		return _nextPageToken;
	};	

	/**
	 * 
	 */ 
	var setNextPageToken = function(token){
		_nextPageToken = token;
	};	

	/**
	 * 
	 */ 
	var getPrevPageToken = function(){
		return _prevPageToken;
	};	

	/**
	 * 
	 */ 
	var setPrevPageToken = function(token){
		_prevPageToken = token;
	};			
	/**
	 * 
	 */ 
	var handleYtPlaylistLoaded = function(json) {
		//console.log(json.items);
	    setNextPageToken(json.nextPageToken);
	    setPrevPageToken(json.prevPageToken);
	    videoApi.setCurrentPlaylist(json.items);

	    var playlistItems = json.items;
	    if (playlistItems) {
      		document.getElementById('playlistContainer').innerHTML = templates.videoList(json);
	    } else {
    		document.getElementById('playlistContainer').innerHTML.html('Sorry you have no uploaded videos');
	    }
		addPlaylistEventHandlers();

		if(! document.querySelector('iframe#player') || ''){
			videoApi.createYTPlayer();
		}else{
			videoApi.cuePlaylist('PLRhET9MFZHSJoCXIpYBSOdtYth17XC8KJ', 'playlist', playlistItems[0].snippet.position);
		}

		document.getElementById('videoInfo').innerHTML = templates.videoMeta(videoApi.getCurrentVideo(videoApi.getCurrentPlaylist(), playlistItems[0].snippet.resourceId.videoId));
	};

	/**
	 * 
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
	 * 
	 */ 
	var videoTitleLinkOnClick = function(e){
		e.preventDefault();
		let videoId = this.parentNode.parentNode.parentNode.parentNode.dataset.id;
		videoApi.cueVideoById(videoId);
		document.getElementById('videoInfo').innerHTML = templates.videoMeta(videoApi.getCurrentVideo(videoApi.getCurrentPlaylist(), videoId));
		_scrollToPlayer();
	};	

	/**
	 * 
	 */ 
	var playListItemOnMouseEnter = function(e){
		e.preventDefault();
		this.classList.add('playlist-hover');
	};

	/**
	 * 
	 */ 
	var playListItemOnMouseLeave = function(e){
		e.preventDefault();
		this.classList.remove('playlist-hover');
	};	

	/**
	 * 
	 */
	var playListItemOnClick = function(e){
		e.preventDefault();
		this.querySelector('.video-title-link').click();
	};	

	/**
	 * Retrieve the next page of videos in the playlist.
	 */ 	
	var nextPage = function(e) {
		e.preventDefault();
		videoApi.getPlaylistFromAPI('PLRhET9MFZHSJoCXIpYBSOdtYth17XC8KJ', getNextPageToken());
		_scrollToPlayer();
	};

	/**
	 * Retrieve the previous page of videos in the playlist.
	 */ 	
	var previousPage = function(e) {
		e.preventDefault();
		videoApi.getPlaylistFromAPI('PLRhET9MFZHSJoCXIpYBSOdtYth17XC8KJ', getPrevPageToken());
		_scrollToPlayer();
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
		getNextPageToken: getNextPageToken,
		setNextPageToken: setNextPageToken,
		getPrevPageToken: getPrevPageToken,
		setPrevPageToken: setPrevPageToken,
    };	
})();	