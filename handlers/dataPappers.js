const axios = require("axios");
const config = require('../config');

// axios.defaults.baseURL = 'https://api.pappers.fr/v2/entreprise?api_token=${config.TOKEN_PAPPERS}';
// axios.defaults.url.common['Authorization'] = AUTH_TOKEN;
const getDataPappers = (url) => {
  return axios.get(`https://api.pappers.fr/v2/recherche?api_token=${config.TOKEN_PAPPERS}${url}&page=1&par_page=3`)
    .then((response) => response.data)
    .catch((error) => {
      return error
    });
}

const getDataPappersSiren = siren => {
  return axios.get(`https://api.pappers.fr/v2/entreprise?api_token=${config.TOKEN_PAPPERS}${siren}`)
} 

module.exports = {
  getDataPappers,
  getDataPappersSiren
};