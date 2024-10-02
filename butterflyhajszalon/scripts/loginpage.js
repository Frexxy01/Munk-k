document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.js-loginbutton').addEventListener('click', () => {
  
     
    const username = document.querySelector('.js-username-holder').value
    const password = document.querySelector('.js-password-holder').value 

    console.log(username, password)


    fetch('https://munk-k.onrender.com/auth', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("ERROR")
      }
      console.log(response)
    })
    .catch(error => {
      console.error("problem", error)
    })
  })
})