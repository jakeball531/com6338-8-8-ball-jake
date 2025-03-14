//fails the following tests: condition icon, current temp, feels like temp, not displaying previous location on new search
//not entirely sure what the issue is because everything shows up on form submittal

var URL = "https://api.openweathermap.org/data/2.5/weather?q="
var weatherDiv = document.getElementById('weather-app')
var form = document.querySelector('form')

function clearCity() {
  let childElements = weatherDiv.children;
  for (var i = childElements.length - 1; i >= 0; i--) {
    if (childElements[i].tagName !== "FORM") {
      weatherDiv.removeChild(childElements[i]);
    }
  }
}
//weatherDiv.innerHTML = "" was not working
//had to manually iterate over child elements in order to not have form cleared

form.onsubmit = function(e) {
  e.preventDefault()
  var searchTerm = this.search.value.trim()
  if (!searchTerm) return
  form.search.value = ""

  clearCity()

  fetch(URL + searchTerm + "&appid=cc4c65025efb0361e4e0b6c4ee7b5ae1")

  .then(function(res){
    return res.json()
  })

  .then(function(data){

    var weatherCity = document.createElement('h3')
    weatherCity.textContent = data.name + ", " + data.sys.country
    weatherDiv.appendChild(weatherCity)

    var mapLink = document.createElement('a')
    mapLat = data.coord.lat
    mapLong = data.coord.lon
    mapLink.href = "https://www.google.com/maps/search/?api=1&query=" + mapLat + "," + mapLong
    mapLink.textContent = "click to view map"
    weatherDiv.appendChild(mapLink)

    var img = document.createElement('img')
    var icon = data.weather[0].icon
    img.src = "https://openweathermap.org/img/wn/" + icon + ".png"
    weatherDiv.appendChild(img)

    var weatherCondition = document.createElement('p')
    weatherCondition.textContent = data.weather[0].description 
    weatherDiv.appendChild(weatherCondition)

    var actualTemp = document.createElement('p')
    tempA = data.main.temp
    realA = (tempA * 9/5 - 459.67)
    actualTemp.textContent = "Current: " + realA.toFixed(2) + "° F"
    weatherDiv.appendChild(actualTemp)

    var percievedTemp = document.createElement('p')
    tempP = data.main.feels_like
    realP = (tempP* 9/5 - 459.67)
    percievedTemp.textContent = "Feels like: " + realP.toFixed(2) + "° F"
    weatherDiv.appendChild(percievedTemp)

    var lastUpdate = document.createElement('p')
      var dateCode = data.dt * 1000 
      var date = new Date(dateCode).toLocaleTimeString("en-us", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      })
      lastUpdate.textContent = "Last updated: " + date
      weatherDiv.appendChild(lastUpdate)
  })

  .catch(function(err){
    var errorMessage = document.createElement('h3')
    errorMessage.textContent = "Location not found"
    weatherDiv.appendChild(errorMessage)
  })
}


