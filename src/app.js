
    const path = require('path');

    // npm package "express" 
    const express = require('express');

    // node.js path
    console.log(__dirname); // /Users/mbp/Desktop/complete Node-js/web-server/src/app.js
    // console.log(__filename); // Sever is up on port 3000.
    console.log(path.join(__dirname) ); // /Users/mbp/Desktop/complete Node-js/web-server/src
    console.log(path.join(__dirname, '..') ); // /Users/mbp/Desktop/complete Node-js/web-server

    console.log(path.join(__dirname, '../public') ); // /Users/mbp/Desktop/complete Node-js/web-server/public


    const app = express();

    const publicPath = path.join(__dirname, '../public');
    // const helpPath = path.join(__dirname, '../help/index.html');
    // const aboutPath = path.join(__dirname, '../about');

    app.use(express.static(publicPath));
    // app.use(express.static(publicPath));    

    // app.com === app.use(express.static()) で public フォルダを指定 -> index.html が反映される為、無効  ====
    // app.get('', (req, res) => { // (request, response)
        
    //     res.send('<h1>Hey express</h1>'); 
    // });


    // // app.com/help
    // app.get('/help', (req, res) => {
    //     // res.send('its HELP page');

    //     res.send({
    //         name: 'Mike',
    //         age: 22
    //     });

    // });



// ====== challenge create 2 new HTML

     // app.com/help
    //  app.get('/help', (req, res) => {
    //     // res.send('its HELP page');

    //     res.send({
    //         name: 'Mike',
    //         age: 22
    //     });

    //     // res.send(helpPath);

    // });



    //  // app.com/about
    //  app.get('/about', (req, res) => {
    //     res.send('<h1>this is ABOUT page</h1>');
    // })



    

// ====== challenge Setup 2 new routes

/**
    // app.com/about
    app.get('/about', (req, res) => {
        res.send('this is ABOUT page');
    })

    // app.com/weather
    app.get('/weather', (req, res) => {
        res.send('this is weather page');
    })
 */

// ====== challenge Update routes

    // // app.com/about
    // app.get('/about', (req, res) => {
    //     res.send('<h1>this is ABOUT page</h1>');
    // })

    // app.com/weather
    app.get('/weather', (req, res) => {

        const objJson = {
            forecast: 'sunny',
            location: 'Tokyo'
        }

        res.send(objJson);

        
    })










    // server start up
    app.listen(3000, () => { // = port 3000
        console.log('Sever is up on port 3000.');
    });



