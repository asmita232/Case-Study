const express = require('express')
const Router = express.Router()
const { Meeting } = require('../models/Meeting')

Router.get('/', (req, res) => {
    try {
        const data = Meeting.find()
        .exec((error, result) => {
            if(error) {
                console.log(error)
                return res.send(error)
            }
            res.send(result)
        })
    }catch(error) {
        console.log(error)
    }
})


Router.post('/', (req, res) => {

    // if(req.body)

    const newMeeting = req.body
    if(!newMeeting) {
        return res.send('Please enter meeting details')
    }
    Meeting
    .create( newMeeting, ( err, meetingWithId ) => {
        if( err ) {
            err.status = 500;
            return res.status(500).send(err.message)
        }

        res.status( 200 ).json( meetingWithId );
    });
})


module.exports = Router