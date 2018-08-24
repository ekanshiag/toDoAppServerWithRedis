const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

const taskRoutes = require('./routes/tasks')

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist'));
});
app.use('/tasks', taskRoutes)

app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error) 
})

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    })
})

module.exports = app