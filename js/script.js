// Chaves de API
const apikey = "fcad188101912a8d02002e4f173f6f6a";
const accessKeyUnsplash = "zeA0f7uTXuwzbmC6i27FlijyZr9ze3Dq1bf1LDiqjSQ";

// Seleção de elementos
const apiCountryURL = "https://flagsapi.com/";
const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");
const continentSelect = document.querySelector("#continent-select");
const citySelect = document.querySelector("#city-select");
const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity .detail-value");
const windElement = document.querySelector("#wind .detail-value");
const weatherContainer = document.querySelector("#weather-data");
const errorMessageContainer = document.querySelector("#error-message");
const loadingOverlay = document.querySelector("#loading-overlay");
const suggestionContainer = document.querySelector("#suggestions");
const themeToggle = document.querySelector("#theme-toggle");
const forecastContainer = document.querySelector("#forecast-container");
const forecastCards = document.querySelector(".forecast-cards");

// Mapeamento de cidades por continente
const citiesByContinent = {
  america: [
    "Nova York",
    "Los Angeles",
    "São Paulo",
    "Buenos Aires",
    "Toronto",
    "Vancouver",
    "Rio de Janeiro",
    "México",
    "Lima",
    "Santiago",
    "Caracas",
    "Montréal",
    "Bogotá",
    "Quito",
  ],
  europa: [
    "Paris",
    "Londres",
    "Roma",
    "Madri",
    "Berlim",
    "Amsterdã",
    "Lisboa",
    "Praga",
    "Budapeste",
    "Viena",
    "Zurique",
    "Copenhague",
    "Estocolmo",
    "Bruxelas",
    "Barcelona",
    "Milão",
    "Atenas",
  ],
  asia: [
    "Tóquio",
    "Pequim",
    "Dubai",
    "Seul",
    "Bangkok",
    "Hong Kong",
    "Kuala Lumpur",
    "Cingapura",
    "Mumbai",
    "Deli",
    "Manila",
    "Jacarta",
    "Bangladesh",
    "Moscovo",
    "Calcutá",
    "Yangon",
    "Hanoi",
  ],
  africa: [
    "Cidade do Cabo",
    "Cairo",
    "Lagos",
    "Nairóbi",
    "Joanesburgo",
    "Casablanca",
    "Dacar",
    "Tunis",
    "Abuja",
    "Lagos",
    "Addis Abeba",
    "Accra",
    "Algiers",
    "Kigali",
    "Lomé",
    "Banjul",
    "Marrakech",
  ],
  oceania: [
    "Sydney",
    "Melbourne",
    "Auckland",
    "Wellington",
    "Suva",
    "Port Vila",
    "Fiji",
    "Nouméa",
    "Auckland",
    "Honiara",
    "Apia",
    "Port Moresby",
    "Papeete",
    "Nadi",
  ],
};

// Função para buscar os dados do clima atual
const getWeatherData = async (city) => {
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}&lang=pt_br`;
  const response = await fetch(apiWeatherURL);
  const data = await response.json();
  return data;
};

// Função para buscar previsão do tempo para os próximos dias
const getForecastData = async (lat, lon) => {
  const apiForecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apikey}&lang=pt_br`;
  const response = await fetch(apiForecastURL);
  const data = await response.json();
  return data;
};

// Função para buscar imagens da cidade
const getCityImageFromUnsplash = async (city) => {
  const apiUnsplashURL = `https://api.unsplash.com/search/photos?query=${city}&per_page=5&client_id=${accessKeyUnsplash}`;
  try {
    const response = await fetch(apiUnsplashURL);
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.results.length);
      return data.results[randomIndex].urls.full;
    } else {
      throw new Error("Nenhuma imagem encontrada para essa cidade.");
    }
  } catch (error) {
    console.error("Erro ao buscar imagem no Unsplash:", error);
    return null;
  }
};

// Mapeamento de ícones SVG animados
const weatherIconsMap = {
  clear: "sunny.svg",
  clouds: "cloudy.svg",
  rain: "rainy.svg",
  snow: "snow.svg",
  drizzle: "drizzle.svg",
  thunderstorm: "thunderstorm.svg",
};

