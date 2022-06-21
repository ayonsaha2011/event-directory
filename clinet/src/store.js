import { configureStore } from '@reduxjs/toolkit'
import eventReducer from './reducers/events';
import categoryReducer from './reducers/categories';

const reducer = {
  events: eventReducer,
  categories: categoryReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;