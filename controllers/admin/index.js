const {Router} = require('express');
const router = Router();
const ctrl = require('./admin.ctrl.js')

router.get('/', (request, response)=>{
    response.send('admin app');
});

router.get('/products', (ctrl.get_products));

router.get('/products/write', (ctrl.get_products_write));
router.post('/products/write', (ctrl.post_products_write));

module.exports = router;