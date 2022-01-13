
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

// import PropTypes from 'prop-types';

import CountryList from './CountryList';

/*
// These are now included in App via Routes:
import Footer from './Footer';
import Header from './Header';
*/

import './CountryFlagGame.css';


// How many choices to present to user / player:
const NUM_CHOICES = 4;





// ----------------------------------------------------------------------------
class CountryFlagGame extends Component {
// const CountryFlagGame = (props) => {

	constructor(props) {
		super(props);

		console.log("CountryFlagGame constructor() props: ", props);
		/*
		 console.log(`props.formatNumber.format(1000) =`
			+ ` ${props.formatNumber.format(1000)}`);
		*/

		// eslint-disable-next-line
		// let countries = [];

		this.handleCountryClick = this.handleCountryClick.bind(this);
		this.handleNewGameClick = this.handleNewGameClick.bind(this);

		// this.formatNumber = this.formatNumber.bind(this);

//		this.myParams();
		} // end constructor()







	// --------------------------------------------------------------------------
	// --------------------------------------------------------------------------
	// --------------------------------------------------------------------------
	// --------------------------------------------------------------------------
	handleNewGameClick(e) {
		e.preventDefault();
		e.stopPropagation();

		console.log( `handleNewGameClick(e) e:${e}`);

		// Reset all props to defaults:
		this.props.newFlagGame();
		// Select new options:
		this.selectRandCountries();
		}



	// --------------------------------------------------------------------------
	handleCountryClick(e) {
		e.preventDefault();

		// console.log(`handleCountryClick(e) e:`, e);

		console.log(`country chosen:`
			+ ` ${this.props.countriesAll[ [e.target.id] ].name}`
			+ ` this.props.idxAnswerCorrect:`
			+ ` ${this.props.idxAnswerCorrect} and id: ${[e.target.id]}`);


		if ( this.props.idxAnswerCorrect === Number(e.target.id) ) {
			console.log(`CORRECT!`);

			this.props.appendGuessesCorrect( Number(e.target.id));
			this.props.setSolved(true);
			return true;
			}

		console.log(`WRONG answer`);

		this.props.appendGuessesWrong( Number(e.target.id));
		return false;
		} // end handleCountryClick()





	// --------------------------------------------------------------------------
	componentDidMount() {
		console.log(`componentDidMount()`);

		// Set title (does React.Route or .Link handle this? NO)
		document.title = 'Flag Game';

		// Placed here instead of constructor so it only runs once
		this.fmtNumber = new Intl.NumberFormat();


		// Timing issues so put selectRandCountries in a .then inside
		// async fetchCountriesAllData
		if (this.props.countriesAll.length === 0) {
			this.fetchCountriesAllData();
			}

		if (this.props.countriesAll.length > 0) {
			// If URL params have been passed, load the user-selected countries:
			if (this.props.userCountries !== undefined) {
				this.selectUserCountries();
				}
			else if (this.props.randCountries.length === 0) {
				this.selectRandCountries();
				} // end else
			} // end if countriesAll.length === 0
		} // end componentDidMount



