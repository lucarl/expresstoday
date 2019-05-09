const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const api_helper = require('./API_helper')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function date() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    } 
    
    if(mm<10) {
        mm = '0'+mm
    } 
    
    return today = yyyy+'-'+mm+'-'+dd;
    
}

app.get('/getAPIMeat', (req, res) => {    
    console.log(date())
    api_helper.make_API_call('http://carbonateapiprod.azurewebsites.net/api/v1/mealprovidingunits/3d519481-1667-4cad-d2a3-08d558129279/dishoccurrences?startDate='+date())
    .then(response => {
        let meal = response[0]['displayNames'][1]['dishDisplayName']
        console.log("response is ", meal)
        return res.json(meal)
    })
    .catch(error => {
        res.send(error)
    })
})

app.get('/getAPIVeg', (req, res) => {
    api_helper.make_API_call('http://carbonateapiprod.azurewebsites.net/api/v1/mealprovidingunits/3d519481-1667-4cad-d2a3-08d558129279/dishoccurrences?startDate='+date())
    .then(response => {
        let meal = response[1]['displayNames'][1]['dishDisplayName']
        console.log("response is ", meal)
        return res.json(meal)
    })
    .catch(error => {
        res.send(error)
    })
})


if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client')));
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'client', 'index.html'));
    });
  }

app.listen(port, () => console.log(`Listening on port ${port}`));