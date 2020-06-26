const models = require('../../models');
const { render } = require('../../app');
const { response, request } = require('express');

exports.get_products = ((request, response)=> {
    // response.render('admin/products.html')
    models.Products.findAll({
        
    })
    .then((productList) => {
        response.render('admin/products.html',{
            productList
        });
    });
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


exports.get_products_detail = ((request, response)=> {
    models.Products.findByPk(request.params.id)
    .then((product)=> {
        response.render('admin/detail.html', {
            product
        })
    });
});


exports.get_products_edit = ((request, response)=> {
    models.Products.findByPk(request.params.id)
    .then((product)=> {
        response.render('admin/edit.html', {
            product
        })
    });
});
exports.post_products_edit = ((request, response)=> {
    models.Products.update({
        name : request.body.name,
        price : request.body.price,
        description : request.body.description
    }, {
        where : { id : request.params.id }
    })
    .then(()=> {
        response.redirect('/admin/products/detail/'+request.params.id);
    });
});

exports.get_products_delete = ((request, response)=> {
    models.Products.destroy({
        where : { id : request.params.id }
    })
    .then(()=> {
        response.redirect('/admin/products');
    });
});