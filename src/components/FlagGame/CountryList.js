
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
		// let {countryList, idxAnswerSubset, solved} = this.props;

		// Flatten guesses arrays into one for easy testing of prior guesses:
		// let guesses = this.props.guessesCorrect.concat( this.props.guessesWrong);
		//
		// Could have summed the lengths and tested for > 0 instead...
		let guesses = Array.prototype.concat(
			this.props.guessesCorrect,
			this.props.guessesWrong
			);
		let classes = 'country-list';

		// The NUM_CHOICES (4) options for user / player to choose from:
		let listItems = '';

		// Prevent clicking an already-chosen option:
		let onclickAction = this.props.handleCountryClick;

		listItems = this.props.countryList.map( (value,idx) => {
			classes = 'country-list';
			onclickAction = this.props.handleCountryClick;

			// set class 'correct' on correct country if it's been chosen:
			if (guesses.length > 0) {
				if ( this.props.guessesCorrect.includes(
						this.props.countryList[idx].origidx) ) {
					classes += ' correct';
					onclickAction = () => (console.log("nope") );
					} // end if this matches correct guess
				// set class 'wrong' on wrong choices:
				else if ( this.props.guessesWrong.includes(
						this.props.countryList[idx].origidx) ) {
					classes += ' wrong';
					onclickAction = () => (console.log("nope") );
					} // else if this matches wrong guess
				} // end if guesses exist

			return <div className={classes}
				key={value.origidx}
				id={value.origidx}
				title={value.name}
				onClick={onclickAction}
				>{value.name}
			</div>
			}); // end map
		let imgSrc = this.props.countryList[this.props.idxAnswerSubset].flag ;


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
More info about {this.props.countryList[this.props.idxAnswerSubset].name}
					<ul><li>
Region: {this.props.countryList[this.props.idxAnswerSubset].region}
						</li><li>
Sub-Region: {this.props.countryList[this.props.idxAnswerSubset].subregion}
						</li><li>
Capital city: {this.props.countryList[this.props.idxAnswerSubset].capital}
						</li><li>
Native name: {this.props.countryList[this.props.idxAnswerSubset].nativeName}
						</li><li>
Population: {this.props.formatNumber(this.props.countryList[this.props.idxAnswerSubset].population)}
						</li>
					</ul>
				</div>
			</div>
			} // end if solved

		return (
			<div className='temp2'>
				<div className='country-list-container'>
					{listItems}
				</div>
				<div className='flag'>
					<img src={imgSrc} alt='Flag' />
				</div>
				{solvedDiv}
			</div>
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

