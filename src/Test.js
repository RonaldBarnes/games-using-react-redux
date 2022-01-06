
// import React, {Component} from 'react';
import { connect } from 'react-redux';



function Test(props) {
/*
	console.log(`Test props.x = ${props.x}`);
	console.log(`Test: all props: `, props);
*/

	return (
		<div>
			<h1>Test component</h1>
			<p>Redux testing</p>
			<p>props.x={props.x}</p>
			<p>props.counter={props.counter}</p>
			<pre>preformatted(?)</pre>
			<br />
			<button
				id="btnCounterMinus1"
				onClick={ props.decrement }
				>-1</button>
			{' '}
			<input
				type="text"
				id="counter"
				placeholder="?"
				size="5"
				readOnly='readOnly'
				value={props.counter}
				/* onChange={ console.log("input#counter onChange") */
				/>
			{' '}
			<button
				id="btnCounterPlus1"
				onClick={ props.increment }
				>+1</button>
			{' '}
			<button
				id="btnCounterReset"
				onClick={ props.reset }
				>Reset</button>
		</div>
		); // end return
	} // end Test




// const mapStateToProps = (reduxState, props) => {
const mapStateToProps = (reduxState) => {
	// console.log("mapStateToProps() reduxState:", reduxState);

	const defaultCounter = reduxState.counter || 0;

	// WHY does returning an object directly fail, but assigning it to a const,
	// then returning the const work fine?!?
	const wtf =
		{
		counter: defaultCounter
/*
		,
		abc: "xyz"
*/
		};
	return ({ counter: defaultCounter })
//	return wtf;
	};
/*
	console.log("mapStateToProps() props:", props);


	return
		{counter: 0}
//...reduxState, props};
	};
*/


const mapDispatchToProps = (dispatch, props) => {
	// console.log("mapDispatchToProps()", dispatch, props);

	return {
/*
		handleClick: (val) => (
			updateCounter()
			)
			,
		handleClick2: () => (
			console.log(`handleClick2()`)
			),
*/
		increment: () => dispatch({type: 'increment'}),
		decrement: () => dispatch({type: "decrement"}),
		reset: () => dispatch({type: "reset"})
		};
	};




// This is duplicated function from rootReducer.js (globalStore) for testing:
/*
function updateCounter(curVal = 0) {
	document.getElementById("counter").value =
		Number(document.getElementById("counter").value) + 1 ;
	}
*/



export default connect(
	mapStateToProps
	,
// null
	mapDispatchToProps
	)(Test);
