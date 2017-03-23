/*jshint esversion: 6 */

/**
 * ------------------------------------------------------------------------
 *  	Revealing Module Pattern
 *      functions and variables that begins with _ are private    
 * ------------------------------------------------------------------------
*/

/**
 * Templates
 * 
 */
var templates = (function() {

	/**
	 * Template
	 * @param 
	 * @return 
	 */
	var movieList = (json) => {
		let playlist = json.items;
		let lastItem = playlist.length - 1;
		//console.log(playlist);
		return `
			<div class="playlist bg-white">
				<div class="info-strip p-3">
					<small class="text-muted">Displaying ${playlist[0].snippet.position + 1} to ${playlist[lastItem].snippet.position + 1} of ${json.pageInfo.totalResults} movies</small>
				</div>
			 ${playlist.map(playlistItem => movieItem({
			  playlistItem,
			  thumbnails: moviePoster(playlistItem.snippet),
			  title: movieHeader(playlistItem.snippet)
			})).join('')}  
				${playlistPagination()}
			</div>
		`;
	};

	/**
	 * Template
	 * @param 
	 * @param 
	 * @return 
	 */
	var movieItem = ({ playlistItem, title, thumbnails}) => {
	  return `
	 <div class="media p-3" data-id="${playlistItem.snippet.resourceId.videoId}"> 	 
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
	var moviePoster = ({thumbnails}) => {
		return `
			<img src="${thumbnails.high.url}" class="video-thumb d-flex align-self-start mr-3" alt="">
		`;      
	};

	/**
	 * Template
	 * @param 
	 * @return 
	 */
	var movieHeader = ({title, description}) => {
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
	var playlistPagination = () => {
	    var nextClass = view.getNextPageToken() || '' ? '' : 'disabled';
	    var prevClass = view.getPrevPageToken() || '' ? '' : 'disabled';

		return `
			<nav aria-label="Page navigation" class="p-3">
			  <ul class="pagination m-0">
			    <li id="prevButton" class="page-item ${prevClass}"><a class="page-link" href="#" data-prev="${view.getPrevPageToken()}">Previous</a></li>
			    <li id="nextButton" class="page-item ${nextClass}"><a class="page-link" href="#" data-next="${view.getNextPageToken()}">Next</a></li>
			  </ul>
			</nav>
		`;
	};	
   

	// Reveal public pointers to
    // private functions and properties
    return {
        movieList: movieList,
        playlistPagination: playlistPagination	
    };
})();