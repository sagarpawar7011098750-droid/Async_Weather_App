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