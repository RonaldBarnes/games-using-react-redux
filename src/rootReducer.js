
import {createStore} from 'redux';
// import * from './actionCreators.js';


/*
	Mixing separate Providers inside Routes does not work.
	Changing back to single, global store for all components.
	Will just destructure the store data per component.
*/

const initialState = {
	/*
	-----------------------------------------------------------------------------
	FlagGame
	-----------------------------------------------------------------------------
	*/
	flagGame:
		{
		// Messages shown to user when loading country data, can be re-purposed:
		messages: ['...initializing...', '...sit tight a moment...'],

		// Indicates puzzle solved:
		solved: false,

		// List of all (250) countries:
		countriesAll: [],

		// List of correct guesses (max should be one):
		//	...(id of clicked item, i.e. index to countriesAll):
		guessesCorrect: [],
		// List of wrong guesses
		//	...(id of clicked item, i.e. index to countriesAll):
		guessesWrong: [],

		// 4 random country names to show user / player:
		randCountries: [],

		// The correct answer as index to countries list:
		idxAnswerCorrect: -1,
		idxAnswerSubset: -1,

		formatNumber: new Intl.NumberFormat(),

		messages: [
			"...initializing...",
			"...fetching country data from server...",
			"...sit tight a moment..."
			],

		// remaining items unused (?), remove them:
/*
		countryList: [],
		correctGuess: 0,
*/
		}, // end FlagGame

	counter: 0,
	boo: "initialized"
	}; // end initialState





const initialStateMemGame = {
	memGame: {
		solved: false,
		boxes: [],
		hiddenState: []
		}
	}



/*
// export default const globalStore = createStore( rootReducer,
export const flagStore = createStore( flagReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__
	&& window.__REDUX_DEVTOOLS_EXTENSION__()
	);
*/





function rootReducer(state = initialState, action, ...arr){
	const newState = {...state};

	switch (action.type) {
		case "setCountriesAll":
			newState.flagGame.countriesAll = [...action.list];
			break;
		case "setGuessesWrong":
			newState.flagGame.guessesWrong =
				[...newState.flagGame.guessesWrong, action.guess]
			break;
		case "setGuessesCorrect":
			newState.flagGame.guessesCorrect =
				[...newState.flagGame.guessesCorrect, action.guess]
			break;
		case "setRandCountries":
			newState.flagGame.randCountries =
				[...action.list]
			break;
		case "setAnswerIndeces":
			newState.flagGame.idxAnswerCorrect = action.indeces.indexMasterList;
			newState.flagGame.idxAnswerSubset = action.indeces.indexSubset;
			break;
		case "setSolved":
			newState.flagGame.solved = action.newState;
			break;
		case "newFlagGame":
			newState.flagGame.solved = false;
			newState.flagGame.idxAnswerCorrect = -1;
			newState.flagGame.idxAnswerSubset = -1;
			newState.flagGame.randCountries = [];
			newState.flagGame.guessesCorrect = [];
			newState.flagGame.guessesWrong = [];

			break;



		case "increment":
			newState.counter += 1;
			break;
		case "decrement":
			newState.counter -= 1;
			break;
		case "reset":
			newState.counter = 0;
			break;
		case "boo":
			newState.boo = "boo";
			break;
		default:
			newState.boo = "default";
		}
	return {...newState};
	} // end rootReducer

// export default const globalStore = createStore( rootReducer,
const globalStore = createStore( rootReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__
	&& window.__REDUX_DEVTOOLS_EXTENSION__()
	);

export default globalStore;
