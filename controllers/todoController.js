const Todo = require('../models/todo')

let todoController = {
  getTodos: (req, res) => {
    Todo.find((err, todos) => {
      if (err) return console.error(err)
      if (req.params.id) {
        Todo.findById(req.params.id, (err, todo) => {
          if (err) console.error(err)
          return res.render('todos', {todos: todos, todo: todo, isAuthenticated: req.isAuthenticated()})
        })
      } else {
        return res.render('todos', {todos: todos, todo: false, isAuthenticated: req.isAuthenticated()})
      }
    })
  },
  postTodo: (req, res) => {
    const todo = Todo({
      name: req.body.name
    })

    todo.save((err) => {
      if (err) return console.error(err)
      return res.redirect('/todos')
    })
  },
  putTodo: (req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
      if (err) return console.error(err)
      todo.name = req.body.name
      
      if (req.body.done === 'on') { 
        todo.done = true 
      } else { 
        todo.done = false 
      }

      todo.save((err) => {
        if (err) return console.error(err)
        return res.redirect(`/todos/${req.params.id}`)
      })
    })
  },
  deleteTodo: (req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
      if (err) return console.error(err)
      todo.remove((err) => {
        if (err) return console.error(err)
        return res.redirect(`/todos`)
      })
    })
  },
  patchTodoCheck: (req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
      if (err) return console.error(err)
      todo.done = req.query.done
      todo.save((err) => {
        if (err) return console.error(err)
        return res.send()
      })
    })
  }

}
module.exports = todoController
