document.addEventListener('DOMContentLoaded', function() {
  const appoinmentdetails = JSON.parse(sessionStorage.getItem('appointment'))
  
  let appointmenthtml = ''
  Object.entries(appoinmentdetails).forEach(([key, value]) => {
    appointmenthtml += `<div class="appointment-detail">${value}</div>`
  })
  console.log(appointmenthtml)
  document.querySelector(".js-appointment-detail-holder").innerHTML = appointmenthtml


})