/*jshint esversion: 6 */
console.log('---View');

/**
 * The main view. Functions for pages
 * Revealing Module Pattern
 * 
 */
var view = (function() {

	var _currentPage;

	/**
	 * Init function
	 */ 
	var init = function(){
		_addPageLinkHandlers();
	};

	/**
	 * Set the current page
	 */ 
	var setCurrentPage = function(index){
		_currentPage = Number(index);
	};	

	/**
	 * Get the current page
	 */ 
	var getCurrentPage = function(){
		return _currentPage;
	};		

	/**
	 * Add event handlers to links
	 */ 
	var _addPageLinkHandlers = function(){
		Array.prototype.slice.call(document.querySelectorAll('.navbar .page-nav-link'))
		.forEach(function(link){
			link.addEventListener('click', pageLinkOnClick, false);
		});

		document.getElementById('videoPageLink').addEventListener('click', videoPageLinkOnClick, 'false');
		document.getElementById('audioPageLink').addEventListener('click', audioPageLinkOnClick, 'false');

	};

	/**
	 * Handler for page links on click
	 * {Event} event - the event that was triggered
	 */ 
	var pageLinkOnClick = function(event){
		event.preventDefault();
		setCurrentPage(this.dataset.id);
		document.querySelector(this.dataset.target).classList.remove('hidden');

	    Array.prototype.slice.call(document.querySelectorAll('.navbar .page-nav-link'))
	    .forEach(function(item) {
	    	if(getCurrentPage() === Number(item.dataset.id)){
	    		item.parentNode.classList.add('active'); 
	    	}else{
	    		item.parentNode.classList.remove('active'); 
	    		document.querySelector(item.dataset.target).classList.add('hidden');
	    		pageOnHidden(Number(item.dataset.id));
	    	}
	    }); 

	    closeErrorAlert();
	};

	/**
	 * Handler on page hidden. Clears page content
	 * {number} pageId - the id of the page
	 */ 
	var pageOnHidden = function(pageId){
		if(pageId === 1 && document.querySelector('iframe#player') || ''){
			console.log('Remove Video');
			//document.getElementById('player').innerHTML = '';
			document.getElementById('playlistContainer').innerHTML = '';
			document.getElementById('videoInfo').innerHTML = '';
			videoApi.removePlayer();
		}
		if(pageId === 0){
			console.log('Remove Albums');
			document.getElementById('albumContainer').innerHTML = '';
		}		
	};	

	/**
	 * Click handler for video page link
	 * {Event} e - the event that was triggered
	 */ 
	var videoPageLinkOnClick = function(e){
		e.preventDefault();
		videoApi.getPlaylistFromApi();
	};	

	/**
	 * 
	 * Click handler for album page link
	 * {Event} e - the event that was triggered
	 */ 
	var audioPageLinkOnClick = function(e){
		e.preventDefault();
		albumApi.getAlbumList();
	};

	/**
	 * Show error alert box
	 */
	var showErrorAlert = function(error){
		document.querySelector('.ajax-error-container').classList.remove('hidden');
		document.querySelector('.ajax-error-container .container').innerHTML = alertBox(`<strong>Oh snap!</strong> There was an error when fetching the content. Please try again later. <small><em>${error}</em></small>`);
	};	

	/**
	 * Hide error alert box
	 */
	var closeErrorAlert = function(){
		document.querySelector('.ajax-error-container').classList.add('hidden');
		if(document.querySelector('.ajax-error-container .alert-warning') || ''){
			document.querySelector('.ajax-error-container .alert-warning').alert('close');
		}
	};		

	/**
	 * Show spinner icon
	 */
	var showLoadingSpinner = function(){
		document.querySelector('.ajax-load-indicator-container').classList.remove('hidden');
	};

	/**
	 * Hide spinner icon
	 */
	var hideLoadingSpinner = function(){
		document.querySelector('.ajax-load-indicator-container').classList.add('hidden');
	};	

	/**
	 * Template for alertbox
	 * {String} message - the alert message
	 * {String} alertClass - classname of the alert
	 */
	var alertBox = (message, alertClass="alert-warning") =>{
		return `
		  <div class="alert ${alertClass} alert-dismissible fade show" role="alert">
		    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
		      <span aria-hidden="true">&times;</span>
		    </button>      
		    <div class="alert-message">${message}</div>
		  </div> 
		`;
	};	

	/**
	 * Delays the fadeInContent function
	 * {String} className - className to element to fade
	 */
	var delayFadeInContent = function(className) {
	  	//window.setTimeout(FadeInAlbums, 200);
		window.setTimeout(function() {
		    fadeInContent(className);
		}, 200);	  
	};

	/**
	 * Fade in element by adding show class. 
	 * {String} className - className to element to fade
	 */	
	 var fadeInContent = function(className){
		Array.prototype.slice.call(document.querySelectorAll(className))
		.forEach(function(album){
			album.classList.add('show');
		});	
	};			


    // Reveal public pointers to
    // private functions and properties
    return {
		init: init(),
		getCurrentPage: getCurrentPage,
		setCurrentPage: getCurrentPage,
		showErrorAlert: showErrorAlert,
		closeErrorAlert: closeErrorAlert,
		alertBox: alertBox,
		showLoadingSpinner: showLoadingSpinner,
		hideLoadingSpinner: hideLoadingSpinner,
		delayFadeInContent: delayFadeInContent
    };	
})();


