let pokemonNameArr: string[] = [];

const backButton: HTMLAnchorElement | null = document.querySelector('a.back');
const idElement: HTMLParagraphElement | null = document.querySelector('.pokemondetail > section:first-of-type > section:first-of-type div p');

// back button logic zodat query string worden onthouden
const backButtonLogic = () => {
	const queryString = sessionStorage.getItem('queryString') || '';
	backButton?.setAttribute('href', `/pokemon${queryString}`);
};

const handleKeyDown = (e: KeyboardEvent) => {
	if (e.key === ' ') {
		e.preventDefault();
		playCry();
	} else if (e.key === 'Escape' || e.key === 'b') {
		e.preventDefault();
		backButton?.click();
	} else if (e.key === 'ArrowLeft') {
		e.preventDefault();
		switchPokemon(-1);
	} else if (e.key === 'ArrowRight') {
		e.preventDefault();
		switchPokemon(1);
	}
};

// function that replaces any spaces in a string with a dash, makes the string lowercase, removes any special characters
const formatString = (str: string) => str.replace(/\s+/g, '-').toLowerCase().replace(/[^a-z0-9-]/g, '');

const switchPokemon = async (direction: number) => {
	const name = await getPokemonName(direction);
	if (name) {
		window.location.href = `/pokemon/${name}`;
	} else {
		playErrorSound();
	}
};

const getPokemonName = async (direction: number) => {
	if(pokemonNameArr.length === 0) {
		pokemonNameArr = await (await fetch('https://raw.githubusercontent.com/sindresorhus/pokemon/main/data/en.json')).json();
		pokemonNameArr.unshift('');
	}

	const id = Number(idElement?.dataset.id);
	if (!isNaN(id)) {
		return formatString(pokemonNameArr[id + direction]);
	}
};

// speel pokemon cry sfx of error sfx
const playCry = (fallback = true) => {
	let fallbackUsed = false;
	const audio = new Audio();
	audio.src = `https://play.pokemonshowdown.com/audio/cries/${window.location.pathname
		.split('/')
		.pop()}.mp3`;
	if (fallback) {
		audio.onerror = () => {
			if (fallbackUsed) return;
			fallbackUsed = true;
			playErrorSound();
		};
	}
	audio.play();
};

const playErrorSound = () => {
	const errorAudio = new Audio('/audio/whoops.wav');
	errorAudio.play();
};

(() => {
	playCry(false);
	backButtonLogic();
	window.addEventListener('keydown', handleKeyDown);
})();