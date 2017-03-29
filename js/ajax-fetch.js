/*jshint esversion: 6 */
console.log('---AJAX Fetch');
console.log( '-----Revealing Module Pattern-----');

/**
 * Module with AJAX functions for fetching data. Uses fetch
 * 
 */
var ajaxFetch = (function() {

	/**
	 * Fetch data from API
	 * @param {String} dataurl - the url to the API
	 * @param {String} queryStrings - optional url parameters
	 * @param {function} callback - the callback function
	 */
	var getDataFromApi = function(dataUrl = '', queryStrings = '', callback = ''){
		view.showLoadingSpinner();
		fetch(dataUrl + queryStrings)
		  .then(status)
		  .then(parseJSON)
		  .then(function(result) {
		  	console.log('Request succeeded with JSON response: ');
		  	console.log(result);
		    if(callback){
				callback(result);
				view.hideLoadingSpinner();
		    }
		  })
		  .catch(function(error) {
		    getErrorMessage(error);
			view.showErrorAlert(error);			    
		    view.hideLoadingSpinner();
		  });	
	};

	/**
	 * Fetch error handling
	 * @param {Object} response - the response object
	 */
	var status = function(response) {  
	  if (response.status >= 200 && response.status < 300) {  
		console.log(`Response url: ${response.url}`);
		console.log(`Response status: ${response.status}`);
		console.log(`Response statusText: ${response.statusText}`);
		//console.log(response);	  	
	    return Promise.resolve(response);  
	  } else {    	
	    return Promise.reject(new Error(response.statusText));  
	  }  
	};	

	/**
	 * Returns parsed JSON
	 * @param {Object} response - the response object
	 */
	var parseJSON = function(response) {
		return response.json();
	};	

	/**
	 * Returns error object
	 * @param {Object} error - the error object
	 */
	var getErrorMessage = function(error){
		console.log('Request failed', error);
		return error;
	};	

	/**
	 * Post item to API
	 * @param {String} dataUrl - url to API
	 * @param {Object} data - a JSON Object
	 */
	var postItemToApi = function(dataUrl, data){
		//console.log(typeof(data));
		fetch(dataUrl,
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
	 * Returns querystrings from an objects properties
	 * @return {String} - URI string
	 */
	var jsonToURI = function(object){ 
		return Object.keys(object).map(function(key){ 
		  return encodeURIComponent(key) + '=' + encodeURIComponent(object[key]); 
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