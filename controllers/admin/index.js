const {Router} = require('express');
const router = Router();
const ctrl = require('./admin.ctrl.js')

router.use('/products', ctrl.get_products);


module.exports = router;