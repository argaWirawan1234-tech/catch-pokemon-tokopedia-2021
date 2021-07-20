import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist' // imports from redux-persist
import localforage from 'localforage'
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import rootReducer from './reducers/rootReducer' // Root reducer

const persistConfig = {
  key: 'root',
  storage: localforage,
  blacklist: ['bottomWrapper', 'rightWrapper', 'pokemonDetail']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, applyMiddleware())

const persistor = persistStore(store)

export { store, persistor }
