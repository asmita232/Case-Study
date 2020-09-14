const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    
    name: {
        type: String,
        trim: true,
        required: true,
    },
    emailId: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        unique: true,
        $regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    },
    password: {
        type: String,
        trim: true,
        required: true,
        validate: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/
    }

    /**
     *  _id
    - name
    - email
    - password
     */
})

const User = mongoose.model('User', UserSchema)
module.exports = {
    User,
    UserSchema
}