import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCounties';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');

input.addEventListener('input', debounce(onCountriesInput, DEBOUNCE_DELAY));

const ifWrongAlert = () => {
  Notiflix.Notify.failure('Oops, there is no country with that name');
};

const ifManyAlert = () => {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
};

console.log(fetchCountries('ukraine'));

function onCountriesInput() {
  const name = input.value.trim();
  if (name === '') {
    return (list.innerHTML = ''), (info.innerHTML = '');
  }

  fetchCountries(name)
    .then(country => {
      list.innerHTML = '';
      info.innerHTML = '';

      if (country.length === 1) {
        info.insertAdjacentHTML('beforeend', markupCountryInfo(country));
      } else if (country.length >= 10) {
        ifManyAlert();
      } else {
        list.insertAdjacentHTML('beforeend', markupCountriesList(country));
      }
    })
    .catch(ifWrongAlert);
}

function markupCountriesList(country) {
  return country
    .map(({ name, flags }) => {
      return `
        <li class="country-list__item">
            <img class="country-list__item--flag" src="${flags.svg}" alt="Flag of ${name.official}">
            <h2 class="country-list__item--name">${name.official}</h2>
        </li>
        `;
    })
    .join('');
}

function markupCountryInfo(country) {
  return country.map(({ name, flags, capital, population, languages }) => {
    return `<ul class="country-info__list">
    <li class="country-info__list--item">
        <img class="country-info__list--img" src="${flags.png}" alt="Flag of ${
      name.official
    }" /><h1>${name.official}</h1>
    </li>
    <li class="country-info__list--item"><span class="country-info__item--text">Capital: </span>${capital}</li>
    <li class="country-info__list--item"><span class="country-info__item--text">Population: </span>${population}</li>
    <li class="country-info__list--item"><span class="country-info__item--text">Languages: </span>${Object.values(
      languages
    ).join(', ')}</li>
    </ul>`;
  });
}
