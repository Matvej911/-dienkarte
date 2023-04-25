const express = require('express')
const fs = require('fs');

const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
})


app.get('/create_txt', (req, res) => {


  console.log(req.query);

  const fileName = (`${req.query.nosaukums}_${req.query.apraksts}`).toLowerCase().replaceAll(" ", "_")

  const fileContent = `-"Edienkarte-
nosaukums: ${req.query.nosaukums}
apraksts: ${req.query.apraksts}
cena: ${req.query.cena} EUR
`
  
})

