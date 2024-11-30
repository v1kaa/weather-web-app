const express = require('express');
const axios= require('axios')
const app = express();

app.set("view engine", "pug");
app.set('views', './views');
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

const api_key='796dde60799fd404ff29e69cca40b265';



app.get('/',(req,res)=>{
    res.render('file.pug',
        {
        weather:null,
        error:null
    })
})

app.get('/weather', async (req, res) => {
    const city = req.query.city; 
    if (!city) {
        return res.render('file.pug', { weather: null, error: 'Please enter a city' });
    }

    const uri = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;
    let weather;
    let error = null;

    try {
        const response = await axios.get(uri);
        weather = response.data;
        console.log(response.data);
    } catch (err) {
        weather = null;
        error = "Error fetching weather data. Please try again.";
    }

    res.render('file.pug', { weather, error });
});


  app.use((req,res)=>{
    res.status(404);
    res.send('something went wrong');
  })






app.listen(3000);