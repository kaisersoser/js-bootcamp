const todos = [{
    text: "Go shopping",
    status: false
}, {
    text: "Watch soccer match",
    status: false
}, {
    text: "Go to gym",
    status: true
}, {
    text: "Check my email",
    status: true
}, {
    text: "Deliver the dough",
    status: false
}]

const sortTodos = function(todos) {
    todos.sort(function (a, b) {
        if(!a.status && b.status) {
            return -1
        } else if (!b.status && a.status) {
            return 1
        } else {
            return 0
        }
    })
}

const deleteTodo = function(todos, todoTitle) {
    const index = todos.findIndex(function(todo, index) {
        return todo.text.toLowerCase() === todoTitle.toLowerCase()
    })

    if (index!=-1)
    {
        todos.splice(index, 1)
    }
} 

const findTodo = function(todos, query) {
    return todos.filter(function(todo, index) {
        const isTextMatched = todo.text.toLowerCase().includes(query.toLowerCase())
        return isTextMatched
    })
}

const findOpenCompleted = function(todos) {
    return todos.filter(function(todo, index) {
        return !todo.status
    })
}
sortTodos(todos)
//console.log(findTodo(todos, 'a'))
//console.log(findOpenCompleted(todos))
console.log(todos)