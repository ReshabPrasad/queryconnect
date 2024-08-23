const jwt = require('jsonwebtoken');
require('dotenv').config();

const verfiyJwtToken = (token) =>{
    try {
        var decodedToken = jwt.verify(token, process.env.secret_key);
        console.log("hii",decodedToken);
        console.log("hello0");
        return decodedToken;
      } catch(err) {
        throw err.message;
      }
}

module.exports = {verfiyJwtToken};