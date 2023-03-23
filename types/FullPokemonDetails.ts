import { Url } from './';

export interface FullPokemonDetails {
	name: string;
	id: number;
	height: number;
	weight: number;
	types: {
		slot: number;
		type: Url;
	}[];
	sprites: {
		front_default: string;
		front_shiny: string;
	};

	flavor_text_entries: {
		flavor_text: string;
		language: Url;
		version: Url;
	}[];
	habitat: Url;
	egg_groups: Url[];
}
