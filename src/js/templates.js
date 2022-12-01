export const itemTemplate = ({ name, flags }) => `<li class='country-list-item'>
  <img class='country-list-img' src=${flags.svg} width='20px' height='15px'>
  <span'>${name.official}</span></li>`;

export const countryTemplate = ({
  name,
  capital,
  population,
  flags,
  languages,
}) => {
  const languagesList = Object.values(languages).join(', ');

  return `<div class='country-container-heading'>
  <img src=${flags.svg} width='60px' height="40px"/>
  <h2 class='country-container-title'>${name.official}</h2></div>
  <ul class='country-container-list'>
  <li><span class='country-container-item'>Capital: </span>${capital}</li>
  <li><span class='country-container-item'>Population: </span>${population}</li>
  <li><span class='country-container-item'>Languages: </span>${languagesList}</li>
  </ul>`;
};

//  <p><span class='country-container-key'>Capital: </span>${capital}</p>
// <p><span class='country-container-key'>Population: </span>${population}</p>
// <p><span class='country-container-key'>Languages: </span>${languagesList}</p>`;
