/**
 * This file is executed while signning or login action performed
 */
const express = require('express')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const jwt = require('jsonwebtoken')

const Router = express.Router()

Router.post('/', (req, res) => {

    const credentials = req.body

    User
    .findOne(credentials)
    .exec((error, result) => {
        if(error) {
            error.status = 403
            return res.status(403).send(error.message)
        }

        // res.send(result)
        console.log('result of findOne',result)
        const claims = { 
            emailId: result.emailId ,
            userId: result._id
        }

        console.log('claim', claims)
   
        jwt.sign(claims, 'shh...', {expiresIn: '24h'}, function(error, token) {
            if(error) {
                console.log("error", error)
                return res.status(401).json({ message: error.message })
            } 
            console.log('token', token)
            res.status(200).json({
                message: 'Signed in sucessfully',
                token: token.toString(),
                emailId: result.email
            })
        });

    })
})

module.exports = Router


 // if(!req.body.emailId && !req.body.password) {
    //     const err = new Error('emailId/PASSWORD/BOTH missing in /login POST request ');
    //     err.status = 403
    //     return next( err )
    // }
    //     let emailId = req.body.emailId
    //     let password = req.body.password
    //     const user = getUser(emailId, password) //define somewhereelse
    //     if(!user) {  return res.status(403).json({message: 'Login failed! User credentials not matched.'})  }
    //     const claims = {   emailId: emailId   }


// router.get( '/secret_endpoint', function( req, res ) {
//     const token = req.header( 'Authorization' );
//     console.log( token );
//     if( !token ) {
//         return res.status( 403 ).json({
//             message: 'Toke is not sent'
//         });
//     }
// })