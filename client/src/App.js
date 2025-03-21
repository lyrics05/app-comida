import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import CreateRecipe from './components/CreateRecipe';
import Details from './components/Details';
import Landing from './components/Landing';
import axios from "axios"
axios.defaults.baseURL="https://app-comida-1.onrender.com"



function App() {
  return (
    <BrowserRouter>
    <div className="App">    
      <Switch>
        <Route exact path="/" component={Landing}/>  
        <Route exact path="/home" component={HomePage}/>  
        <Route exact path ='/recipes/:id' component={Details}/>
        <Route path="/recipe" exact component={CreateRecipe}/>  
     
      </Switch>    
    </div>
    </BrowserRouter>
  );
}

export default App;
