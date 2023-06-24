const {Router} = require('express')
const { getToDo, createToDo, updateTodo, deleteTodo } = require('../controllers/TodoController')

const router = Router()

router.get('/', getToDo)
router.post('/create', createToDo)
router.post('/update', updateTodo)
router.post('/delete', deleteTodo)

module.exports = router