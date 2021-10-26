const utils = require('../utilities/index');
const { getDataPappers } = require('../handlers/dataPappers');

exports.paramDenomination = async (req, res, next, denomination) => {
    console.log('**********************');
    console.log('denomination', denomination);
    console.log('**********************');
    // recuperation des datas via la denomination
    const checkIfEmpty = utils.checkIfEmpty(denomination);
    if (checkIfEmpty) {
        return res.status(400).json('Merci de renseigner la dénomination');
    }
    const getInfosDenomination = await getDataPappers(`&q=${denomination}`)
    console.log('**********************');
    console.log('getInfosDenomination', getInfosDenomination);
    console.log('**********************');
    req.result = getInfosDenomination.resultats;
    next();
};

exports.paramSiren = async (req, res, next, siren) => {
    let entrepriseMatch = req.result.filter(ets => ets.siren === siren);
    if (entrepriseMatch.length === 0) {
        const checkIfEmpty = utils.checkIfEmpty(siren);
        if (checkIfEmpty) {
            return res.status(400).json('Merci de renseigner le siren');
        }
        const getInfosSiren = await getDataPappers(`&siren=${siren}`);
        req.result.push(getInfosSiren.resultats[0]);
        next();
    } else {
        req.result = entrepriseMatch;
        next();
    }
};