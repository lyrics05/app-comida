import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, dietTypeFilter, aplhabeticalSort, scoreSort, getRecipesByName, dishTypeFilter } from '../actions/index';
import { Link } from 'react-router-dom'
import Paged from "./Paged"
import Recipe from './Recipe';
import  styles from"./css/Home.module.css"




let prevId = 1;

export default function Home() {
    
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);
   
    
    const [order, setOrder] = useState('')
    const [page, setPage] = useState(1);
    const [recipesPage, setRecipesPage] = useState(9);
    const [input,setInput] = useState("")
   
    
    const quantityRecipesPage = page * recipesPage;//cuando hago click en el 2 page = 2 y ahora seria 2 * 9 = 18
    const firstRecipePage = quantityRecipesPage - recipesPage; //9 // es 0, pero en el array, 0 es la posicion 1
    const showRecipesPage = allRecipes.slice(firstRecipePage, quantityRecipesPage);//es el array en la posicion 0 y el 9 seria la poscion 8 del array contandodesde el 0
    
     function paged (pageNumber) {
        setPage(pageNumber)
    };


    useEffect(() => {
        dispatch(getRecipes())
    }, [dispatch]);


    function handleClick(e) {
        e.preventDefault();
        dispatch(getRecipes());
        setPage(1);
    }

    function handleDietTypeFilter(e) {
        e.preventDefault();
        dispatch(dietTypeFilter(e.target.value))
        setPage(1);
    }

    function handleAlphabeticalSort(e) {
        e.preventDefault();                
        dispatch(aplhabeticalSort(e.target.value))
        setPage(1);
        setOrder(`Order ${e.target.value}`);
    }
    
    function handleScoreSort(e) {
        e.preventDefault();                
        dispatch(scoreSort(e.target.value));
        setPage(1);
        setOrder(`Order ${e.target.value}`);
    }

    function handleSubmit(e){
        e.preventDefault();
       dispatch(getRecipesByName(input))
        setInput("")
    }
    function handleChange(e){
        setInput(
            e.target.value
        )
    };
    function handleDishFilter(e){
        e.preventDefault()
        dispatch(dishTypeFilter(e.target.value))
        setPage(1)
    }

    return(
        <div className={styles.back}>
            <h1 className={styles.title}>Let's Cook!</h1>

            <form className={styles.search} onSubmit={(e) => {handleSubmit(e)}}>
                <input className={styles.inputsearch} type="text" name='search' placeholder='Search Recipe...' value={input} onChange={(e) => {handleChange(e)}}/>
                <button className={styles.btnsearch} type='submit'>Search</button>
                </form>
            <div className={styles.flexrc}>
                <button className={styles.refresh}  onClick={handleClick}>Refresh recipes</button>
                <Link to="/recipe">
                    <button className={styles.create}>Create recipe</button>
                </Link>
            </div>

            <div className={styles.selectflex}>
              
                <select className={styles.select} name="alphabetical" onChange={e => handleAlphabeticalSort(e)}>
                    <option disabled selected>Alphabetical</option>
                    <option value="atoz">A to Z</option>
                    <option value="ztoa">Z to A</option>
                </select>
                <select className={styles.select}name="numerical" onChange={e => handleScoreSort(e)}>
                    <option disabled selected> health Score</option>
                    <option value="menormayor">From Min to Max</option>
                    <option value="mayormenor">From Max to Min</option>
                </select>
              
                <select className={styles.select} name="diets" onChange={e => handleDietTypeFilter(e)}>
                     <option disabled selected value="">Type of Diets...</option>
                     <option value="gluten free">Gluten Free</option>
                     <option value="ketogenic">Keto</option>
                     <option value="vegan">Vegan</option>
                     <option value="lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
                     <option value="pescatarian">Pescatarian</option>
                     <option value="paleolithic">Paleolithic</option>
                     <option value="primal">Primal</option>
                     <option value="whole 30">Whole 30</option>
                     <option value="dairy free">Dairy Free</option>
                </select>
                <select className={styles.select}  onChange={e => handleDishFilter(e)}  name="dishTypes">
                     <option disabled selected value="">Dish Types...</option>
                     <option value="lunch">lunch</option>
                     <option value="main course">main course</option>
                     <option value="dinner">dinner</option>
                     <option value="side dish">side dish</option>
                     <option value="morning meal">morning meal</option>
                     <option value="brunch">brunch</option>                 
                     <option value="breakfast">breakfast</option>
                     <option value="salad">salad</option>
                     <option value="soup">soup</option>
                </select>
            </div>
           

           
           
         <Paged recipesPage={recipesPage} allRecipes={allRecipes.length} paged={paged}/>

            <div className={styles.cards}>
            {
                showRecipesPage?.map(e => {
                    return (
                        <div key={prevId++}>
                            <Link  to={`recipes/${e.id}`}>
                                <Recipe
                                   title={e.title} img={e.img} 
                                   typeDiets={e.typeDiets} 
                                   healthScore={e.healthScore}
                                   key={e.id} />
                            </Link>
                        </div>
                    )
                })
            }
            </div>   
         <Paged recipesPage={recipesPage} allRecipes={allRecipes.length} paged={paged}/>         
            
        

        </div>






    )
}