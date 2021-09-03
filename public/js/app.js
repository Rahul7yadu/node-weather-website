console.log("client side javascript loaded");

const form = document.querySelector("form");
const input = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const main = document.querySelector(".main")
const img = document.querySelector(".img")
const humidity = document.querySelector(".humidity")
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value == "") {
    return;
  }
  messageOne.textContent = "loading...";
   
  fetch(`/weather?address=${input.value}`).then(
    (response) => {
      response.json().then((data) => {
        console.log(data);
        if (data.error) {
          messageOne.textContent = data.error;
          return;
        }
        messageOne.textContent = "it is " + data.forecast.temperature + "°C. but  feels like " + data.forecast.feelslike + " °C.";
        messageTwo.textContent = "in " + data.location;
        main.textContent = data.forecast.weather_descriptions[0];
        img.src = data.forecast.weather_icons[0]
        humidity.textContent = "Humidity:" + data.forecast.humidity
        console.log("hello ji")
        
      });
    }
  );
});
