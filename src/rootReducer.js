
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
	flagGame
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
		// idxAnswerSubset: -1,

		formatNumber: new Intl.NumberFormat(),

		messages: [
			"...initializing...",
			"...fetching country data from server...",
			"...sit tight a moment..."
			],
		}, // end FlagGame

	/*
	-----------------------------------------------------------------------------
	memGame
	-----------------------------------------------------------------------------
	*/
	memGame: {
		// 8 choices, doubled makes 16 boxes:
		colorChoices: ['aqua', 'orange', 'chartreuse', 'crimson',
			'seagreen', 'indigo', 'darkgoldenrod', 'cornflowerblue'],
		boxHiddenState: [],
		boxSolvedState: [],

		boxShowingCount: 0,
		boxes: [],

		clickCounter: 0,
		allowClick: true,

		}, // end memGame

	counter: 0,
	boo: "initialized"
	}; // end initialState











function rootReducer(state = initialState, action, ...arr){
	const newState = {...state};

	switch (action.type) {
		// FlagGame ---------------------------------------------------------------
		case "setCountriesAll":
			newState.flagGame.countriesAll = [...action.list];
			break;
		case "appendGuessesWrong":
			newState.flagGame.guessesWrong =
				[...newState.flagGame.guessesWrong, action.guess]
			break;
		case "appendGuessesCorrect":
			newState.flagGame.guessesCorrect =
				[...newState.flagGame.guessesCorrect, action.guess]
			break;
		case "resetGuesses":
			newState.flagGame.guessesCorrect = [];
			newState.flagGame.guessesWrong = [];
			break;
		case "setRandCountries":
			newState.flagGame.randCountries =
				[...action.list]
			break;
		case "setAnswerIndeces":
			newState.flagGame.idxAnswerCorrect = action.indeces.indexMasterList;
			// newState.flagGame.idxAnswerSubset = action.indeces.indexSubset;
			break;
		case "setSolved":
			newState.flagGame.solved = action.newState;
			break;
		case "newFlagGame":
			newState.flagGame.solved = false;
			newState.flagGame.idxAnswerCorrect = -1;
			// newState.flagGame.idxAnswerSubset = -1;
			newState.flagGame.randCountries = [];
			newState.flagGame.guessesCorrect = [];
			newState.flagGame.guessesWrong = [];

			break;
		// end FlagGame -----------------------------------------------------------


		// memGame ----------------------------------------------------------------
		case "setBoxesAll":
			newState.memGame.boxes = [...action.array];
			break;
		case "setBoxHiddenState":
			newState.memGame.boxHiddenState = [...action.array];
			break;
		case "setBoxSolvedState":
			newState.memGame.boxSolvedState = [...action.array];
			break;
		case "setBoxShowingCount":
			newState.memGame.boxShowingCount = action.newCount;
			break;
		case "setClickCount+1":
			newState.memGame.clickCounter++;
			break;
		case "toggleClick":
			newState.memGame.allowClick = action.newState;
			break;
		case "resetShowingBoxes":
			let tmpHiddenState = newState.memGame.boxHiddenState.map( state => (
				state === "Showing" ? "Hidden" : state
				));
			newState.memGame.boxHiddenState = [...tmpHiddenState];
			break;
		case "newMemGame":
			newState.memGame.clickCounter = 0;
			newState.memGame.allowClick = true;
			newState.memGame.boxShowingCount = 0;
			newState.memGame.boxHiddenState.fill("");
			newState.memGame.boxSolvedState.fill("");
			break;
		// end memGame ------------------------------------------------------------



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
