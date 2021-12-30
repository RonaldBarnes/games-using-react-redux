
import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import CountryList from './CountryList';
/*
import Footer from './Footer';
import Header from './Header';
*/
import './CountryFlagGame.css';


// How many choices to present to user / player:
const NUM_CHOICES = 4;

// ---------------------------------------------------------
class CountryFlagGame extends Component {
	// The next line causes compile failure:
	// console.log('CountryFlagGame()');


	constructor(props) {
		super(props);

		console.log( `constructor()`);

		// eslint-disable-next-line
		// let countries = [];

		// Inside constructor() use this.state = NOT this.setState():
		this.state = {
			messages: ['...initializing...', '...sit tight a moment...'],
			// List of all (250) countries:
			countriesAll: [],
			// Choices presented to user / player:
			countriesChoices: [],
			solved: false,
			guessesCorrect: [],
			guessesWrong: []
			};
		// TypeError: can't define property "answerIdx": Object is not extensible
		// this.props.answerIdx = 0;
		//
		// The correct answer index to this.state.countries:
		// this.answerIdx = -1;

		// 4 random country names to show user / player:
		this.randCountries = [];

		// The correct answer as index to countries list:
		this.idxAnswerCorrect = -1;

		// Index to correct answer in SUBSET array (choices given to user, NOT
		// to full countriesAll list):
		this.idxAnswerSubset = -1;

		// Store wrong / correct:
		this.guessesCorrect = [];
		this.guessesWrong = [];

		this.handleCountryClick = this.handleCountryClick.bind(this);
		this.handleNewGameClick = this.handleNewGameClick.bind(this);

		this.formatNumber = this.formatNumber.bind(this);
		}



	// ---------------------------------------------------------
	// Declared fmtNumber as new Intl.NumberFormat in componentDidMount
	// MOVED from componentDidMount to constructor
	formatNumber( num ) {
		return this.fmtNumber.format(num);
		}


	// ---------------------------------------------------------
	handleNewGameClick(e) {
		e.preventDefault();
		e.stopPropagation();

		// console.log( `handleNewGameClick(e) e:${e}`);

		this.randCountries = [];
		this.idxAnswerCorrect = -1;
		// These 2 options are obsolete / deprecated:
		// NOT really, used as temp arrays in handleCountryClick()
		this.guessesCorrect = [];
		this.guessesWrong = [];

		this.setState( {
			countriesChoices: [],
			solved: false,
			guessesCorrect: [],
			guessesWrong: []
			} );
		}



	// ---------------------------------------------------------
	handleCountryClick(e) {
		e.preventDefault();

		// console.log(`handleCountryClick(e) e:`, e);

		console.log(`country chosen:`
			+ ` ${this.state.countriesAll[ [e.target.id] ].name}`
			+ ` this.idxAnswerCorrect:`
			+ ` ${this.idxAnswerCorrect} and id: ${[e.target.id]}`);

		if ( this.idxAnswerCorrect === Number(e.target.id) ) {
			console.log(`CORRECT!`);
			this.guessesCorrect.splice( 0, 0, Number(e.target.id) );
			this.setState( {
				solved: true,
				guessesCorrect: [...this.guessesCorrect]
				} );
			return true;
			}
		console.log(`WRONG answer`);
		this.guessesWrong.splice( 0, 0, Number(e.target.id) );
		this.setState( {
			guessesWrong: [...this.guessesWrong]
			} );
		return false;
		}


	// ---------------------------------------------------------
	randomArraySlice( arr, num) {
		console.log(`randomArraySlice( arr, ${num})`);

		let retArr = [];
		// 4 random & unique indices to countriesAll:
		let randNums = new Set();

		if (num > arr.length) {
			let errMessage = `Cannot return randomized array of ${num} elements `
				+ `from an array of ${arr.length} elements.`;

			throw Error( errMessage);
			// alternately, setState an error message to appear on screen
			// instead of in the console...
			// Oddly, this causes a loop which makes React throw an error:
			// AHA, here's why:
			// Warning: Cannot update during an existing state transition
			// (such as within `render`). Render methods should be a
			// pure function of props and state.
			//
			// this.setState( {messages: ['Error:', errMessage]});
			// return [];
			}

		// Add 5 unique indices to randNums set - these indices will point
		// back to this.state.countries should we wish to retrieve further data:
		while (randNums.size < num ) {
			randNums.add( Math.floor( Math.random() * arr.length) );
			}
		console.log(`randNums set has ${randNums.size} elements: `, randNums);

		let idx = 0;
		randNums.forEach( randNum =>  {
			retArr.splice( idx, 0, arr[ randNum] );
			retArr[idx].origidx = randNum;
			idx++;
			})
		return retArr;

/*
		let tmpArr = [];
		let randNum = 0;

		for (let i = 0; i < num; i++) {
			randNum = Math.floor( Math.random() * arr.length);
			const arrWTF = arr.splice(arr[ randNum  ], 1);
			tmpArr = tmpArr.concat( arrWTF);
			tmpArr[i].['origIdx'] = randNum;
			}
		return tmpArr;
*/
			// tmpArr.splice( i, 0, [...arr.splice( randNum,1), {origIdx: randNum}] );
			// SHIT: this technique does NOT remove elements from arr, allowing
			// for duplicate choices!
			// THAT is why I originally went with arr.splice!
			// tmpArr.splice( i, 0, [...arr[ randNum  ], {origIdx: randNum}] );
// These generally give an array of arrays with sub-arrays being length 1 and
// containing desired data. Need to "flatten" it out by removing base layer or
// figure out why .push, etc. are placing country inside a new array element!
//
//			tmpArr.splice( i, 0, arr.splice( Math.floor( Math.random() * arr.length), 1));
//			tmpArr[i] = arr.splice( Math.floor( Math.random() * arr.length), 1);
//			tmpArr.push( arr.splice( Math.floor( Math.random() * arr.length), 1));
//			tmpArr.push( [...arr.splice( Math.floor( Math.random() * arr.length), 1)]);
		}





