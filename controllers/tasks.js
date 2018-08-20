const redis = require('redis')
const client = redis.createClient()

client.on('error', (err) => {
    console.log(err)
})

exports.getAllTasks = (req, res, next) => {
    res.status(200).json('Get all tasks')
}

exports.postTask = (req, res, next) => {
    const id = req.body.id
    const taskCategory = req.body.category
    const taskDesc = req.body.desc
    const taskNotes = req.body.notes
    const taskDueDate = req.body.dueDate
    const taskPriority = req.body.priority

    client.hmset(id, 'id', id, 'category', taskCategory, 'desc', taskDesc, 'notes', taskNotes, 'dueDate', taskDueDate, 'priority', taskPriority)
    client.hgetall(id, (err , obj) => {
        console.log(obj)
    })

    client.hset('tasks', 'task'+ id, id)
    client.hgetall('tasks', (err , obj) => {
        console.log(obj)
        res.status(200).json(obj)
    })
}

exports.getOneTask = (req, res, next) => {
    res.status(200).json('Get a task ' + req.params.taskId)
}

exports.updateTask = (req, res, next) => {
    res.status(200).json('Update a task ' + req.params.taskId)
}

exports.deleteTask = (req, res, next) => {
    res.status(200).json('Delete a task ' + req.params.taskId)
}