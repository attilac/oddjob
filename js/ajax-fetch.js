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
var ajaxFetch = (function() {

	/**
	 * Fetch data from API
	 * @param {String} dataurl - the url to the API
	 */
	var getDataFromAPI = function(dataUrl, callback){
		fetch(dataUrl)
			.then(function(response){
				console.log('GET Response: ' + response.statusText);
				// returns response in json format
				return response.json();
			})	
			.catch(function(error){
				console.log('Error message: ' + error.message);
			})
			.then(function(json){
				//console.log(json);
				callback(json);
				//return json;
			});
	};

	/**
	 * Post item to API
	 * @param {Object} data - a JSON Object
	 */
	var postItemToAPI = function(data){
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

    // Reveal public pointers to
    // private functions and properties
    return {
    	getDataFromAPI: getDataFromAPI,
    	postItemToAPI: postItemToAPI,
    	patchItemInDatabase: patchItemInDatabase,
    	deleteItemInDatabase: deleteItemInDatabase 
    };
})();