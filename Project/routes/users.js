const express = require('express')
const mongoose = require('mongoose')
const User = mongoose.model('User')
// const User = require('../models/User')
const Router = express.Router()

/**
 * req.params - 
 * req.qurey - 
 * authorization - true
 * res - user[]
 */
Router.get('/', (req, res) => {
    User.find().exec((error, data) => {
        if(error) {
            return res.status(500).send(error.message)
        }
        res.send(data)

    })
})

/**
 * req.params - id - userId
 * req.query - 
 * Authorization - true
 * res - user
 */
Router.get('/:id', (req, res) => {
    const userId = req.params.id
    User.findById(userId).exec((error, data) => {
        if(error) {
            return res.status(500).send(error.message)
        }
        res.send(data)

    })
})

/**
 * req.params - id - userId
 * req.query - 
 * req.body - emailId, password, name
 * Authorization - false
 * res - newUser
 */
Router.post('/', (req, res) => {

    const newUser = req.body
    if(!newUser){
        return res.status(400).send('enter user details')
    }
    User.create(newUser,(error, userwithId) => {
        if(error){
            console.log(error)
            return res.status(500).send(error.message)
        }
        return res.status(201).send(userwithId)
    })

})

module.exports = Router