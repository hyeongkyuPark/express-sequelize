const models = require('../../models');

exports.get_products = ((request, response)=> {
    response.render('admin/products.html')
});


exports.get_products_write = ((request, response)=> {
    response.render('admin/write.html')
});

exports.post_products_write = ((request, response)=> {
    // response.send(request.body);
    models.Products.create(request.body)
    .then(()=>{
        response.redirect('/admin/products');
    });
});