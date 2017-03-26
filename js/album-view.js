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
	var handleAlbumLoaded = function(json){
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
	var handleSingleAlbumLoaded = function(json){
		console.log(json);
	};	

	/**
	 * 
	 */
	var albumItemOnClick = function(e){
		e.preventDefault();
		console.log(this.parentNode.dataset.title);
		albumApi.getTracksFromLfmApi(this.parentNode.dataset.title);
	};

    // Reveal public pointers to
    // private functions and properties
    return {
		handleAlbumLoaded: handleAlbumLoaded,
		handleSingleAlbumLoaded: handleSingleAlbumLoaded
    };	
})();	 