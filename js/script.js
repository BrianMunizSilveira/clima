// Variáveis e seleção de elementos
const apikey = "fcad188101912a8d02002e4f173f6f6a";
const apiCountryURL = "https://flagsapi.com/";
const accessKeyUnsplash = "zeA0f7uTXuwzbmC6i27FlijyZr9ze3Dq1bf1LDiqjSQ"; 

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

const errorMessageContainer = document.querySelector("#error-message");
const loader = document.querySelector("#loader");

const suggestionContainer = document.querySelector("#suggestions");
const suggestionButtons = document.querySelectorAll("#suggestions button");

// Loader 
const toggleLoader = () => {
    loader.classList.toggle("hide");
}

// Funções
const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}&lang=pt_br`;

    const response = await fetch(apiWeatherURL);
    const data = await response.json();

    return data;
}

// Função para buscar várias imagens da cidade na Unsplash e selecionar uma aleatoriamente
const getRandomUnsplashImage = async (city) => {
    const apiUnsplashURL = `https://api.unsplash.com/search/photos?query=${city}&per_page=5&client_id=${accessKeyUnsplash}`;

    try {
        const response = await fetch(apiUnsplashURL);
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
            // Gerar um índice aleatório para selecionar uma das imagens
            const randomIndex = Math.floor(Math.random() * data.results.length);
            return data.results[randomIndex].urls.full;
        } else {
            throw new Error("Nenhuma imagem encontrada para essa cidade.");
        }
    } catch (error) {
        console.error('Erro ao buscar imagem no Unsplash:', error);
        return null; // Retorna null caso dê erro
    }
}

// Tratando erros
const showErrorMessage = () => {
    errorMessageContainer.classList.remove("hide");
};

const hideInformation = () => {
    errorMessageContainer.classList.add("hide");
    weatherContainer.classList.add("hide");

    suggestionContainer.classList.add("hide");
};

const showWeatherData = async (city) => {
    hideInformation();

    const data = await getWeatherData(city);

    if (data.cod === "404") {
        showErrorMessage();
        return;
    }

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    );
    countryElement.setAttribute("src", apiCountryURL + data.sys.country + "/flat/64.png");
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}Km/h`;

    // Buscar uma imagem aleatória da cidade na Unsplash
    const imageUrl = await getRandomUnsplashImage(city);

    if (imageUrl) {
        document.body.style.backgroundImage = `url("${imageUrl}")`;
    } else {
        console.log("Imagem não encontrada para a cidade:", city);
    }

    weatherContainer.classList.remove("hide");
}

// Eventos
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value;

    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        const city = e.target.value;
        showWeatherData(city);
    }
});

// Sugestões
suggestionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const city = btn.getAttribute("id");
        showWeatherData(city);
    });
});
