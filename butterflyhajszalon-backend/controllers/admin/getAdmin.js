const {MongoClient} = require("mongodb")
const dotenv = require("dotenv")
dotenv.config()
const uri = process.env.CONNECTION_STRING
const client = new MongoClient(uri)

async function getAllAppointment(req, res) {
  let returnJson = [];

  try {
    await client.connect()
    const database = client.db('test')
    const collection = database.collection('appointments')
    const appointmentCursor = collection.find({})
    returnJson = await appointmentCursor.toArray()

    res.status = 200;
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(returnJson))

  } catch(error) {
    console.error("Error fetching appointments:", error)
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({message: "Error fetching appointment"}))
  } finally {
    await client.close()
  }
}
module.exports = getAllAppointment;