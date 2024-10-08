const {MongoClient, ObjectId} = require("mongodb")
const dotenv = require("dotenv")
dotenv.config()
const uri = process.env.CONNECTION_STRING
const client = new MongoClient(uri)
const url2 = require("url")

async function deleteById(req, res) {
  try {
    const parsedUrl = url2.parse(req.url, true)
    const path = parsedUrl.pathname
    const match = path.match(/^\/admin\/([a-f0-9]{24})$/);
    const id = match[1]; 
    
    console.log(" azonosito", id)
    await client.connect();
    const database = client.db('test');
    const collection = database.collection('appointments');
    const deleteStatus = await collection.deleteOne({_id : new ObjectId(id)});

    console.log(deleteStatus)


    if (deleteStatus.deletedCount === 1) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({message: `Sikeresen törölted a foglalást ezzel az azonosítóval: ${id}`}))
      return
    } 

    if (deleteStatus.deletedCount === 0) {
      res.statusCode = 404;
      res.end(JSON.stringify({message: "Not Found any matching id"}))
      return
    }
  } catch (err) {
    console.error("Error:", err);
    res.statusCode = 500;
    res.end(JSON.stringify({message: "Error Deleting appointments"}))
    return
  } finally {
    await client.close()
  }
};

module.exports = deleteById