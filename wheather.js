const cityInputEl = document.getElementById("city-input");
const apikey = "c5adb9c1abd193764cf2dcb9bbe4f859";

const formEl = document.querySelector("form")

formEl.addEventListener("submit",(event) =>{
    event.preventDefault();
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue);
})

async function getWeatherData(cityValue) {
    try{
        let weatherDataEl;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`);

        if(!response.ok){
            throw new Error("Network response was not ok")
        }
        console.log(response);
        const data = await response.json();
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed} m/s`
        ]

       weatherDataEl = document.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`

       weatherDataEl = document.querySelector(".temperature").textContent =`${temperature}°C`;

       weatherDataEl = document.querySelector(".description").textContent = `${description}`;

       weatherDataEl = document.querySelector(".details").innerHTML = details.map((detail) =>
        ` <div>${detail}</div>  `).join("");

    }catch (error){
       
    }
}