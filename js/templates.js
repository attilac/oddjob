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
var template = (function() {

	/**
	 * Template
	 * @param 
	 * @return 
	 */
	var movieList = (movies) => {
	  return `
	  <div class="info-strip mb-3">
			<small class="text-muted">Displaying ${movies.length} of ${movieDatabase.getMovies().length} movies</small>
		</div>
	   <div class="row">
	     ${movies.map(movie => movieItem({
	      movie,
	      poster: moviePoster(movie),
	      header: movieHeader(movie),
	      rating: movieRating(movie)
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
	var movieItem = ({ movie, poster, header, rating}) => {
	  return `
	 <div class="movie-item col-lg-2 col-sm-3 col-6 mb-5" data-id="${movie.id}">
	 	  ${poster}
	 	  ${header}
	 	  ${rating}
	  </div>
	`;
	};

	/**
	 * Template
	 * @param 
	 * @return 
	 */
	var moviePoster = ({poster, posterurl}) => {
		let moviePoster = poster || '' ? 'img/' + poster : '';
		if(moviePoster === ''){
			moviePoster =  posterurl || '' ? posterurl : 'http://placehold.it/340x500/95a5a6/95a5a6';
		}
		return `
		    <div class="responsive-poster mb-3">
		    <div class="responsive-poster-item">
		      <img src="${moviePoster}" class="img-fluid" alt="">
		    </div>
		  </div>
		`;      
	};

	var movieHeader = ({title, year, genres, id}) => {
		return `
		<div class="movie-item-header mb-3 mr-3">
			<h6 class="movie-title mb-1">${title} <small>(${year})</small></h6>
			${movieView.getGenreLinkList(genres)}
			${movieGenreEditBtn(id)}
		</div>
	`;
	};

	/**
	 * Template
	 * @param 
	 * @return 
	 */
	var movieGenreEditBtn = (id) => {
	  return `
			<div class="movie-update btn-group dropup">
			  <button type="button" class="btn btn-options" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			    <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
			  </button>
			  <div class="dropdown-menu dropdown-menu-right">
				<a href="#" class="dropdown-item btn-edit-genres" data-id="${id}">Edit Genres</a>										    
			  </div>
		 	</div>
	  `;      
	};

	/**
	 * Template
	 * @param 
	 * @return 
	 */
	var movieRating = ({averageRating, ratings, id}) => {
		return `
            <div class="user-rating" Title="Users rated this ${averageRating}/10 (${ratings.length} votes) - click slider to rate">
              	<div class="rating-label d-flex justify-content-end">
                	<div class="mr-auto">
                  		<small>Rate</small>
                	</div>
          			<div class="rating-text">
                        <small>		
                        	<i class="fa fa-star text-yellow"></i>			                        	
                        	<span class="text-yellow average-rating">${averageRating}</span>
                        	<span class="text-faded">/10</span>
                        </small>
          			</div>
          		</div>
          		<div class="rating-container">
              		<div class="progress average-slider">
              			<div class="progress-bar bg-yellow" role="progressbar" aria-valuenow="${averageRating * 10}" aria-valuemin="0" aria-valuemax="100" style="width: ${averageRating * 10}%"></div>
              		</div>
					<div id="ratingSlider-${id}" class="dragdealer progress rating-slider">
						<div class="handle">											
						</div>
						<div class="progress-bar bg-primary" role="progressbar" aria-valuenow="" aria-valuemin="0" aria-valuemax="100">
						</div>
					</div>
					<div class="rating-toolbar text-right py-2">
						<a class="btn btn-sm btn-secondary submit-rating" href="#" data-id="${id}">Submit rating</a>
					</div>		
				</div>							
			</div>
	`;
	};

	/**
	 * Template
	 * @param 
	 * @return 
	 */
	var closeFilterBtn = (name) => {
	  return `
		<button type="button" class="btn btn-secondary btn-sm mb-3" aria-label="Close" value="${name}">
		  ${name} <span aria-hidden="true">&times;</span>
		</button>
	  `;      
	};    

	// Reveal public pointers to
    // private functions and properties
    return {
        closeFilterBtn: closeFilterBtn,
        movieList: movieList,
    };
})();