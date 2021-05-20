let dateToday = document.querySelector(".date-today");
let nextDay = document.querySelector(".name-day1");
let secondNextDay = document.querySelector(".name-day2");
let thirdNextDay = document.querySelector(".name-day3");
const btnTempF = document.querySelector(".c-btn");
const btnTempC = document.querySelector(".f-btn");

setInterval(function(){
    let now = new Date().toLocaleTimeString();
    let clock = document.querySelector(".time-today");
    clock.innerHTML = now;
  }, 1000);
 
setInterval(function() {
  let d = new Date().toLocaleString('en', { weekday: 'long', month: 'long', day: 'numeric'});
   dateToday.textContent = d;
}, 1000);

setInterval(function () {
  let date = new Date();
  
  let numberDayOne = (date.getDay()+1);
  let numberDayTwo = (date.getDay()+2);
  let numberDayThree = (date.getDay()+3);
  if (numberDayOne  > 6) {
     numberDayOne = 0;    
  } else if (numberDayTwo > 6) {
    numberDayTwo = 0;
  } else if (numberDayThree > 6) {
    numberDayThree = 0;
  }
  //console.log(numberDayOne);
  //console.log(numberDayTwo);
  //console.log(numberDayThree);
  let fierstDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][numberDayOne];
  let secondDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][numberDayTwo];
  let thirdDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][numberDayThree];
  nextDay.textContent = fierstDay;
  secondNextDay.textContent = secondDay;
  thirdNextDay.textContent = thirdDay;
}, 1000);


const searchButton = document.querySelector(".search-btn");
let inputValue = document.querySelector(".input-value");
const form = document.querySelector("form");

searchButton.addEventListener("click", function(e) {
  e.preventDefault();
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${inputValue.value}&appid=565978bc4df34911533625cad110876b`)
  .then(response => response.json())
  .then(function (res) {
    //console.log(res);
    const {lat, lon} = res.coord;
    document.querySelector(".city").textContent = res.name + ",";
    document.querySelector(".country").textContent = res.sys.country;
    
    fetch (`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts&appid=565978bc4df34911533625cad110876b`)
      .then(function (resp) { return resp.json() })
      .then(function (exp) {
      //console.log(exp);
      btnTempF.addEventListener("click", function() {
        btnTempF.classList.add("btn-active");
        btnTempC.classList.remove("btn-active");
        document.querySelector(".temp-today").innerHTML = Math.floor(exp.current.temp) - 273 + "&deg";
        document.querySelector(".temp-day1").innerHTML = Math.floor(exp.daily[0].temp.day) - 273 + "&deg";
        document.querySelector(".temp-day2").innerHTML = Math.floor(exp.daily[1].temp.day) - 273 + "&deg";
        document.querySelector(".temp-day3").innerHTML = Math.floor(exp.daily[2].temp.day) - 273 + "&deg";
        document.querySelector(".feels-like").innerHTML = `feels like: ${Math.floor(exp.current.feels_like) - 273}&deg`;
    })
      btnTempC.addEventListener("click", function() {
        btnTempC.classList.add("btn-active");
        btnTempF.classList.remove("btn-active");
        document.querySelector(".temp-today").innerHTML = Math.floor(exp.current.temp) - 241 + "&deg";
        document.querySelector(".temp-day1").innerHTML = Math.floor(exp.daily[0].temp.day) - 241 + "&deg";
        document.querySelector(".temp-day2").innerHTML = Math.floor(exp.daily[1].temp.day) - 241 + "&deg";
        document.querySelector(".temp-day3").innerHTML = Math.floor(exp.daily[2].temp.day) - 241 + "&deg";
        document.querySelector(".feels-like").innerHTML = `feels like: ${Math.floor(exp.current.feels_like) - 241}&deg`;
    })
      document.querySelector(".temp-today").innerHTML = Math.floor(exp.current.temp) - 273 + "&deg";
      document.querySelector(".temp-day1").innerHTML = Math.floor(exp.daily[0].temp.day) - 273 + "&deg";
      document.querySelector(".temp-day2").innerHTML = Math.floor(exp.daily[1].temp.day) - 273 + "&deg";
      document.querySelector(".temp-day3").innerHTML = Math.floor(exp.daily[2].temp.day) - 273 + "&deg";
      document.querySelector(".feels-like").innerHTML = `feels like: ${Math.floor(exp.current.feels_like) - 273}&deg`;
      document.querySelector(".wind").innerHTML = `wind: ${Math.floor(exp.current.wind_speed)}m/s`;
      document.querySelector(".humidity").textContent = `humidity: ${exp.current.humidity}%`;
      document.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${exp.current.weather[0]['icon']}@2x.png">`;
      document.querySelector(".icon-day1").innerHTML = `<img src="http://openweathermap.org/img/wn/${exp.daily[0].weather[0]['icon']}@2x.png">`;
      document.querySelector(".icon-day2").innerHTML = `<img src="http://openweathermap.org/img/wn/${exp.daily[1].weather[0]['icon']}@2x.png">`;
      document.querySelector(".icon-day3").innerHTML = `<img src="http://openweathermap.org/img/wn/${exp.daily[2].weather[0]['icon']}@2x.png">`;
      document.querySelector(".latitude").innerHTML = `latitude: ${(exp.lat).toString().slice(0, 2)}&deg${(exp.lat).toString().slice(3, 5)}'`;
      document.querySelector(".longitude").innerHTML = `longitude: ${(exp.lon).toString().slice(0, 2)}&deg${(exp.lon).toString().slice(3, 5)}'`;   
    })
  })
  .catch(function() {
  })
})

