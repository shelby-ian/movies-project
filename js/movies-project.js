"use strict";

$(document).ready(() => {
  const results = $("#results");

  const url = "https://mini-yielding-softball.glitch.me/movies";

  function sleepy(seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
  }
  // shows movies on the html page
  function showMovies(movies) {
    console.log(movies);
    results.html("");
    results.append(
      movies.map((movie) => {
        return displayMovie(movie);
      })
    );
  }
  // async allows you to use await syntax for promises to make asynchronous(runs in the background) functions easier to manage
  async function getMovies() {
    // Add loading spinner when function is first called
    // html is reset when show movies is called after movies have loaded from the database
    results.html(`<div class="loading"/>`);
    await sleepy(1);
    const movies = await fetch(url).then((response) => response.json());

    showMovies(movies);
  }

  // Adds new movie to database with empty values
  // Calls get movies when done to refresh movie page
  function addMovie(movie) {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    }).then(getMovies);
  }

  // Takes in id and data properties
  // updates the movie in the database with the id and data passed
  // Calls get movies when done to refresh movie page
  function updateMovie(id, data) {
    return fetch(`${url}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(getMovies);
  }

  // Takes in an id and removes the movie from the database
  // Calls get movies when done to refresh movie page
  function removeMovie(id) {
    return fetch(`${url}/${id}`, {
      method: "DELETE",
    }).then(getMovies);
  }

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

  // Generates a JQuery input given the arguments
  // Takes in a label, a value, and a function to handle what happens when the user changes the value of the input
  function Input(label, value, onchange) {
    const container = $('<div class="input" />');
    const Label = $(`<label>${label}</label>`);
    const input = $(`<input class="${label}" value="${value}">`).change(
      onchange
    );
    return container.append(Label, input);
  }
  function textArea(label, value, onchange) {
    const container = $('<div class="input" />');
    const Label = $(`<label>${label}</label>`);
    const input = $(`<textarea class="${label}" value="${value}">${value}</textarea>`).change(
        onchange
    );
    return container.append(Label, input);
  }


  const displayMovie = ({
    id,
    rating = 1,
    title = "New movie",
    year = "",
    genre = "none",
    plot = "",
  }) => {
    const newValues = { id };
    const container = $(`<div id="${id}" class="movie"/>`);
    const buttonContainer = $(`<div class="buttonContainer"/>`);
    const submitButton = $("<button>Update</button>").click(() => {
      console.log(newValues);
      updateMovie(id, newValues);
    });
    const deleteButton = $("<button>Delete</button>").click(() => {
      removeMovie(id);
    });
    buttonContainer.append(deleteButton, submitButton);
    // Append input for each movie property to container
    // return container to be appended to results
    return container.append(
      Input("Title", title, function (e) {
        newValues.title = $(this).val();
      }),
      Input("Year", year, function (e) {
        newValues.year = $(this).val();
      }),
      Input("Genre", genre, function (e) {
        newValues.genre = $(this).val();
      }),
      textArea("Plot", plot, function (e) {
        newValues.plot = $(this).val();
      }),
      buttonContainer
    );
  };

  getMovies();
  //"title": "down",
  //       "rating": "5",
  //       "poster": "https://m.media-amazon.com/images/M/MV5BYWMwMzQxZjQtODM1YS00YmFiLTk1YjQtNzNiYWY1MDE4NTdiXkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SX300.jpg",
  //       "year": "2001",
  //       "genre": "Drama, History, War",
  //       "director": "Ridley Scott",
  //       "plot": "160 elite U.S. soldiers drop into Somalia to capture two top lieutenants of a renegade warlord and find themselves in a desperate battle with a large force of heavily-armed Somalis.",
  //       "actors": "Josh Hartnett, Ewan McGregor, Tom Sizemore, Eric Bana",
  //       "id": 2

  $("#add-movie").click(addMovie);
});
