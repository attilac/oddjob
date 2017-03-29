/*jshint esversion: 6 */

/**
 * Functions for calling APIs thru ajaxFetch module
 * 
 */
var albumApi = (function() {

	var _currentAlbum;   

	/**
	 * 
	 */ 
	var init = function(){		
	};

	/**
	 * Get list of albums from API
	 */ 
	var getAlbumList = function() {
		ajaxFetch.getDataFromApi('https://oddjob-albums.herokuapp.com/albums/', '', albumView.handleAlbumListLoaded);		
	};	

	/**
	 * Get album from API 
	 */ 
	var getAlbumItem = function(albumId) {
		ajaxFetch.getDataFromApi('https://oddjob-albums.herokuapp.com/albums/' + albumId, '', albumView.handleAlbumItemLoaded);		
	};			

	/**
	 * Get album tracks from API
	 */ 
	var getAlbumTracks = function(title) {
		var requestOptions = {
			method: 'album.getInfo',
			api_key: '377eabc9766b8fc2773689da32024f81',
			artist: 'Oddjob',
			album: title,
			format: 'json'
		}; 
		ajaxFetch.getDataFromApi('https://ws.audioscrobbler.com/2.0/?', ajaxFetch.jsonToURI(requestOptions), albumView.handleAlbumTracksLoaded); 
	};

	/**
	 * 
	 */ 
	var getPurchaseLinks = function(albumId){
		ajaxFetch.getDataFromApi('https://oddjob-albums.herokuapp.com/albums/' + albumId, '', albumView.handlePurchaseLinksLoaded);
	};

	// Reveal public pointers to
    // private functions and properties
    return {
        init: init(),  
        getAlbumList: getAlbumList,
        getAlbumItem: getAlbumItem,
        getAlbumTracks: getAlbumTracks,
        getPurchaseLinks: getPurchaseLinks   
    };

})();  