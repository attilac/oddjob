/*jshint esversion: 6 */

/**
 * ------------------------------------------------------------------------
 *  	Revealing Module Pattern
 *      functions and variables that begins with _ are private    
 * ------------------------------------------------------------------------
*/

/**
 * Album Template
 * 
 */
var albumTemplate = (function() {
	/**
	 * Template
	 * @return 
	 */   
	var list = (json) => {
		//console.log(json);
		return `
			<div class="album-list row">
			 ${json.map(albumItem => listItem({
			  albumItem,
			  cover: albumCover(albumItem),
			  info: albumInfo(albumItem)
			})).join('')}  
			</div>
		`;
	};	

	/**
	 * Template
	 * @param 
	 * @param 
	 * @return 
	 */
	var listItem = ({ albumItem, cover, info}) => {
  		return `
		 	<div class="album-list-item col-sm-6 col-lg-4 mb-2" data-id="${albumItem.id}" data-title="${albumItem.title}"> 
		 		<a class="album-detail-link" href="#" title="Oddjob - ${albumItem.title}">
			 		<div class="card">
							${cover}
							${info}			 	  	
			 	  	</div>
				</a>			 	  	
			</div>
		`;
	};

	/**
	 * Template
	 * @param 
	 * @return 
	 */
	var albumCover = ({cover}) => {
		return `
		<div class="album-cover">
			<div class="album-cover-inner">
 	  			<img class="img-fluid card-img-top " alt="" src="images/${cover}"/>
  			</div>
 	  	</div>	
		`;      
	};	

	/**
	 * Template
	 * @param 
	 * @return 
	 */
	var albumInfo = ({title, year}) => {
		return `
		<div class="card-block">	
	  		<h3 class="album-title card-title mb-0">${title}</h3>
		  		<p class="card-text">
		  			<small class="album-year">${year}</small>
		  		</p>
		</div>  		
		`;      
	};	

	// Reveal public pointers to
    // private functions and properties
    return {
        list: list	
    };	
})();	