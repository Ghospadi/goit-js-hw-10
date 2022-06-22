import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import {fetchCountries} from './fetchCounties';

const DEBOUNCE_DELAY = 300;

console.log(fetchCountries("Ukraine"));

