import React, { Component } from 'react';
// import ReactDOM from 'react-dom';

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



// ******************************************************************
// Sub component
// ******************************************************************

class ColouredBoxes extends Component {

	static propTypes = {
		boxArray: PropTypes.array.isRequired,
		boxHiddenState: PropTypes.array.isRequired,
		handleBoxClick: PropTypes.func.isRequired
		};

//	const { boxArray, boxHiddenState } = this.props;
//	console.log( `ColouredBoxes() boxArray: ${boxArray} this.props: `, this.props);
//	console.log( `ColouredBoxes() this.props: `, this.props);


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
//					handleBoxClick={ (e) => this.handleBoxClick(e) }
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




// ******************************************************************
// Main component
// ******************************************************************

class MemoryGame extends Component {
	constructor( props ) {
		super( props );

		// 8 choices, doubled makes 16 boxes:
		this.colorChoices = ['aqua', 'orange', 'chartreuse', 'crimson',
			'seagreen', 'indigo', 'darkgoldenrod', 'cornflowerblue'];

		// Make temp object with 2 sets of the colours, which we remove
		// elements from when selected to populate 'boxes' array:
		this.colorChoicesTemp = [...this.colorChoices, ...this.colorChoices];
		// An iterable array, contents don't matter, just element for each
		// final box:
		this.boxesTemp = [...this.colorChoices, ...this.colorChoices];


		// Array of boxes displayed on screen:
		this.boxes = Array(NUM_BOXES);

		// Array to hold state of each box:
		// Hidden, Showing, Solved (and therefore showing):
		this.boxHiddenState = Array( this.boxes.length);


		// Basically get random index of an array:
//		function getRandomColour( arr ) {
		this.getRandomColour = ( arr ) => (
			Math.floor(Math.random() * arr.length)
			);

		// Assign random colours to boxes array by assigning from random index,
		// then removing that element from colorChoicesTemp.
		// This ensures all colours are used and never more than twice.
		this.boxes = this.boxesTemp.map( (box, idx) => {
			let tempColorIdx = this.getRandomColour( this.colorChoicesTemp );
			box = this.colorChoicesTemp[ tempColorIdx ];
			this.colorChoicesTemp.splice( tempColorIdx, 1 );
			// initialize boxHiddenState to hidden:
			this.boxHiddenState[idx] = 'Hidden';
			return box;
			});

		this.state = {
			// Shouldn't need colorChoices, they've been assigned already
			colorChoices: this.colorChoices,
			boxes: this.boxes,
			boxHiddenState: this.boxHiddenState,
			// Push indices of solved boxes into this array:
			boxSolvedState: [],
			// Can only show 2 unsolved boxes at once, count them here:
			boxShowingCount: 0,
			clickCounter: 0,
			allowClick: true
			};


		this.handleBoxClick = this.handleBoxClick.bind(this);
		this.resetShowingBoxes = this.resetShowingBoxes.bind( this);
		this.handleNewGameClick = this.handleNewGameClick.bind( this);
		} // end constructor







	// ******************************************************************
	componentDidMount() {
		document.title = 'Memory Game';
		} // end componentDidMount





	// ******************************************************************
	// Determine if two "Showing" boxes match colours, if so, set to "Solved":
	// ******************************************************************
	flagSolved( boxShowingCount, arr ){
//		console.log(`flagSolved() boxShowingCount: ${boxShowingCount}  arr: ${[...arr]}`);

//		if ( this.state.boxShowingCount === 2) {
//		if ( boxShowingCount === 2) {
			const boxesTemp = [];

			// Filter for the two "Showing" boxes:
//			this.state.boxHiddenState.map( (hiddenState, idx) => {
			arr.map( (hiddenState, idx) => {
				if (hiddenState === 'Showing' ) {
					boxesTemp.push(idx);
// console.log(`flagSolved() Showing colour: ${this.state.boxes[boxesTemp[boxesTemp.length-1]]}`);
					} // end if === 'Showing'
				return hiddenState;
				}) // end map
			// Two boxes showing, their indeces saved in boxesTemp:
			// Compare those index's values in boxes array on screen:
// console.log(`flagSolved() colours: ${this.state.boxes[boxesTemp[0]]} vs `
//	+ `${this.state.boxes[boxesTemp[1]]}  ... solved?`);
			if ( this.state.boxes[boxesTemp[0]] ===
				this.state.boxes[boxesTemp[1]] ) {
				console.log( `SOLVED: ${this.state.boxes[boxesTemp[1]]}`);

				const boxesSolved = [...this.state.boxHiddenState];
				boxesSolved[ boxesTemp[0]] = 'Solved';
				boxesSolved[ boxesTemp[1]] = 'Solved';
/*
				this.setState( {boxHiddenState: [...boxesSolved],
					boxShowingCount: 0
					}); // end setState
*/
				this.setState( () => ({
					boxHiddenState: [...boxesSolved],
					boxShowingCount: 0
					}), () => { console.log( `setState 1 (flagSolved): `
						+ `showingCount: ${this.state.boxShowingCount} `
						+ `${this.state.boxes[boxesTemp[1]]}`)}
					); // end setState
				return true;
				} // end if boxesSolved match
//			} // end if === 2
			return false;
		} // end flagSolved





