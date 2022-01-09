
import React, {Component} from 'react';
import PropTypes from 'prop-types';



// ---------------------------------------------------------
class CountryList extends Component {

	static propTypes = {
		countriesAll: PropTypes.array.isRequired,
		randCountries: PropTypes.array.isRequired,
		idxAnswerCorrect: PropTypes.number.isRequired,
		idxAnswerSubset: PropTypes.number.isRequired,
		solved: PropTypes.bool.isRequired,
		guessesCorrect: PropTypes.array.isRequired,
		guessesWrong: PropTypes.array.isRequired,
		handleCountryClick: PropTypes.func.isRequired,
		handleNewGameClick: PropTypes.func.isRequired,
		formatNumber: PropTypes.object.isRequired
		}


	constructor(props) {
		super(props);
		console.log(`CountryList constructor() props:`, props);
/*
		const countryList = this.props.countryList;
		const answerIdx = this.props.answerIdx;
*/
		}


/*
	Replaced this function with rootReducer.
	Was originally in a bound prop from the HOC but failed to reload those
	props if a game was solved, then clicked on MemoryGame, then back.
	// --------------------------------------------------------------------------
	// Declared fmtNumber as new Intl.NumberFormat in componentDidMount
	formatNumber( num ) {
		console.log(`CountryList() formatNumber: num=${num}`);

		let x = new Intl.NumberFormat()
		return x.format(num);
		}
*/




	// ---------------------------------------------------------
	render() {
		let {
			randCountries,
			// deprecated: countryList,
			guessesCorrect,
			guessesWrong,
			idxAnswerCorrect,
			idxAnswerSubset,
			solved,
			handleCountryClick,
			formatNumber
			} = this.props;


		let onclickAction = this.props.handleCountryClick;


		let classes = 'country-list';

		// The NUM_CHOICES (4) options for user / player to choose from:
		let listItems = '';


		// Iterate through country choices, styling "buttons" if they've been
		// correctly or wrongly chosen:
		listItems = randCountries.map( (value,idx) => {
			classes = 'country-list';
			onclickAction = this.props.handleCountryClick;

			// Update country button's colour if correct button selected
			// set class 'correct' on correct country if it's been chosen:
			if ( guessesCorrect.includes(
					randCountries[idx].idxMasterList) ) {
				classes += ' correct';
				} // end if this matches correct guess
			// set class 'wrong' on wrong choices:
			else if ( guessesWrong.includes( randCountries[idx].idxMasterList) ) {
				classes += ' wrong';
				} // else if this matches wrong guess


			// Once solved, stop accepting new country guesses:
			// Do nothing if already solved but user clicks more countries:
			if (this.props.solved) {
				onclickAction = () => (
					console.log('STOP GUESSING, the correct answer is '
						+ `"${randCountries[idxAnswerSubset].name}".`));
				}

			return <div className={classes}
				key={value.idxMasterList}
				id={value.idxMasterList}
				title={value.name}
				onClick={onclickAction}
				>{value.name}
			</div>
			}); // end map
		let imgSrc = randCountries[idxAnswerSubset].flag ;



		// If puzzle solved, add link to new game, AND show "more-info" about
		// the correct country so's I can learn something:
		//
		// I forget how opacity gets from 0 to 1: .new-game has opacity: 1 in CSS
		let solvedDiv = <div className='new-game' style={{opacity: 0}}></div>;

		if ( this.props.solved ) {
			solvedDiv =
				<div className='new-game'>
					<div>
						<a href='/new-game'
						onClick={this.props.handleNewGameClick}
						>Next Puzzle</a>
					</div>
				<div className='more-info'>
More info about {randCountries[idxAnswerSubset].name}
					<ul><li>
Region: {randCountries[idxAnswerSubset].region}
						</li><li>
Sub-Region: {randCountries[idxAnswerSubset].subregion}
						</li><li>
Capital city: {randCountries[idxAnswerSubset].capital}
						</li><li>
Native name: {randCountries[idxAnswerSubset].nativeName}
						</li><li>
Population: {formatNumber.format(randCountries[idxAnswerSubset].population)}
						</li><li>
<span style={{fontWeight: 'bold'}}>Language
{randCountries[idxAnswerSubset].languages.length > 1 ? 's' : ''}
:</span> <ol style={{width: 'fit-content', marginInline: 'auto'}}>{randCountries[
	idxAnswerSubset].languages.map( (lang,idx) => (
	<li key={idx} style={{listStyle: 'decimal'}}>{lang.name} ({lang.nativeName})</li>
	))}</ol>
 						</li>
					</ul>
				</div>
			</div>
			} // end if solved

		return (
			<React.Fragment>
				<div className='country-list-container'>
					{listItems}
				</div>
				<div className='flag'>
					<img src={imgSrc} alt='Flag' />
				</div>
				{solvedDiv}
			</React.Fragment>
			)
		} // end render
	} // end class


export default CountryList;



/*
CountryList.propTypes = {
	countriesAll: PropTypes.array.isRequired,
	randCountries: PropTypes.array.isRequired,
	guessesCorrect: PropTypes.array.isRequired,
	guessesWrong: PropTypes.array.isRequired,
	idxAnswerCorrect: PropTypes.number.isRequired,
	idxAnswerSubset: PropTypes.number.isRequired,
	solved: PropTypes.bool,
	handleCountryClick: PropTypes.func.isRequired,
	handleNewGameClick: PropTypes.func.isRequired
	}
*/
