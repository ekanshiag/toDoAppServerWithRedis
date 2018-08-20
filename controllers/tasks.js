const redis = require('redis')
const client = redis.createClient()

client.on('error', (err) => {
    console.log(err)
})

exports.getAllTasks = (req, res, next) => {
    res.status(200).json('Get all tasks')
}

exports.postTask = (req, res, next) => {
    res.status(200).json('Post a task')
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