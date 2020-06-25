const express = require('express');
const nunjucks = require('nunjucks');
const logger = require('morgan');
const bodyPaser = require('body-parser');
const { response } = require('express');

class App {
    constructor() {
        this.app = express();

        this.setMiddleWare();

        this.setViewEngine();

        this.setRouter();

        this.setStatic();

        this.setLoclas();

        this.status404();

        this.errorHandler();
    }

    setMiddleWare() {
        this.app.use(logger('dev'));
        this.app.use(bodyPaser.json());
        this.app.use(bodyPaser.urlencoded({extended: false}));
    }

    setViewEngine() {
        nunjucks.configure('template', {
            autoescape: true,
            express: app
        });
    }

    setStatic() {
        this.app.use('/uploads', express.static('uploads'));
    }

    setLoclas() {
        this.app.use((request, response, next)=> {
            response.locals.isLogin = true;
            response.locals.request_path = request.path;
            next();
        });
    }

    setRouter() {
        this.app.use(require('./controllers'));
    }

    status404() {
        this.app.use((request, response, _)=> {
            response.status(404).render('common/404.html');
        });
    }

    errorHandler() {
        this.app.use((request, response, _)=> {
            response.status(500).render('common/500.html');
        });
    }

}


module.exports = new App().app;