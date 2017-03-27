/*jshint esversion: 6 */

/**
 * Album page
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
	 * 
	 */ 
	var getAlbumList = function() {
		ajaxFetch.getDataFromApi('https://oddjob-albums.herokuapp.com/albums', '', albumView.handleAlbumListLoaded);		
	};	

	/**
	 * 
	 */ 
	var getAlbumItem = function(albumId) {
		ajaxFetch.getDataFromApi('https://oddjob-albums.herokuapp.com/albums/' + albumId, '', albumView.handleAlbumItemLoaded);		
	};			

	/**
	 * 
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

	// Reveal public pointers to
    // private functions and properties
    return {
        init: init(),  
        getAlbumList: getAlbumList,
        getAlbumItem: getAlbumItem,
        getAlbumTracks: getAlbumTracks   
    };

})();  