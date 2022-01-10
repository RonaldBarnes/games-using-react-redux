import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

/*
// Now imported in App.js and placed outside the Routes:
import Header from './Header';
import Footer from './Footer';
*/
import './MemoryGame.css';



const NUM_BOXES = 16;
// How long boxes should show colour before resetting when not matching:
const TIMER = 2000;



// ----------------------------------------------------------------------------
// Sub component
// ----------------------------------------------------------------------------

class ColouredBoxes extends Component {

	// Conflicts with similar declaration in MemoryGame class below?
	static propTypes = {
		boxArray: PropTypes.array.isRequired,
		boxHiddenState: PropTypes.array.isRequired,
		handleBoxClick: PropTypes.func.isRequired
		};



	// --------------------------------------------------------------------------
	render() {
		const { boxArray, boxHiddenState } = this.props;

		let boxes = boxArray.map( (colour,idx) => {
			// Hide boxes with neutral colour by default:
			let boxStyle={backgroundColor: 'gray'};
			let boxClass = 'box';

			// Use the box's colour if not hidden:
			if (boxHiddenState[idx] !== 'Hidden') {
				boxStyle={backgroundColor: colour};
				} // end if !== Hidden

			// If Solved, decorate with CSS:
			if (boxHiddenState[idx] === 'Solved') {
				boxClass += ' solved';
				} // end if Solved
			return (
				<div key={idx}
					id={idx}
					className={boxClass}
					style={boxStyle}
					onClick={ (e) => this.props.handleBoxClick(e) }
					>
					<p>{colour}</p>
					<p>{idx+1}</p>
				</div>
				); // end return
			}); // end boxArray.map

		return(
			<div className='boxesContainer'>
				{boxes}
			</div>
			); // end return
		} // end render
	}




// ----------------------------------------------------------------------------
// Main component
// ----------------------------------------------------------------------------

class MemoryGame extends Component {

	static propTypes = {
		colorChoices: PropTypes.array.isRequired,
		boxHiddenState: PropTypes.array.isRequired,
		boxSolvedState: PropTypes.array.isRequired,

		boxShowingCount: PropTypes.number.isRequired,
		clickCounter: PropTypes.number.isRequired,
		allowClick: PropTypes.bool.isRequired,
		}



	// --------------------------------------------------------------------------
	constructor( props ) {
		super( props );

		console.log(`MemoryGame constructor() props:`, props);

		// Only re-initialize if game is not underway (like if returning from
		// FlagGame, then don't reset on-going game):
		if (this.props.clickCounter === 0) {
			this.initializeBoxes();
			}

		// set ID on setTimeout() so it can be cancelled:
		this.timeOutId;

		this.handleBoxClick = this.handleBoxClick.bind(this);
		this.resetShowingBoxes = this.resetShowingBoxes.bind( this);
		this.handleNewGameClick = this.handleNewGameClick.bind( this);
		} // end constructor




	// --------------------------------------------------------------------------
	// Assign colours randomly to an array of boxes:
	// --------------------------------------------------------------------------
	initializeBoxes() {
		// console.log( "MemoryGame initializeBoxes()" );


		// Make temp object with 2 sets of the colours, which we remove
		// elements from when selected to populate 'boxes' array:
		const colorChoicesTemp = [
			...this.props.colorChoices,
			...this.props.colorChoices
			];

		// initialize boxHiddenState to hidden:
		const boxHiddenState = Array(NUM_BOXES).fill("Hidden");

		// Assign colours to boxes array by randomly choosing an index
		// from temp array of all colours*2,
		// then removing that index's element from temp array so it's not reused.
		// This ensures all colours are used and never more than twice.
		const boxes = Array(NUM_BOXES).fill("").map( (box, idx) => {
			// Get a random colour (random index to array of coloured boxes):
			let tempColorIdx = this.getRandomColour( colorChoicesTemp );
			// Assign that colour to an array element:
			box = colorChoicesTemp[ tempColorIdx ];
			// Remove that index from temp colour array so it's not re-used:
			colorChoicesTemp.splice( tempColorIdx, 1 );
			return box;
			});


		this.props.setBoxesAll( [...boxes] );
		this.props.setBoxHiddenState( [...boxHiddenState] );
		return [...boxes];
		}



