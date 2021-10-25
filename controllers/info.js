const handlers = require('../handlers');
const utils = require('../utilities');

const getInfos = async (req, res) => {
    let data = [];
    for (const ent of req.result) {
        let dataTempo = {...utils.formatDataPappers(ent)}
        const phone = await handlers.dataGoogle.scrappingGoogle(dataTempo)
                    || await handlers.dataGoogle.scrappingGoogle(dataTempo)
                    || await handlers.dataGoogle.infoGoogleSearch(dataTempo)
                    || await handlers.dataPJ.scrappingPJ(dataTempo);
        dataTempo.telephone = phone;
        data.push(dataTempo);
    }

    res.status(200).json(data);
    return data;
};

module.exports = {
    getInfos,
}