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
	var getAlbumsFromApi = function() {
		ajaxFetch.getDataFromApi('https://oddjob-albums.herokuapp.com/albums', '', albumView.handleAlbumLoaded);		
	};		

	/**
	 * 
	 */ 
	var getTracksFromLfmApi	= function(title) {
		var requestOptions = {
			method: 'album.getInfo',
			api_key: '377eabc9766b8fc2773689da32024f81',
			artist: 'Oddjob',
			album: title,
			format: 'json'
		}; 
		ajaxFetch.getDataFromApi('https://ws.audioscrobbler.com/2.0/?', ajaxFetch.jsonToURI(requestOptions), albumView.handleSingleAlbumLoaded); 
	};

	// Reveal public pointers to
    // private functions and properties
    return {
        init: init(),  
        getAlbumsFromApi: getAlbumsFromApi,
        getTracksFromLfmApi: getTracksFromLfmApi   
    };

})();  