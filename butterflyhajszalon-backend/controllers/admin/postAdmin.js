const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

function postAuth(req, res) {
  const {username, password} = req.body
  if (!username || !password) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({message: 'All fields are mandatory!'}))
  }
  
}