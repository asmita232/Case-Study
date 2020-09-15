const express = require( 'express' );
const router = express.Router();
const jwt = require( 'jsonwebtoken' );

const mongoose = require( 'mongoose' );
const User = mongoose.model( 'User' );

/**
 * Sample request body
 * req.body = { "email": "john.doe@example.com", "password": "johndoe" }
 */
router.post('/', (req, res, next) => {
    const credentials = req.body;

    User
        .findOne( credentials )
        .exec(( error, result ) => {
            if( error ) {
                error.status = 403;
                return next( error );
            }
            // console.log(result)

            if(result === null) {

                return res.status(403).send('user does not exist!')
            }
            const claims = { emailId: result.emailId, userId: result._id };
        
            jwt.sign(claims, 'shh...', {expiresIn: '24h'}, function( error, token ) {
                console.log( 'jwt token generated' );

                if( error ) {
                    return res.status(401).json({ message: error.message });
                }
                // localStorage.setItem('token',token)
                res.status(200).json({
                    message: 'Signed in sucessfully',
                    token: token,
                    email: result.emailId,
                    name: result.name
                });
            });
        });  
});

module.exports = router;