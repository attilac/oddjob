/*jshint esversion: 6 */
console.log('---App');

/**
 * Revealing Module Pattern
 * 
 */
var view = (function() {

	var _currentPage;
	var _nextPageToken = 0;
	var _prevPageToken = 0;

	/**
	 * Creates Movie objects from an array of JSON-data and adds to movieDatabase
	 * This is main 'database' that we manipulate and add new movies to
	 * @param {array} arr - the array to parse
	 */
	var parseJSON = function(arr){
		console.log(arr);
	};

	/**
	 * 
	 */ 
	var init = function(){
		_addPageLinkHandlers();
	};

	/**
	 * 
	 */ 
	var setCurrentPage = function(index){
		_currentPage = Number(index);
	};	

	/**
	 * 
	 */ 
	var getCurrentPage = function(){
		return _currentPage;
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
	var _addPageLinkHandlers = function(){
		document.querySelectorAll('.navbar .nav-link')
		.forEach(function(link){
			link.addEventListener('click', pageLinkOnClick, false);
		});

		document.getElementById('videoPageLink').addEventListener('click', videoPageLinkOnClick, 'false');

	};

	/**
	 * 
	 */ 
	var pageLinkOnClick = function(e){
		e.preventDefault();
		setCurrentPage(this.dataset.id);
		document.querySelector(this.dataset.target).classList.remove('hidden');

	    document.querySelectorAll('.navbar .nav-link')
	    .forEach(function(item) {
	    	if(getCurrentPage() === Number(item.dataset.id)){
	    		item.parentNode.classList.add('active'); 
	    	}else{
	    		item.parentNode.classList.remove('active'); 
	    		document.querySelector(item.dataset.target).classList.add('hidden');
	    		pageOnHidden(Number(item.dataset.id));
	    	}
	    }); 
	};

	/**
	 * 
	 */ 
	var pageOnHidden = function(pageId){
		if(pageId === 1 && document.querySelector('iframe#player') || ''){
			console.log('Remove Video');
			videoPage.removePlayer();
		}
	};	

	/**
	 * 
	 */ 
	var videoPageLinkOnClick = function(e){
		e.preventDefault();
		videoPage.getPlaylistFromAPI();
	};	

	/**
	 * 
	 */ 
	var handleYtPlaylistLoaded = function(json) {
		//console.log(json.items);
	    setNextPageToken(json.nextPageToken);
	    setPrevPageToken(json.prevPageToken);

	    var playlistItems = json.items;
	    if (playlistItems) {
	      document.getElementById('playlistContainer').innerHTML = templates.movieList(json);
	    } else {
	    	document.getElementById('playlistContainer').innerHTML.html('Sorry you have no uploaded videos');
	    }
		addPlaylistEventHandlers();

		if(! document.querySelector('iframe#player') || ''){
			videoPage.createYTPlayer();
		}else{
			videoPage.cuePlaylist('PLRhET9MFZHSJoCXIpYBSOdtYth17XC8KJ', 'playlist', playlistItems[0].snippet.position);
		}
	};

	/**
	 * 
	 */ 
	var addPlaylistEventHandlers = function(){
	    document.querySelector('#prevButton').addEventListener('click', previousPage, 'false');
 		document.querySelector('#nextButton').addEventListener('click', nextPage, 'false');
		document.querySelectorAll('.video-title-link')
		.forEach(function(videoLink){
			videoLink.addEventListener('click', playListItemOnClick, 'false');
		}); 	
	};

	/**
	 * 
	 */ 
	var playListItemOnClick = function(e){
		e.preventDefault();
		videoPage.cueVideoById(this.parentNode.parentNode.parentNode.parentNode.dataset.id);
	};	

	/**
	 * Retrieve the next page of videos in the playlist.
	 */ 	
	var nextPage = function(e) {
		e.preventDefault();
		videoPage.getPlaylistFromAPI('PLRhET9MFZHSJoCXIpYBSOdtYth17XC8KJ', getNextPageToken());
	};

	/**
	 * Retrieve the previous page of videos in the playlist.
	 */ 	
	var previousPage = function(e) {
		e.preventDefault();
		videoPage.getPlaylistFromAPI('PLRhET9MFZHSJoCXIpYBSOdtYth17XC8KJ', getPrevPageToken());
	};	

    // Reveal public pointers to
    // private functions and properties
    return {
		init: init(),
		getCurrentPage: getCurrentPage,
		setCurrentPage: getCurrentPage,
		handleYtPlaylistLoaded: handleYtPlaylistLoaded,
		getNextPageToken: getNextPageToken,
		setNextPageToken: setNextPageToken,
		getPrevPageToken: getPrevPageToken,
		setPrevPageToken: setPrevPageToken
    };	
})();


