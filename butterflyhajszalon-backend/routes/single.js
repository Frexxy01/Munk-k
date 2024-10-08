const getSingle = require("../controllers/single/getSingle.js")
const putSingle = require("../controllers/single/putSingle.js")
const postSingle = require("../controllers/single/postSingle.js")
const deleteSingle = require("../controllers/single/deleteSingle.js")

function routeSingleRequests(req, res) {
  switch(req.method) {
    case 'GET':
      getSingle(req, res)
      break
    case 'PUT':
      putSingle(req, res)
      break
    case 'POST':
      postSingle(req, res)
      break
    case 'DELETE':
      deleteSingle(req, res)
      break
    default:
      res.statusCode = 405;
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({message: "Method not allowed"}))
  } 
}
module.exports = routeSingleRequests
