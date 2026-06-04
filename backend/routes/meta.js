const router = require('express').Router();
const {
  COUNTRIES,
  COUNTRY_LABELS,
  SPECIALISATIONS,
  SPECIALISATION_LABELS,
  INTAKES,
} = require('../config/constants');

router.get('/options', (req, res) => {
  res.json({
    countries: COUNTRIES.map((c) => ({ value: c, label: COUNTRY_LABELS[c] })),
    specialisations: SPECIALISATIONS.map((s) => ({ value: s, label: SPECIALISATION_LABELS[s] })),
    intakes: INTAKES,
  });
});

module.exports = router;
