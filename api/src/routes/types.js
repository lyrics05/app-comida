const {Router} = require("express")
const {TypeDiet} = require("../db")
const {diets} = require("../controllers/diets");


const router = Router()

router.get("/",async(req,res)=>{
    diets.forEach(d=>{
        TypeDiet.findOrCreate({
            where:{name:d.name}
        })
    });

    const allTypes = await TypeDiet.findAll()
    res.send(allTypes.map(e=>e.name))
});

module.exports =  router