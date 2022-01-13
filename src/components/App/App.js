import React, { Component } from 'react';

import {BrowserRouter, NavLink as Link, Routes, Route} from 'react-router-dom';
/*
import {BrowserRouter} from 'react-router-dom';
import {Route} from 'react-router-dom';
// Switch is deprecated in v6?
// import {Switch} from 'react-dom';
*/

import globalStore from '../../rootReducer';
// import { flagStore } from '../../rootReducer';
import { Provider } from 'react-redux';


import MemoryGame from '../MemoryGame/MemoryGame';
import CountryFlagGame from '../FlagGame/CountryFlagGame';
import TodoApp from '../TodoList/TodoApp';

import logo from '../../logo.svg';

import FlagGame_init from '../FlagGame/FlagGame_init';

/*
	Stopped using the Header.js and embedded a few links inside the
	BrowserRouter inside this file.
	May decide to change it back to a discrete file again.
	Had to import the Header.css file now, since it was the only functionality
	provided by Header.js post-refactoring.
*/
import Header from '../../Header';
// import '../../Header.css';
import Footer from '../../Footer';

import './App.css';


class App extends Component {
  render() {

	// console.log(`window.location.hostname: ${window.location.hostname}`);

		const linkMemGame =
			<Link
				to="/memory-game"
				activeclassname="active">Memory Game</Link>
		const linkFlagGame =
				<Link
					to="/flag-game" xxx='xxx'
					activeclassname="active">Flag Game</Link>
		const linkFlagGameHardestFlag =
				<Link
					to="/flag-game/0/230/237/168"
					activeclassname="active">Hardest Flag</Link>
		const linkFlagGameBestGeometric =
				<Link
					to="/flag-game/230/237/168/3"
					activeclassname="active">Best Geometric Flag</Link>
		const linkFlagGameEasiest1 =
				<Link
					to="/flag-game/143/119/139/234"
					activeclassname="active">Easiest Flag #1</Link>
		const linkFlagGameEasiest2 =
				<Link
					to="/flag-game/160/119/139/234"
					activeclassname="active">Easiest Flag #2</Link>
		const linkHome =
				<Link aaa="bbb"
					to="/"
					activeclassname="active">Home</Link>
		const linkTodoApp =
			<Link
				to="/todo-list"
				activeclassname="active">Todo List</Link>
		const linkTodoAPI =
			<Link
				to={window.location.hostname + `:8123/api/todos`}
				activeclassname="active">Todo API</Link>
		const linkContactUs =
			<Link to='mailto:ron@ronaldbarnes.ca?subject=ReactJS'>Contact</Link>

    return (
      <div className="App">
					<BrowserRouter>

						<Header
							linkHome={linkHome}
							linkMemGame={linkMemGame}
							linkFlagGame={linkFlagGame}
							linkTodoApp={linkTodoApp}
							linkContactUs={linkContactUs}
							/>

						{/* In lieu of <Header />, create it here: */}
{/*
						<header><nav>
							{linkHome}
							{linkMemGame}
							{linkFlagGame}
							{linkTodoApp}
						</nav></header>
*/}
					<Routes>
{/* Sub aka nested routes:
						<Route path='/' element={<Header
											linkHome={linkHome}
											linkMemGame={linkMemGame}
											linkFlagGame={linkFlagGame}
											linkTodoList={linkTodoApp}
											linkTodoAPI={linkTodoAPI}
											/>}>
						</Route>
*/}
							<Route
								path='/memory-game'
								element={<MemoryGame store={globalStore} />} />
							<Route
								path="/flag-game/:cntry1"
								element={<FlagGame_init store={globalStore} />} >
								<Route
									path=":cntry2"
									element={<FlagGame_init />} >
									<Route
										path=":cntry3"
										element={<FlagGame_init />} >
										<Route
											path=":cntry4"
											element={<FlagGame_init />} >
										</Route>
									</Route>
								</Route>
							</Route>
							<Route
								path="/flag-game"
								element={<CountryFlagGame store={globalStore} />} >
								<Route
									path="*"
									element={<CountryFlagGame store={globalStore} />} >
								</Route>
								<Route
									path=":flag"
									element={<CountryFlagGame store={globalStore} />} >
									<Route
										path=":cntry1"
										element={<CountryFlagGame store={globalStore} />} >
									</Route>
								</Route>
							</Route>
							<Route path='/todo-list' element={<TodoApp />} />
{/*
							<Route path='api/todos' element={<Header />} />
*/}
							<Route
								path='*'
								element={<About
									linkFlagGameHardestFlag = {linkFlagGameHardestFlag}
									linkFlagGameBestGeometric = {linkFlagGameBestGeometric}
									linkFlagGameEasiest1 = {linkFlagGameEasiest1}
									linkFlagGameEasiest2 = {linkFlagGameEasiest2}
									/>}
								/>
					</Routes>
					</BrowserRouter>
				<Footer />
      </div>
    ); // end return
  }
}

