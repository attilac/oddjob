/*jshint esversion: 6 */

/**
 * Video YouTube API functions
 * 
 */
var videoApi = (function() {

	var player;   
	var done = false;
	var _currentPlaylist;
	var _nextPageToken = 0;
	var _prevPageToken = 0;

	/**
	 * 
	 */ 
	var init = function(){
		_getYoutubeApiScript();			
	};

	/**
	 * 
	 */
	var setCurrentPlaylist = function(json){
		_currentPlaylist = json;
	};

	/**
	 * 
	 */
	var getCurrentPlaylist = function(){
		return _currentPlaylist;
	};	

	/**
	 * 
	 */
	var getCurrentVideo = function(playlist, videoId){
		return playlist
		.find(function(item){
			//console.log(item.snippet);
			return item.snippet.resourceId.videoId === videoId;
		});
	};	

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
	var createYTPlayer = function(){
		//console.log('init');
		player = new YT.Player('player', {
		  height: 540,
		  width: 960,
		  autoplay: 0,
		  modestbranding: 1,
		  events: {
		    'onReady': onPlayerReady,
		    'onStateChange': onPlayerStateChange
		  }
		});		
	};

	/**
	 * 
	 */ 
	var getPlaylistFromAPI = function(playlistId='PLRhET9MFZHSJoCXIpYBSOdtYth17XC8KJ', pageToken = '' ) {
		var requestOptions = {
			part: 'snippet', 
			playlistId: playlistId, 
			maxResults: 10,
			key: 'AIzaSyAkHZkDEEWvpe-Fv9_PWwXN_GljkjUQRP0'
		}; 	 
		if (pageToken) {
	    	requestOptions.pageToken = pageToken;
	  	}
		ajaxFetch.getDataFromAPI('https://www.googleapis.com/youtube/v3/playlistItems?', ajaxFetch.jsonToURI(requestOptions), videoView.handleYtPlaylistLoaded);  		
	};		

	/**
	 * 
	 */ 
	var _getYoutubeApiScript = function(){
		var tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);	
	};	

	/**
	 * 
	 */ 
	var onYouTubeIframeAPIReady = function (){
		console.log('frameAPIReady');
	};

	/**
	 * 
	 */  
	var onPlayerReady = function(event) {
		console.log('Player Ready');
		document.getElementById('player').classList.add('embed-responsive-item');
		cuePlaylist('PLRhET9MFZHSJoCXIpYBSOdtYth17XC8KJ', 'playlist', 0 );
	};

	/**
	 * The API calls this function when the player's state changes.
	 * The function indicates that when playing a video (state=1),
	 * the player should play for six seconds and then stop.
	 */ 	
	var onPlayerStateChange = function(event) {
		/*
		if (event.data == YT.PlayerState.PLAYING && !done) {
		  setTimeout(stopVideo, 6000);
		  done = true;
		}
		*/
		if (event.data == YT.PlayerState.CUED){
			//console.log('Video Cued');
		}
	};

	/**
	 * 
	 */ 
	var playVideo = function() {
		player.playVideo();
	};	

	/**
	 * 
	 */ 
	var stopVideo = function() {
		player.stopVideo();
	};

	/**
	 * 
	 */ 
	var removePlayer = function() {
		player.destroy();
	};	

	/**
	 * 
	 */ 
	var cuePlaylist = function(playList, listType, index=0) {
		//console.log(player);
		player.cuePlaylist({list: playList,
	                     listType: listType,
	                     index: index});      		
	};	

	/**
	 * 
	 */
	var cueVideoById = function(videoId) {
		player.cueVideoById(videoId);
    };	


	// Reveal public pointers to
    // private functions and properties
    return {
        init: init(),
        getPlaylistFromAPI: getPlaylistFromAPI,
        createYTPlayer: createYTPlayer,
        playVideo: playVideo,
        stopVideo: stopVideo,
        cuePlaylist: cuePlaylist,
        cueVideoById: cueVideoById,
        removePlayer: removePlayer,
    	player: player,
    	done: done, 
    	setCurrentPlaylist: setCurrentPlaylist,
    	getCurrentPlaylist: getCurrentPlaylist,
    	getCurrentVideo: getCurrentVideo,
		getNextPageToken: getNextPageToken,
		setNextPageToken: setNextPageToken,
		getPrevPageToken: getPrevPageToken,
		setPrevPageToken: setPrevPageToken    	       
    };
})();  

  