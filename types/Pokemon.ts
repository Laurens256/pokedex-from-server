import { Url } from './index.js';

export interface Pokemon {
	abilities: { ability: Url; is_hidden: boolean; slot: number }[];
	base_experience: number;
	forms: Url[];
	game_indices: {
		game_index: number;
		version: Url;
	}[];
	height: number;
	id: number;
	is_default: boolean;
	location_area_encounters: string;
	name: string;
	order: number;
	past_types: null;
	species: Url;
	sprites: {
		front_default: string;
		front_shiny: string;
	};
	stats: {
		base_stat: number;
		effort: number;
		stat: Url;
	}[];
	types: {
		slot: number;
		type: Url;
	}[];
	weight: number;
}
