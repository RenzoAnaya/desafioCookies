import MongoStore from 'connect-mongo';
import express from 'express';
import session from "express-session"
import sessionRoutes from './src/routes/apiRoutes.js'
const adavancedOptions = { useNewUrlParser: true, useUnifiedTopology:true }

import './src/db/database.js'
import './src/passport/local.js'
import passport from "passport";

const app = express()

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;
const DB_NAME = process.env.DB_NAME;

app.set('views', './src/views')
app.set('view engine', 'ejs')


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(session(
    {
    store: MongoStore.create({ 
        mongoUrl : 'mongodb+srv://desafiosCoder:desafiosCoder@proyectocoder.jilwab4.mongodb.net/sessionsMongo?retryWrites=true&w=majority',
        mongoOptions: adavancedOptions
    }),
    secret:'key',
    resave:true,
    saveUninitialized:true,

}))
app.use(passport.initialize())
app.use(passport.session())
app.use('/', sessionRoutes) 




const PORT = 8080
app.listen(PORT,()=>{
    console.log(`Escuchando al puerto ${PORT}`)
})