import axios from "axios"

import { GET_RECIPES, GET_RECIPE_DETAILS, DIET_TYPE_FILTER, ALPHABETICAL_SORT, SCORE_SORT, SEARCH_RECIPE,GET_THE_DIETS,DISH_TYPE_FILTER,CLEAN_DETAIL,GET_DB_RECIPES} from './types';

export function getRecipes() {
    return function(dispatch) {
     axios.get("/recipes")
    .then((response) => {
        console.log("esto es la respuesta", response.data)
       dispatch({type:GET_RECIPES,payload:response.data})
    }).catch((error) => {
        console.log(error)
    }
    )
}};

export function getByDb(payload){
    return{
        type:GET_DB_RECIPES,
        payload
    }
}

export function getRecipesByName(name) {
    return async function(dispatch) {
       
     try {
       let bla = await axios.get(`/recipes?name=${name}`).then(res=>{
            dispatch({type:SEARCH_RECIPE,payload:res.data})
          
        })

        return bla
      
     } catch (error) {
        alert("no se encontro la receta")
     }
}
}



export function getRecipesById (id){
    
    return async function(dispatch){
        var json = await axios.get(`/recipes/${id}`);
    return dispatch( {
        type : GET_RECIPE_DETAILS,
        payload: json.data
    })
}
}


export function dietTypeFilter(payload) {
    return {
        type: DIET_TYPE_FILTER,
        payload
    }
};


export function dishTypeFilter(payload) {
    return {
        type: DISH_TYPE_FILTER,
        payload
    }
};

export function aplhabeticalSort(payload) {
    return {
        type: ALPHABETICAL_SORT,
        payload
    }
};

export function scoreSort(payload) {
    return {
        type: SCORE_SORT,
        payload
    }
}
//-----------------------------------------------------------------------------------------------//

export function hacerRecipe(payload){
    return async function(dispatch){
      try {
        var response = await axios.post("/recipe",payload)
        alert("receta creada!")
        return response
      } catch (error) {
        alert(error)
      }
    }
}

export function getTypeDiets (){
    
    return async function(dispatch){
        var json = await axios.get(`/types`);
         console.log(json.data);
        return dispatch( {
            type : GET_THE_DIETS,
            payload: json.data
        })

    }
}

export function cleanDeatil(){
    return{
        type:CLEAN_DETAIL
    }
}
