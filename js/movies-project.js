"use strict";
$(document).ready(() => {
  const results = $("#results");

  const url = "https://mini-yielding-softball.glitch.me/movies";

  const ratingInput = (rating, value) => `
<div class="input">
		  	label>Rating</label>
			<input type="checkbox" class="rating" value=${rating} checked="${
    parseInt(rating) === 1
  }" />
			<input type="checkbox" class="rating" value=${rating} />
			<input type="checkbox" class="rating" value=${rating} />
			<input type="checkbox" class="rating" value=${rating} />
			<input type="checkbox" class="rating" value=${rating} />
		  <div class="input">
`;

  const displayMovie = ({
    rating = 1,
    title = "New movie",
    year,
    genre,
    plot,
  }) => {
    const html = `
	  	<div class="movie">
		  <div class="input">
			<label>Title</label>
			<input class="title" value=${title} />
		  </div>

		</div>
	  `;
    // let html = '<div class="movie">';
    // if (rating) html += `<p>${rating}</p>`;
    // if (title) html += `<p>${title} (${year ?? "None"})</p>`;
    // if (genre) html += `<p>${genre}</p>`;
    // if (plot) html += `<p>${plot}</p>`;
    // html += "</div>";

    return html;
  };

  const showMovies = (movies) => {
    results.html("");
    results.append(
      movies.map((movie) => {
        return displayMovie(movie);
      })
    );
  };

  const getMovies = () =>
    fetch(url)
      .then((response) => response.json())
      .catch(console.error);

  const update = (id, data) =>
    fetch(`${url}/${id}`, {
      method: "PATCH",
      data,
    });

  const remove = (id) =>
    fetch(`${url}/${id}`, {
      method: "DELETE",
    }).then(showMovies);

  getMovies().then((movies) => {
    console.log(movies);
    showMovies(movies);
  });
  //"title": "down",
  //       "rating": "5",
  //       "poster": "https://m.media-amazon.com/images/M/MV5BYWMwMzQxZjQtODM1YS00YmFiLTk1YjQtNzNiYWY1MDE4NTdiXkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SX300.jpg",
  //       "year": "2001",
  //       "genre": "Drama, History, War",
  //       "director": "Ridley Scott",
  //       "plot": "160 elite U.S. soldiers drop into Somalia to capture two top lieutenants of a renegade warlord and find themselves in a desperate battle with a large force of heavily-armed Somalis.",
  //       "actors": "Josh Hartnett, Ewan McGregor, Tom Sizemore, Eric Bana",
  //       "id": 2

  const addMovie = (movie) =>
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(`Success: created ${JSON.stringify(data)}`);
        return data.id; // to access the primary key of the newly created entity
      })
      .catch(console.error);
  const testMovie = {
    title: "superman",
    rating: 10,
  };

  $("#add-movie").click(() => addMovie(testMovie));
});
