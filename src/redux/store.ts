import {configureStore} from '@reduxjs/toolkit';
import {notesApi} from './notes.ts';

export const store = configureStore({
    reducer: {
        [notesApi.reducerPath]: notesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(notesApi.middleware),
});

