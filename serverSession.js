import MongoStore from 'connect-mongo';
import express from 'express';
import session from "express-session"
import sessionRoutes from './src/routes/session.js'
const adavancedOptions = { useNewUrlParser: true, useUnifiedTopology:true }

const app = express()

app.set('views', './src/views')
app.set('view engine', 'ejs')


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(session({
    store: MongoStore.create({ 
        mongoUrl : 'mongodb+srv://RenzoAnaya:Sneakerpro1997@cluster0.tlxsh8c.mongodb.net/?retryWrites=true&w=majority',
        mongoOptions: adavancedOptions
    }),
    secret:'key',
    resave:false,
    saveUninitialized:false,
    cookie: {
        maxAge: 60000
    },
}))
app.use('/', sessionRoutes)




const PORT = 8080
app.listen(PORT,()=>{
    console.log(`Escuchando al puerto ${PORT}`)
})