import { PokemonTypes } from '../../types';

export default {
	pokemonStr: () => {
		return 'POKéMON';
	},

	pokeDexStr: () => {
		return 'POKéDEX';
	},

	pokemonType: (type: string) => {
		if (!type) return '???';
		switch (type.toLowerCase()) {
			case 'fighting':
				return 'fight';
			case 'psychic':
				return 'psychc';
			case 'electric':
				return 'electr';
			default:
				return PokemonTypes.includes(type.toLowerCase()) ? type : '???';
		}
	},

	pokemonFlavorText: (flavorTexts: any[]) => {
		const enFlavorTexts = flavorTexts
		.filter((text: { language: { name: string } }) => text.language.name === 'en')
		.map((text: { flavor_text: string }) => text.flavor_text);

		const randomFlavorText = enFlavorTexts[Math.floor(Math.random() * enFlavorTexts.length)];
		return randomFlavorText;
	},

	pokemonId: (id: number) => {
		if(!id) return '000';
		return id.toString().padStart(3, '0');
	},

	// returns weight in pounds
	pokemonWeight: (hectogram: number) => {
		if(!hectogram) return '0.0';
		return (hectogram / 4.536).toFixed(1).toString();
	},
	
	// returns height in feet and inches
	pokemonHeight: (decimeter: number) => {
		if(!decimeter) return '0‘0';
		const feetInches = (decimeter / 3.048).toFixed(2).split('.');
		return `${feetInches[0]}‘${feetInches[1]}`;
	},
};
