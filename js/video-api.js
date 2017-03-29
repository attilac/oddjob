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
	 * Init function. Fetch and insert api script asynch from youtube
	 */ 
	var init = function(){
		_getYoutubeApiScript();			
	};

	/**
	 * Set the current playlist object for reference
	 * {Object} json - object with playlist items
	 */
	var setCurrentPlaylist = function(json){
		_currentPlaylist = json;
	};

	/**
	 * Get the current playlist object
	 * @return {Object} _currentPlaylist
	 */
	var getCurrentPlaylist = function(){
		return _currentPlaylist;
	};	

	/**
	 * Get the current video from playlist by matching the id
	 * @param {Object} playList - the playlist to search in
	 * @param {String} videoId - the id to match
	 * @return {Object} video object
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
	 * Create YouTube player
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
	 * Get playlist from API
	 * {String} playlistId - id of playlist
	 * {String} pageToken
	 */ 
	var getPlaylistFromApi = function(playlistId='PLRhET9MFZHSJoCXIpYBSOdtYth17XC8KJ', pageToken = '' ) {
		var requestOptions = {
			part: 'snippet', 
			playlistId: playlistId, 
			maxResults: 10,
			key: 'AIzaSyAkHZkDEEWvpe-Fv9_PWwXN_GljkjUQRP0'
		}; 	 
		if (pageToken) {
	    	requestOptions.pageToken = pageToken;
	  	}
		ajaxFetch.getDataFromApi('https://www.googleapis.com/youtube/v3/playlistItems?', ajaxFetch.jsonToURI(requestOptions), videoView.handleYtPlaylistLoaded);  		
	};		

	/**
	 * Insert YouTube iframe api script
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
	 * Handler for YouTube player on ready. 
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
		if (event.data == YT.PlayerState.CUED){
			//console.log('Video Cued');
		}
	};

	/**
	 * Start video playback
	 */ 
	var playVideo = function() {
		player.playVideo();
	};	

	/**
	 * Stop video playback
	 */ 
	var stopVideo = function() {
		player.stopVideo();
	};

	/**
	 * Removes the YouTube player iframe and inserts an empty div with id player
	 */ 
	var removePlayer = function() {
		if(player.destroy){
			player.destroy();
		}
	};	

	/**
	 * Cue playlist
	 */ 
	var cuePlaylist = function(playList, listType, index=0) {
		//console.log(player);
		player.cuePlaylist({list: playList,
	                     listType: listType,
	                     index: index});      		
	};	

	/**
	 * Cue video by id
	 */
	var cueVideoById = function(videoId) {
		player.cueVideoById(videoId);
    };	


	// Reveal public pointers to
    // private functions and properties
    return {
        init: init(),
        getPlaylistFromApi: getPlaylistFromApi,
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

  