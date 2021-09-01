console.log("client side javascript loaded");

const form = document.querySelector("form");
const input = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value == "") {
    return;
  }
  messageOne.textContent = "loading...";

  fetch(`http://localhost:3000/weather?address=${input.value}`).then(
    (response) => {
      response.json().then((data) => {
        console.log(data);
        if (data.error) {
          messageOne.textContent = data.error;
          return;
        }
        messageOne.textContent = "it is " + data.forecast.temperature + "°C";
        messageTwo.textContent = "in " + data.location;
      });
    }
  );
});
