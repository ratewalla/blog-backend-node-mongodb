const {check} = require('express-validator');

// validation for category creation

exports.categoryCreateValidator = [
    check('name')
    .not()
    .isEmpty()
    .withMessage('name is required!'),

];