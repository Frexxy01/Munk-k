const http = require("http")
const dotenv = require("dotenv")
const getReq = require("./methods/getRequest.js")
const putReq = require("./methods/putRequest.js")
const postReq = require("./methods/postRequest.js")
const deleteReq = require("./methods/deleteRequest.js")
const connectDB = require("./config/dbConnection.js")

dotenv.config()
const PORT = process.env.PORT || 5001;

const server = http.createServer((req, res) => {
  //  CORS HEADERS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end()
    return;
  }

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
connectDB();