const {chunk} = require("lodash")
const bcrypt = require("bcrypt")
const {MongoClient} = require("mongodb")
const dotenv = require("dotenv")
dotenv.config()
const uri = process.env.CONNECTION_STRING
const secretkey = process.env.JWT_SECRET_KEY
const client = new MongoClient(uri)
const jwt = require("jsonwebtoken")

function postAuth(req, res) {
 let body = '';

  req.on('data', (chunk) => {
    body += chunk;
  })
  req.on('end', async () => {
    res.setHeader('Content-Type', 'application/json')
    const parsedBody = JSON.parse(body);
    const username = parsedBody.username;
    const password = parsedBody.password;

    try {
      await client.connect();
      const database = client.db('users');
      const collection = database.collection('admin')

      const admin = await collection.findOne({username: username})

      if (!admin) {
        res.statusCode = 404;
        return res.end(JSON.stringify({message: 'Admin not found'}))
      }

      const isMatch = await bcrypt.compare(password, admin.password)

      if (isMatch) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(
          {
            message: 'Authentication sucessfull!',
            token: jwt.sign({username}, secretkey, {expiresIn: '1h'})
          }
      ))
      } else {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({message: 'Invalid credentials'}))
      }
    } catch (error) {
      console.error(error)
      res.statusCode = 500;
      res.end(JSON.stringify({message: 'Server error'}))
    } finally {
      await client.close()
    }
  });
}

module.exports = postAuth