const sucessfullLookup = (position) => {
  const {latitude, longitude} = position.coords;
  fetch (`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=09947a34e4e04349953704d0d8679de2&language=en&pretty=1`)
    .then(response => response.json())
    .then(function (pos) {
      //console.log(pos);
      document.querySelector(".country").textContent = pos.results[0].components.country;
      document.querySelector(".latitude").innerHTML = `latitude: ${(pos.results[0].geometry.lat).toString().slice(0, 2)}&deg${(pos.results[0].geometry.lat).toString().slice(3, 5)}'`;
      document.querySelector(".longitude").innerHTML = `longitude: ${(pos.results[0].geometry.lng).toString().slice(0, 2)}&deg${(pos.results[0].geometry.lng).toString().slice(3, 5)}'`; 
      document.querySelector(".city").textContent = pos.results[0].components.city + ",";

      fetch (`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=565978bc4df34911533625cad110876b`)
      .then(function (resp) { return resp.json() })
      .then(function (data) {
      //console.log(data);
      document.querySelector(".temp-today").innerHTML = Math.floor(data.current.temp) - 273 + "&deg";
      btnTempF.addEventListener("click", function() {
        btnTempF.classList.add("btn-active");
        btnTempC.classList.remove("btn-active");
        document.querySelector(".temp-today").innerHTML = Math.floor(data.current.temp) - 273 + "&deg";
        document.querySelector(".temp-day1").innerHTML = Math.floor(data.daily[0].temp.day) - 273 + "&deg";
        document.querySelector(".temp-day2").innerHTML = Math.floor(data.daily[1].temp.day) - 273 + "&deg";
        document.querySelector(".temp-day3").innerHTML = Math.floor(data.daily[2].temp.day) - 273 + "&deg";
        document.querySelector(".feels-like").innerHTML = `feels like: ${Math.floor(data.current.feels_like) - 273}&deg`;
    })
      btnTempC.addEventListener("click", function() {
        btnTempC.classList.add("btn-active");
        btnTempF.classList.remove("btn-active");
        document.querySelector(".temp-today").innerHTML = Math.floor(data.current.temp) - 241 + "&deg";
        document.querySelector(".temp-day1").innerHTML = Math.floor(data.daily[0].temp.day) - 241 + "&deg";
        document.querySelector(".temp-day2").innerHTML = Math.floor(data.daily[1].temp.day) - 241 + "&deg";
        document.querySelector(".temp-day3").innerHTML = Math.floor(data.daily[2].temp.day) - 241 + "&deg";
        document.querySelector(".feels-like").innerHTML = `feels like: ${Math.floor(data.current.feels_like) - 241}&deg`;
    })
      
      document.querySelector(".temp-day1").innerHTML = Math.floor(data.daily[0].temp.day) - 273 + "&deg";
      document.querySelector(".temp-day2").innerHTML = Math.floor(data.daily[1].temp.day) - 273 + "&deg";
      document.querySelector(".temp-day3").innerHTML = Math.floor(data.daily[2].temp.day) - 273 + "&deg";
      document.querySelector(".feels-like").innerHTML = `feels like: ${Math.floor(data.current.feels_like) - 273}&deg`;
      document.querySelector(".wind").innerHTML = `wind: ${Math.floor(data.current.wind_speed)}m/s`;
      document.querySelector(".humidity").textContent = `humidity: ${data.current.humidity}%`;
      document.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${data.current.weather[0]['icon']}@2x.png">`;
      document.querySelector(".icon-day1").innerHTML = `<img src="http://openweathermap.org/img/wn/${data.daily[0].weather[0]['icon']}@2x.png">`;
      document.querySelector(".icon-day2").innerHTML = `<img src="http://openweathermap.org/img/wn/${data.daily[1].weather[0]['icon']}@2x.png">`;
      document.querySelector(".icon-day3").innerHTML = `<img src="http://openweathermap.org/img/wn/${data.daily[2].weather[0]['icon']}@2x.png">`;  
    })
  .catch(function () {
  })        
    });
};
navigator.geolocation.getCurrentPosition(sucessfullLookup, console.log);


const refreshButton = document.querySelector(".refresh-btn");
const bodyBackground = document.querySelector("body");

 refreshButton.addEventListener("click", function() {
  let image = ['./images/bg-1.svg', './images/bg-2.svg', './images/bg-3.svg', './images/bg-4.png', './images/bg-5.png',
    './images/bg-6.png', './images/bg-7.png', './images/bg-8.png', './images/bg-9.jpg', './images/bg-10.png' ];
  let index = Math.floor(Math.random()*10);
  console.log(Math.floor(index*10));

  document.body.style.backgroundImage = 'url('+ `${image[index]}` + ')';
})    