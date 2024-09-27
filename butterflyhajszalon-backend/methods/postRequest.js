const { chunk } = require("lodash");
const Appointment = require("../models/appointmentmodel.js")
const {v4: uuidv4} = require('uuid')

module.exports = (req, res) => {
  let body = ''

  req.on('data', (chunk) => {
    body += chunk
  })

  req.on('end', async () => {
    const parsedBody = JSON.parse(body)
    const {user_name, user_email, user_tel, user_datestring, user_hour, user_service} = parsedBody

    const foglalas_id = uuidv4();

    const appointment = await Appointment.create({
      foglalas_id,
      user_name,
      user_tel,
      user_email,
      user_datestring,
      user_hour,
      user_service,
    })

    res.statusCode = 201;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(appointment));
    res.end();
  })
}