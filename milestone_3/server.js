const express = require('express');
const bodyparser = require('body-parser')
const mongoose = require("mongoose");
const dotenv = require('dotenv');






const app = express();
//para lidar c requests
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : false}));
app.use(require('./routes/user.js'))
const port = 3001;
dotenv.config();




//string de conexao salva em .env
console.log(process.env.CONN_STR)
const mongoDB = process.env.CONN_STR;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get('/', (req, res) => {
  res.send("nhasuo")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})