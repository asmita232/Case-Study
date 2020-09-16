const express = require('express')
const Router = express.Router()
const { Meeting } = require('../models/Meeting')
const { User } = require('../models/User')
const { getDate, getCurrentDate } = require('../utility')
const { authenticate } = require('../utils/auth')


/**
 * req.params - 
 * req.query - userId, search, date = { ALL, PRESENT, PAST, UPCOMING}
 * req.body - 
 * res - meeting[]
 * Authorization - true
 * sample request - localhost:4000/meetings?id=5f5fb2d9af14f973c4d6bd12&date=PRESENT
 */

Router.get('/', authenticate)
Router.get('/', async (req, res) => {

    let {date = "PAST", id, search} = req.query 
    let eId = null
        User.findById(id,{emailId: 1, _id: 0}, (error, data) => {
            if(error) {
                console.log(error)
                return res.send(error)
            }
            console.log(data)
            const currentDate = getCurrentDate()
            console.log(currentDate)

            let searchCriteria = {
                $or: [
                    {name: new RegExp( search, "i" )},
                    {description: new RegExp( search, "i" )},
                    {shortName: new RegExp( search, "i" )},
                ],
                attendees: data.emailId
            }

            // console.log('searchCriteria', searchCriteria)

            switch(date) {

                case 'PRESENT':
                    searchCriteria.date = currentDate
                    break
        
                case 'PAST': 
                    searchCriteria.date = {
                        $lt: currentDate
                    }
                    break
        
                case 'UPCOMING': 
                    searchCriteria.date = {
                        $gt: currentDate
                    }
                    break
        
                default:
                    break
            }

            Meeting.find(searchCriteria,(error, result) => {
                if(error) {
                    console.log(error)
                    return res.send(error)
                }
                return res.send(result)
        })
    

        })
       
})

/**
 * req.params - 
 * req.query - :id - userId
 * req.body - name*, date*, startTime*, endTime*, description, shortName
 * res - meeting[]
 * Authorization - true
 */

Router.post('/', authenticate)
Router.post('/', async (req, res) => {

    // if(req.body)

    const userId = req.query.id
    const { emailId } = await User.findById(userId,{emailId: 1, _id: 0}).exec()

    console.log(emailId)
    const newMeeting = req.body
    newMeeting.attendees.push(emailId)
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

Router.patch('/:id', authenticate)
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

Router.delete('/:id', async (req, res) => {
    const meetingId = req.params.id
    const userId = req.query.id
    const attendees = await Meeting.findById(meetingId, {attendees: 1, _id: 0}).exec()
    if (attendees.length === 0) {

        Meeting.findByIdAndRemove(meetingId, (error, result) => {
            if(error) {
                return res.status(500).send(error.message)
            }
            return res.send(result)
        })
    }
    else {
        return res.send()
    }
})
module.exports = Router