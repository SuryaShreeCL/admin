import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Reducer from '../Reducer/Index';

export default createStore(Reducer, applyMiddleware(thunk));
