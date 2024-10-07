const {MongoClient} = require("mongodb")
const dotenv = require("dotenv")
dotenv.config()
const uri = process.env.CONNECTION_STRING
const client = new MongoClient(uri)
async function deleteAdmin(req, res) {
  try {
    await client.connect()
    const database = client.db('test')
    const collection =database.collection('appointments')
    const deletestatus = await collection.deleteMany({})
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({message: `Delete successfull! Deleted records: ${deletestatus.deletedCount}`}))

  } catch (err) {
    console.error("ERROR OCCURED", err)
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({message: "Error deleting appointment"}))
    
  } finally {
    await client.close()
  }
}

module.exports = deleteAdmin;