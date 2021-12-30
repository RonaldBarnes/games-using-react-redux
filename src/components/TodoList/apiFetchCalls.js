

/*
	This file is imported into TodoApp and provides all the fetch() and .then
	for api interactions
*/


// --------------------------------------------------------------------------
const API_URL = 'http://10.60.42.5:8123/api/todos';








// --------------------------------------------------------------------------
// Get / fetch list of all todo items from api:
// --------------------------------------------------------------------------
export function fetchTodoItemsAll() {
	return fetch(
					`${API_URL}`
//					,
//					requestOptions
					) // end fetch

			.then( resp => {
				console.log( `fetchList() first .then after fetch()`);
				if ( ! resp.ok ) {
					console.log( `ERROR IN FETCH: response NOT OK: `
						+ `${resp.status} ${resp.statusText}`);
					throw Error( `ERROR IN FETCH: response NOT OK: `
						+ `${resp.status} ${resp.statusText}`);
					}
				return resp;
				}) // end .then
			.then( resp => resp.json() )
			.then( data => Promise.all(data) )
//			.then( data => this.setState( {todoList: data, isLoaded: true} ))
			.catch( err => {
				console.log( `ERROR: ${err}`);
				return [{name: err, id: 0}, {name: 'PROXY?', id: 1}];
				}) // end catch
		} // end fetchList






// --------------------------------------------------------------------------
// Add new item to DB
// --------------------------------------------------------------------------
export function addItem ( todoItemName ) {
	return fetch( `${API_URL}`,
		{
		method: "POST",
		headers: { 'Content-type': 'application/json; charset=UTF-8'},
		body: JSON.stringify( {name: todoItemName} )
		})
		.then( resp => {
			if (!resp.ok) {
				if ( resp.status >= 400 && resp.status < 500) {
					throw Error( `ERROR fetching data: ${resp.status} ${resp.statusText}`);
					} // end if >= 400 && < 500
				} // end if !resp.ok
			return resp;
			}) // end .then
		.then( resp => resp.json() )
	}








	// --------------------------------------------------------------------------
export function	deleteItem( id ) {

		const delURL = `${API_URL}/${id}`;

		console.log(`deleteItem(id) id: ${id}`);

		return fetch( `${delURL}`,
			{
			method: "DELETE"
			})
			.then( resp => {
				if (!resp.ok) {
					if ( resp.status >= 400 && resp.status < 500) {
						throw Error( `ERROR fetching data: ${resp.status} ${resp.statusText}`);
						} // end if >= 400 && < 500
					} // end if !resp.ok
				return resp;
				}) // end .then
			.then( resp => resp.json() )
/*
			.then( () => {
				const updatedTodoList = this.state.todoList.filter( (item) => (
					item._id === id ? false : true
					) ); // end filter
				this.setState( {
					todoList: [...updatedTodoList],
					inputValue: ''
					}); // end setState
				return;
				}) // end .then
*/
			.catch( err => {
				console.log(`ERROR FETCHING DATA: ${err.message}`, err)
				return err; // "?"
				}) // end catch
		} // end deleteItem







// --------------------------------------------------------------------------
// Toggle completed state of item
// --------------------------------------------------------------------------
export function	toggleCompleted( todoItem ) {
	// const updatedItem = fetch( `${API_URL}/todos/${todoItem._id}`,

	return fetch( `${API_URL}/${todoItem._id}`,
		{
		method: 'PUT',
		headers: { 'Content-type': 'application/json; charset=UTF-8'},
		body: JSON.stringify({
			id: todoItem._id,
			completed: !todoItem.completed,
			// There's a snippet of code in the todos-api that has
			// new: true, I forget where, but for now, see what this does:
			// new: false
			})
		}
	)
	.then( resp => {
		if (!resp.ok) {
			if (resp.status >= 400 && resp.status < 500) {
				throw Error( `ERROR UPDATING data: ${resp.status} ${resp.statusText}`);
				} // end if status >= 400 && < 500
			} // end if !resp.ok
		return resp;
		}) // end .then
	.then( resp => resp.json() )
/*
	.then( data => {
		// Remove existing todo item, add the returned "completed" one:
		// NO! map over todoList, where current record's id matches, choose
		// fetch-PUT return value since todos-api returns updated data:
		const newList = this.state.todoList.map( (item) => (
			(item._id === _id) ? data : item
			) ); // end .filter
		this.setState( { todoList: [...newList] });
		return data;
		}) // end .then
*/
	.catch( err => {
		console.log( `ERROR PUTting (updating) data: `, err)
		return err;
		}) // end catch
	} // end function handleToggleCompleted


