import { Url } from './index.js';

export interface Species {
	color: Url;
	egg_groups: Url[];
	evolution_chain: {
		url: string;
	};
	evolves_from_species: Url;
	flavor_text_entries: {
		flavor_text: string;
		language: Url;
		version: Url;
	}[];
	gender_rate: number;
	generation: Url;
	growth_rate: Url;
	habitat: Url;
	has_gender_differences: boolean;
	hatch_counter: number;
	id: number;
	is_baby: false;
	is_legendary: false;
	is_mythical: false;
	name: string;
	names: {
		language: Url;
		name: string;
	}[];
	order: number;

	varieties: {
		is_default: boolean;
		pokemon: Url;
	}[];
}
