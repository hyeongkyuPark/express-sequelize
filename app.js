const express = require('express');
const nunjucks = require('nunjucks');
const logger = require('morgan');
const bodyPaser = require('body-parser');
const { response } = require('express');
const db = require('./models');

class App {
    constructor() {
        this.app = express();

        //db연결
        this.dbConnection();

        //nunjucks 설정
        this.setViewEngine();
        
        //미들웨어 세팅
        this.setMiddleWare();

        //정적 경로 설정
        this.setStatic();
        
        //템플릿 변수 설정
        this.setLocals();
        
        //라우터 설정(컨트롤러)
        this.setRouter();

        //404에러 설정
        this.status404();

        //에러 핸들러
        this.errorHandler();
    }

    setMiddleWare() {
        this.app.use(logger('dev'));
        this.app.use(bodyPaser.json());
        this.app.use(bodyPaser.urlencoded({extended: false}));
    }

    dbConnection() {
        db.sequelize.authenticate()
        .then(()=>{
            console.log('Connection has been established successfully.');
        })
        .then(()=>{
            console.log('DB Sync complete.');
            // return db.sequelize.sync();
        })
        .catch(err => {
            console.error('Unable to connect to the database', err);
        });
    }

    setViewEngine() {
        nunjucks.configure('template', {
            autoescape: true,
            express: this.app
        });
    }

    setStatic() {
        this.app.use('/uploads', express.static('uploads'));
    }


    setLocals() {
        //템플릿 변수
        this.app.use((request, response, next) => {
            this.app.locals.isLogin = true;
            this.app.locals.request_path = request.path;
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