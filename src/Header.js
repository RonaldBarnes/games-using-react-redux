import React from 'react';
// import PropTypes from 'prop-types';
// import {BrowserRouter, Link, Outlet, Routes, Route} from 'react-router-dom';

import './Header.css';



// class Header extends Component {
// Converted to functional component:
function Header(props) {
	// console.log(`props.linkMemGame:`, props.linkMemGame);
	return (
		<header>
			<nav>
				{props.linkHome}
				{props.linkMemGame}
				{props.linkFlagGame}
				{/* props.linkTodoApp */}
				<a href='mailto:ron@ronaldbarnes.ca?subject=ReactJS'>Contact Us</a>
				{/* props.linkContactUs */}
			</nav>
		</header>
		);	// end return
	}	// end Header


function oldHeader(props) {
	return (
		<React.Fragment>
			/* stuff was here but fragments allow invalid nesting, handy to know */
		</React.Fragment>
		);	// end return
	}	// end oldHeader

export default Header;
