const container = document.getElementById("container");
const cidade = document.getElementById("cidade");
const atualmente = document.getElementById("atualmente");

const URL="https://api.hgbrasil.com/weather?format=json-cors&key=0ef8cc7a&woeid=455867";

async function fetchClima() {
    const response = await fetch(URL);
    if(response.status === 200) {
        const json = await response.json();
        return json;
    }
}
function renderClima(main) {
    container.innerHTML = `<p class="temp"> Temperatura: ${main.results.temp}°C </p>`;
    cidade.innerHTML = `<p> Cidade: ${main.results.city_name} </p>`;
    atualmente.innerHTML = `<p> Atualmente: ${main.results.currently} ${main.results.currently === "noite" ? '<img src="./src/img/clear_night.svg" width="40"> ' : '<img src="./src/img/clear_day.svg" width="40"> '}</p> `;
}

async function main() {
    const main = await fetchClima();
    renderClima(main);
}

main();