const axios = require("axios");
const {Recipe,TypeDiet}= require("../db")
require("dotenv").config()
const {API_KEY}=process.env

const getApiInfo = async()=>{
  const apiInfo = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`,{ 
    headers: { "Accept-Encoding": "gzip,deflate,compress" } 
})
//LLAMO A LA API Y ME TRAIGO SOLO LO QUE NECESITO

  const apiUrl = await apiInfo.data.results.map(e=>{
    return{
     
        id: e.id, 
        title: e.title,
        img: e.image,
        typeDiets: e.diets.map((d)=> {return{name:d}}), 
        dishTypes: e.dishTypes.map((d)=> {return{name:d}}), 
        summary: e.summary,           
        healthScore: e.healthScore,  
        analyzedInstructions: e.analyzedInstructions
    }
  })
  console.log(apiUrl)
 return apiUrl
};

const getDbInfo = async()=>{
  const infoDb=await Recipe.findAll({
     include:{
      model:TypeDiet,
      attributes:['name'],
      through:{
        attributes:[]
      }
     }
  })
  console.log(infoDb)
  return infoDb
}


const getAllRecipes = async()=>{
  const infoApi= await getApiInfo()
  const dbInfo = await getDbInfo();
  const allRecipes =  [...infoApi,...dbInfo]
  return allRecipes
  //ME TRAIGO LOS DOS LLAMADOS A LA API Y A LA BASE Y LAS CONCATENO PARA DEVOLVERLAS
  //EN LA PETICION
};

const getAllRecetas = async(req,res)=>{
  const {name} = req.query;

      if(!name)
      res.status(200).send(await getAllRecipes())
     
 
   try {
    const query = name.toLowerCase();
    const recipeApiInfo = await getApiInfo();
    const recipeInfo =  recipeApiInfo.filter(e=>{
       if(e.title.toLowerCase().includes(query)){
        return e.title.toLowerCase()
       }
    });

    const recipeBd= await Recipe.findAll({
      where:{
        title:query
      },
      include:{
        model:TypeDiet,
        attributes:["name"],
        through:{
          attributes:[]
        }
      }
    });

    const resp = await Promise.all([...recipeInfo,...recipeBd]);
    if(resp.length === 0){
      res.status(401).json({ error: 'recipe not found' });
    }else{
      return res.send(resp)
    }

   } catch (error) {
 
   }

};

module.exports = {
  getApiInfo,
  getDbInfo,
  getAllRecipes,
  getAllRecetas
}