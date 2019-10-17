
     console.log('Client side Javascript');

    // fetch API
    // fetch('http://puzzle.mead.io/puzzle').then( (res) => {  // get random text
        
    //     res.json().then( (data) => {
    //         console.log(data);
    //     })
    // });  


// challenge fetch API weather
    // fetch('http://localhost:3000/weather?address=tokyo').then( (res) => {
        
    //     // return res.json();
    //     // })
    //     res.json().then ( (dataJson) => {
    //         if (dataJson.err) {
    //             console.log(dataJson.err);
    //         } 
    //         else {
    //             // console.log(dataJson);
    //             console.log(dataJson.location);
    //             console.log(dataJson.forecast);
    //         }   
    //     });

    // });


    // input field submit event
    const weatherForm = document.querySelector('form');
    const searchTxt = document.querySelector('input');
    const message1 = document.querySelector('#message-1'); // p id = message-1
    const message2 = document.querySelector('#message-2'); // p id = message-2

    // message1.textContent = 'mes1';
    // message2.textContent = 'mes2';

    weatherForm.addEventListener('submit', (e) => {
        
        e.preventDefault(); // <form> のデフォルトアクション（submit でページをリロード）を無効化 

        const location = searchTxt.value; // = input に入力した値（テキスト）
        // input に入力した値（テキスト）をコンソール
        if (location === '') {
            alert('type location')
            console.log(`type location`);
        } else {
            console.log(location);

            // p html の初期化
            message1.textContent = 'Loading...';
            message2.textContent = '';

            // input(searchTxt) に入力した値（テキスト）を fetch API weather に代入
            // fetch(`http://localhost:3000/weather?address=${location}`).then( (res) => {
            // => 
            fetch(`/weather?address=${location}`).then( (res) => { // heroku deploy
            
                res.json().then ( (dataJson) => {
                    if (dataJson.err) { // request( { url: locationURL, json: true}, (err, { body }) => { の err がある場合
                        // console.log(dataJson.err);
                        message1.textContent = dataJson.err;
                    } 
                    else {
                        // console.log(dataJson);
                        // console.log(dataJson.location);
                        // console.log(dataJson.forecast);

                        message1.textContent = dataJson.location;
                        message2.textContent = dataJson.forecast;
                    }   
                });

            });
        }
    });
    


    

    
    