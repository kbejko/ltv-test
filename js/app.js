//rewrote to remove jQuery

const searchBtn = document.querySelector('#btn-search')
const optionBtns = document.querySelectorAll('input[name="options"]')
const emailOpt = document.querySelector('#emailOpt')
const phoneOpt = document.querySelector('#phoneOpt')
const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const loader = `<section class="loader"><div class="spinner"></div><p>Please wait a moment...</p></section>`
const main = document.querySelector('.main')
let input = document.querySelector('input[type="text"]')
let errorMsg = "Please enter a valid email address"

window.onload = function() {
  input.value = ''
}

//switches between phone and email
phoneOpt.onchange = function() {
  input.value = ''
  input.parentNode.classList.remove('error')
  input.placeholder = 'ENTER A PHONE NUMBER'
  errorMsg = "Please enter a valid phone number"
  this.parentNode.classList.add('active')
  emailOpt.parentNode.classList.remove('active')
}
emailOpt.onchange = function() {
  input.value = ''
  input.parentNode.classList.remove('error')
  input.placeholder = 'ENTER AN EMAIL ADDRESS'
  errorMsg = "Please enter a valid email address"
  this.parentNode.classList.add('active')
  phoneOpt.parentNode.classList.remove('active')
}

//runs data fetch and sets content to local storage
searchBtn.onclick = function(e) {
  e.preventDefault()
  localStorage.clear()

  let inputVal = input.value
  let runQuery
  let runQueryWith

  if (emailOpt.checked && inputVal.match(emailRegex)) {
    runQuery = true
    runQueryWith = "email=" + inputVal.toLowerCase()
  } else if (phoneOpt.checked && inputVal.match(phoneRegex)) {
    runQuery = true
    runQueryWith = "phone=" + inputVal.replace(/\D/g,'')
  } else {
    runQuery = false
  }

  if (runQuery) {
    main.innerHTML = loader
    const proxyurl = ''
    const url = 'https://ltv-data-api.herokuapp.com/api/v1/records.json?' + runQueryWith
    fetch(proxyurl + url)
      .then((response) => response.text())
      .then(function(contents) {
        localStorage.setItem('userObject', contents)
        window.location.href = 'result.html'
      })
      .catch((e) => console.log(e))
  } else {
    document.querySelector('.error-msg').innerHTML = errorMsg
    input.parentNode.classList.add('error')
  }
}

//runs searchbutton click function on enter
input.onkeypress = function (event) {
  if (event.keyCode == '13') {
    searchBtn.click()
  }
}