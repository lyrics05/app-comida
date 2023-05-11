import React from "react";
import styles from"./css/Paged.module.css"


export default function Paged({recipesPage, allRecipes, paged}) {
    
    const pages = [];
        
    for (let i = 1; i <= Math.ceil(allRecipes/recipesPage); i++) {//el reultado es 11.1111 pero lo redondea a 12
        pages.push(i)//empuja i 12 veces dando un array con 12 numeros
    };    
      
    return(
        
        <div>
            
            {
            <nav >
                
                <ul className={styles.ul}>
                    {pages?.map(p =>( // p es cada numero del array
                        <li className="page" key={p}>
                            <a className={styles.container}onClick={() => paged(p)} style={{width:"30px"}}>{p}</a>
                        </li>
                    ))}
                </ul>
    
            </nav>
            }  

        </div>
    )
};