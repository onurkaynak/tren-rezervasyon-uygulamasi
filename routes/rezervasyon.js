const express = require('express');
const expressValidator = require('express-validator');

const { postRezervasyon } = require('../controllers/rezervasyon');
const { checkValidationResult } = require('../middlewares');

const router = express.Router();

router.post('',
  express.json(),
  [
    expressValidator.body('Tren')
      .exists().withMessage('Tren bilgisi zorunludur.')
      .isObject().withMessage('Tren bilgisi object tipinde olmalıdır.'),
    expressValidator.body('Tren.Vagonlar')
      .exists().withMessage('Vagonlar bilgisi zorunludur.')
      .isArray({ min: 1 }).withMessage('Vagonlar bilgisi array tipinde olmalıdır ve en az bir tane vagon bilgisi sağlanmalıdır.'),
    expressValidator.body('Tren.Vagonlar.*')
      .custom(value => {
        if (value.Kapasite < value.DoluKoltukAdet) {
          throw new Error('DoluKoltukAdet sayısı Kapasite sayısını aşmamalıdır.');
        }

        return true
      }),
    expressValidator.body('Tren.Vagonlar.*.Ad')
      .exists().withMessage('Vagon Ad bilgisi zorunludur.')
      .isString().withMessage('Vagon Adı bilgisi string tipinde olmalıdır.')
      .notEmpty().withMessage('Vagon Adı boş string olmamalıdır.')
      .custom((value, { req }) => {
        if (req.body.Tren.Vagonlar.filter(vagon => vagon.Ad === value).length > 1) {
          throw new Error('Vagon Adı unique olmalıdır.');
        }

        return true
      }),
    expressValidator.body('Tren.Vagonlar.*.Kapasite')
      .exists().withMessage('Vagon Kapasite bilgisi zorunludur.')
      .isInt({ min: 1 }).withMessage('Vagon Kapasite bilgisi 1\'den büyük integer tipinde olmalıdır.'),
    expressValidator.body('Tren.Vagonlar.*.DoluKoltukAdet')
      .exists().withMessage('Vagon DoluKoltukAdet bilgisi zorunludur.')
      .isInt({ min: 0 }).withMessage('Vagon DoluKoltukAdet bilgisi 0\'dan büyük integer tipinde olmalıdır.'),
    expressValidator.body('Tren.RezervasyonYapilacakKisiSayisi')
      .exists().withMessage('RezervasyonYapilacakKisi bilgisi zorunludur.')
      .isInt({ min: 0 }).withMessage('RezervasyonYapilacakKisi bilgisi 0\'dan büyük integer tipinde olmalıdır.'),
    expressValidator.body('Tren.KisilerFarkliVagonlaraYerlestirilebilir')
      .exists().withMessage('KisilerFarkliVagonlaraYerlestirilebilir bilgisi zorunludur.')
      .isBoolean().withMessage('KisilerFarkliVagonlaraYerlestirilebilir bilgisi boolean tipinde olmalıdır.'),
    checkValidationResult
  ],
  postRezervasyon
);

module.exports = router;
