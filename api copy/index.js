const express = require('express');
const router = express.Router();
const infoCtrl = require('../controllers/info');
const { paramDenomination, paramSiren } = require('../controllers/params');

router.param('denomination', paramDenomination);
router.param('siren', paramSiren);

router.get('/entreprise/:denomination/:siren?/:codePostal?/:ville?/:adresse?', infoCtrl.getInfos);

module.exports = router;