const getClient = require("../controllers/client/getClient.js")
const postClient = require("../controllers/client/postClient.js")
const putClient = require("../controllers/client/putClient.js")
const deleteClient = require("../controllers/client/deleteClient.js")

function routeClientRequests(req, res) {
  switch(req.method) {
    case 'GET':
      getClient(req, res)
      break
    case 'POST':
      postClient(req, res)
      break
    case "PUT":
      putClient(req, res)
      break
    case "DELETE":
      deleteClient(req, res)
    default:
      res.statusCode = 405;
      res.setHeader('Content-Type', "application/json")
      res.end(JSON.stringify({message: "Method not allowed"}))
  }
}
module.exports = routeClientRequests