/*jshint esversion: 6 */

/**
 * Album page
 * 
 */
var albumPage = (function() {

	var _currentAlbum;   

	/**
	 * 
	 */ 
	var init = function(){		
	};

	/**
	 * 
	 */ 
	var getAlbumsFromAPI = function() {
		//console.log('Hej');
		var requestOptions = {
			method: 'album.getInfo',
			api_key: '377eabc9766b8fc2773689da32024f81',
			artist: 'Oddjob',
			album: 'Koyo',
			format: 'json'
		}; 	 
		ajaxFetch.getDataFromAPI('http://ws.audioscrobbler.com/2.0/?', ajaxFetch.jsonToURI(requestOptions), view.handleLFMAlbumLoaded);  		
	};		

	// Reveal public pointers to
    // private functions and properties
    return {
        init: init(),  
        getAlbumsFromAPI: getAlbumsFromAPI    
    };

})();  