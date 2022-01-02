
import React, {Component} from 'react';
import PropTypes from 'prop-types';



// ---------------------------------------------------------
class CountryList extends Component {

	static propTypes = {
		countryList: PropTypes.array.isRequired,
		idxAnswerSubset: PropTypes.number,
		idxAnswerCorrect: PropTypes.number,
		handleCountryClick: PropTypes.func.isRequired,
		handleNewGameClick: PropTypes.func,
		solved: PropTypes.bool.isRequired,
		guessesCorrect: PropTypes.array,
		guessesWrong: PropTypes.array,
		formatNumber: PropTypes.func
		}

/*
	constructor(props) {
		super(props);
		const countryList = this.props.countryList;
		const answerIdx = this.props.answerIdx;
		}
*/

	// ---------------------------------------------------------
	render() {
		let {
			countryList,
			guessesCorrect,
			guessesWrong,
			idxAnswerSubset,
			solved
			} = this.props;

		// Do nothing if already solved but user clicks more countries:
		/*
		if ( this.props.solved ) {
			return '';
			}
		*/


		// Flatten guesses arrays into one for easy testing of prior guesses:
		// let guesses = this.props.guessesCorrect.concat( this.props.guessesWrong);
		//
		// Could have summed the lengths and tested for > 0 instead...
		let guesses = Array.prototype.concat(
			this.props.guessesCorrect,
			this.props.guessesWrong
			);
		let guessCount = guessesCorrect.length + guessesWrong.length;


		let classes = 'country-list';

		// The NUM_CHOICES (4) options for user / player to choose from:
		let listItems = '';

		// Prevent clicking an already-chosen option:
		// Huh? How would ^this^ work? This handles normal clicks, right?
		// Remap onclickAction once solved instead!
		let onclickAction = this.props.handleCountryClick;


		listItems = countryList.map( (value,idx) => {
			classes = 'country-list';
			onclickAction = this.props.handleCountryClick;

			// Only look for class changes on buttons if guesses have happened:
			// This is useless, redundant, only skips upon initial load...
			// Refactor by removing this logic branch completely:
//			if (guessCount > 0) {
				// Update country button's colour if correct button selected
				// set class 'correct' on correct country if it's been chosen:
				if ( guessesCorrect.includes(
						countryList[idx].origidx) ) {
					classes += ' correct';
					} // end if this matches correct guess
				// set class 'wrong' on wrong choices:
				else if ( guessesWrong.includes( countryList[idx].origidx) ) {
					classes += ' wrong';
					} // else if this matches wrong guess
//				} // end if guesses exist


			// Once solved, stop accepting new country guesses:
			if (this.props.solved) {
				onclickAction = () => (
					console.log('STOP GUESSING, the correct answer is '
						+ `"${countryList[idxAnswerSubset].name}".`));
				}

			return <div className={classes}
				key={value.origidx}
				id={value.origidx}
				title={value.name}
				onClick={onclickAction}
				>{value.name}
			</div>
			}); // end map
		let imgSrc = countryList[idxAnswerSubset].flag ;


		// If puzzle solved, add link to new game:
//		let solvedDiv = <div className='more-info' style={{display: 'none'}}></div>;
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
More info about {countryList[idxAnswerSubset].name}
					<ul><li>
Region: {countryList[idxAnswerSubset].region}
						</li><li>
Sub-Region: {countryList[idxAnswerSubset].subregion}
						</li><li>
Capital city: {countryList[idxAnswerSubset].capital}
						</li><li>
Native name: {countryList[idxAnswerSubset].nativeName}
						</li><li>
Population: {this.props.formatNumber(countryList[idxAnswerSubset].population)}
						</li><li>
<span style={{fontWeight: 'bold'}}>Language
{countryList[idxAnswerSubset].languages.length > 1 ? 's' : ''}
:</span> <ol style={{width: 'fit-content', marginInline: 'auto'}}>{countryList[
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
	countryList: PropTypes.array.isRequired,
	idxAnswerSubset: PropTypes.number.isRequired
	}
*/

