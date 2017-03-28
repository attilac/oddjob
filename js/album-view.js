/*jshint esversion: 6 */
console.log('---Album View');

/**
 * View for Albums
 * Revealing Module Pattern
 * 
 */
var albumView = (function() {
		
	/**
	 * 
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

		delayShowAlbums();
		
	};

	/**
	 * 
	 */
	var delayShowAlbums = function() {
	  let timeoutID = window.setTimeout(showAlbums, 200);
	};

	/**
	 * 
	 */	
	 var showAlbums = function(){
		Array.prototype.slice.call(document.querySelectorAll('.album-list-item'))
		.forEach(function(album){
			album.classList.add('show');
		});	
	};	

	/**
	 * 
	 */
	var albumItemOnClick = function(e){
		e.preventDefault();
		//console.log(this.parentNode.dataset.title);
		albumApi.getAlbumItem(this.parentNode.dataset.id);
	};

	/**
	 * 
	 */ 
	var handleAlbumItemLoaded = function(response){	
		//console.log(response);
		document.getElementById('albumContainer').innerHTML = albumTemplate.albumItem(response);		
		albumApi.getAlbumTracks(response.title);
	};

	/**
	 * 
	 */ 
	var handleAlbumTracksLoaded = function(response){
		/*
		let errorMessage = response.error || '' ? response.message : '';
		console.log(errorMessage);
		if(errorMessage || '') view.showErrorAlert(errorMessage);
		*/

		let album = response.album || '' ? response.album: '';
		//console.log(album);
		document.querySelector('#albumContainer .tracks-container').innerHTML = albumTemplate.trackList(album.tracks.track);
	};	

	/**
	 * 
	 */
	var purchaseLinkOnClick = function(e){
		e.preventDefault();
		//console.log(this.dataset.id);
		albumApi.getPurchaseLinks(this.dataset.id);
	};

	/**
	 * 
	 */ 
	var handlePurchaseLinksLoaded = function(response){
		//console.log(response);
		document.querySelector('#purchaseModal .modal-body').innerHTML = albumTemplate.purchaseContent(response);
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