'use strict'

// JavaScript Document
const filters = {
	searchText: ''
}

/**
 * Filters the list of todos and returns incompleted items
 * @param {list of todos} todos 
 */
const incompleteTodos = (todos) => {
	return todos.filter((todo) => !todo.status)
}

/**
 * Save Todos array to JSON file
 * @param {todos array} todos 
 */
const saveTodos = (todos) => {
	localStorage.setItem('todos', JSON.stringify(todos))
}

/**
 * Removes a specific todo item using its id
 */
const removeTodo = (id) => {
	const todoIndex = todos.findIndex((todo) => todo.id === id)

	if (todoIndex >= 0) {
		todos.splice(todoIndex, 1)
		saveTodos(todos)
		renderTodos(todos, filters)
	}
}

/**
 * Get saved todos from localStorage
 */
const getSavedTodos = () => {
	const todosJSON = localStorage.getItem('todos')

	try {
		return (todosJSON) ? JSON.parse(todosJSON) : []  
	}
	catch (e) {
		return []
	}
}

/**
 * Renders a list of todos to the screen, using the current filter
 * @param {list of todos} todos 
 * @param {filters to limit shown todos} filters 
 */
const renderTodos = (todos, filters) => {
	const filteredTodos = todos.filter((todo) => todo.text.toLowerCase().includes(filters.searchText.toLowerCase()))

	document.querySelector('#countTodos').innerHTML = ''
	document.querySelector('#todos').innerHTML = ''

	const todoCountLine = createTodoCountLine(todos, filteredTodos)
	document.querySelector('#countTodos').appendChild(todoCountLine)

	filteredTodos.forEach((todo) => {
		const todoLine = createTodoLine(todo)
		document.querySelector('#todos').appendChild(todoLine)
	})
}

/**
 * Returns a DOM element describing the # of selected/shown todos based on current filter
 * @param {list of todos} todos 
 * @param {filtered list of todos} filteredTodos 
 */
const createTodoCountLine = (todos, filteredTodos) => {
	const newParagraph = document.createElement('h3')
	newParagraph.classList.add('list-title')
	newParagraph.textContent = `You have ${filteredTodos.length === 0 ? "no":filteredTodos.length} to-do${filteredTodos.length === 1 ? "":"s"}.`
	return newParagraph
}

/**
 * Returns a Todo line item rendered for the DOM
 * @param {current todo item} todo 
 */
const createTodoLine = (todo) => {
	// setup todo Container
	const containerEl = document.createElement('div') 

	// Setup parent div element
	const todoEl = document.createElement('div')

	// now create checkbox element
	const todoCheckBoxEl = document.createElement('input')
	todoCheckBoxEl.className = "todoCheckbox"
	todoCheckBoxEl.setAttribute('type', 'checkbox')
	// Add event listener to check if the todo has been completed
	todoCheckBoxEl.addEventListener('change', (e) => {
		if (todoCheckBoxEl.checked) {
			if (confirm("Are you sure you want to mark as completed?")) {
				markCompleted(todoCheckBoxEl, todo)
			}
			else {
				todoCheckBoxEl.checked = false
			}
		}
	})

	// Add Check Box to Container
	containerEl.appendChild(todoCheckBoxEl)

	// Now create text element
	const todoTextEl = document.createElement('span')
	todoTextEl.className = "todoTxt"
	if (!todo.status) {
		todoTextEl.textContent = ` ${todo.text}: open item `
		todoCheckBoxEl.checked = false
	}
	else {
		todoTextEl.textContent = ` ${todo.text}: done! `
		todoCheckBoxEl.checked = true
		todoCheckBoxEl.disabled = true
	}

	// Add Text element to container
	containerEl.appendChild(todoTextEl)

	// Setup ClassList
	todoEl.classList.add('list-item')
	containerEl.classList.add('list-item__container')
	todoEl.appendChild(containerEl)

	// now create delete button
	const todoDeleteButton = document.createElement('button')
	todoDeleteButton.className = "todoDeleteButton"
	todoDeleteButton.textContent = "remove"
	todoDeleteButton.classList.add('button', 'button--text')
	todoDeleteButton.addEventListener('click', (e) => {
		removeTodo(todo.id)
	})

	// Now add the delete elements button 
	todoEl.appendChild(todoDeleteButton)

	return todoEl
}

/**
 * Marks a todo item as completed
 * @param {The check box element to track} todoCheckBoxEl 
 * @param {The todo item status to change} todo 
 */
const markCompleted = (todoCheckBoxEl, todo) => {
	todo.status = true
	todoCheckBoxEl.disabled = true
	saveTodos(todos)
	renderTodos(todos, filters)
}

/**
 * Returns and renders a list of todos based on current search filter value
 * @param {Current search filter value} myElement 
 */
const searchTodos = (myElement) => {
	filters.searchText = myElement.value
	renderTodos(todos, filters)
}