	// --------------------------------------------------------------------------
	async fetchCountriesAllData() {

		// const URLbase = 'https://restcountries.eu/v3.1/';
		// const URLbase = 'https://restcountries.eu/rest/v2/';
		const URLbase = 'https://restcountries.com/v2/';



		await fetch( `${URLbase}all` )
			.then( resp => {
				if ( !resp.ok ) {
					console.log('First .then after fetch(): checking for errors.');
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
				let countriesAllWithId = countriesAll.map( (country, idx) => {
					country.id = idx;
					return country;
					})
				this.props.setCountriesAll( countriesAll );
					// , () => console.log( this.state.countries) )
				})
			.then( () => {
				// Do not like this here, should be in componentDidMount, but...
				// problems with timing issues.  async to the rescue?
				// This is required here, otherwise stuck on loading screen
				if (this.props.userCountries !== undefined) {
					// Load countries chosen by user via URL params:
					this.selectUserCountries();
					}
				else
					{
					this.selectRandCountries();
					}
				})
			.catch( error => {
				console.log(`ERROR in fetch(4): ${error.message}`);
				this.setState( {
					countriesAll: 'Error connecting to country list server: '
						+ error.message
					}) // end setState
				}) // end catch

		} // end fetchCountriesAllData




	// --------------------------------------------------------------------------
	// User selected countries via URL params: use those countries:
	selectUserCountries() {

		let {
				countriesAll,
				userCountries,
				idxAnswerCorrect,
				setRandCountries,
				setAnswerIndeces,
				resetGuesses,
				setSolved,
				} = this.props;



		let tmpCountries = [];

		for (let i = 0; i < userCountries.length; i++) {
			tmpCountries[i] = countriesAll[ userCountries[i]];
			tmpCountries[i].idxMasterList = Number(userCountries[i]);
			}

		// Correct answer index is first URL param: save that to redux store:
		idxAnswerCorrect = userCountries[0];

		// Ensure there are FOUR countries, else randomly top-up to 4
		while (tmpCountries.length < 4) {
			// Get one random country:
			let randCountry = this.randomArraySlice( [...countriesAll], 1);
			// Check (inverse) intersection to ensure it does NOT exist in choices:
			if ( tmpCountries.filter( (country) => (
					!tmpCountries.includes( randCountry)	// ? false : true
					)) // end filter
				) {
				// Add new country to choices array:
				tmpCountries = tmpCountries.concat(randCountry);
				}
			}


		// Scramble tmpCountries so correct answer is not always first choice
		// First URL param is always correct country...
		let randomized = new Set();
		while (randomized.size < NUM_CHOICES) {
			randomized.add( tmpCountries[ Math.floor(Math.random() * NUM_CHOICES)])
			}
		tmpCountries = Array.from(randomized);



		setRandCountries( [...tmpCountries]);

		setAnswerIndeces({
			indexMasterList: Number(idxAnswerCorrect),
			indexSubset: Number(idxAnswerCorrect)
			})

		// Cleanup guesses from last game/puzzle:
		resetGuesses();
		setSolved(false);

		console.log(`selectUserCountries(): tmpCountries:`, tmpCountries);

		} // end selectUserCountries




	// --------------------------------------------------------------------------
	async selectRandCountries() {

		// Randomly selected index to 'correct' country:
		let randCountry = 0;

		let randCountries =
			this.randomArraySlice( [...this.props.countriesAll], NUM_CHOICES);

		// Select a random "correct" country from the 4 countries
		randCountry =
			Math.floor( Math.random() * randCountries.length);

		// Save index of correct country inside subset that user chooses from:
		// this.idxAnswerSubset = randCountry;




		await this.props.setRandCountries( [...randCountries]);

		await this.props.setAnswerIndeces({
			indexMasterList: randCountries[randCountry].idxMasterList,
			indexSubset: randCountry
			})
		this.props.setSolved(false);
		this.props.resetGuesses();
		} // end selectRandCountries





	// --------------------------------------------------------------------------
	// Generate an array of "numWanted" elements from passed array "arr".
	// The returned array will be the choices shown to user/player.
	// Expecting arr=countriesAll and num=NUM_CHOICES=4.
	// --------------------------------------------------------------------------
	randomArraySlice( arr, numWanted) {
		// console.log(`randomArraySlice( arr, ${numWanted})`);

		let retArr = [];
		// Set (forces unique elements) of 4 random indices to countriesAll:
		let randNums = new Set();


		if (numWanted > arr.length) {
			let errMessage = `Cannot return array of ${numWanted} elements `
				+ `from an array of ${arr.length} elements.`;

			throw Error( errMessage);
			}



		// Add 4 unique indices to randNums set - these indices will point
		// back to countriesAll should we wish to retrieve further data:
		// (Using a Set will ensure unique entries):
		while (randNums.size < numWanted ) {
			randNums.add( Math.floor( Math.random() * arr.length) );
			}
		// console.log(`randNums set has ${randNums.size} elements: `, randNums);


		// Iterate over Set of indeces, building return array from countriesAll
		// Add to that array an item idxMasterList which points to the country's
		// index in the master countriesAll list:
		// Remember, Sets don't have .map, hence .forEach:
		randNums.forEach( randNum =>  {
			retArr.splice( 0, 0, arr[ randNum] );
			retArr[0].idxMasterList = randNum;
			})
		return retArr;
		}









	// --------------------------------------------------------------------------
	render() {
		// console.log(`render() ...`);




		// Test error handling by asking for more elements than exist in array:
		// this.randomArraySlice([], 2);



		// Display a ¿helpful? message while awaiting data fetch...
		let outMsg = '';
		// Data not received yet, tell user to wait via pre-seeded
		// this.state. messages:
//		if (this.randCountries.length === 0) {
		if (this.props.randCountries.length === 0
				|| this.props.idxAnswerCorrect === -1
			) {
			outMsg = <ul>
			{[...this.props.messages.map( (msg,idx) => (
				<li key={idx}>{msg}</li>
				))]
				}
			</ul>;
			} // end if
		// Data has arrived and is ready to display now:
		else {
			outMsg =
				<CountryList
					countriesAll = {this.props.countriesAll}
					randCountries = {this.props.randCountries}
					idxAnswerCorrect = {this.props.idxAnswerCorrect}
					// idxAnswerSubset = {this.props.idxAnswerSubset}
					solved = {this.props.solved}
					guessesCorrect = {this.props.guessesCorrect}
					guessesWrong = {this.props.guessesWrong}
					handleCountryClick = {this.handleCountryClick}
					handleNewGameClick = {this.handleNewGameClick}
					formatNumber = {this.props.formatNumber}
					/>
			} // end else



		return (
			<div className='flag-game'>
				{outMsg}
			</div>
			);
		}
	}



// ----------------------------------------------------------------------------
const mapStateToProps = (reduxState, props) => {
	console.log(`CountryFlagGame mapStateToProps()`, reduxState, props);

	return ( {...reduxState.flagGame} );
	};




// ----------------------------------------------------------------------------
const mapDispatchToProps = (dispatch, props) => {

	// This console.log causes error in console of Chromium, not Firefox!
	//
	// CountryFlagGame mapDispatchToProps() ƒ dispatch(action) {
	//	if (!isPlainObject(action)) {
	//
	//	throw new Error( false ? 0 : "Actions must be plain objects.
	//	Instead, the actual type was: '" + kindOf(action) + "'. You may need
	//	to add mid… (middleware...)
	//
	console.log("CountryFlagGame mapDispatchToProps()", dispatch, props);

	return ({
		setCountriesAll: (list) => (dispatch(
				{
				type: "setCountriesAll",
				list: list
				}
			)), // end setCountriesAll
		appendGuessesWrong: (country) => (dispatch(
				{
				type: "appendGuessesWrong",
				guess: country
				}
			)), // end appendGuessesWrong
		appendGuessesCorrect: (country) => (dispatch(
				{
				type: "appendGuessesCorrect",
				guess: country
				}
			)), // end appendGuessesCorrect
		resetGuesses: () => (dispatch(
				{
				type: "resetGuesses"
				}
			)),
		setRandCountries: (countries) => (dispatch(
				{
				type: "setRandCountries",
				list: countries
				}
			)), // end setRandCountries
		setAnswerIndeces: ( indeces ) => (dispatch(
				{
				type: "setAnswerIndeces",
				indeces: indeces
				}
			)), // end setAnswerIndeces
		setSolved: ( newState ) => (dispatch(
				{
				type: "setSolved",
				newState: newState
				}
			)), // end setSolved
		newFlagGame: () => (dispatch(
				{
				type: "newFlagGame"
				}
			)), // end newFlagGame
		});
	};




// ----------------------------------------------------------------------------
export default connect(
	mapStateToProps,
	mapDispatchToProps
	)(CountryFlagGame);
