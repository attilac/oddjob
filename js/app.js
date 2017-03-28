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
	    closeErrorAlert();
	};

	/**
	 * 
	 */ 
	var pageOnHidden = function(pageId){
		if(pageId === 1 && document.querySelector('iframe#player') || ''){
			console.log('Remove Video');
			videoApi.removePlayer();
		}
		if(pageId === 0){
			console.log('Remove Albums');
			document.getElementById('albumContainer').innerHTML = '';
		}		
	};	

	/**
	 * 
	 */ 
	var videoPageLinkOnClick = function(e){
		e.preventDefault();
		videoApi.getPlaylistFromApi();
	};	

	/**
	 * 
	 */ 
	var audioPageLinkOnClick = function(e){
		e.preventDefault();
		albumApi.getAlbumList();
	};

	/**
	 * 
	 */
	var showErrorAlert = function(error){
		document.querySelector('.ajax-error-container').classList.remove('hidden');
		document.querySelector('.ajax-error-container .container').innerHTML = alertBox(`<strong>Oh snap!</strong> There was an error when fetching the content. Please try again later. <small><em>${error}</em></small>`);
	};	

	/**
	 * 
	 */
	var closeErrorAlert = function(){
		document.querySelector('.ajax-error-container').classList.add('hidden');
		if(document.querySelector('.ajax-error-container .alert-warning') || ''){
			document.querySelector('.ajax-error-container .alert-warning').alert('close');
		}
	};		

	/**
	 * 
	 */
	var showLoadingSpinner = function(){
		document.querySelector('.ajax-load-indicator-container').classList.remove('hidden');
	};

	/**
	 * 
	 */
	var hideLoadingSpinner = function(){
		document.querySelector('.ajax-load-indicator-container').classList.add('hidden');
	};	

	/**
	 * 
	 */
	var alertBox = (message, alertClass="alert-warning") =>{
		//console.log('message');
		return `
		  <div class="alert ${alertClass} alert-dismissible fade show" role="alert">
		    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
		      <span aria-hidden="true">&times;</span>
		    </button>      
		    <div class="alert-message">${message}</div>
		  </div> 
		`;
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
		hideLoadingSpinner: hideLoadingSpinner
    };	
})();


