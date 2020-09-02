const {check} = require('express-validator');

// validation for tag creation

exports.tagCreateValidator = [
    check('name')
    .not()
    .isEmpty()
    .withMessage('name is required!'),

];