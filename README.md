# Neighbor-Nest
## Getting Started
1. npm i (at root)
```
cd client & npm i
cd server & npm i

```
2. Run the seeder scripts
npm run seed
```
3. Start the server
```
npm run develop

## Description

NeighborNest is a local consumer-to-consumer e-commerce site where users can buy and sell products. Our dynamic interface is powered by React and customized using CSS styling. 

The application backend uses Express.js and Apollo Server to mediate requests from the client. The GraphQL queries interact with the MongoDB database to handle and serve requests. We also utilized JWT tokens and bcrypt hashing to authenticate users.  Finally, to showcase the platform, we used Casual to seed data, and demonstrate the features of our application. 

Our acceptance criteria were as follows: 

## Acceptance Criteria
``
GIVEN an e-commerce application
WHEN the NeighborNest website loads,
THEN the user is presented with a landing page. The landing page will have options to login or signup, browse categories and search by keyword.
WHEN a public user views the page,
THEN he will have the option to sort and view items by category.
WHEN a user is logged in,
THEN he will have the option to buy and sell items, as well as create an order for checkout.
``
## Usage

NeighborNest can be used to browse items for sale. As an account holder, users can post items for sale and purchase through our checkout cart.

<ul>
<li>Find items by category or keyword.</li>
<li>Post an item for sale.</li> 
<li>Purchase listed items.</li>
</ul>

The following links to our deployed application: https://neighbor-nest.onrender.com/

![Deployed Website](client/src/assets/homepage.png)
   
## Contributors

<ul>
<li>Martin Renteria - https://github.com/mrent32</li>
<li>Dylan Polito - https://github.com/dachyon1123</li>
<li>Michael Carmelo - https://github.com/Carmetlo</li>
<li>Amber Watson - https://github.com/watsona22</li>
</ul>

## Credits

The following resources were referenced in the development of this site:

<ul>
<li>React - https://www.npmjs.com/package/react</li>
<li>apollo/server - https://www.npmjs.com/package/@apollo/server</li>
<li>graphql - https://www.npmjs.com/package/graphql</li>
<li>mongoose - https://www.npmjs.com/package/mongoose</li>
<li>bcrypt - https://www.npmjs.com/package/bcrypt</li>
<li>jsonwebtoken - https://www.npmjs.com/package/jsonwebtoken</li>
<li>cors - https://www.npmjs.com/package/cors</li>
<li>casual - https://www.npmjs.com/package/casual</li>
<li>nodemon - https://www.npmjs.com/package/nodemon</li>
<li>slick-carousel- https://www.npmjs.com/package/slick-carousel</li>
<li>react-slick - https://www.npmjs.com/package/react-slick</li>
</ul>

## License

MIT License
Copyright (c) [2023] [Martin Renteria, Dylan Polito, Michael Carmelo, Amber Watson]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

