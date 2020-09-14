const express = require('express')
const { mongo } = require('mongoose')
const {Meeting} = require('../models/Meeting')
const {User} = require('../models/User')

const Router = express.Router()

function getCurrentDate() {
    month = (new Date()).getMonth() + 1
    year = (new Date()).getFullYear()
    date = (new Date()).getDate()

    month = (month.toString()).length < 2? `0${month}`: `${month}`

    date = (date.toString()).length < 2? `0${date}`: `${date}`

    year = year.toString()

    let currDate = year + "-" + month + "-" + date
    console.log(currDate)
    return currDate
    
}
Router.get('/', async (req, res) => {

    let {date, id} = req.query

    const currentDate = getCurrentDate()    
    // (new Date()).toISOString().split('T')[0]
    
    date = date?date: currentDate
    console.log('date after check = ', date)

    

        const { emailId } = await User.findById(id, {emailId: 1, _id: 0})

        console.log(emailId)
        Meeting.find({
            date: date,
            attendees: emailId
        },(error, result) => {
            if(error) {
                // console.log(error)
                return res.send(error)
            }
            // console.log(result)
            res.send(result)
        })
   
})

module.exports = Router
