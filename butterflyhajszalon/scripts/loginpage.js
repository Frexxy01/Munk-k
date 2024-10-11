document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.js-loginbutton').addEventListener('click', handleLogin)})

async function handleLogin() {
    const username = document.querySelector('.js-username-holder').value
    const password = document.querySelector('.js-password-holder').value 

    if (!username || !password) {
      alert("Mezők kitöltése kötelező")
    } else {
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
        return response.json();
      })
      .then((data) => {
        localStorage.setItem('token', data.token)
        window.location.href="admin.html"
      })
      .catch(error => {
        console.error("problem", error)
        alert("Rossz felhasználónév vagy jelszó")
      })
    }
  }
