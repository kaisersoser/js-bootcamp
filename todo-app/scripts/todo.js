'use strict'

// JavaScript Document
let todos = getSavedTodos()

renderTodos(todos, filters)

/**
 * Submit a new todo item
 */
document.querySelector('#addTodoForm').addEventListener('submit', (e) => {
	e.preventDefault()

	let _todoField = e.target.elements.todoField.value
	_todoField = _todoField.trim()

	if (_todoField.length > 0) {
		todos.push({
			id: uuidv4(),
			text: _todoField,
			status: false
		})

		// Save Todos
		saveTodos(todos)
		renderTodos(todos, filters)
	} else {
		alert('You must enter a TODO item')
	}


	filters.searchText = ''
	e.target.elements.todoField.value = ''
})

/**
 * Add event listener to see if we need to hid finished todo items
 */
document.querySelector('#hideFinishedTodos').addEventListener('change', (e) => {
	if (e.target.checked) {
		renderTodos(incompleteTodos(todos), filters)
	}
	else {
		renderTodos(todos, filters)
	}

})
