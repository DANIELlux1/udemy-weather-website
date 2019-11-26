const request = require("request")

const forecast = (lat,long,callback) => {

    const url = "https://api.darksky.net/forecast/4496c63121794b29b5080ab02c0b1e45/" + lat + "," + long + "?units=si"


    request({url, json : true}, (error, {body}) =>{
        if(error)
        {
            callback('Unable to connect to weather service!',undefined)
        }else if(body.error){
            callback('Unable to find location!',undefined)
        }else{
            const { summary,
                    temperature,
                    precipProbability:probability} = body.currently

            callback(undefined,
                    summary + ". It is currently " 
                  + temperature + "C degress out. There is a " 
                  + probability * 100 + "% chance of rain.")
        }
    })
}

module.exports = forecast