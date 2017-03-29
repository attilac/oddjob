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
	};

	/**
	 * Handler for album detail on loaded. Appends template and triggers getAlbumTracks from albumApi
	 * {Object} response - object with album data
	 */ 
	var handleAlbumItemLoaded = function(response){	
		//console.log(response);
		document.getElementById('albumContainer').innerHTML = albumTemplate.albumItem(response);		
		albumApi.getAlbumTracks(response.title);
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
		albumApi.getPurchaseLinks(this.dataset.id);
	};

	/**
	  * Handler for album buy-links on loaded. Appends template to modal and opens it.
	  * {Object} response - object with album buy-links
	 */ 
	var handlePurchaseLinksLoaded = function(response){
		//console.log(response);
		document.querySelector('#purchaseModal .modal-dialog').innerHTML = albumTemplate.purchaseContent(response);
		$('#purchaseModal').modal('show');		
	};	

    // Reveal public pointers to
    // private functions and properties
    return {
		handleAlbumListLoaded: handleAlbumListLoaded,
		handleAlbumItemLoaded: handleAlbumItemLoaded,
		handleAlbumTracksLoaded: handleAlbumTracksLoaded,
		handlePurchaseLinksLoaded: handlePurchaseLinksLoaded
    };	
})();	 