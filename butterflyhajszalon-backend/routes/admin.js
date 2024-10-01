const getAdmin = require("../controllers/admin/getAdmin.js")
const postAdmin = require("../controllers/admin/postAdmin.js")
const putAdmin = require("../controllers/admin/putAdmin.js")
const deleteAdmin = require("../controllers/admin/deleteAdmin.js")

function routeAdmin(req, res) {

  switch(req.method) {
    case 'GET':
      getAdmin(req, res)
      break
    case 'POST':
      postAdmin(req, res)
      break
    case 'PUT':
      putAdmin(req, res)
      break
    case 'DELETE':
      deleteAdmin(req, res)
      break
    default:
      res.statusCode = 405
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({message: "method not allowed"}))
  }
}

module.exports = routeAdmin