// Função para mostrar os dados do clima
const showWeatherData = async (city) => {
  // Mostrar overlay de carregamento
  loadingOverlay.classList.remove("hide");
  errorMessageContainer.classList.add("hide");

  try {
    const data = await getWeatherData(city);
    if (data.cod === "404") {
      errorMessageContainer.classList.remove("hide");
      weatherContainer.classList.add("hide");
      forecastContainer.classList.add("hide");
      loadingOverlay.classList.add("hide");
      return;
    }

    // Atualizar dados do clima atual
    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed} Km/h`;

    const weatherCondition = data.weather[0].main.toLowerCase();
    const iconFile = weatherIconsMap[weatherCondition] || "default.svg";
    weatherIconElement.setAttribute("src", `icons/${iconFile}`);

    const countryCode = data.sys.country.toUpperCase();
    countryElement.setAttribute(
      "src",
      `${apiCountryURL}${countryCode}/flat/64.png`
    );

    // Buscar e mostrar previsão para os próximos dias
    const forecastData = await getForecastData(data.coord.lat, data.coord.lon);
    showForecastData(forecastData);

    // Buscar e aplicar imagem de fundo
    const imageUrl = await getCityImageFromUnsplash(city);
    if (imageUrl) {
      document.body.style.backgroundImage = `url("${imageUrl}")`;
    }

    // Mostrar os containers de dados
    weatherContainer.classList.remove("hide");
    forecastContainer.classList.remove("hide");

    // Adicionar classe para animação de entrada
    weatherContainer.classList.add("fade-in");
    forecastContainer.classList.add("fade-in");
  } catch (error) {
    console.error("Erro ao buscar dados do clima:", error);
    errorMessageContainer.classList.remove("hide");
  } finally {
    // Esconder overlay de carregamento
    loadingOverlay.classList.add("hide");
  }
};

// Função para mostrar previsão do tempo para os próximos dias
const showForecastData = (data) => {
  // Limpar cards anteriores
  forecastCards.innerHTML = "";

  // Filtrar previsões para pegar apenas uma por dia (ao meio-dia)
  const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 5);

  // Criar um card para cada dia
  dailyForecasts.forEach(forecast => {
    const date = new Date(forecast.dt * 1000);
    const dayName = date.toLocaleDateString("pt-BR", { weekday: "short" });
    const formattedDate = date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });

    const weatherCondition = forecast.weather[0].main.toLowerCase();
    const iconFile = weatherIconsMap[weatherCondition] || "default.svg";

    const forecastCard = document.createElement("div");
    forecastCard.classList.add("forecast-card");

    forecastCard.innerHTML = `
      <p class="forecast-date">${dayName}, ${formattedDate}</p>
      <img src="icons/${iconFile}" alt="${forecast.weather[0].description}" class="forecast-icon">
      <p class="forecast-temp">${parseInt(forecast.main.temp)}&deg;C</p>
      <p class="forecast-desc">${forecast.weather[0].description}</p>
    `;

    forecastCards.appendChild(forecastCard);
  });
};

// Preencher as cidades com base no continente selecionado
continentSelect.addEventListener("change", () => {
  const continent = continentSelect.value;
  citySelect.innerHTML = '<option value="">Selecione uma cidade</option>'; // Limpa as cidades
  if (continent && citiesByContinent[continent]) {
    citySelect.disabled = false;
    citiesByContinent[continent].forEach((city) => {
      const option = document.createElement("option");
      option.value = city;
      option.textContent = city;
      citySelect.appendChild(option);
    });
  } else {
    citySelect.disabled = true;
  }
});

// Evento para o botão de pesquisa
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const city = citySelect.value || cityInput.value;
  if (city) {
    showWeatherData(city);
  }
});

// Evento para pesquisa ao pressionar Enter
cityInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    const city = cityInput.value;
    if (city) {
      showWeatherData(city);
    }
  }
});

// Evento para seleção de cidade no dropdown
citySelect.addEventListener("change", () => {
  const city = citySelect.value;
  if (city) {
    showWeatherData(city);
  }
});
