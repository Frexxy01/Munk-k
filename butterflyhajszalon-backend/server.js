const http = require("http")
const dotenv = require("dotenv")
const connectDB = require("./config/dbConnection.js")
const routeAdmin = require("./routes/admin.js")
const routeUser = require("./routes/user.js")
const routeAuth = require("./routes/auth.js")

dotenv.config()
const PORT = process.env.PORT || 5001;

const server = http.createServer((req, res) => {
  //  CORS HEADERS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const {url, method} = req
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end()
    return;
  }
  console.log(url, method)

  if (url == '/') {
    routeUser(req, res)
  } else if (url == '/admin') {
    routeAdmin(req,res)
  } else if ( url == '/auth') {
    routeAuth(req, res)
  } else {
    res.statusCode = 404
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({message: 'Not found'}))
  }
})
server.listen(PORT, () => {
  console.log(`Server is running of port ${PORT}`)
})
connectDB();