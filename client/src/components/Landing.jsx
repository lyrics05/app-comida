import React from "react";
import { Link } from "react-router-dom";
import styles from"./css/Landing.module.css"

const Landing = ()=>{
    return(
        <div>
            <h1 className={styles.title}>Food App</h1>
            <h3 className={styles.titlecook}>do you like to cook?</h3>
            <h4 className={styles.titlefind}>find the best and healthiest recipes in the world!</h4>
            <Link to={"/home"}><button className={styles.btn}>let's start</button></Link>
        </div>
    )
}

export default Landing