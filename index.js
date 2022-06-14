const express=require('express');
const bodyparser=require("body-parser")
const { json } = require('express/lib/response');
const https=require('https')
const app=express();
app.use(express.static("public"))

app.set('view engine','ejs');
app.use(bodyparser.urlencoded({extended:true}))
app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/weather.html")

})
app.post('/',(req,res)=>{ 

    const city=req.body.t1;
const cityy="";
const tempp=0;
    const api="cb82891299e5d02d81059270bbbf73e7"
    const unit="metric"

    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+api+"&units="+unit



        https.get(url,(response)=>{
        console.log(response.statusCode);
        response.on("data",function(data){

            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp
            const icon=weatherData.weather[0].icon
            const desc=weatherData.weather[0].description
            const icon_url="http://openweathermap.org/img/wn/"+icon+"@2x.png";
         res.render("Weather",{descc:desc,cityy:city,tempp:temp,iconn:icon});


            })



    })
});

app.listen(process.env.PORT||5000,()=>
{console.log("server started")});
