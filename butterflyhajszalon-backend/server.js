const http = require("http")
const dotenv = require("dotenv")
const getReq = require("./methods/getRequest.js")
const putReq = require("./methods/putRequest.js")
const postReq = require("./methods/postRequest.js")
const deleteReq = require("./methods/deleteRequest.js")

dotenv.config()
const PORT = process.env.PORT || 5001;

const server = http.createServer((req, res) => {
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
})
server.listen(PORT, () => {
  console.log(`Server is running of port ${PORT}`)
})
