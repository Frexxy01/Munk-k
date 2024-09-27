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

    

    console.log(sessionStorage)
  })
})