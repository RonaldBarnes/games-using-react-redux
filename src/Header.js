import React from 'react';
// import PropTypes from 'prop-types';
import {BrowserRouter, Link, Outlet, Routes, Route} from 'react-router-dom';

import './Header.css';



// class Header extends Component {
// Converted to functional component:
function Header(props) {
	console.log(`props.linkMemGame:`, props.linkMemGame);

	return (
<React.Fragment>
		<header className="header">
			{ /* <h1><a href='/'>{props.appName}</a></h1> */}
			<nav>
<ul><li>
				{props.linkHome}
</li><li>
				{props.linkMemGame}
</li><li>
				{props.linkFlagGame}
</li><li>
				{props.linkTodoList}
</li><li>
				{props.linkTodoAPI}
</li><li>
				<a href='mailto:ron@ronaldbarnes.ca?subject=ReactJS'>Contact Us</a>
</li></ul>
{/*
			<ul>
				<li><a href='http://10.60.42.5:3003'>Todo App ReactJS</a></li>
				<li><a href='/memory-game'>Memory Game</a></li>
				<li><a href='/flag-game'>Flag Game</a></li>
				<li><a href='http://10.60.42.5:8123'>Todo App Node.js</a></li>
				<li><a href='mailto:ron@ronaldbarnes.ca?subject=ReactJS'>Contact Us</a></li>
			</ul>
*/}
			</nav>
			<Outlet />
		</header>
</React.Fragment>
		); // end return
	} // end Header

export default Header;

