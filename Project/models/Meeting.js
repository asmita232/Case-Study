const mongoose = require('mongoose')
const { Schema }  = mongoose
const {UserSchema} = require('./User')
const User = mongoose.model('User')
const MeetingSchema = new mongoose.Schema({

    name: {
        type:String,
        trim: true,
        maxlength: 10,
        minlength: 3,
        required: [true, "meeting name required"]
    },


    description: String,

    date: {
        type: String,
        required: [true, "date must be given"]
    },
    
    startTime: {
        hours: {
            type: Number,
            min: 0,
            max: 23,
            required: [true, "start time must be given"]
        },
        minutes: {
            type: Number,
            min: 0,
            max: 59,
            required: [true, "start time must be given"]
        },
        
    },

    endTime: {
        hours: {
            type: Number,
            min: 0,
            max: 23,
            required: [true, "end time must be given"]
        },
        minutes: {
            type: Number,
            min: 0,
            max: 59,
            required: [true, "end time must be given"]

        },
    },

    attendees: [ String ]

    // attendees: {

    //     // type: [ {type: Schema.Types.ObjectID, ref: 'User'}] ,
    //     // index: true,
    //     type: [User.emailId],
    //     index: true,

    //     validate: () => {
    //         return this.attendees.length > 0
    //     }

    // }
    // _id
    // - name
    // - description
    // - date
    // - startTime
    // - endTime
    // - attendees: [ emails_of_attendees ] - Option 1

})

const Meeting = mongoose.model('Meeting', MeetingSchema)
module.exports = {
    Meeting,
    MeetingSchema
}