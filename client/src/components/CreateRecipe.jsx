import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getTypeDiets,hacerRecipe } from "../actions/index";
import { useDispatch,useSelector} from "react-redux";
import { useState } from "react";
import {useHistory} from "react-router-dom"
import styles from"./css/CreateRecipe.module.css"

function controlForm (input){
    let errors = {}
    if(!input.title)  errors.title='please put the title of the recipe'
    if(!input.summary) errors.summary='please put the summary of the recipe'
    if(!input.healthScore) errors.healthScore='put a healthScore between 0-100'
    if(input.healthScore<0 || input.healthScore>100) errors.healthScore='put a healthScore between 0-100'
    return errors

}

const CreateRecipe=()=>{
    const history = useHistory()
    const dispatch = useDispatch()
    let listDiets = useSelector((state) => state.dietTypes )
    console.log(listDiets)
    const [errors,setErrors]=useState({
        title :'',
        summary:'',
        healthScore:'',
        analyzedInstructions:'',
        typeDiets:[]
    })     // este estado local es para, las validaciones(del formulario controlado)
    const [input,setInput] = useState({
        title :'',
        summary:'',
        healthScore:'',
        analyzedInstructions:'',
        typeDiets:[]
    })
    
    useEffect(()=>{
        dispatch(getTypeDiets())
    },[dispatch])

    function handleChange(e){
        setInput({
            ...input,
    [e.target.name] : e.target.value
})
        setErrors(controlForm({
            ...input,
            [e.target.name] : e.target.value    // me copio todo lo que venga del formulario , en el caso de que en alguno
        }))                
      }

      function handleSelect(e){
        setInput({
            ...input,
            typeDiets:[...input.typeDiets, e.target.value]
        })
    }
    function handleSubmit(e){
        e.preventDefault();
        dispatch(hacerRecipe(input))
        setInput({
            title :'',
            summary:'',
            healthScore:'',
            analyzedInstructions:'',
            typeDiets:[]
        })
        setTimeout(()=>{
           history.push("/home")
        },2000)
    }

    function handleDelete(dieta){
        setInput({
            ...input,
            typeDiets: input.typeDiets.filter(d => d !== dieta)
        }) // borra algun tipo de dieta que haya elegido y  va a crear un nuevo array con todos los que no sean
        //iguales a dieta
    }
  
    return(
        <div>
             <Link to ='/home' ><button className={styles.btn}>Back to the main page</button></Link>
            <h1 className={styles.title} >Create you recipe</h1>
        <div className={styles.container} >
            <form className={styles.form} onSubmit={(e) => {handleSubmit(e)}}>
                <div>
                    <label className={styles.label}>name:</label>
                    <input
                    className={styles.input}
                    type='text'
                    name='title'
                    value={input.title}
                    onChange={(e) => {handleChange(e)}}
                    />
                 
                  <p className={styles.error} >{errors.title}</p>
                  
                </div>
                <div>
                    <label className={styles.label}>summary:</label>
                    <input
                     className={styles.input}
                    type='text'
                    name='summary'
                    value={input.summary}
                    onChange={(e) => {handleChange(e)}} 
                    />
                   
                  <p className={styles.error} >{errors.summary}</p>
                  
                </div>
                
                <div>
                    <label className={styles.label}>healthScore:</label>
                    <input
                     className={styles.input}
                    type='number'
                    name='healthScore'
                    value={input.healthScore}
                    onChange={(e) => {handleChange(e)}} 
                    />
                    
                        <p className={styles.error} >{errors.healthScore}</p>
                
                </div>
                <div>
                    <label className={styles.label}>step by step:</label>
                    <input
                    className={styles.input}
                    type='text'
                    name='analyzedInstructions'
                    value={input.analyzedInstructions}
                    onChange={(e) => {handleChange(e)}} 
                    />
                </div>
                <select className={styles.select} onChange={(e) => handleSelect(e)} >
                    {listDiets?.map((t) => {
                    
                    return <option value={t}> {t} </option>
                    
                    })}
                    
                </select >
                  
     { Object.keys(errors).length=== 0?<button className={styles.correct} type='submit' > Create Recipe</button>:null}
               
            </form>
              <div>
            {input.typeDiets?.map(e=> {
               return(
               <div className={styles.flexTipeDietsDelete} >
                    <h5 className={styles.types}>{e}</h5>
                    <button className={styles.btnx} onClick={() => handleDelete(e)}>X</button>
                   
                </div>
            )})}
            </div>
          
        </div>
        </div>
    )
}

export default CreateRecipe
