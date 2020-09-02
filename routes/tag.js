const express = require('express');
const router = express.Router();
const {create, list, read, remove} = require('../controllers/tag');


// validators
const {runValidation} = require('../validators')
const {tagCreateValidator} = require('../validators/tag')
const {requireSignin,adminMiddleware} = require('../controllers/auth')


router.post('/tag', tagCreateValidator, requireSignin, runValidation,requireSignin, adminMiddleware, create);
router.get('/tags', list);
router.get('/tag/:slug', read);
router.delete('/tag/:slug', remove, requireSignin, adminMiddleware);


module.exports = router;