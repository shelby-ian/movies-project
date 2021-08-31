"use strict";

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


getMovies().then(movies => movies.forEach(movie => {
	$('body').append(displayMovie(movie));
	// console.log(movie);
}))