const {MongoClient} = require("mongodb")
const dotenv = require("dotenv")
dotenv.config()
const uri = process.env.CONNECTION_STRING
const client = new MongoClient(uri)
const {chunk} = require('lodash')

async function getAppointmentHours(req, res) {
   try {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
    })
    
    req.on('end', async () => {
      const parsedBody = JSON.parse(body)
      const date = parsedBody.datestring
      if (!date) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({message: "Bad Request"}))
        return;
      }

      await client.connect()
      const database = client.db('test')
      const collection = database.collection('appointments')
      const appointmentList = collection.find({user_datestring: date})
      const filteredAppointmentList = await appointmentList.toArray()
     
      const returnJson = []
      for(let i =0; i < filteredAppointmentList.length; i++) {
        returnJson.push(filteredAppointmentList[i].user_hour)
      }
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(returnJson))
    })
  } catch (err) {
    res.statusCode = 500
    console.error("Internal server error", err)
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({message: err}))
  }
}
module.exports = getAppointmentHours