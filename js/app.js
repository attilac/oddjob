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
		Array.prototype.slice.call(document.querySelectorAll('.navbar .nav-link'))
		.forEach(function(link){
			link.addEventListener('click', pageLinkOnClick, false);
		});

		document.getElementById('videoPageLink').addEventListener('click', videoPageLinkOnClick, 'false');

	};

	/**
	 * 
	 */ 
	var pageLinkOnClick = function(event){
		event.preventDefault();
		setCurrentPage(this.dataset.id);
		document.querySelector(this.dataset.target).classList.remove('hidden');

	    Array.prototype.slice.call(document.querySelectorAll('.navbar .nav-link'))
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
		document.getElementsByClassName('watch-title')[0].innerHTML =  playlistItems[0].snippet.title;
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
		videoPage.cueVideoById(this.parentNode.parentNode.parentNode.parentNode.dataset.id);
		document.getElementsByClassName('watch-title')[0].innerHTML = this.innerHTML;
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
		videoPage.getPlaylistFromAPI('PLRhET9MFZHSJoCXIpYBSOdtYth17XC8KJ', getNextPageToken());
		_scrollToPlayer();
	};

	/**
	 * Retrieve the previous page of videos in the playlist.
	 */ 	
	var previousPage = function(e) {
		e.preventDefault();
		videoPage.getPlaylistFromAPI('PLRhET9MFZHSJoCXIpYBSOdtYth17XC8KJ', getPrevPageToken());
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


