import {applyMiddleware, combineReducers, createStore} from "redux";
import {buttonsReducer} from "./buttonsReducer";
import thunk from "redux-thunk";

let reducers = combineReducers({
    buttons: buttonsReducer,

})

let store = createStore(reducers, applyMiddleware(thunk));

export default store;