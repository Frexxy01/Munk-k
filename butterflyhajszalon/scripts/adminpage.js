import {pushData, loadavailableTimes, loadAvailableHours, differenciInDays, dateSelectorLogic} from "../scripts/utils/AdminPushData.js"


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
    return data
  } catch(error) {
    console.error(error)
  }
  
}
export async function displayAppointments() {
  let appointmentHTML = ''
  
  const appointments = await loadAppointmentsFromDb() 
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

  document.querySelector('.remove-appointment-button').addEventListener('click', async (event) => {
    const id = event.target.dataset.id
    await deleteSingleAppointment(id)
    displayAppointments();

  })
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

async function validateToken() {
  const token = localStorage.getItem('token')
  if (!token) {
    alert("Hozzáférés elutasítva, kérlek jelentkezz be.")
    window.location.href ="login.html" 
    return;
  }
  try {
    const response = await fetch("https://munk-k.onrender.com/auth", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
      }
    })
    if (!response.ok) {
      localStorage.removeItem('token')
      alert("Hitelesítési token lejárt vagy nem megfelelő, kérlek jelentkezz be újra.")
      window.location.href = "login.html"
    }
    const data = await response.json()
    const adminElement = document.querySelector(".admin-html")
    adminElement.innerHTML = data.payload
  
  } catch (err) {
    console.error("Hiba történt, kérlek jelentkezz be újra.", error)
  }
}



document.addEventListener('DOMContentLoaded', async () => {
  await validateToken()


  document.querySelector('.js-admin-get-button').addEventListener('click', ()=> {
    displayAppointments()
  })
  document.querySelector('.js-admin-delete-button').addEventListener('click', async () => {
    await deleteAllAppointment()
    displayAppointments()
  })

  document.querySelector('.js-dateinput').addEventListener('change',  () => {
    
    dateSelectorLogic()
  })
  document.querySelector('.js-logout-button').addEventListener('click', () => {
    localStorage.removeItem('token')
    window.location.href = "login.html"
  })
})