	// ---------------------------------------------------------
	componentDidMount() {
		console.log(`componentDidMount()`);

		// Set title
		document.title = 'Flag Game';


		// Prepare to format large numbers (i.e. 1000 -> 1,000)
		// Used when correct answer displays further info i.e. population
		this.fmtNumber = new Intl.NumberFormat();

		// const URLbase = 'https://restcountries.eu/v3.1/';
		// const URLbase = 'https://restcountries.eu/rest/v2/';
		const URLbase = 'https://restcountries.com/v2/';

		// const tempArr = [];


		fetch( `${URLbase}all` )
			.then( resp => {
				console.log('First .then after fetch(): checking for errors.');

				if ( !resp.ok ) {
					throw Error(`FETCH had error, response not okay: `
						+ `${resp.statusText} (${resp.status})`);
					}
				return resp;
				})
//			.catch( error => console.log(`ERROR in fetch(1): ${error}`) )
			.then( data => data.json())
//			.catch( error => console.log(`ERROR in fetch(2): ${error}`) )
			.then( promises => Promise.all( promises ) )
//			.catch( error => console.log(`ERROR in fetch(3): ${error}`) )
			.then( countriesAll => {
// TEST DUPLICATION POTENTIAL IN OTHER CODE: TAKE ONLY A SLICE:
// This will get us Nepa (156), a VERTICAL flag, for testing layout:
//				this.setState( {countriesAll: countriesAll.splice(150, 10) })
				this.setState( {countriesAll} )
					// , () => console.log( this.state.countries) )
				})
			.catch( error => {
				console.log(`ERROR in fetch(4): ${error.message}`);
				this.setState( {countriesAll: 'Error connecting to server: '
					 + error.message
					}) // end setState
				})

		// React / Firefox bug: Uncaught Error: Should not already be working.
		// https://github.com/facebook/react/issues/17355
		// work-around with setTimeout() wrapper:
		// ALSO:
		// If timeout isn't large enough, console.log shows tempArr's length as
		// ZERO and no country name / flag ever shows. WTF?!?
		// NOTE: if breakpoints are set, no timing fuckery required...
		// 750ms is TOO SHORT
		// 1000ms WAS working, but after a lengthy time away, now it's not.
		// No errors, just no country data displaying and tempArr.length = 0
		//
		// Can we avoid all this crap by putting setState inside a .then()?
		// NOPE.  Now we're adding a callback to .then's setState to
		// console.log this.state, another bullshit work-around.
		//
		// Is this a Firefox problem, a react problem, a "me" problem"?
		//
		// FIREFOX!!?!!!!  FUCK YOU FIREFOX, works fine in Chromium.
/*
		setTimeout( () => {
			this.setState( {countries: [...tempArr]},
				() => (
					console.log(`tempArr.length = ${tempArr.length}`)
					)
				) // end setState
			}, 2000);
*/
/*
		// test data:
		this.setState( {countries: [{name: 'Canada', flag: 'https://flagcdn.com/ca.svg'},
			{name: 'Hong Kong', flag: '*shart*' }]
			} ); // end setState
*/
		}




	// ---------------------------------------------------------
	render() {
		// console.log(`render() ...`);

		// Randomly selected index to 'correct' country:
		let randCountry = 0;

		// Get 4 random countries IF this.state.countriesAll is loaded:
		// AND if a correct answer hasn't been chosen yet
		if (this.state.countriesAll.length > 0
			&& this.randCountries.length === 0
			&& this.idxAnswerCorrect === -1
			&& this.state.solved === false
			) {
			this.randCountries =
				this.randomArraySlice( [...this.state.countriesAll], NUM_CHOICES);
			randCountry = Math.floor( Math.random() * this.randCountries.length);
//			this.answerIdx.push( randCountries[randCountry].origidx );
//			this.answerIdx = this.randCountries[randCountry].origidx ;
			this.idxAnswerCorrect = this.randCountries[randCountry].origidx ;
			this.idxAnswerSubset = randCountry;
			}

// Test error handling:
// this.randomArraySlice([], 2);



	// Display a ¿helpful? message while awaiting data fetch...
	let outMsg = '';
	// Data not received yet, tell user to wait via pre-seeded
	// this.state. messages:
	if (this.randCountries.length === 0) {
		outMsg = <ul>
		{[...this.state.messages.map( (msg,idx) => (
			<li key={idx}>{msg}</li>
			))]
			}
		</ul>;
		} // end if
	// Data has arrived and is ready to display now:
	else {
		outMsg =
			<CountryList
				countryList = {this.randCountries}
				idxAnswerSubset = {this.idxAnswerSubset}
				solved = {this.state.solved}
				guessesCorrect = {this.state.guessesCorrect}
				guessesWrong = {this.state.guessesWrong}
				handleCountryClick = {this.handleCountryClick}
				handleNewGameClick = {this.handleNewGameClick}
				formatNumber = {this.formatNumber}
				/>
		} // end else



		return (
			<div className='flag-game'>
				{outMsg}
			</div>
			);
		}
	}



export default CountryFlagGame;
// as FlagGame;
