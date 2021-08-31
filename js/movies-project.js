"use strict";
$(document).ready(() => {
	const results = $("#results");

const url = 'https://mini-yielding-softball.glitch.me/movies';

const displayMovie = (movie) => {
	let html = '<div>'
	html += `<p>${movie.rating}</p>`
	html += `<p>${movie.title} (${movie.year})</p>`
	html += `<p>${movie.genre}</p>`
	html += `<p>${movie.plot}</p>`
	html += '</div>'

	return html;
}

const getMovies = () => fetch(url)
	.then(response => response.json())
	.catch(console.error);

let showMovies = (movies) => {
	results.html('')
	results.append(
		movies.map(function(movie) {
			return displayMovie(movie)
		})
	)
}

getMovies().then(movies => showMovies(movies));

function addMovie(body) {
	return $.post(URL, body).then(getMovies());

}
let createdMovie = $("#new-movie").val();

$('#add-movie').click(() => {
		addMovie({createdMovie})
	})


// const addMovie = (movie) => fetch(`${url}`, {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json'
// 		},
// 		body: JSON.stringify(movie)
// 	})
// 		.then(res => res.json())
// 		.then(data => {
// 			console.log(`Success: created ${JSON.stringify(data)}`);
// 			return data.id; // to access the primary key of the newly created entity
// 		})
// 		.catch(console.error);

});