const { default: axios } = require('axios')
const {Telegraf} = require('telegraf')
const tokenTelegramBot = '5061660513:AAH8V_5xurvsNSt4LOjS2MbNgEnFx3jebTE'
const telegramBot = new Telegraf(tokenTelegramBot)
let city = '',
    longitud = '',
    latitud = '',
    temperature = '',
    temperatureMin = '',
    temperatureMax = ''

/* --------------------------------------------------------------------------------------------------------- */
telegramBot.command('/clima',(ctx)=>{
    ctx.reply('Ingresa el nombre de tu ciudad')
})
telegramBot.on('text',ctx=>{
    city = ctx.message.text
    axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=7c95aaf2dad8ddd1f7aadf08b64d203a`)
    .then(res=>{
        longitud = res.data[0].lon
        latitud = res.data[0].lat
        axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${latitud}&lon=${longitud}&appid=7c95aaf2dad8ddd1f7aadf08b64d203a`)
        .then(res=>{
            temperature = Math.round(10*(res.data.list[0].main.temp -273.15))/10
            temperatureMin = Math.round(10*(res.data.list[0].main.temp_min -273.15))/10
            temperatureMax = Math.round(10*(res.data.list[0].main.temp_max -273.15))/10
            ctx.reply(`Temperatura:${temperature}. Temperatura maxima:${temperatureMax}. Temperatura minima:${temperatureMin}` )
            // console.log(res.data.list[0]) 
        })
        .catch(err=>{
            console.log(err)
        })
    })
    .catch(err=>{
        console.log(err)
    })  
})
/* --------------------------------------------------------------------------------------------------------- */
telegramBot.launch()
