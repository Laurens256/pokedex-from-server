import { PokemonTypes } from '../../types';

export default {
	pokemonStr: () => {
		return 'POKéMON';
	},

	pokeDexStr: () => {
		return 'POKéDEX';
	},

	pokemonType: (type: string) => {
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

	pokemonId: (id: number) => {
		return id.toString().padStart(3, '0');
	}
};
