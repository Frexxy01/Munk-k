const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()
const secretkey = process.env.JWT_SECRET_KEY
const adminHTML = 
`
<div>
        <div class="Welcome-back! centered">
          <h1>Üdvözlünk az adminsztátori felületen!</h1>
        </div>
        <div class="navigation centered">
          <button class="button-primary js-admin-get-button">
            Foglalások Listázása
          </button>
          <button class="button-primary js-admin-delete-button">
            Foglalások Törlése
          </button>
          <a href="./index.html">
            <button class="button-primary strech">
              Vissza a főoldalra
            </button>
          </a>
          <button class="button-primary js-logout-button">
            Kijelentkezés
          </button>
          
        </div>
  
        <div class="Welcome-back! centered">
          <p>Lefoglaltak telefonon egy időpontot? Add itt hozzá hogy a weboldalon ne tudják lefoglalni!</p>
        </div>
        <div class="admin-manual-time">
          <div class="appointment-choose-time">
            <div class="date-selector">
              <input type="date" class="dateinput js-dateinput">
            </div>
            <div class="time-selector">
              <div class="avaiable-dates">
                <div class="available-dates-title">Időpontok ezen a dátumon:</div>
                <p class="invisible-past">A múltba nem lehet foglalni!</p>
                  <p class="invisible-future">Maximum két hétre előre lehet foglalni!</p>
                <div class="available-dates-grid js-hours-grid">
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <div class="appointment-holder centered js-appointment-holder">
        </div>  
      </div>
`

function validateUserOnAdminPage(req, res) {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    res.statusCode = 401;
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({message: "No token provided"}))
    return;
  }
  jwt.verify(token, secretkey, (err, decoded) => {
    if (err) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({message: "Token Invalid"}))
      return;
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(
      {message: "Token is valid! Proceding...",
       payload: adminHTML
    }))
  })
}
module.exports = validateUserOnAdminPage