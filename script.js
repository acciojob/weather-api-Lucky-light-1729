const apiKey = "e95eb077ed69a6a387ac5e3bde38b47a";
const city = "London";

document.getElementById("getWeatherBtn").addEventListener("click", () => {
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    const weatherMain = data.weather[0].main;
    document.getElementById("weatherData").textContent = `Current weather in London: ${weatherMain}`;
  })
  .catch(error => {
    document.getElementById("weatherData").textContent = `Error fetching weather data: ${error.message}`;
  });
});

describe("Weather App", () => {
  it("should fetch and display weather data", () => {
    cy.intercept('GET', '**/data/2.5/weather**').as('getCurrentWeather');

    cy.visit('/'); // or wherever your page loads

    cy.get('#getWeatherBtn').click();

    cy.wait('@getCurrentWeather'); // Cypress waits for the network request

    cy.get('#weatherData')
      .should('contain.text', 'Current weather in London');
  });
});
