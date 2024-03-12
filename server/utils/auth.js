const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const secret = 'mysecretssshhhhhhh';
const expiration = '2h';

module.exports = {
    AuthenticationError: new GraphQLError('Could not authenticate user.', {
        extensions: {
            code: 'UNAUTHENTICATED',
        },
    }),
    //middleware to check if token comes from token query or authorization header
    //one way is sufficient; don't use three (req.headers.authorization is best)
    authMiddleware: function ({ req }) {
        // allows token to be sent via req.body, req.query, or headers
        let token = req.body.token || req.query.token || req.headers.authorization;

        // console.log(`Auth token ${token}`)
        // We split the token string into an array and return actual token
        //'Authorations: bearer <token>' (token is the jwt in this case)
        if (req.headers.authorization) {
            //takes token bit from the header below
            token = token.split(' ').pop().trim();
        }
        // console.log('Final token:', token);
        // console.log(`auth token ${token}`)
        // if there is no token, return request object as is
        if (!token) {
            return req;
        }

        // if token can be verified, add the decoded user's data to the request so it can be accessed in the resolver
        //use jwt.verify function if there is a token when user loggedin/signedup and it was signed with a secret. it should be decoded with signature secret (on server side)
        //choose a strong secret 
        //decode and assign maxage for expiration date. 
        //if it can't be decoded, verification will fail/throw exception. 
        //it also checks to see if it is expired
        //this code is important for authentication with jwt
        try {
            const { data } = jwt.verify(token, secret);
            console.log('User data:', data);
            req.user = data;
        } catch (err) {
            console.log('error when verifying token');
            console.log(err);
        }

        // return the request object so it can be passed to the resolver as `context`
        return req;
    },
    signToken: function ({ email, firstName, _id }) {
        const payload = { email, firstName, _id };
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
};
