// Birthday Date Configuration
const datetxt = "9th December"
const datatxtletter =
  "My love. You are a very special girl. I always silently thank you for coming into my life. Today, I wish you all the best, lots of health, and lots of joy. I always hope we will celebrate many more birthdays like this together. Happy birthday to you.💕"
const titleLetter = "To you"

// Elements
const charArrDate = datetxt.split("")
const charArrDateLetter = datatxtletter.split("")
const charArrTitle = titleLetter.split("")
let currentIndex = 0
const date__of__birth = document.querySelector(".date__of__birth span")
let timeDatetxt

const audio = document.getElementById("birthdayAudio")

// Function to ensure audio is playing
function ensureAudioPlaying() {
  if (audio && audio.paused) {
    audio.currentTime = 0
    audio.play().catch((err) => console.log("Audio play failed:", err))
  }
}

// Try to play immediately on load
window.addEventListener("load", () => {
  ensureAudioPlaying()
})

// Play on first user interaction
document.addEventListener("click", ensureAudioPlaying, { once: true })
document.addEventListener("touchstart", ensureAudioPlaying, { once: true })

// Keep checking and ensuring audio continues playing
setInterval(() => {
  if (audio && audio.paused) {
    ensureAudioPlaying()
  }
}, 1000)

setTimeout(() => {
  timeDatetxt = setInterval(() => {
    if (currentIndex < charArrDate.length) {
      date__of__birth.textContent += charArrDate[currentIndex]
      currentIndex++
    } else {
      const i = document.createElement("i")
      i.className = "fa-solid fa-star"
      document.querySelector(".date__of__birth").prepend(i)
      document.querySelector(".date__of__birth").appendChild(i.cloneNode(true))
      clearInterval(timeDatetxt)
    }
  }, 100)
}, 1200)

let currentPage = 0
const totalPages = 4
const cardPages = document.querySelectorAll(".card-page")
const card1 = document.querySelector(".card1")
const boxmail = document.querySelector(".boxMail")
const closeBtn = document.querySelector(".fa-xmark")
const btnLetter = document.querySelector("#btn__letter")
const btnContainer = document.querySelector(".btn")
let autoPlayInterval = null
const SLIDE_DURATION = 5000 // 5 seconds per page

setTimeout(() => {
  btnContainer.classList.remove("hidden")
}, 200) // reduced from 3500ms to 875ms (1/4th of original)

btnLetter.addEventListener("click", () => {
  boxmail.classList.add("active")
  startAutoPlay()
})

closeBtn.addEventListener("click", () => {
  boxmail.classList.remove("active")
  stopAutoPlay()
  resetToCover()
})

// Reset to cover page
function resetToCover() {
  currentPage = 0
  cardPages.forEach((page) => {
    page.classList.remove("active")
  })
  card1.style.transform = "translate(-50%, -50%) rotateY(0deg)"
  card1.style.zIndex = "5"
}

function startAutoPlay() {
  stopAutoPlay()

  // Flip to first page after delay
  setTimeout(() => {
    if (currentPage === 0) {
      card1.style.transform = "translate(-187px, -275px) rotateY(-140deg)"
      card1.style.zIndex = "1"

      setTimeout(() => {
        openPage(1)
        autoPlayInterval = setInterval(() => {
          advanceSlideshow()
        }, SLIDE_DURATION)
      }, 500)
    }
  }, 1000)
}

function stopAutoPlay() {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval)
    autoPlayInterval = null
  }
}

function advanceSlideshow() {
  if (currentPage < totalPages) {
    openPage(currentPage + 1)
  } else {
    // Loop back to cover
    stopAutoPlay()
    boxmail.classList.remove("active")
    resetToCover()
  }
}

// Open specific page
function openPage(pageNumber) {
  if (pageNumber < 1 || pageNumber > totalPages) return

  cardPages.forEach((page) => page.classList.remove("active"))
  cardPages[pageNumber - 1].classList.add("active")
  currentPage = pageNumber
}

document.addEventListener("keydown", (e) => {
  if (!boxmail.classList.contains("active")) return

  if (e.key === "Escape") {
    stopAutoPlay()
    resetToCover()
    boxmail.classList.remove("active")
  }
})

// Close card when clicking outside
boxmail.addEventListener("click", (e) => {
  if (e.target === boxmail) {
    stopAutoPlay()
    boxmail.classList.remove("active")
    resetToCover()
  }
})
