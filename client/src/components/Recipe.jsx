import React from "react";
import image from"./img/t.jpg"
import styles from "./css/Recipe.module.css"



let prevId = 1;

export default function Recipe(props) {
    const { img, title, typeDiets, healthScore} = props
   
    return (
        <div className={styles.card}>
           
            <div>
                <img height={200} width={200} className={styles.cardimg} src={img?img:image}alt="Not found"/>
            </div>
            
            <div>
                <h2 >{title}</h2>            
            </div>

            <div className={styles.types}>
                {typeDiets?.map(e => {
                    return (
                        <h5 className="diets" key={prevId++}>{e.name}</h5>
                    )
                })}            
            </div>
            <div>
                <h2 className="recipeName">{healthScore}</h2>            
            </div>
            
        </div>
    
    )
};
