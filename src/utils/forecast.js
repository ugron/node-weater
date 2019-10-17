    // npm package "request"  https://www.npmjs.com/package/request
    const request = require('request');


    // // forecast(-75.7088, 44.1545, (error, data) => {
    // const forecast = (latitude, longitude, callback) => {

    //     const foreURL = `https://api.darksky.net/forecast/9a6c545c92dc4a656e25a8bb4e3f2447/${latitude},${longitude}?units=si`; // units=si.... セルシウス度 (°C)

    //     // "json: true" を追加することで、parse されたデータが response に渡る
    //     request({ url: foreURL, json: true}, (err, res) => {
    //         // url に接続不可(オフライン？)
    //         if (err) {
    //             callback('cant connect the url', undefined); //  (error = "cant connect the url", data = undefined) 
    //         }
    //         // 400エラー URLのエラー
    //         else if (res.body.code === 400) {
    //             callback('cant find data. try another location', undefined); // (error = "cant find data...", data = undefined) 
    //         }
    //         else {
    //             callback(undefined, { //  (error = undefined, data = { }) 
    //                 temp: res.body.currently.apparentTemperature,
    //                 rain: res.body.currently.precipProbability,
    //                 timezone: res.body.timezone,
    //                 dailySummary: res.body.daily.summary
    //             });
    //         } 
    //     });

    // };


// ==== challenge Use both destructuring and property shorthand

    // forecast(-75.7088, 44.1545, (error, data) => {
        const forecast = (latitude, longitude, callback) => {

            const foreURL = `https://api.darksky.net/forecast/9a6c545c92dc4a656e25a8bb4e3f2447/${latitude},${longitude}?units=si`; // units=si.... セルシウス度 (°C)
    
            // "json: true" を追加することで、parse されたデータが response に渡る
            request({ url: foreURL, json: true}, (err, { body }) => {
                // url に接続不可(オフライン？)
                if (err) {
                    callback('cant connect the url', undefined); //  (error = "cant connect the url", data = undefined) 
                }
                // 400エラー URLのエラー
                else if (body.code === 400) {
                    callback('cant find data. try another location', undefined); // (error = "cant find data...", data = undefined) 
                }
                else {
                    // console.log(body.currently); // obj
                    callback(undefined, { //  (error = undefined, data = { }) 
                        temp: body.currently.apparentTemperature,
                        rain: body.currently.precipProbability,
                        timezone: body.timezone,
                        dailySummary: body.daily.summary,
                        currntSummary: body.currently.summary
                    });
                } 
            });
    
        };






    module.exports = forecast;