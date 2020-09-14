const express = require('express')
const Router = express.Router()
const { Meeting } = require('../models/Meeting')
const { User } = require('../models/User')

Router.get('/', (req, res) => {

    const {date = "All", searchTerm} = req.body
    
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

Router.patch( '/:id', ( req, res ) => {
    const id = req.params.id; //meeting id
    const meeting = req.body;
    const { action, userEmailId } = req.query

    const attendees = meeting.attendees || [];

    if( !id ) {
        const err = new Error( 'Id should be provided' );
        err.status = 400;
        return res.status(400).send(err.message)
    }

    if(action === "add_attendee") {
    
        Meeting
            .findByIdAndUpdate( id, { $set: meeting, $addToSet: { attendees: userEmailId } } )
            .exec(( err, updatedMeeting ) => {
                if( err ) {
                    err.status = 500
                    return res.status(500).send(err.message)
                    // return next( err );
                }

                res.status( 200 ).json( updatedMeeting );
            });
    }

    else if(action === "excuse_yourself") {

        const userid = req.query.id
        User.findById(userid,{ emailId : 1, _id : 0}, (error, emailId) => {

            if(error) {
                return res.status(500).send(err.message)
            }

            console.log(emailId)

            Meeting.findByIdAndUpdate(id,{
                $pull: {attendees: emailId.emailId}
            }, (error, result) => {
                if(error) {
                    return res.status(500).send(error.message)
                }
                return res.send(result)
            })   
        })        
    }
    else {
        res.send('No criteria given!')
    }
});
module.exports = Router