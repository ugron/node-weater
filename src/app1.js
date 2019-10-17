    // after 46


    const path = require('path');

    // npm package "express"  https://expressjs.com/ja/4x/api.html
    const express = require('express');
    // npm package "hbs"
    const hbs = require('hbs');
    // npm package "request"  https://www.npmjs.com/package/request
    const request = require('request');

    // module import
    const geocode = require('./utils/geocode');
    const forecast = require('./utils/forecast');

   

    // node.js path
    console.log(__dirname); // /Users/mbp/Desktop/complete Node-js/web-server/src/app.js
    // console.log(__filename); // Sever is up on port 3000.
    // console.log(path.join(__dirname) ); // /Users/mbp/Desktop/complete Node-js/web-server/src
    // console.log(path.join(__dirname, '..') ); // /Users/mbp/Desktop/complete Node-js/web-server

    // console.log(path.join(__dirname, '../public') ); // /Users/mbp/Desktop/complete Node-js/web-server/public

    const app = express();

// Paths for Express config
    const publicPath = path.join(__dirname, '../public');
    //  path change  views (default) -> template
    const viewPath = path.join(__dirname, '../template/views');
    // for npm package "hbs"
    const partialsPath = path.join(__dirname, '../template/partials');


// Setup handlebars engine 
    app.set('view engine', 'hbs');  

// Setup handlebars views location 
    app.set('views', viewPath); // change  views (default) -> template

// Setup hbs partials location    partial... 部分的
    // partialsPath (= ../template/partials) にある.hbs (header, footer...) を使い回すことが可能にする
    hbs.registerPartials(partialsPath); // registerPartial -> error (app crush) https://www.udemy.com/course/the-complete-nodejs-developer-course-2/learn/lecture/13729042#questions/7960166
    
// Setup static directory to serve   static.... 静的
    app.use(express.static(publicPath));

    // http://localhost:3000 (Top page)
    app.get('', (req, res) => {
        // res.render('index'); // = views/index.hbs -> template/index.hbs
        res.render('index', {
            title: 'Weather',
            name: 'Mike Luffy'
        });
    });

    //  http://localhost:3000/about 
    app.get('/about', (req, res) => {
        
        res.render('about', { // // = views/about.hbs -> template/about.hbs
            title: 'About Me?',
            name: 'Shiro Medaka'
        });
    });


    // http://localhost:3000/help
    app.get('/help', (req, res) => {
        
        res.render('help', { // // = views/help.hbs -> template/help.hbs
            title: 'HELP',
            text: 'sample sample sample sample',
            name: 'help Master'
        });
    });

    
// Create endpoint
    // http://localhost:3000/weather?address=tokyo にアクセス時
    app.get('/weather', (req, res) => {

        console.log(req.query.address); // tokyo
        
        const queryAddress = req.query.address;

        // ?address=  を指定していない場合（エラー）
        if (!queryAddress) {
            return res.send({ // return を忘れるとエラー
                error: 'must provide address'
            });
        }

        geocode(queryAddress, (err, { latitude, longitude, location } = {} ) => { // = {} がないと address に無効な値を入力するとクラッシュ エラー Cannot destructure property `latitude` of 'undefined' or 'null'.
            // url に接続不可(オフライン？),  400エラー URLのエラー
            if (err) {
                return res.send({ err }); // `couldnt connect the url. maybe off line!`
            }

            forecast(latitude, longitude, (err, {temp, rain, timezone, dailySummary }) => {
                // url に接続不可(オフライン？),  400エラー URLのエラー
                if (err) {
                    return res.send({ err });
                }

                res.send({
                    latitude,
                    longitude,
                    location,
                    address: queryAddress,
                    temp,
                    rain,
                    timezone,
                    forecast: dailySummary
                });

            });
            
        });

    });


  
// request query string  
    // url http://localhost:3000/product?search=games&rating=5 にアクセス時
    app.get('/product', (req, res) => {

        console.log(req.query); // { search: 'games', rating: '5' }
        console.log(req.query.search); // games

        if (!req.query.search) {
            return res.send({ // return を忘れるとエラー
                error: 'you must provide a search'
            })
        } 

        res.send({
            product: []
        })
    })


    // for help/* err
    app.get('/help/*', (req, res) => {
        res.render('404', { // = views/help.hbs -> template/views/404.hbs
            title: '404',
            message: 'help article NOT found',
            name: 'Mikel'
        });
    });


    // for 404 err (↑ app.get()で指定したURL以外にアクセスした場合に表示 )
    app.get('*', (req, res) => {
        res.render('404', { // = views/help.hbs -> template/views/404.hbs
            title: '404',
            message: '404 Page......',
            name: 'Mikel'
        });
    });







    // server start up
    app.listen(3000, () => { // = port 3000
        console.log('Sever is up on port 3000.');
    });



