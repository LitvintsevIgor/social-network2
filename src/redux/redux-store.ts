import {applyMiddleware, combineReducers, createStore} from "redux";
import {ProfileActionsTypes, profileReducer} from "./profile-reducer";
import {DialogsActionsTypes, dialogsReducer} from "./dialogs-reducer";
import {UserReducer} from "./users-reducer";
import {authReducer, SetAuthUserDataACType} from "./auth-reducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form';
import {AppReducer, InitializedSuccessType} from "./app-reducer";


let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: UserReducer,
    auth: authReducer,
    app: AppReducer,
    form: formReducer
})

export type AllAppStateType = ReturnType<typeof rootReducer>

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AllAppActionType = ProfileActionsTypes
    | InitializedSuccessType
    | SetAuthUserDataACType
    | DialogsActionsTypes


// @ts-ignore
window.store = store;

export type ReduxStoreType = typeof store
export type AppDispatch = typeof store.dispatch


export default store;