	// --------------------------------------------------------------------------
	// Basically get random index of an array:
	// --------------------------------------------------------------------------
	getRandomColour = ( arr ) => {
		return Math.floor(Math.random() * arr.length);
		}


	// --------------------------------------------------------------------------
	componentDidMount() {
		document.title = 'Memory Game';
		} // end componentDidMount





	// --------------------------------------------------------------------------
	// Determine if two "Showing" boxes match colours, if so, set to "Solved":
	// --------------------------------------------------------------------------
	flagSolved( boxShowingCount, arr ) {

		// console.log(`flagSolved() boxShowingCount: ${boxShowingCount}`
		//	+ ` and arr:`, arr);

		if ( this.props.boxShowingCount > 2) {
			console.log(`ERROR! MemoryGame.js flagSolved(): boxShowingCount`
				+ ` === ${boxShowingCount} but should NEVER be >2`);
			}

		// Store 2 boxShowing colours in temp array:
		const boxesTemp = [];

		// Get indeces of the 2 "Showing" boxes:
		boxesTemp[0] = arr.indexOf("Showing");
		boxesTemp[1] = arr.lastIndexOf("Showing");



		// With two boxes showing, their indeces saved in boxesTemp,
		// compare those indeces's colours in boxes array:
			if ( this.props.boxes[boxesTemp[0]] ===
				this.props.boxes[boxesTemp[1]] ) {

				console.log( `SOLVED colour: ${this.props.boxes[boxesTemp[0]]}`);

				const boxesSolved = [...this.props.boxHiddenState];
				boxesSolved[ boxesTemp[0]] = 'Solved';
				boxesSolved[ boxesTemp[1]] = 'Solved';


				this.props.setBoxHiddenState( [...boxesSolved] );
				this.props.setBoxShowingCount(0);

				return true;
				} // end if boxesSolved match
//			} // end if === 2
			return false;
		} // end flagSolved





	// --------------------------------------------------------------------------
	// Start new game without reloading page
	// --------------------------------------------------------------------------
	handleNewGameClick( e ) {
		e.preventDefault();
		e.stopPropagation();

		console.log( `handleNewGameClick()`);

		this.props.newMemGame();
		this.initializeBoxes();
		}





	// --------------------------------------------------------------------------
	// Show hidden colour of box MAX 2 at once for _?_ seconds:
	// --------------------------------------------------------------------------
	handleBoxClick( e ) {
		// Not neccessary, not a form submission:
		// e.preventDefault();
		// e.stopPropagation();

		// Make working copy of state
		let {
			boxShowingCount,
			setBoxShowingCount,
			boxHiddenState,
			setBoxHiddenState,
			clickCounter,
			setClickCount,
			allowClick,
			} = this.props;


		// If player clicks another box while waiting for 2 boxes "Showing",
		// ignore the click:
		// Don't show more boxes if 2 are already shown
		if ( !allowClick ) {
			console.log(`handleBoxClick() Ignoring click while 2 boxes showing.`);
			//
			// Although it's handy, don't hide boxes if bored user clicks
			// while 2 are "Showing": causes timing issues where a box shows then
			// quickly disappears again...
			// clearTimout(timeOutId);
			// this.resetShowingBoxes( 0 );
			return;
			}


		// If clicked box was Hidden, toggle to Showing; if NOT Hidden,
		// ignore the click
		if (boxHiddenState[ e.target.id] === 'Hidden' ) {
			// Toggle state from Hidden to Showing upon Click event:
			boxHiddenState[ e.target.id ] = 'Showing';
			setBoxHiddenState( [...boxHiddenState] );

			boxShowingCount++;
			setBoxShowingCount( boxShowingCount );

			// Increment click counter ONLY if a box toggled to 'Showing':
			clickCounter++;
			setClickCount();

			// Set a timer to hide both showing boxes after TIMER (2?) seconds IF
			// two boxes are 'Showing' BUT not 'Solved':
			if ( boxShowingCount === 2) {
				if (this.flagSolved( boxShowingCount, [...boxHiddenState]) ) {
					// console.log( `MATCHED: DO NOT RESET`);
					} // end flagSolved === true?
				else {
					// Disable clicks until Showing colours reset:
					this.props.toggleClick(false);
					this.resetShowingBoxes( TIMER );
					} // end else
				} // end if boxShowingCount === 2
			} // end if clicked boxHiddenState === 'Hidden'
		} // end handleBoxClick






