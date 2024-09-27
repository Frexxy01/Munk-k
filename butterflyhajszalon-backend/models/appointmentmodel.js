const mongoose = require("mongoose")
const {v4: uuidv4} = require('uuid')

const appointmentSchema = mongoose.Schema({
  foglalas_id: {
    type: String
  },
  user_name: {
    type: String
  },
  user_email: {
    type: String
  },
  user_tel: {
    type: String
  },
  user_datestring: {
    type: String
  },
  user_hour: {
    type: String
  },
  user_service: {
    type: String
  }
}, {
  timestamps: true,
},
{ versionKey: false }
)
module.exports = mongoose.model("Appointment", appointmentSchema)