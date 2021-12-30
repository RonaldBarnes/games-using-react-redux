
// import React, {Component} from 'react';



// --------------------------------------------------------------------------
// This probably should be a functional component: no state in my version
// class TodoForm extends Component {
function TodoForm(props) {


	// --------------------------------------------------------------------------
//	render() {
		return (
			<div>
				<form
					onSubmit={props.handleFormSubmit}
					>
					<input
						type="text"
						placeholder="Enter new Todo item"
						onChange={props.handleInputChange}
						id='inputTextField'
						/>
					<button onClick={props.handleFormSubmit}>
						Add Todo
					</button>
				</form>
			</div>
			); // end return
//		} // end render
	} // end TodoForm


export default TodoForm;
