const { check, validationResult } = require('express-validator/check');

const rules = [

    check('email', 'Email is not valid').isEmail().trim().normalizeEmail().exists(),
    check('password', 'passwords is not valid')
    .exists()
];

module.exports = {
    rules,
    nextMiddlware(req,res,next){
        const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.mapped() });
          }

          next();

    }
};
