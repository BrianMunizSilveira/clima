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
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");
const weatherContainer = document.querySelector("#weather-data");
const errorMessageContainer = document.querySelector("#error-message");
const loader = document.querySelector("#loader");
const suggestionContainer = document.querySelector("#suggestions");
const showSuggestionsBtn = document.querySelector("#show-suggestions");
const closeSuggestionsBtn = document.querySelector("#close-suggestions");

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

// Função para buscar os dados do clima
const getWeatherData = async (city) => {
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}&lang=pt_br`;
  const response = await fetch(apiWeatherURL);
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
  const data = await getWeatherData(city);
  if (data.cod === "404") {
    errorMessageContainer.classList.remove("hide");
    return;
  }

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

  const imageUrl = await getCityImageFromUnsplash(city);
  if (imageUrl) {
    document.body.style.backgroundImage = `url("${imageUrl}")`;
  }

  weatherContainer.classList.remove("hide");
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
