const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipesRouter=require("./getRecetas");
const recipeRouter = require("./createRecipe")
const recipeTypes = require("./types")


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', (req, res) => {
    res.send('API funcionando correctamente');
});
router.use("/recipes", recipesRouter)
router.use("/recipe",recipeRouter)
router.use("/types",recipeTypes)



module.exports = router;
