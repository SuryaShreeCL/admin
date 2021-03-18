import {createStore,applyMiddleware} from 'redux'
import Reducer from './RootReducer'
import thunk from 'redux-thunk'
import ReduxLoger from "redux-logger"
import { composeWithDevTools } from 'redux-devtools-extension';
// var intialState = {};
// try {
// intialState = sessionStorage.getItem("master_class") ? JSON.parse(sessionStorage.getItem("master_class")) : {};
// } catch (error) {
// console.log('getError', error)
// }
// const saver = (store) => next => action => {
    
// let stateToSave = store.getState();
// console.log(stateToSave)
// sessionStorage.setItem("master_class", JSON.stringify({ ...stateToSave }))
// return next(action);
// }

export default createStore(Reducer, composeWithDevTools(applyMiddleware(thunk)))