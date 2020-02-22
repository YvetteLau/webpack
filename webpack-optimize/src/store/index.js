import reducer from './reducer';
import {createStore} from 'redux';

let store = createStore(reducer);
window._store = store;
export default store;