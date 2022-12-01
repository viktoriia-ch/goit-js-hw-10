// IMPORTS
import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import { itemTemplate, countryTemplate } from './js/templates';
import { Notify } from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  container: document.querySelector('.country-info'),
};

// FUNCTIONS
const clearList = () => {
  refs.list.innerHTML = '';
};

const clearContainer = () => {
  refs.container.innerHTML = '';
};

const renderList = countries => {
  const country = countries.map(itemTemplate).join('');
  refs.list.insertAdjacentHTML('beforeend', country);
};

const renderContainer = countries => {
  if (refs.container.innerHTML === '') {
    const country = countryTemplate(countries[0]);
    refs.container.insertAdjacentHTML('beforeend', country);
  }
};

const onError = () => {
  clearList();
  clearContainer();
  Notify.failure('Oops, there is no country with that name');
};

const showInfoNotification = () => {
  clearList();
  clearContainer();
  Notify.info('Too many matches found. Please enter a more specific name.');
};

const showCountriesList = countries => {
  clearContainer();
  clearList();
  renderList(countries);
};

const showCountryInfo = countries => {
  clearList();
  clearContainer();
  renderContainer(countries);
};

const showCountries = countries => {
  if (countries.length > 10) {
    showInfoNotification();
  }

  if (countries.length >= 2 && countries.length < 10) {
    showCountriesList(countries);
  }

  if (countries.length === 1) {
    showCountryInfo(countries);
  }
};

const onInputName = e => {
  const { value } = e.target;
  if (value.trim() === '') {
    clearList();
    clearContainer();
  }

  fetchCountries(value)
    .then(response => response.json())
    .then(countries => {
      if (countries.status === 404) {
        throw new Error();
      }
      showCountries(countries);
    })
    .catch(onError);
};

refs.input.addEventListener('input', debounce(onInputName, DEBOUNCE_DELAY));
