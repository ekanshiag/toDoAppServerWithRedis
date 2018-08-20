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
    const taskId = req.params.taskId
    client.hgetall(taskId, (err, obj) => {
        res.status(200).json(obj)
    })
}

function updateTaskInDb(obj, taskId){
    let keys = Object.keys(obj)
    keys.forEach(key => client.hset(taskId, key, obj[key]))
    return
}

const updateAsync = promisify(updateTaskInDb)

exports.updateTask = (req, res, next) => {
    const taskId = req.params.taskId
    let obj = req.body
    updateAsync(obj, taskId)
        .then(res.status(200).json('Task updated'))

}

exports.deleteTask = (req, res, next) => {
    const taskId = req.params.taskId
    client.hdel('tasks', 'task'+taskId)
    client.del(taskId, (err, obj) => {
        res.status(200).json('Task deleted')
    })
}