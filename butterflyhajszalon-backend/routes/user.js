const getReq = require("../controllers/user/getRequest")
const putReq = require("../controllers/user/putRequest")
const postReq = require("../controllers/user/postRequest")
const deleteReq = require("../controllers/user/deleteRequest")

function routeUser(req, res) {
  switch(req.method) {
    case "GET":
      getReq(req, res)
      break;
    case "PUT":
      putReq(req, res)
      break;
    case "POST":
      postReq(req, res)
      break;
    case "DELETE":
      deleteReq(req, res)
      break;
    default:
      res.statusCode = 405;
      res.setHeader("Content-Type", "application/json")
      res.end(JSON.stringify({error: "Method not allowed"}))
  }
}
module.exports = routeUser