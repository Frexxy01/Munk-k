document.addEventListener('DOMContentLoaded', () => {
  sessionStorage.setItem('user_name', null);
  sessionStorage.setItem('user_email', null);
  sessionStorage.setItem('user_tel', null);
  sessionStorage.setItem('user_datestring', null);
  sessionStorage.setItem('user_hour', null)
  sessionStorage.setItem('service', null)

  document.querySelectorAll('.js-pushdata-service').forEach((button) => {
    button.addEventListener('click', (event) => {
      value = event.target.textContent
      sessionStorage.setItem('service', value)
    })
  })

  document.querySelector('.js-dateinput').addEventListener('change', (event) => {
    const selectedDate = event.target.value
    sessionStorage.setItem('user_datestring', selectedDate)
  })

  document.querySelectorAll('.js-pushdata-hour').forEach((button) => {
    button.addEventListener('click', (event) => {
      sessionStorage.setItem('user_hour', event.target.textContent)
    })
  })

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
  fetch("https://butterflyhajszalon2.onrender.com/")
    .then(response => {
      if (!response.ok) {
        throw new Error("ERROR")
      }
      return response.json()
    })
    .then(valasz => {
      console.log(valasz)
    })
    .catch(error => {
      console.error("problem", error)
    })
}

