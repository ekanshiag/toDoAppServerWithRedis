const express = require('express')
const router = express.Router()

const taskController = require('../controllers/tasks')

router.get('/', taskController.getAllTasks)

router.post('/', taskController.postTask)

router.get('/:taskId', taskController.getOneTask)

router.post('/patch/:taskId', taskController.updateTask)

router.post('/delete/:taskId', taskController.deleteTask)

module.exports = router