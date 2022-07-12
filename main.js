const getRicknmortyUrl = id => `https://rickandmortyapi.com/api/character/${id}`


const generateRicknmortyPromises = () => Array(100).fill().map((_, index) =>
fetch(getRicknmortyUrl(index + 1)).then(response => response.json()))

const generateHTML =  ricknmorty => ricknmorty.reduce((accumulator, {image, id, name, species, gender, status, origin, location}) => {

		accumulator += `
		<li class="card ">
			<img class="card-image" src="${image}">
			<div class="card-content">
				<h2 class="card-title">${name}</h2>
				<hr>
				<p class="card-subtitle"><strong>☠️ Status:</strong>${status}</p>
				<p class="card-subtitle"><strong>🌍 First seen in:</strong> ${origin.name}</p>
				<p class="card-subtitle"><strong>🌍 Last know location:</strong> ${location.name}</p>
				<p class="card-subtitle"><strong>👽 Species:</strong> ${species}</p>
			</div>
		</li>
		`

		return accumulator
	}, '')


const insertRicknmortyIntoPage = ricknmortys =>{

	const ul = document.querySelector('[data-js="characters"]')
	ul.innerHTML = ricknmortys

}

const ricknmortyPromises = generateRicknmortyPromises()

Promise.all(ricknmortyPromises)
	.then(generateHTML)
	.then(insertRicknmortyIntoPage)