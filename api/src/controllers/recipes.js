const axios = require("axios");
const {Recipe,TypeDiet}= require("../db")



//const API_KEY= '3e37a100491a4b0598712a56b2c69828'//
//const API_KEY= "e034582b262147f2b66271d5a2d684db"//
const API_KEY= "63a6d8f9c1d443e19177657ebafd8d0c"//
//const API_KEY= "29d0b45237204fbe953ec5dd951164cc"//
//const API_KEY= "f7103bd975c7441d9e9a186d619141cd"
//const API_KEY="a3b6929e73464124bf42610f1bb86e8b"
//const API_KEY="da0b96bcc15244ea97c4bd7d68b3c672"

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