const checkIfEmpty = e => e.trim().length === 0 ? true : false;

const getInfosDataInsee = data => {
    return ({
        address: `${data?.etablissement?.adresseEtablissement?.numeroVoieEtablissement} ${data?.etablissement?.adresseEtablissement?.typeVoieEtablissement} ${data?.etablissement?.adresseEtablissement?.libelleVoieEtablissement} ${data?.etablissement?.adresseEtablissement?.codePostalEtablissement}`,
        creationDate: data?.etablissement?.dateCreationEtablissement,
        denomination: data?.etablissement?.uniteLegale?.denominationUniteLegale,
    });
};

const formatDataPappers = data => {
    let dataToReturn = {
        siren: data.siren,
        denomination: data.denomination,
        forme_juridique: data.forme_juridique,
        nic: data?.siege?.nic,
        adresse_ligne_1: data?.siege?.adresse_ligne_1,
        code_postal: data?.siege?.code_postal,
        ville: data?.siege?.ville,
        date_creation_formate: data.date_creation_formate,
        capital: data.capital,
        statut_rcs: data.statut_rcs,
    };
    return dataToReturn;
}

const catchError = (res, data) => {
    res.status(data?.statut).json(data?.message)
}

module.exports = {
    getInfosDataInsee,
    checkIfEmpty,
    formatDataPappers,
    catchError
}