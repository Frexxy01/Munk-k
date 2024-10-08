async function loadAppointmentsFromDb() {
  const response = await fetch('https://munk-k.onrender.com/admin', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    },
  })
  if (!response.ok) {
    console.error('failed to load!', error)
  }
  try {
    const data = await response.json()
    console.log(data)
    return data
  } catch(error) {
    console.error(error)
  }
  
}
async function displayAppointments() {
  let appointmentHTML = ''
  console.log("hex")
  console.log("Staring communication...")
  const appointments = await loadAppointmentsFromDb() 
  console.log("Communication succesfull!")
  console.log(appointments)
  appointments.forEach((appointment) => {
    appointmentHTML += `
    <div class="admin-button-and-element-holder">
          <div class="admin-appointment-element">
            <div>
              <div class="">Azonosító</div>
              <div class="">Név:</div>
              <div class="">Email:</div>
              <div class="">Telefon:</div>
              <div class="">Dátum:</div>
              <div class="">Időpont:</div>
              <div class="">Szolgáltatás:</div>
            </div>
            <div>
              <div>${appointment._id}</div>
              <div class="">${appointment.user_name}</div>
              <div class="">${appointment.user_email}</div>
              <div class="">${appointment.user_tel}</div>
              <div class="">${appointment.user_datestring}</div>
              <div class="">${appointment.user_hour}</div>
              <div class="">${appointment.user_service}</div>
              </div>
          </div>
          <button class="remove-appointment-button"
          data-id=${appointment._id}>Foglalás törlése</button>
        </div>`
  })
  document.querySelector('.js-appointment-holder').innerHTML = appointmentHTML
}

async function deleteAllAppointment() {
  const response = await fetch('https://munk-k.onrender.com/admin', {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json"
    }
  })
  if (!response.ok) {
    console.log('Failed to delete requests!')
  }
  try {
    const dataStream = await response.json()
    alert(dataStream.message)
  } catch(err) {
    console.error(err)
  }
}

async function deleteSingleAppointment(id) {
  const response = await fetch(`https://munk-k.onrender.com/admin/${id}`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json"
    }
  })
  if (!response.ok) {
    console.error("Failed to delete!")
  }
  try {
    const data = await response.json()
    alert(data.message)
  } catch (err) {
    console.log(err)
  }
}


document.addEventListener('DOMContentLoaded', () => {

  document.querySelector('.js-admin-get-button').addEventListener('click', ()=> {
    console.log("button clicked")
    displayAppointments()
  })
  document.querySelector('.js-admin-delete-button').addEventListener('click', () => {
    deleteAllAppointment()
  })
  document.querySelector('.remove-appointment-button').addEventListener('click', () => {
    console.log("Starting deleting...")
    const id = this.dataset._id
    deleteSingleAppointment(id)
  })
})

