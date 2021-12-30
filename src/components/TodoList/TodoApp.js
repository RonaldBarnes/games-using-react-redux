
import React, {Component} from 'react';

// Deprecated:
// import TodoList from './TodoList';
// import Header from './Header';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

import * as apiFetchCalls from './apiFetchCalls.js';
// import Footer from './Footer';

import './TodoApp.css';



// --------------------------------------------------------------------------
// See ./apiFetchCalls.js
//
// const API_URL = 'http://10.60.42.5:8123/api/todos';



/*
// --------------------------------------------------------------------------
ALL THE FOLLOWING CAN BE SCRAPPED, BECAUSE THE CHANGE MUST OCCUR ON SERVER
IN FILE /index.js
THIS IS THE MAIN CHANGE MAKES IT WORK:
    res.header('Access-Control-Allow-Origin', 'http://10.60.42.5:3003');
AND, FOR "PUT" METHOD:
		res.header('Access-Control-Allow-Methods', '*');
ALSO:
	res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,FETCH,HEAD');
	res.header("Access-Control-Allow-Headers", "Content-Type,
		Access-Control-Allow-Headers, Authorization, X-Requested-With");
// --------------------------------------------------------------------------
*/





// --------------------------------------------------------------------------
class TodoApp extends Component {

	constructor(props) {
		super(props);
		this.state = {
				todoList: [],
				inputValue: '',
				isLoaded: false
				};

		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		}





	// --------------------------------------------------------------------------
	// Only runs once loaded, i.e. fetch data only at page (re-)load:
	// --------------------------------------------------------------------------
	componentDidMount() {
		console.log(`componentDidMount() - calling fetchList() for todo list:`);

		document.title = 'TodoApp'; //  ReactJS';

		this.fetchList();
		}




	// --------------------------------------------------------------------------
	// Get / fetch list of all todo items from api:
	// --------------------------------------------------------------------------
	async fetchList() {
		const allItems = await apiFetchCalls.fetchTodoItemsAll();

		this.setState( {todoList: allItems, isLoaded: true});

		return this.state.todoList;
		} // end fetchList







	// --------------------------------------------------------------------------
	// Colt put state handling in TodoForm, not TodoApp: Why?
	// Store every keystroke entered into Add Todo input field into state as
	// they occur:
	handleInputChange(e) {
		e.preventDefault();
		e.stopPropagation();

		console.log( `handleInputChange(e): e.target.value: ${e.target.value}`);
		this.setState({
			inputValue: e.target.value
			}); // end setState
		} // end handleInputChange




	// --------------------------------------------------------------------------
	// Colt does NOT use (e) on his submit
	// ALSO: he put state handling in TodoForm, not TodoApp: Why?
	// --------------------------------------------------------------------------
	handleFormSubmit(e) {
		e.preventDefault();

		console.log(`handleFormSubmit() this.state.inputValue:`
			+ ` ${this.state.inputValue}`);

		// Skip zero-length, empty strings:
		if (this.state.inputValue.length > 0) {
			// Add the item to the DB:
			this.addTodo( this.state.inputValue);
			document.getElementById('inputTextField').value = '';
			document.getElementById('inputTextField').focus();
			} // end if length > 0
		} // end handleFormSubmit





	// --------------------------------------------------------------------------
	async deleteTodo( id, e ) {
		console.log(`deleteTodo(id) id: ${id}`);

		e.preventDefault();

		const retVal = await apiFetchCalls.deleteItem( id );
		console.log(`deleteTodo(${id}): retVal: ${retVal}`);

		if ( retVal.message !== 'Deleted' ) {
			throw new Error( `Failed to delete item ${id}`, retVal);
			}

		const newList = this.state.todoList.filter( item => (
			item._id === id ? false : true
			)); // end filter

		this.setState( {todoList: newList} );

		// Clicking on delete 'X' doesn't put focus back to input field, fix it:
		document.getElementById('inputTextField').focus();
		} // end deleteTodo




	// --------------------------------------------------------------------------
	async handleToggleCompleted( todoItem ) {
	// --------------------------------------------------------------------------

		// console.log(`handleToggleCompleted() todoItem:`, todoItem);

		const updatedItem = await apiFetchCalls.toggleCompleted( todoItem);

		// Map over todoList, updating exiting entry with returned data:
		const newList = this.state.todoList.map( item => (
			item._id === todoItem._id ? updatedItem : item
			)) // end map
		this.setState( {todoList: newList} );

		// Clicking on item doesn't put focus back to input field, fix it:
		document.getElementById('inputTextField').focus();
		}



	// --------------------------------------------------------------------------
	// Add new item to DB (val comes from TodoForm):
	// --------------------------------------------------------------------------
	async addTodo(val) {
		console.log(`addTodo(val) val: ${val}`);

		const newItem = await apiFetchCalls.addItem( val );

		this.setState( {todoList: [...this.state.todoList, newItem]} );
		} // end addTodo








	// --------------------------------------------------------------------------
	render() {
		let myList;
		myList = this.state.todoList;
		let addClasses = '';
		let todoItems = '...WAIT...';

		// Display message while waiting for data to load:
		if (!this.state.isLoaded) {
			return (
				<div className='App'>
					<h1>Todo App</h1>
					<p>Please wait...</p>
					<p>Fetching list of todo items</p>
				</div>
				); // end return
			} // end if not isLoaded

		// Make page navigable via keyboard: input text and button go first
		let tabIndex = 1;

		todoItems = myList.map( item => {
			tabIndex++;

			// Add class containing text-decoration: line-through if completed:
			addClasses = item.completed ? 'completed' : '';

			// Complains about values of true for completed being written to DOM:
			// Warning: Received `true` for a non-boolean attribute `completed`.
			// If you want to write it to the DOM, pass a string instead:
			// completed="true" or completed={value.toString()}.
			//
			// Fixed by binding param's (I think - it was a long slog debugging)


			const todoItem = <TodoItem
				key={item._id}
				// Some of these attributes are placed on <li> in TodoItem:
				// i.e. title= ONLY works on <li>
				//
				// NOTE: className= ONLY works on BOTH <li> and <TodoItem />
				// DUH, because having it HERE passes it as a "props" to <li>,
				// without it here, <li> has no className defined!
				className={addClasses}
				title={item.name}
				// <li><span> gets the id:
				// id={item._id}

				onClick={this.handleToggleCompleted.bind(this, item)}
/*
				onClick={this.handleToggleCompleted.bind(this,
					item._id,
//					item.name,
					item.completed,
//					completedState,
//					item.created_date
					)}
*/
				onDelete={this.deleteTodo.bind(this,item._id)}
				{...item}
				tabIdx={tabIndex}
				/>

				return todoItem;
			}); // end myList.map




		return (
			<div className='todo-container'>
				<h1>Todo App</h1>
				<TodoForm
					inputValueText={this.state.inputValue}
					addTodo={this.addTodo}
					handleFormSubmit={this.handleFormSubmit}
					handleInputChange={this.handleInputChange}
					/>
				<ul>
					{todoItems}
				</ul>
			</div>
			);
		} // end render
	} // end class TodoApp

export default TodoApp;
