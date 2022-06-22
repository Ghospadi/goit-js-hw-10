const baseUrl = 'https://restcountries.com/v3.1/name/';
const InfoFields = 'fields=name,capital,population,flags,languages';

export function fetchCountries(name) {
    return fetch(`${baseUrl}${name}?${InfoFields}`)
    .then(response => response.json())
    .catch(error => console.log(error));
};