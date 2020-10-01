const express = require('express')
const Router = express.Router()

Router.get('/', (req, res) => {
    res.send('Home Router')
})


Router.post('/', (req, res) => {
    res.send('Invalid Post Request')
})

Router.put('/', (req, res) => {
    res.send('Invalid Put request')
})

Router.patch('/', (req, res) => {
    res.send('Invalid Patch request')
})

module.exports = Router
