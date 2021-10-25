const axios = require("axios");
const config = require('../config');

const getDataInsee = (url) => {
  return axios({
    baseURL: `https://api.insee.fr/entreprises/sirene/V3`,
    url,
    headers: {
      Authorization: `Bearer ${config.TOKEN_INSEE}`,
    },
  })
    .then((response) => response.data)
    .catch((error) => error.response.data);
};

const infosViaSiren = (siren) => getDataInsee(`/siren/${siren}`);
const infosViaSiret = (siret) => getDataInsee(`/siret/${siret}`);

module.exports = {
  infosViaSiren,
  infosViaSiret
}