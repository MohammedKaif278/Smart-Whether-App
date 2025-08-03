const cityInput=document.getElementById('inp')
const mainDiv = document.getElementById('main');
const loading = document.getElementById('loading');
const toggleBtn = document.getElementById('darkToggle');

 // Dark mode toggle
function toggleDarkMode() {
  document.body.classList.toggle('dark');
  // toggleBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
}
toggleBtn.addEventListener('click', toggleDarkMode);


//for enter btn
cityInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        document.getElementById('btn').click();
    }
});


//main logic
document.getElementById('btn').addEventListener('click',function()
{
    const city = cityInput.value.trim();

      if (!city) return alert("Please enter a city name!");

      loading.style.display = 'block';
      mainDiv.innerHTML = '';

     fetch(`https://api.weatherapi.com/v1/forecast.json?key=0692d8a9a25f433baae113547251807&q=${city}&days=1&aqi=no&alerts=no`)

.then((res)=>res.json())
.then(data => {
          loading.style.display = 'none';
          displayData(data);
          console.log(data);
          
        })
.catch(err => {
  loading.style.display = 'none';
          console.log(err);
          mainDiv.innerHTML = "<p>City not found 😢</p>";
        });
})

function displayData(data)
{
    const current = data.current;
      const location = data.location;
      const astro = data.forecast.forecastday[0].astro;

    const condition = current.condition.text.toLowerCase();

      // const emoji = condition.includes("sun") ? "☀️" :
      //               condition.includes("cloud") ? "⛅" :
      //               condition.includes("rain") ? "🌧️" :
      //               condition.includes("snow") ? "❄️" : "🌈";

      let weatherEmoji = "🌈";
      if (condition.includes("sunny") || condition.includes("clear")) weatherEmoji = "☀️";
      else if (condition.includes("partly") || condition.includes("cloudy")) weatherEmoji = "⛅";
      else if (condition.includes("overcast")) weatherEmoji = "☁️";
      else if (condition.includes("rain") || condition.includes("drizzle")) weatherEmoji = "🌧️";
      else if (condition.includes("thunder") || condition.includes("storm")) weatherEmoji = "⛈️";
      else if (condition.includes("snow") || condition.includes("flurries")) weatherEmoji = "❄️";
      else if (condition.includes("fog") || condition.includes("mist") || condition.includes("haze")) weatherEmoji = "🌫️";

      let tempEmoji = current.temp_c < 10 ? "🥶" :
                      current.temp_c > 25 ? "🔥" : "😊";

      //change background gradient based on condition
      if (!document.body.classList.contains("dark")) {
        if (condition.includes("rain")) {
          document.body.style.background = "linear-gradient(to right, #bdc3c7, #2c3e50)";
        } else if (condition.includes("sun")) {
          document.body.style.background = "linear-gradient(to right, #fceabb, #f8b500)";
        } else if (condition.includes("cloud")) {
          document.body.style.background = "linear-gradient(to right, #e0eafc, #cfdef3)";
        } else {
          document.body.style.background = "linear-gradient(to right, #74ebd5, #acb6e5)";
        }
      }


    // const name=document.createElement('p')
    // name.textContent =`📍 ${data.location.name}, ${data.location.region}, ${data.location.country}`
    //  name.style.fontSize="24px"


    // const localtime=document.createElement('p')
    // localtime.textContent ="⏰ Local Time :"+ data.location.localtime
    
    // const message=document.createElement('p')
    // message.textContent =`Condition: ${emoji} ${data.current.condition.text}`

    // const Image = document.createElement('img');
    // Image.src = data.current.condition.icon
    //   Image.alt = data.current.condition.text;
      
    //  const temp=document.createElement('p')
    // temp.innerHTML=`🌡️ <span class="temp">${data.current.temp_c}<sup>°C</sup></span>`;
    // temp.style.fontSize="26px"

    // const humidity = document.createElement('p');
    // humidity.textContent= ` 💧 Humidity :${data.current.humidity}%`

    // mainDiv.append(Image,temp,name,localtime,message,humidity)
    // cityInput.value=''


    const icon = document.createElement('img');
      icon.src = current.condition.icon;
      icon.alt = current.condition.text;
      icon.title = `Condition: ${current.condition.text}`;
      
      const temp = document.createElement('p');
      temp.innerHTML = `🌡️ <span class="bold">${current.temp_c}<sup>°C</sup> ${tempEmoji}</span>`;

      const topRow = document.createElement('div');
      topRow.className = "top-row";
      topRow.append(icon, temp);

      const name = document.createElement('p');
      name.innerHTML = `📍 <span class="bold">${location.name}-${location.region}-${location.country}</span>`;

      const time = document.createElement('p');
      time.innerHTML = `🕒 <span class="bold">${location.localtime}</span>`;

      const message = document.createElement('p');
      message.innerHTML = `${weatherEmoji} <span class="bold">${current.condition.text}</span>`;

      const humidity = document.createElement('p');
      humidity.innerHTML = `💧 Humidity: <span class="bold">${current.humidity}%</span>`;

      const sunrise = document.createElement('p');
      sunrise.innerHTML = `🌅 Sunrise: <span class="bold">${astro.sunrise}</span>`;

      const sunset = document.createElement('p');
      sunset.innerHTML = `🌇 Sunset: <span class="bold">${astro.sunset}</span>`;

      const moonrise = document.createElement('p');
      moonrise.innerHTML = `🌙 Moonrise: <span class="bold">${astro.moonrise}</span>`;

      const moonset = document.createElement('p');
      moonset.innerHTML = `🌘 Moonset: <span class="bold">${astro.moonset}</span>`;

      const moonphase = document.createElement('p');
      moonphase.innerHTML = `🌖 Moon Phase: <span class="bold">${astro.moon_phase}</span>`;

      mainDiv.append(topRow, name, time, message, humidity, sunrise, sunset, moonrise, moonset, moonphase);
      cityInput.value = '';
    

  }
  
 