	// --------------------------------------------------------------------------
	// Clear 'Showing' boxes by resetting them to 'Hidden':
	// --------------------------------------------------------------------------
	resetShowingBoxes(timeOut) {
		// console.log(`resetShowingBoxes() timeOut=${timeOut}`);

		this.timeOutId = setTimeout( () => {
			console.log(`resetShowingBoxes() setTimeout() timeOutId=${this.timeOutId}`);

			const tmpHiddenState = this.props.boxHiddenState.map( (state, idx) => (
				state === 'Showing' ? 'Hidden' : state
				)) // end map

			this.props.setBoxShowingCount(0);
			// Already ran map on array, don't do it again:
			// this.props.resetShowingBoxes();
			// INSTEAD, re-use the mapped array as param:
			this.props.setBoxHiddenState( [...tmpHiddenState] );
			this.props.toggleClick(true);
			}, timeOut ) // end setTimeout
		// console.log(`setTimeout() timeOutId=${this.timeOutId}`);
		} // end resetShowingBoxes


	// --------------------------------------------------------------------------
	render() {
		return (
			<div className='mem-game-container'>
				<div className='instructions'>
					<p>Click 2 boxes to reveal their colours. "Solve" by selecting
						matching colours.</p>
					<p>The colours are hidden after 2 seconds. You need to remember
						where they were to match them in pairs.</p>
				</div>
				<ColouredBoxes
						boxArray={this.props.boxes}
						boxHiddenState={this.props.boxHiddenState}
						handleBoxClick={this.handleBoxClick}
						boxShowingCount={this.props.boxShowingCount}
					 />
				<p className='counter'>Clicks counted: {this.props.clickCounter}</p>
				<p className='new-game'>
					<a href='/new-game' onClick={this.handleNewGameClick}>New Game</a>
				</p>
			</div>
			);
		}
	}

// export default MemoryGame;






// ----------------------------------------------------------------------------
const mapStateToProps = (reduxState, props) => {
	// console.log(`MemoryGame mapStateToProps()`, reduxState, props);

	return ( {...reduxState.memGame} );
	};




// ----------------------------------------------------------------------------
const mapDispatchToProps = (dispatch, props) => {
	// console.log("MemoryGame mapDispatchToProps()", dispatch, props);

	return ({
		setBoxesAll: (list) => (dispatch(
				{
				type: "setBoxesAll",
				array: list
				}
			)), // end setBoxesAll
		setBoxHiddenState: (list) => (dispatch(
				{
				type: "setBoxHiddenState",
				array: list
				}
			)), // end setBoxHiddenState
		setBoxShowingState: (list) => (dispatch(
				{
				type: "setBoxSolvedState",
				array: list
				}
			)), // end setBoxShowingState
		setBoxShowingCount: (newCount) => (dispatch(
				{
				type: "setBoxShowingCount",
				newCount: newCount
				}
			)), // end setBoxShowingCount
		setClickCount: () => (dispatch(
				{
				type: "setClickCount+1"
				}
			)), // end setClickCount
		resetShowingBoxes: () => (dispatch(
				{
				type: "resetShowingBoxes"
				}
			)), // end resetShowingBoxes
		toggleClick: (newState) => (dispatch(
				{
				type: "toggleClick",
				newState: newState
				}
			)), // end toggleClick
		newMemGame: () => (dispatch(
				{
				type: "newMemGame"
				}
			)), // end setBoxesAll
		}) // end return
	}; // end mapDispatchToProps





// ----------------------------------------------------------------------------
export default connect(
	mapStateToProps,
	mapDispatchToProps
	)(MemoryGame);
