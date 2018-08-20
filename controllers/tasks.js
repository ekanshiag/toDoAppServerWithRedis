const redis = require('redis')
const client = redis.createClient()

client.on('error', (err) => {
    console.log(err)
})

const {promisify} = require('util')
const hgetallAsync = promisify(client.hgetall).bind(client)

exports.getAllTasks = (req, res, next) => {
    client.hvals('tasks', (err, obj) => {
        let arr = []
        for(let t of obj){
            arr.push(hgetallAsync(t))
        }
        Promise.all(arr)
            .then(result => {
                res.status(200).json(result)
            })
    })
}

exports.postTask = (req, res, next) => {
    const {id, category, desc, notes, dueDate, priority} = req.body

    client.hmset(id, 'id', id, 'category', category, 'desc', desc, 'notes', notes, 'dueDate', dueDate, 'priority', priority)
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