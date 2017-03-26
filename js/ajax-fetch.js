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
	 * @param {String} queryStrings - optional url parameters
	 * @param {function} callback - the callback function
	 */
	var getDataFromApi = function(dataUrl = '', queryStrings = '', callback = ''){
		showLoadingSpinner();
		fetch(dataUrl + queryStrings)
		  .then(checkStatus)
		  .then(parseJSON)
		  .then(function(result) {
		  	console.log('JSON response: ' + result);
		    if(callback){
		    	callback(result);
		    }
		  })
		  .catch(function(error) {
		    console.log('request failed', error);
		    displayErrorMessage(error);
		  });	
		  hideLoadingSpinner();
	};

	/**
	 * Fetch error handling
	 * @param {Object} response - the response object
	 */
	var checkStatus = function(response) {
		//console.log(typeof(response));
		console.log('GET status: ' + response.status);
		if (response.status >= 200 && response.status < 300) {
			console.log(`request url: ${response.url}`);
			console.log(response);
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
	 * 
	 */
	var displayErrorMessage = function(error){
		document.querySelector('.ajax-error-container').classList.remove('hidden');
		document.querySelector('.ajax-error-container .alert-warning').innerHTML = `<strong>Oh snap!</strong> There was an error. <em>${error}</em>`;
	};	

	/**
	 * 
	 */
	var showLoadingSpinner = function(){
		document.querySelector('.ajax-load-indicator-container').classList.remove('hidden');
	};

	/**
	 * 
	 */
	var hideLoadingSpinner = function(){
		document.querySelector('.ajax-load-indicator-container').classList.add('hidden');
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