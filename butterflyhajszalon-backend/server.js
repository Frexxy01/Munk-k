const http = require("http")
const dotenv = require("dotenv")
const connectDB = require("./config/dbConnection.js")
const routeAdmin = require("./routes/admin.js")
const routeUser = require("./routes/user.js")
const routeAuth = require("./routes/auth.js")
const routeSingle = require("./routes/single.js")
const routeClient = require("./routes/client.js")
const bcrypt = require("bcrypt")
const { parse } = require("path")
const url2 = require("url")


dotenv.config()
const PORT = process.env.PORT || 5001;

const server = http.createServer((req, res) => {
  //  CORS HEADERS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type", "Authorization");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end()
    return;
  }

  const {url, method} = req
  const parsedUrl = url2.parse(req.url, true)
  const path = parsedUrl.pathname
  const match = path.match(/^\/admin\/([a-f0-9]{24})$/);
  if (match) {
    const id = match[1]; // Extract the ID from the URL
    routeSingle(req, res);
  } else if (url == '/') {
    routeUser(req, res)
  } else if (url == '/admin') {
    routeAdmin(req,res)
  } else if ( url == '/auth') {
    routeAuth(req, res)
  } else if (url == '/client') {
    routeClient(req,res)
  }  else {
    res.statusCode = 404
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({message: 'Not found'}))
  }
})
server.listen(PORT, () => {
  console.log(`Server is running of port ${PORT}`)
})
connectDB();


