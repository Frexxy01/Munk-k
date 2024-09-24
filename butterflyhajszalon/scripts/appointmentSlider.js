let slideIndex = 1;
let slides;

document.addEventListener("DOMContentLoaded", () => {
  slides = document.getElementsByClassName("slide")
  showSlides(slideIndex)

  document.querySelector(".prev").addEventListener('click', () => {changeSlide(-1)})
  document.querySelector(".next").addEventListener('click', () => {changeSlide(1)})
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