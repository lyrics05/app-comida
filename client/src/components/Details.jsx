import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { useState,useEffect } from "react";
import { getRecipesById,cleanDeatil} from "../actions";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import comida from"./img/comida1.webp"
import styles from"./css/Details.module.css"

function Details(){
    const {id} = useParams()
    const dispatch = useDispatch()
    const detail = useSelector((state)=>state.recipeDetails)
    useEffect(()=>{
        dispatch(getRecipesById(id))

        return function(){
            dispatch(cleanDeatil())
        }
    },[dispatch])


    return(
        <div>
         {detail.length? <div>
          <Link to='/home'><button  className={styles.btn} >Back to main Page </button> </Link>
           <h1 className={styles.title}>{detail[0].title}</h1>
           <img className={styles.imga} src={detail[0].img?detail[0].img:comida}alt="" />
           <h3 className={styles.type}>Type Diet: {detail[0].typeDiets.map(d=><span>{d.name}</span>)}</h3>
           <h3 className={styles.type}>Dish Type: {detail[0].dishTypes ? detail[0].dishTypes.map(d => <span>{d.name}</span>) :'dish type not found'  }</h3>
           <h4 className={styles.type}> Summary: {detail[0].summary}</h4>
           <h5 className={styles.type}>health Score: {detail[0].healthScore}</h5>
           <h3 className={styles.type} >Steps: {Array.isArray (detail[0].analyzedInstructions) ? detail[0].analyzedInstructions.map(e => e.steps.map(f => f.step)) : detail[0].analyzedInstructions }</h3>
         </div>:<div></div>}
        </div>
    )
}

export default Details