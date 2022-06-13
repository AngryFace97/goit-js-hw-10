import './css/styles.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const searchCountry = e => {
  const name = searchBox.value.trim();

  fetchCountries(name)
    .then(data => {
      countriesData(data);
    })
    .catch(error => {
      if (name !== '') {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
    });

  e.preventDefault();
};

function countriesData(data) {
  if (data.length > 10) {
    clearData(countryList);
    clearData(countryInfo);

    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (data.length > 1 && data.length <= 10) {
    clearData(countryList);
    clearData(countryInfo);

    return (countryList.innerHTML = data
      .map(
        item => 
        `<li class = 'country'>
        <img src = '${item.flags.svg}' />
        <p>${item.name}</p>
        </li>`
      )
      .join(''));
  } else {
    clearData(countryList);
    clearData(countryInfo);

    return (countryInfo.innerHTML = data
      .map(
        item => 
        ` <div class = 'country'>
                <div class = 'country-body'>
                     <div class = 'img-name'>
                        <img class = 'img-country' src = '${item.flags.svg}' />
                        <h3>${item.name}</h3>
                    </div>
                    <p><b>Region: </b> ${item.region}</p>
                    <p><b>Capital: </b> ${item.capital}</p>
                    <p><b>Population: </b> ${item.population.toLocaleString()}</p>
                    <p><b>Languages: </b> ${item.languages[0].name}</p>
                </div>
            </div> `
      )
      .join(''));
  }
}

searchBox.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function clearData(output) {
  output.innerHTML = '';
}