const models = require('../../models');
const { render } = require('../../app');
const { response, request } = require('express');

exports.get_products = (async (request, response)=> {
    // response.render('admin/products.html')
    const productList = await models.Products.findAll();
    response.render('admin/products.html',{productList});
});

exports.get_products_write = ((request, response)=> {
    response.render('admin/write.html')
});
exports.post_products_write = (async (request, response)=> {
    // response.send(request.body);
    await models.Products.create(request.body)
    response.redirect('/admin/products');
});


exports.get_products_detail = (async (request, response)=> {
    const product = await models.Products.findByPk(request.params.id);
    response.render('admin/detail.html', {product});
});


exports.get_products_edit = (async (request, response)=> {
    const product = await models.Products.findByPk(request.params.id);
    response.render('admin/edit.html', {product});
});
exports.post_products_edit = (async (request, response)=> {
    await models.Products.update({
        name : request.body.name,
        price : request.body.price,
        description : request.body.description
    }, {
        where : { id : request.params.id }
    });
    response.redirect('/admin/products/detail/'+request.params.id);
});

exports.get_products_delete = (async (request, response)=> {
    await models.Products.destroy({
        where : { id : request.params.id }
    });
    response.redirect('/admin/products');
    
});