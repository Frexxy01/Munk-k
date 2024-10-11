let slideIndex = 1;
let slides;

document.addEventListener("DOMContentLoaded", () => {
  slides = document.getElementsByClassName("slide")
  showSlides(slideIndex)

  document.querySelector(".prev").addEventListener('click', () => {changeSlide(-1)})
  document.querySelector(".next").addEventListener('click', () => {changeSlide(1)})

  document.querySelectorAll(".js-movebutton").forEach((button) => {
    button.addEventListener('click', () => {
      changeSlide(1);
    })
  })
  // Appointment finisher REGEX

  document.querySelector(".js-nameinput").addEventListener('keydown', (event) => {
    const namePattern = /^[A-Za-z]{3,}\s[A-Za-z]{3,}$/
    if (namePattern.test(event.target.value)) {
      const nameformat = document.querySelector('.invisible-nameformat')
      nameformat.classList.remove('visible-warning')
    } else {
      const nameformat = document.querySelector('.invisible-nameformat')
      nameformat.classList.add('visible-warning')
    }
  })
  document.querySelector(".js-telinput").addEventListener('keydown', (event) => {
    const phonePattern = /^06\s?(\d\s?){7,13}$/;
    if (phonePattern.test(event.target.value)) {
      const nameformat = document.querySelector('.invisible-telformat')
      nameformat.classList.remove('visible-warning')
    } else {
      const nameformat = document.querySelector('.invisible-telformat')
      nameformat.classList.add('visible-warning')
    }
  })
  document.querySelector(".js-emailinput").addEventListener('keydown', (event) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/;
    if (emailPattern.test(event.target.value)) {
      const nameformat = document.querySelector('.invisible-emailformat')
      nameformat.classList.remove('visible-warning')
    } else {
      const nameformat = document.querySelector('.invisible-emailformat')
      nameformat.classList.add('visible-warning')
    }
  })

})

function changeSlide(n) {
  showSlides(slideIndex += n)
}

function showSlides(n) {
  let i;
  
  if (n > slides.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = slides.length
  }
  for (i = 0; i< slides.length; i++) {
    slides[i].style.display = "none";
  } 
  slides[slideIndex-1].style.display = "block"
}


