export default {
	toUpperCase: (str: string) => {
		return str.toUpperCase();
	},

	pokemonStr: () => {
		return 'POKéMON';
	},

	// prettier-ignore
	eq: function() { return reduceOp(arguments, (a: any,b: any) => a === b); },
	ne: function() { return reduceOp(arguments, (a: any,b: any) => a !== b); },
	lt: function() { return reduceOp(arguments, (a: number,b: number) => a  <  b); },
	gt: function() { return reduceOp(arguments, (a: number,b: number) => a  >  b); },
	lte: function() { return reduceOp(arguments, (a: number,b: number) => a  <= b); },
	gte: function() { return reduceOp(arguments, (a: number,b: number) => a  >= b); },
	and: function() { return reduceOp(arguments, (a: any,b: any) => a  && b); },
	or: function() { return reduceOp(arguments, (a: any,b: any) => a  || b); },
};

const reduceOp = (args: any, reducer: any) => {
	args = Array.from(args);
	args.pop(); // => options
	var first = args.shift();
	return args.reduce(reducer, first);
  };