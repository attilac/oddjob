/*jshint esversion: 6 */
console.log('---App');

/**
 * Revealing Module Pattern
 * 
 */
var view = (function() {

	var _currentPage;

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
	var _addPageLinkHandlers = function(){
		Array.prototype.slice.call(document.querySelectorAll('.navbar .nav-link'))
		.forEach(function(link){
			link.addEventListener('click', pageLinkOnClick, false);
		});

		document.getElementById('videoPageLink').addEventListener('click', videoPageLinkOnClick, 'false');
		document.getElementById('audioPageLink').addEventListener('click', audioPageLinkOnClick, 'false');

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
			videoApi.removePlayer();
		}
	};	

	/**
	 * 
	 */ 
	var videoPageLinkOnClick = function(e){
		e.preventDefault();
		videoApi.getPlaylistFromAPI();
	};	

	/**
	 * 
	 */ 
	var audioPageLinkOnClick = function(e){
		e.preventDefault();
		albumPage.getAlbumsFromAPI();
	};

	/**
	 * ------------------------------------------------------------------------
	 *  Albums
	 * ------------------------------------------------------------------------
	*/
	/**
	 * 
	 */ 
	var handleLFMAlbumLoaded = function(json){
		console.log(json);
	};

    // Reveal public pointers to
    // private functions and properties
    return {
		init: init(),
		getCurrentPage: getCurrentPage,
		setCurrentPage: getCurrentPage,
		handleLFMAlbumLoaded: handleLFMAlbumLoaded
    };	
})();


