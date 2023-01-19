import axios from "axios"

import { GET_RECIPES, GET_RECIPE_DETAILS, DIET_TYPE_FILTER, ALPHABETICAL_SORT, SCORE_SORT, SEARCH_RECIPE,GET_THE_DIETS,DISH_TYPE_FILTER} from './types';

export function getRecipes() {
    return function(dispatch) {
     axios.get("http://localhost:3001/recipes")
    .then((response) => {
       dispatch({type:GET_RECIPES,payload:response.data})
    }).catch((error) => {
        console.log(error)
    }
    )
}};

export function getRecipesByName(name) {
    return async function(dispatch) {
      
            await axios.get(`http://localhost:3001/recipes?name=${name}`).then(res=>{
                dispatch({type:SEARCH_RECIPE,payload:res.data})
            }).catch((error)=>{
            console.log(error)
            });
         
    
    }
}



export function getRecipesById (id){
    
    return async function(dispatch){
        var json = await axios.get(`http://localhost:3001/recipes/${id}`);
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
        var response = await axios.post("http://localhost:3001/recipe",payload)
        return response
    }
}

export function getTypeDiets (){
    
    return async function(dispatch){
        var json = await axios.get(`http://localhost:3001/types`);
         console.log(json.data);
        return dispatch( {
            type : GET_THE_DIETS,
            payload: json.data
        })

    }
}

