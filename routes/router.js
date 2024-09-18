const { Router } = require('express');
const router = Router();
const controller = require('../controllers/controller');

router.get('/', controller.listGet)
router.get('/item/:id', controller.itemGet);
router.get('/new', controller.newGet);
router.post('/newShow', controller.newShowPost);

module.exports = router;