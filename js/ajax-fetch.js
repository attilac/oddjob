/*jshint esversion: 6 */
console.log('---AJAX Fetch');
console.log( '-----Revealing Module Pattern-----');
/*-------------------------------------------------------------------------
			AJAX functions					
--------------------------------------------------------------------------*/

/**
 * Revealing Module Pattern
 * 
 */
var ajaxFetch = (function(urlToAPI) {

	var dataUrl = urlToAPI;

	/**
	 * Fetch data from API
	 * @param {String} dataurl - the url to the API
	 */
	var getDataFromApi = function(dataUrl = '', queryStrings = '', callback = ''){
		fetch(dataUrl + queryStrings)
		  .then(checkStatus)
		  .then(parseJSON)
		  .then(function(data) {
		    //console.log('request succeeded with JSON response', data);
		    if(callback){
		    	callback(data);
		    }
		  }).catch(function(error) {
		    console.log('request failed', error);
		  });	
	};

	/**
	 * Fetch error handling
	 * @param
	 */
	var checkStatus = function(response) {
	  if (response.status >= 200 && response.status < 300) {
	    return response;
	  } else {
	    var error = new Error(response.statusText);
	    error.response = response;
	    throw error;
	  }
	};	

	/**
	 * 
	 */
	var parseJSON = function(response) {
		return response.json();
	};	

	/**
	 * Post item to API
	 * @param {Object} data - a JSON Object
	 */
	var postItemToApi = function(data){
		//console.log(typeof(data));
		fetch(getApiUrl(),
		{
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.catch(function(error){
			console.log('Error message: ' + error.message);
		})
		.then(function(response){
			console.log('POST Response: ' + response.statusText);
			if(response.statusText === 'Created'){
				console.log('Successfully posted album to API');
				console.log(data);
			}
			return response;
		});	
	};

	/**
	 * Update / patch item in API
	 * @param {Object} data - JSON Object with data
	 * @param {String} id - The id of the item to update
	 */
	var patchItemInDatabase = function(data, id){
		//console.log(id);
		//console.log(typeof(id));
		fetch(getApiUrl() + id,
		{
			method: 'PATCH',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.catch(function(error){
			console.log('Error: ' + error.message);
		})
		.then(function(response){
			console.log('PATCH Response: ' + response.statusText);
			//return response;
		});	
	};

	/**
	 * Delete item from API
	 * @param {String} id - The id of the item to delete
	 */
	var deleteItemInDatabase = function(id){
		fetch(getApiUrl() + id,
		{
			method: 'DELETE'
		})
		.then(function(response){
			console.log('DELETE Response: ' + response.statusText);
			return response;
		});	
	};

	/**
	 * 
	 * 
	 */
	var jsonToURI = function(json){ 
		return Object.keys(json).map(function(key){ 
		  return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]); 
		}).join('&');		
	};

    // Reveal public pointers to
    // private functions and properties
    return {
    	getDataFromApi: getDataFromApi,
    	postItemToApi: postItemToApi,
    	patchItemInDatabase: patchItemInDatabase,
    	deleteItemInDatabase: deleteItemInDatabase,
    	jsonToURI: jsonToURI
    };
})();