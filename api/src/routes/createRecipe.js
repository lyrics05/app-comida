const {Router}= require("express");
const {Recipe,TypeDiet}=require("../db");


const router=Router();

router.post("/",async(req,res)=>{
  let {  
    title,
    summary,
    healthScore,
    analyzedInstructions,
    typeDiets}= req.body
    
    if(!title || !summary) {
      return res.status(400).send('Please, insert a title and a summary to continue!');
  }
  try {
    let createRecipe = await Recipe.create({
      title,
      summary,
      healthScore,
      analyzedInstructions,
     
    });
   
    let dietTypesDb = await TypeDiet.findAll({where:{name:typeDiets}})
    createRecipe.addTypeDiet(dietTypesDb);
    res.status(200).send("Receta Creada con Exito")
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router;



