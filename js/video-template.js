/*jshint esversion: 6 */

/**
 * ------------------------------------------------------------------------
 *  	Revealing Module Pattern
 *      functions and variables that begins with _ are private    
 * ------------------------------------------------------------------------
*/

/**
 * Video Template
 * 
 */
var videoTemplate = (function() {

	/**
	 * Template
	 * @param 
	 * @return 
	 */
	var playlist = (json) => {
		let items = json.items;
		let lastItem = items.length - 1;
		//console.log(items);
		return `
			<div class="playlist bg-white">
				<div class="info-strip p-3">
					<small class="text-muted">Displaying ${items[0].snippet.position + 1} to ${items[lastItem].snippet.position + 1} of ${json.pageInfo.totalResults} videos</small>
				</div>
			 ${items.map(item => playlistItem({
			  item,
			  thumbnails: thumbnail(item.snippet),
			  title: header(item.snippet)
			})).join('')}  
				${pagination()}
			</div>
		`;
	};

	/**
	 * Template
	 * @param 
	 * @param 
	 * @return 
	 */
	var playlistItem = ({ item, title, thumbnails}) => {
	  return `
	 <div class="media p-3" data-id="${item.snippet.resourceId.videoId}"> 	 
  		${thumbnails}
  		<div class="media-body">
 	  		${title}
 	  	</div>
	  </div>
	`;
	};

	/**
	 * Template
	 * @param 
	 * @return 
	 */
	var thumbnail = ({thumbnails, position}) => {
		return `
			<small class="playlist-index align-self-center">${position +1}</small>
			<img src="${thumbnails.high.url}" class="d-flex align-self-start mr-3 video-thumb" alt="">
		`;      
	};

	/**
	 * Template
	 * @param 
	 * @return 
	 */
	var header = ({title, description}) => {
		return `
		<div class="video-item-header">
		 	<h5 class="video-title mt-0"><a href="#" class="video-title-link" title="${description}">${title}</a></h5>
		</div>
	`;
	};

	/**
	 * Template
	 * @return 
	 */
	var pagination = () => {
	    var nextClass = videoApi.getNextPageToken() || '' ? '' : 'disabled';
	    var prevClass = videoApi.getPrevPageToken() || '' ? '' : 'disabled';

		return `
			<nav aria-label="Page navigation" class="p-3">
			  <ul class="pagination m-0">
			    <li id="prevButton" class="page-item ${prevClass}"><a class="page-link" href="#" data-prev="${videoApi.getPrevPageToken()}">Previous</a></li>
			    <li id="nextButton" class="page-item ${nextClass}"><a class="page-link" href="#" data-next="${videoApi.getNextPageToken()}">Next</a></li>
			  </ul>
			</nav>
		`;
	};	

	/**
	 * Template
	 * @return 
	 */   
	var meta = (videoObject) => {
		//console.log(videoObject.snippet.title);
		return `
            <div class="video-header">
              <h2 class="watch-title mt-0">${videoObject.snippet.title}</h2>
              <small class="watch-description mb-0">${videoObject.snippet.description}</small>
            </div>		
		`;
	};

	// Reveal public pointers to
    // private functions and properties
    return {
        playlist: playlist,
        pagination: pagination,
        meta: meta,
    };
})();