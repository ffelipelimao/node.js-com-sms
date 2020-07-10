const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

require("dotenv").config();

app.use(cors());

app.use(express.json());

app.post('/message', (req,res) => {

    const { celular, nome } = req.body

    const textSms = `Olá ${nome}, seu Cartão foi aprovado com sucesso`
    
    axios({
        url:'https://api2.totalvoice.com.br/sms',
        method: 'post',
        headers: {
            'Access-Token': process.env.TOKEN_SMS
        },
        data:{
            'numero_destino':celular,
            'mensagem':textSms
        }
    }).then(data => {
        res.json({
            statusCode:200,
            messagem: textSms
        })
        console.log(data)
    }).catch(err => {
        res.json(err);
        console.log(err)
    })
 

});

module.exports = app;