export default App;







const About = (props) => {

		console.log(`App.js About props:`, props);

// render() {
	return (
  <div className="about">
		<h1>ReactJS Projects</h1>
    {/* <h2>Welcome to React</h2> */}
		<img
			src={logo} className="App-logo"
			alt="ReactJS logo" />
		<h2>
			A collection of ReactJS apps developed during Udemy.com WebDev Boot Camp.
		</h2>
		<p>
			Bare functionality was the assignment, but I went a few steps further,
			implementing CSS candy, <strong>responsive design</strong>,
			Headers & Footers as file system hard links (shared resources between
			all apps), centralized state, and much more.
		</p>
		<p>
			The final step was merging everything into one app with {' '}
			<span className='code'>Routes</span> & {' '}
			<span className='code'>Link</span>s (v6),
			since the Routes lessons were brief and missing an assigned exercise.
			Also implemented <span className='code'>NavLink</span>{' '}
			in header, highlighting the "Home" at top of this page...
			<br />
		</p>
		<p>
			Remaining tasks:
		</p>
		<ul className='about'>
			<li className="completed">
				Utililize Redux to centralize state further, allowing one to switch
				games midway through, return to it and continue the game.
			</li>
			<li className="completed">
				Merge TodoList app into current framework
			</li>
			<li className="completed">
				Perhaps re-factor, probably not - ought to complete the remaining
				course material instead.
			</li>
			<li className="completed">
				Add params to Routes so games can be linked to in specific states.
				Can foresee using it to play "Guess whose country <strong>this</strong>
				{' '} flag represents??
			</li>
			<li>
				Done! Now FlagGame is refactored for redux, nested routes (v6 style),
				added a functional component because useParams() doesn't work in a
				regular React component (nice hack!), and the ability to share a game
				via URL where the components indicate the country choices!
			</li>
			<li className="completed">
				Next, change routing from "test" to flag-game to enable routing in
				game accessible via NavLink (header link).
			</li>
			<li className="completed">
				Next (maybe) is to add check ensuring 4 URL parameters are provided,
				else randomly select enough to make complete choices panel.
				Although, it's kind of cool to pass one URL parameter and see one
				choice.  "Hey, look at this flag!"
			</li>
				<ul>
					<li>
						Hardest flag to hand draw: {props.linkFlagGameHardestFlag}
					</li>
					<li>
						Best geometric flag: {props.linkFlagGameBestGeometric}
					</li>
					<li>
						Easiest (#1) to guess: {props.linkFlagGameEasiest1}
					</li>
					<li>
						Easiest (#2) to guess: {props.linkFlagGameEasiest2}
					</li>
				</ul>
			<li>
				Console is showing error in FlagGame's mapDispatchToProps():
				"Actions must be plain objects."
				This does not happen in Firefox (test this again)
			</li>
		</ul>
  </div>
	); // end return
}

