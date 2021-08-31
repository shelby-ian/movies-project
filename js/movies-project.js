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
		movies.map((movie) => {
			return displayMovie(movie)
		})
	)
}

getMovies().then(movies => showMovies(movies));
//"title": "down",
//       "rating": "5",
//       "poster": "https://m.media-amazon.com/images/M/MV5BYWMwMzQxZjQtODM1YS00YmFiLTk1YjQtNzNiYWY1MDE4NTdiXkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SX300.jpg",
//       "year": "2001",
//       "genre": "Drama, History, War",
//       "director": "Ridley Scott",
//       "plot": "160 elite U.S. soldiers drop into Somalia to capture two top lieutenants of a renegade warlord and find themselves in a desperate battle with a large force of heavily-armed Somalis.",
//       "actors": "Josh Hartnett, Ewan McGregor, Tom Sizemore, Eric Bana",
//       "id": 2


const addMovie = (movie) => fetch(url, {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify(movie)
})
	.then(res => res.json())
	.then(data => {
		console.log(`Success: created ${JSON.stringify(data)}`);
		return data.id; // to access the primary key of the newly created entity
	})
	.catch(console.error);
const testMovie = {
		title: 'superman',
		rating: 10
	}

$('#add-movie').click(addMovie(testMovie));




});