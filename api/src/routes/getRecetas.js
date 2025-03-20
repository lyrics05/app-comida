const {Router} = require("express");
const {Recipe, TypeDiet} = require("../db")
const {getAllRecetas,getAllRecipes,}= require("../controllers/recipes");


const router = Router();
router.get("/",getAllRecetas)



router.get("/:id",async(req,res)=>{
    const {id} = req.params;
    const allRecipes = await getAllRecipes();
    let validar = id.includes("-");
    if(validar){
        try {
            let idDb = await Recipe.findByPk(id,{include:TypeDiet});
            res.status(200).json([idDb])
        } catch (error) {
            console.log(error)
        }
    }else{
        try {
            let apiId = await allRecipes.filter(e=>e.id===parseInt(id));
            apiId.length?res.status(200).send(apiId):res.status(404).send("no se encontro la receta")

        } catch (error) {
            res.json({message:error})
        }
    }

})

module.exports = router;