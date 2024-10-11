document.addEventListener('DOMContentLoaded', () => {
  sessionStorage.setItem('user_name', null);
  sessionStorage.setItem('user_email', null);
  sessionStorage.setItem('user_tel', null);
  sessionStorage.setItem('user_datestring', null);
  sessionStorage.setItem('user_hour', null)
  sessionStorage.setItem('user_service', null)

  document.querySelectorAll('.js-pushdata-service').forEach((button) => {
    button.addEventListener('click', (event) => {
      value = event.target.textContent
      sessionStorage.setItem('user_service', value)
    })
  })
  dateSelectorLogic()

  document.querySelector('.js-finalize-appointment').addEventListener('click', () => {
  
    const name = document.querySelector(".js-nameinput")
    const telephone = document.querySelector(".js-telinput")
    const email = document.querySelector(".js-emailinput")
    
    sessionStorage.setItem('user_name', name.value)
    sessionStorage.setItem('user_tel', telephone.value)
    sessionStorage.setItem('user_email', email.value)

    const isStorageValid = checkSessionStorage()
    
    if (isStorageValid) {
      console.log("Starting request...")
      pushData()
    }
  })
})

function dateSelectorLogic() {
  document.querySelector('.js-dateinput').addEventListener('change', (event) => {

    let futurewarning = document.querySelector('.invisible-future')
    futurewarning.classList.remove('visible-warning')
    let pastwarning = document.querySelector('.invisible-past') 
    pastwarning.classList.remove('visible-warning')
    document.querySelector('.js-hours-grid').innerHTML = '';

    const selectedDate = event.target.value
    sessionStorage.setItem('user_datestring', selectedDate)

    const mennyinap = loadavailableTimes(selectedDate)
    console.log(mennyinap)
    if ( mennyinap >= 0 && mennyinap < 15) {
      loadAvailableHours(event);

      document.querySelectorAll(".js-movebutton").forEach((button) => {
        button.addEventListener('click', () => {
          changeSlide(1);         
        })
      })
      document.querySelectorAll('.js-pushdata-hour').forEach((button) => {
        button.addEventListener('click', (event) => {
          sessionStorage.setItem('user_hour', event.target.textContent)
        })
      })
    }
    else if ( mennyinap < 0) {
      console.log("kurvaélet")
      let warning = document.querySelector('.invisible-past') 
      warning.classList.add('visible-warning')
    } 
    else if ( mennyinap > 14) {
      let warning = document.querySelector('.invisible-future')
      warning.classList.add('visible-warning')
    } 
  })
}


function checkSessionStorage() {
  let allFieldsFilled = true;
  for (let i = 0; i < sessionStorage.length; i++) {
    let key = sessionStorage.key(i)
    let value = sessionStorage.getItem(key)
    if (value) {
      continue;
    }
    else {
      alert("Minden mező kitöltése kötelező");
      allFieldsFilled = false;
      return false
    }
  } 
  if (allFieldsFilled) {
    let warning = document.querySelector(".invisible")
    warning.classList.add("visible-warning")
    return true
  }
}

function pushData() {
  const data = {
    user_name: sessionStorage.getItem('user_name'),
    user_email: sessionStorage.getItem('user_email'),
    user_tel: sessionStorage.getItem("user_tel"),
    user_datestring: sessionStorage.getItem("user_datestring"),
    user_hour: sessionStorage.getItem('user_hour'),
    user_service: sessionStorage.getItem('user_service')
  }

  fetch("https://munk-k.onrender.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }, 
    body: JSON.stringify(data)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("ERROR")
      }
      return response.json()
    })
    .then(valasz => {
      sessionStorage.clear()
      sessionStorage.setItem('appointment', JSON.stringify(data))
      window.location.href = "./success.html"
       
    })
    .catch(error => {
      console.error("problem", error)
    })
}


function loadavailableTimes(selected) {
  const today = new Date().toLocaleDateString()
  
  const daydifference = differenciInDays(selected, today)
  return daydifference
}

function differenciInDays(d1, d2) {
  const date1 = new Date(d1)
  const date2 = new Date(d2)

  const diffTime = date1 - date2
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  return diffDays
}

async function loadAvailableHours(event) {
  let hoursHTML = ''
  const hours = [
    "8:00",
    "9:00",
    "10:00",
    '11:00',
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00"
  ]
  console.log(event)
  const request = fetch('https://munk-k.onrender.com', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: {

    }
  })



  hours.forEach((hour) => {
    hoursHTML += `<button class="date-option js-movebutton js-pushdata-hour">${hour}</button>`
  })

  document.querySelector('.js-hours-grid').innerHTML = hoursHTML;
  }
