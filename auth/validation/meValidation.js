const { check, validationResult } = require('express-validator/check');

const rules = [
    check('x-access-token', 'no jwt token provided')
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