	// ----------------------------------------------------------------
	// Start new game without reloading page
	// ----------------------------------------------------------------
	handleNewGameClick( e ) {
		e.preventDefault();
		e.stopPropagation();

		console.log( `handleNewGameClick()`);


		this.colorChoicesTemp = [...this.state.colorChoices,
			...this.state.colorChoices];
		// Assign random colours to boxes array by assigning from random index,
		// then removing that element from colorChoicesTemp.
		// This ensures all colours are used and never more than twice.
		this.boxes = this.boxesTemp.map( (box, idx) => {
			let tempColorIdx = this.getRandomColour( this.colorChoicesTemp );
			box = this.colorChoicesTemp[ tempColorIdx ];
			this.colorChoicesTemp.splice( tempColorIdx, 1 );
			// initialize boxHiddenState to hidden:
			this.boxHiddenState[idx] = 'Hidden';
			return box;
			});


		this.setState( {
			// Shouldn't need colorChoices, they've been assigned already
			colorChoices: this.colorChoices,
			boxes: this.boxes,
			boxHiddenState: this.boxHiddenState,
			// Push indices of solved boxes into this array:
			boxSolvedState: [],
			// Can only show 2 unsolved boxes at once, count them here:
			boxShowingCount: 0,
			clickCounter: 0,
			allowClick: true
			});
		}





// ******************************************************************
// Show hidden colour of box MAX 2 at once for _?_ seconds:
// ******************************************************************
	handleBoxClick( e ) {
//		e.preventDefault();
//		e.stopPropagation();

		// Make working copy of state
		let {boxShowingCount,
				boxHiddenState,
				clickCounter,
				allowClick } = this.state;

		// console.log( `handleBoxClick(e): e.target.id=${e.target.id} `
		//	+ ` and boxShowingCount: ${this.state.boxShowingCount}`);



		// Occasionally setTimeout seems to not fire, and can have 3
		// items showing, or have seen one showing but count of 2. WTF?
		// This should clean those up by firing off a new setTimeout:
		if ( boxShowingCount > 1 || !allowClick  ) {
			// Don't show more boxes if 2 are already shown
			// Also, it's handy, but don't hide boxes if bored user clicks
			// while 2 are Showing to progress faster: timing issues...
			// this.resetShowingBoxes( 0 );
			return;
			}

		// Increment click counter
//		clickCounter++;

		// If clicked box was Hidden, toggle to Showing
//		if (this.state.boxHiddenState[ e.target.id] === 'Hidden' ){
		if (boxHiddenState[ e.target.id] === 'Hidden' ){
			// Toggle state from Hidden to Showing upon Click event:
//			tempBoxState[ e.target.id ] = 'Showing';
			boxHiddenState[ e.target.id ] = 'Showing';

			// Make working copy of state
			// const tempBoxShowingCount = this.state.boxShowingCount;

			boxShowingCount++;


			// Increment click counter ONLY if a box toggled to 'Showing':
			clickCounter++;

			this.setState( () => ( {
				boxHiddenState,
				// boxShowingCount: state.boxShowingCount + 1
				boxShowingCount,
				clickCounter
				}), () => {
					console.log(`setState 2: this.state.boxCountShowing: `
						+ `${this.state.boxShowingCount}`);
					}
				 ); // end setState


			// Set a timer to hide both showing boxes after 2(?) seconds IF
			// two boxes are 'Showing' BUT not 'Solved':
//			if ( this.state.boxShowingCount > 1 ) {
			if ( boxShowingCount > 1 ) {
//				if (this.flagSolved( [...this.state.boxHiddenState] )) {
				if (this.flagSolved( boxShowingCount, [...boxHiddenState] )) {
					// console.log( `MATCHED: DO NOT RESET`);
					} // end flagSolved === true?
				else {
					// Disable clicks until Showing colours reset:
					this.setState( (prevState) => { return {allowClick: false} },
						() => { console.log( `??? ${this.state.allowClick}`) }
						);
					this.resetShowingBoxes( TIMER );
					} // end else
				} // end inner if ... === 2
			} // end outer if ... === 'Hidden'
		} // end handleBoxClick




	// ******************************************************************
	// Clear 'Showing' boxes by resetting them to 'Hidden':
	// ******************************************************************
	resetShowingBoxes(time, ...tmpHiddenState ) {
		setTimeout( () => {
//console.log(`resetShowingBoxes(): tmpHiddenState: ${[...tmpHiddenState]}`);
			tmpHiddenState = this.state.boxHiddenState.map( (state, idx) => (
//			tmpHiddenState = tmpHiddenState.map( (state, idx) => (
				state === 'Showing' ? 'Hidden' : state
				)) // end map

			this.setState( (prevState) => ({
				boxHiddenState: [...tmpHiddenState],
				boxShowingCount: 0,
				allowClick: true
//				clickCounter: prevState.clickCounter + 1
				}), () => {
					console.log( `resetShowingBoxes() setState 3: `
						+ `boxShowingCount: ${this.state.boxShowingCount} `
						+ `allowClick: ${this.state.allowClick}`)
				}	) // end setState
			}, time ) // end setTimeout
		} // end resetShowingBoxes


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
						boxArray={this.state.boxes}
						boxHiddenState={this.state.boxHiddenState}
						handleBoxClick={this.handleBoxClick}
						boxShowingCount={this.state.boxShowingCount}
					 />
				<p className='counter'>Clicks counted: {this.state.clickCounter}</p>
				<p className='new-game'>
					<a href='/new-game' onClick={this.handleNewGameClick}>New Game</a>
				</p>
			</div>
			);
		}
	}

export default MemoryGame;


/*
				<Header
					handleNewGameClick={this.handleNewGameClick}
					appName='Memory Game'
					/>
				...
				<Footer />
*/
