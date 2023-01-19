import { createStore, applyMiddleware, compose } from 'redux';
import{composeWithDevTools} from "redux-devtools-extension"
import rootReducer from '../reducer/index';
import thunk from "redux-thunk";

const store = createStore(rootReducer,
    composeWithDevTools(
       applyMiddleware(thunk)
         // la librería redux-devtools-extension tiene composeWithDevTools
       )                                                                             //
   );


export default store