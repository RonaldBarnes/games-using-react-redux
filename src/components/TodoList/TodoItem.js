
import React from 'react';



// const TodoItem = (props) => (
// const TodoItem = ({_id, name, completed, onClick, onDelete, className}) => (
const TodoItem = (props) => {
	const {_id, name, onClick, onDelete, className} = props;
	/*
	constructor(props) {
		super(props);
		}
	*/

	return <li
		// Display mouse-over:
		title={name}
		// tabindex doesn't work on <li>
		// tabindex={props.tabIdx}
		>
		<span
			// Some of these attributes are placed on TodoItem in TodoApp:
			// BUT, they do NOT work there.
			// NOTE: key= is required to be set in TodoItem inside TodoApp!
			// NOTE: className= ONLY works on BOTH <li> and <TodoItem />
			// NOTE: title= ONLY works on <li>
			className={className}
			id={_id}
			// onClick is bound to TodoApp.handleToggleCompleted()
			onClick={onClick}
			>
			{name}</span>

			<span
				// Embed span to contain an "X" for deleting items:
				style={{float: 'right'}}
				onClick={onDelete}
				title={'Delete ' + name}
				>( X )</span>
		</li>
//		); // end return
//	} // end TodoItem
	} // end TodoItem

export default TodoItem;
