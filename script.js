const apiKey = "e95eb077ed69a6a387ac5e3bde38b47a";
const city = "London,uk";

document.getElementById("getWeatherBtn").addEventListener("click", async () => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  
  try 
  {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
		        'Accept': 'application/json'
		      }
    });

    if (!response.ok) 
	{
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const weatherMain = data.weather[0].main;
    document.getElementById("weatherData").textContent = `Current weather in London: ${weatherMain}`;
  } 
  catch (error) 
  {
    document.getElementById("weatherData").textContent = `Error fetching weather data: ${error.message}`;
  }
});
