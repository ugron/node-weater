    // npm package "request"  https://www.npmjs.com/package/request
    const request = require('request');

    const geocode = (address, callback) => {
        // locationURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibWluYW1pNzc3IiwiYSI6ImNrMW91MjM3ejBxNTIzYnFidmNvdHg2Y3UifQ.TnwcxDseZpNyEnXdDSBPwg&limit=1`;

        // encodeURIComponent()... ? -> %3F
        locationURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${ encodeURIComponent(address) }.json?access_token=pk.eyJ1IjoibWluYW1pNzc3IiwiYSI6ImNrMW91MjM3ejBxNTIzYnFidmNvdHg2Y3UifQ.TnwcxDseZpNyEnXdDSBPwg&limit=1`;

        request( { url: locationURL, json: true}, (err, { body }) => {
            if (err) {
                // console.log('====== error ======')
                callback(`couldnt connect the url. maybe off line!`, undefined);
            // } else if (res.body.features[0] === undefined) {
            } else if (body.features.length === 0) {
                // console.log('====== error ======')
                callback(`unable to find latitude & longitude. Try another search!`, undefined);
            } else {
                callback(undefined, {
                     latitude : body.features[0].center[1],
                     longitude : body.features[0].center[0],
                     location: body.features[0].place_name

                });
                
            }
        })
    }


    module.exports = geocode;


    