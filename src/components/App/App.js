import React, { Component } from 'react';

import {BrowserRouter, NavLink as Link, Routes, Route} from 'react-router-dom';
// import {Switch} from 'react-dom';
/*
import {BrowserRouter} from 'react-router-dom';
import {Route} from 'react-router-dom';
*/

import MemoryGame from '../MemoryGame/MemoryGame';
import CountryFlagGame from '../FlagGame/CountryFlagGame';
import TodoApp from '../TodoList/TodoApp';

import logo from '../../logo.svg';

/*
	Stopped using the Header.js and embedded a few links inside the 
	BrowserRouter inside this file.
	May decide to change it back to a discrete file again.
	Had to import the Header.css file now, since it was the only functionality
	provided by Header.js post-refactoring.

import Header from '../../Header';
*/
import '../../Header.css';
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
					to="/flag-game"
					activeclassname="active">Flag Game</Link>
		const linkHome =
				<Link
					to="/"
					activeclassname="active">Home</Link>
		const linkTodoApp = <Link to="/todo-list">Todo List</Link>
		const linkTodoAPI = <Link to={window.location.hostname + `:8123/api/todos`}>Todo List API</Link>

    return (
			/* In lieu of <Header />, create it here: */
      <div className="App">
					<BrowserRouter>
						<header><nav>
							{linkHome}
							{linkMemGame}
							{linkFlagGame}
							{linkTodoApp}
						</nav></header>
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
							<Route path='/' element={<About />} />
							<Route path='/memory-game' element={<MemoryGame	/>} />
							<Route path='/flag-game' element={<CountryFlagGame />} />
							<Route path='/todo-list' element={<TodoApp />} />
{/*
											linkTodoList={linkTodoList}

							<Route path='/todo-list' element={<TodoList />} />
							<Route path='api/todos' element={<Header />} />
*/}
							<Route exact path='/' element={<About />} />
					</Routes>
					</BrowserRouter>
				<Footer />
      </div>
    );
  }
}

export default App;

const About = () => (
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
		<ul className='about'><li>
			Utililize Redux to centralize state further, allowing one to switch
			games midway through, return to it and continue the game.
		</li><li style={{textDecorationLine: 'line-through'}}>
			Merge TodoList app into current framework
		</li><li>
			Perhaps re-factor, probably not - ought to complete the remaining
			course material instead.
		</li></ul>
  </div>
	);
