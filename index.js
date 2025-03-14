var URL = "https://api.openweathermap.org/data/2.5/weather?q="
var weatherDiv = document.getElementById('weather-app')
var form = document.querySelector('form')

form.onsubmit = function(e) {
  e.preventDefault()
  var searchTerm = this.search.value.trim()
  if (!searchTerm) return
  form.search.value = ""
  fetch(URL + searchTerm + "&appid=cc4c65025efb0361e4e0b6c4ee7b5ae1")

  .then(function(res){
    return res.json()
  })

  .then(function(data){
    //weatherDiv.innerHTML = ""
    var h3 = document.createElement('h3')
    h3.textContent = data.temperature
    weatherDiv.appendChild(h3)
    console.log(h3)
  })
}