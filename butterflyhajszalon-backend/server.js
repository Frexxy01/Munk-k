const http = require("http")
const dotenv = require("dotenv")
const connectDB = require("./config/dbConnection.js")
const routeAdmin = require("./routes/admin.js")
const routeUser = require("./routes/user.js")

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
  }
})
server.listen(PORT, () => {
  console.log(`Server is running of port ${PORT}`)
})
connectDB();