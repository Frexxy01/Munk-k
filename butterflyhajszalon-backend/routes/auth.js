const getAuth = require("../controllers/auth/getAuth.js")
const postAuth = require("../controllers/auth/postAuth.js")
const putAuth = require("../controllers/auth/putAuth.js")
const deleteAuth = require("../controllers/auth/deleteAuth.js")

function routeAuth(req, res) {

  switch(req.method) {
    case 'GET':
      getAuth(req, res)
      break
    case 'POST':
      postAuth(req, res)
      break
    case 'PUT':
      putAuth(req, res)
      break
    case 'DELETE':
      deleteAuth(req, res)
      break
    default:
      res.statusCode = 405
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({message: 'Method not allowed'}))
  }
}
module.exports = routeAuth