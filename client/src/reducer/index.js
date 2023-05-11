import { GET_RECIPES, DIET_TYPE_FILTER, ALPHABETICAL_SORT, SCORE_SORT, SEARCH_RECIPE, GET_RECIPE_DETAILS,GET_THE_DIETS,DISH_TYPE_FILTER, CLEAN_DETAIL } from '../actions/types'

const initialState = {
    recipes: [],
    allRecipes: [],
    dietTypes: [],
    filtred:[],
    recipeDetails: []
}


export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_RECIPES:
          return {
            ...state,
            recipes: action.payload,
            allRecipes: action.payload
          };

        case DIET_TYPE_FILTER:
          const allRec = state.allRecipes;          
          const typeDietFilter = action.payload === 'All' ? allRec : allRec.filter(t => t.typeDiets.find(e =>  e.name  === action.payload ) )   
          console.log(action.payload);
          
          return{
                  ...state ,
                  recipes : typeDietFilter
  
          }

        case ALPHABETICAL_SORT:   
          let sortedRecipes = [...state.recipes]       
          sortedRecipes = action.payload === 'atoz' ?
          state.recipes.sort(function(a, b) {
            if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
          if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
            return 0;
          }) :
          state.recipes.sort(function(a, b) {
            if (a.title.toLowerCase() < b.title.toLowerCase()) return 1;
            if (a.title.toLowerCase() > b.title.toLowerCase()) return -1;
            return 0;
          });          
          return {
            ...state,
            recipes: sortedRecipes
          };

        case SCORE_SORT:
          let orderpunt = [...state.recipes]    
           orderpunt = action.payload === 'menormayor' ? 
          state.recipes.sort(function(a,b) {
              if(a.healthScore < b.healthScore) {
                  return -1
              }
              if( a.healthScore > b.healthScore){
                  return 1
              }
              return 0
          }) : 
          state.recipes.sort(function(a,b) {
              if(a.healthScore < b.healthScore) {
                  return 1
              }
              if( a.healthScore > b.healthScore){
                  return -1
              }
              return 0
          })
          return{
              ...state ,
              recipes : orderpunt
      }

        case SEARCH_RECIPE:
          
            return {
              ...state,
              recipes: action.payload,
                    
          }      
            
        case GET_RECIPE_DETAILS:
          return {
            ...state,
            recipeDetails: action.payload,
          };
             
        case GET_THE_DIETS:
          // console.log('action.payload',action.payload);
          return {
              ...state,
              dietTypes: action.payload
          };
        case DISH_TYPE_FILTER:
          const allReci =[...state.allRecipes];
          const dishFilter = action.payload === 'All' ? allReci : allReci.filter(t =>t.dishTypes?.find(p=>p.name===action.payload) )   
          return{
            ...state,
            recipes:dishFilter
          };
        case CLEAN_DETAIL:
          return{
            ...state,
            recipeDetails:initialState.recipeDetails
          }      
          

        default:
          return state;
    }
  }