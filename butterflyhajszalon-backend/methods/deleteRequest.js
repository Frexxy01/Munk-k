module.exports = (req, res) => {
  res.statuscode = 200;
  res.setHeader("Content-Type", "application/json")
  res.write(JSON.stringify("LETS GOOO"))
}