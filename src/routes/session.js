import { Router } from "express";

const router = Router()

const getNombreSession = (req) =>
req.session.nombre ? req.session.nombre : 'invitado'

router.get('/',(req,res)=>{
    res.render('session')
});

router.post('/session',(req,res)=>{
    
    for (const key in req.body) {
        req.session[key] = req.body[key]
    }
    const nombre = req.session.nombre
    res.render('loggedIn', { nombre });
    });



router.get('/cerrarSession',(req,res)=>{
    const nombre = getNombreSession(req)
    req.session.destroy((err)=>{
        if(err) {
            res.json({error : 'olvidar', body:err})
        } else {
            res.send(`Hasta luego ${nombre}`)
        }
    })
});


export default router