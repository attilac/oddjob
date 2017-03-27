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
		let errorMessage = response.error || '' ? response.message : '';
		console.log(errorMessage);
		if(errorMessage || '') view.showErrorAlert(errorMessage);

		let album = response.album || '' ? response.album: '';
		console.log(album);
		console.log(utils.getObjectPropertyList(album.tracks.track, 'name'));
		document.querySelector('#albumContainer .tracks-container').innerHTML = albumTemplate.trackList(album.tracks.track);
	};	

	/**
	 * 
	 */
	var albumItemOnClick = function(e){
		e.preventDefault();
		//console.log(this.parentNode.dataset.title);
		albumApi.getAlbumItem(this.parentNode.dataset.id);
	};

    // Reveal public pointers to
    // private functions and properties
    return {
		handleAlbumListLoaded: handleAlbumListLoaded,
		handleAlbumItemLoaded: handleAlbumItemLoaded,
		handleAlbumTracksLoaded: handleAlbumTracksLoaded
    };	
})();	 