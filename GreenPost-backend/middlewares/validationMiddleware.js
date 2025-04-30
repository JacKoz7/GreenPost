// walidacja danych po stronie serwera
const { body, validationResult } = require('express-validator');

const validateRegistration = [
  body('Username')
    .isLength({ min: 3 })
    .withMessage('Username musi mieć co najmniej 3 znaki'),
  
  body('Password')
    .isLength({ min: 4 })
    .withMessage('Hasło musi mieć co najmniej 4 znaki'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }
    next();
  },
];

module.exports = { validateRegistration };