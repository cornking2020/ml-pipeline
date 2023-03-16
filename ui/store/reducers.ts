import {combineReducers} from '@reduxjs/toolkit';
import {api} from './GraphqlSlice';

export const reducers = combineReducers({
    [api.reducerPath]: api.reducer,
});

export type RootReducer = ReturnType<typeof reducers>;

export default reducers;