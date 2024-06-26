import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {cookieManager} from "../contexts/AuthContext.tsx";

import {Note, User} from "../appTypes.ts";

export const notesApi = createApi({
    reducerPath: 'notesApi',
    tagTypes: ['notes', 'auth', 'users'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_APP_BACKEND_HOST,
        prepareHeaders: (headers: Headers) => {
            const token = cookieManager.get('note_user_token');
            if (!headers.has('Authorization') && token) {
                headers.set('Authorization', `Token ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => {
        return {
            loginInUser: builder.mutation({
                query: (userCredentials: { username: string; password: string }) => ({
                    url: `auth/login`,
                    method: 'POST',
                    body: userCredentials,
                }),
                invalidatesTags: ['auth'],
            }),
            registerUser: builder.mutation({
                query: (user: Partial<User>) => ({
                    url: `auth/register`,
                    method: 'POST',
                    body: { ...user },
                }),
                invalidatesTags: ['auth'],
            }),
            logoutUser: builder.mutation({
                query: () => ({
                    url: `auth/logoutall`,
                    method: 'POST',
                }),
                invalidatesTags: ['auth'],
            }),
            getNotes: builder.query({
                query: () => ({
                    url: `notes`,
                    method: 'GET',
                }),
                providesTags: ['notes'],
            }),
            getNote: builder.query({
                query: (noteId : string) => ({
                    url: `notes/${noteId}`,
                    method: 'GET',
                }),
                providesTags: ['notes'],
            }),
            createNote: builder.mutation({
                query: (note: Partial<Note>) => ({
                    url: `notes`,
                    method: 'POST',
                    body: note,
                }),
                invalidatesTags: ['notes'],
            }),
            updateNote: builder.mutation({
                query: (note: Note) => ({
                    url: `notes/${note.id}`,
                    method: 'PUT',
                    body: note,
                }),
                invalidatesTags: ['notes'],
            }),
            deleteNote: builder.mutation({
                query: (noteId) => ({
                    url: `notes/${noteId}`,
                    method: 'DELETE',
                }),
                invalidatesTags: ['notes'],
            }),
        };
    },
});

export const {
    useLoginInUserMutation,
    useRegisterUserMutation,
    useLogoutUserMutation,
    useGetNotesQuery,
    useGetNoteQuery,
    useCreateNoteMutation,
    useUpdateNoteMutation,
    useDeleteNoteMutation,
} = notesApi;

export const { endpoints, reducerPath, reducer, middleware } = notesApi;
