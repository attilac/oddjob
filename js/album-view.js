/*jshint esversion: 6 */
console.log('---Album View');

/**
 * View for Albums
 * Revealing Module Pattern
 * 
 */
var albumView = (function() {
		
	/**
	 * Handler for album on loaded. Appends template and assigns event handlers
	 * {Object} json - object with album data
	 */ 
	var handleAlbumListLoaded = function(json){
		//console.log(utils.sortObjectsByKey(json, 'year', 'DESC'));
		document.getElementById('albumContainer').innerHTML = albumTemplate.list(utils.sortObjectsByKey(json, 'year', 'DESC'));

		Array.prototype.slice.call(document.querySelectorAll('.album-detail-link'))
		.forEach(function(link){
			link.addEventListener('click', albumItemOnClick, false);
		});

		Array.prototype.slice.call(document.querySelectorAll('.purchase-link'))
		.forEach(function(link){
			link.addEventListener('click', purchaseLinkOnClick, false);
		});

		view.delayFadeInContent('.album-list-item');
		
	};

	/**
	 * Click handler for album. Trigger getAlbumItem from albumApi
	 * {Event} e - the event
	 */
	var albumItemOnClick = function(e){
		e.preventDefault();
		//console.log(this.parentNode.dataset.title);
		albumApi.getAlbumItem(this.parentNode.dataset.id);
		albumApi.getPurchaseLinks(this.parentNode.dataset.id, albumView.handlePurchaseLinksLoaded);
	};

	/**
	 * Handler for album detail on loaded. Appends template and triggers getAlbumTracks from albumApi
	 * {Object} response - object with album data
	 */ 
	var handleAlbumItemLoaded = function(response){	
		//console.log(response);
		document.querySelector('#albumContainer').innerHTML = '';
		document.getElementById('albumContainer').innerHTML = albumTemplate.albumItem(response);		
		albumApi.getAlbumTracks(response.title);
		_scrollToAlbum();
		view.delayFadeInContent('.album-detail');
	};

	/**
	 * Handler for album tracks on loaded. Appends template.
	 * {Object} response - object with album data
	 */ 
	var handleAlbumTracksLoaded = function(response){
		let album = response.album || '' ? response.album: '';
		//console.log(album);
		document.querySelector('#albumContainer .tracks-container').innerHTML = albumTemplate.trackList(album.tracks.track);
	};	

	/**
	 * Handler for album buy-links
	 * {Event} e - the event that was triggered
	 */
	var purchaseLinkOnClick = function(e){
		e.preventDefault();
		//console.log(this.dataset.id);
		albumApi.getPurchaseLinks(this.dataset.id, albumView.handlePurchaseModalContentLoaded);
	};

	/**
	  * Handler for album buy-links on loaded. Appends template to modal and opens it.
	  * {Object} response - object with album buy-links
	 */ 
	var handlePurchaseModalContentLoaded = function(response){
		//console.log(response);
		document.querySelector('#purchaseModal .modal-dialog').innerHTML = albumTemplate.purchaseModalContent(response);
		$('#purchaseModal').modal('show');		
	};	

	/**
	  * Handler for album buy-links on loaded from album detail view.
	  * {Object} response - object with album buy-links
	 */ 
	var handlePurchaseLinksLoaded = function(response){
		//console.log(response);
		if(document.querySelector('#purchaseWrapper') || ''){
			document.querySelector('#purchaseLinks').parentNode.removeChild(document.querySelector('#purchaseLinks'));
			document.querySelector('#purchaseWrapper').parentNode.removeChild(document.querySelector('#purchaseWrapper'));
		}
		let purchaseLinks = document.createElement('div');
		purchaseLinks.setAttribute('id', 'purchaseWrapper');
		purchaseLinks.innerHTML = albumTemplate.purchaseLinks(response);
		document.querySelector('#albumContainer').appendChild(purchaseLinks);	
	};		

	/**
	 * Scroll to album
	 */ 
	var _scrollToAlbum = function() {
		zenscroll.to(document.getElementById('albumContainer'), 500);
	};	

    // Reveal public pointers to
    // private functions and properties
    return {
		handleAlbumListLoaded: handleAlbumListLoaded,
		handleAlbumItemLoaded: handleAlbumItemLoaded,
		handleAlbumTracksLoaded: handleAlbumTracksLoaded,
		handlePurchaseModalContentLoaded: handlePurchaseModalContentLoaded,
		handlePurchaseLinksLoaded: handlePurchaseLinksLoaded
    };	
})();	 