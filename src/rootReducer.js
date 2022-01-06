
import {createStore} from 'redux';
// import * from './actionCreators.js';


const initialState = {
	memGame: {
		solved: false,
		boxes: [],
		hiddenState: []
		},

	flagGame: {
		solved: false,
		countryList: [],
		correctGuess: 0
		},

	counter: 0,
	boo: "initialized"
	};


function rootReducer(state = initialState, action){
	const newState = {...state};

	switch (action.type) {
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
	}

// export default const globalStore = createStore( rootReducer,
const globalStore = createStore( rootReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__
	&& window.__REDUX_DEVTOOLS_EXTENSION__()
	);

export default globalStore;

