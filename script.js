// DOM Elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherDisplay = document.getElementById('weatherDisplay');
const historyList = document.getElementById('historyList');
const customConsole = document.getElementById('customConsole');

// 2. Simple function to print messages to our on-screen console
function printToConsole(message) {
    console.log(message);
    customConsole.innerHTML += `<p>> ${message}</p>`;
}

// 3. Load past searches from Local Storage
function loadHistory() {
    historyList.innerHTML = ''; // Clear the list first
    const savedCities = JSON.parse(localStorage.getItem('weatherHistory')) || [];
    
    savedCities.forEach(city => {
        const li = document.createElement('li');
        li.textContent = city;
        li.style.cursor = 'pointer';
        li.style.color = 'blue';
        li.onclick = () => fetchWeather(city); // Search again if clicked
        historyList.appendChild(li);
    });
}
// 4. The main Async function to get the weather
async function fetchWeather(city) {
    if (city === "") return; // Do nothing if input is empty

    printToConsole(`1. [Sync] Starting search for: ${city}`);
    weatherDisplay.innerHTML = `<p>Loading...</p>`;

    try {
        printToConsole(`2. [Async] Waiting for API response...`);
        
        // Fetch the data
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        
        if (!response.ok) {
            throw new Error("City not found");
        }

        printToConsole(`3. [Async] Data received, unpacking JSON...`);
        const data = await response.json();
        
        printToConsole(`4. [Sync] Updating UI with weather info.`);
        
        // Display the weather
        weatherDisplay.innerHTML = `
            <h3>${data.name}, ${data.sys.country}</h3>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Condition: ${data.weather[0].description}</p>
        `;
        
        // Save this successful search to Local Storage
        let history = JSON.parse(localStorage.getItem('weatherHistory')) || [];
        if (!history.includes(data.name)) {
            history.push(data.name);
            localStorage.setItem('weatherHistory', JSON.stringify(history));
            loadHistory(); // Refresh the on-screen list
        }

    } catch (error) {
        printToConsole(`❌ [Error] ${error.message}`);
        weatherDisplay.innerHTML = `<p style="color:red;">Error: ${error.message}. Try again.</p>`;
    }

    printToConsole(`5. [Sync] fetchWeather function finished.`);
}