import {useEffect, useState} from "react";

import {useNavigate, useLocation} from "react-router-dom";
import {useCreateNoteMutation, useUpdateNoteMutation, useGetNoteQuery, useDeleteNoteMutation} from "../redux/notes.ts";
import {useCookies} from "react-cookie";

import { IconArrowLeft } from '@tabler/icons-react';

import {Note} from "../appTypes.ts";

interface NotePageProps {
    note?: Note
}

export const buttonStyle = `border-0 outline-0 font-semibold bg-transparent text-lg`

const NotePage: React.FC<NotePageProps> = ()=>{
    const [createNote] = useCreateNoteMutation({})
    const [updateNote] = useUpdateNoteMutation({})
    const [deleteNote] = useDeleteNoteMutation({})
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const isNoteNew = pathname.includes('new');
    const [userIdCookie] = useCookies(['note_user_id']);
    const {data: note} = useGetNoteQuery(isNoteNew?'0':pathname.split('/')[2]);
    const [newNote, setNewNote] = useState<string>('');

    useEffect(() => {
        if (note && !isNoteNew) setNewNote(()=>note.body);
    }, [note]);

    const handleDeleteNote = async ()=>{
        await deleteNote(note.id);
        navigate('/notes');
    }

    const handleSubmitNote = async ()=>{
        if (isNoteNew){
            const createNoteResponse = await createNote({body:newNote, owner: userIdCookie['note_user_id']});
            if (createNoteResponse.data){
                navigate('/notes');
            }
        }else{
            const updatedNote = {...note, body:newNote};
            const updateNoteResponse = await updateNote(updatedNote);
            if (updateNoteResponse.data){
                navigate('/notes');
            }
        }
    }

    return(
        <div className={`w-full max-w-[480px] mx-auto h-[88vh] relative font-semibold bg-[color:var(--color-bg)]`}>
            <div className={`flex items-center justify-between p-2.5`}>
                <h3 className={`flex items-center text-2xl cursor-pointer`}>
                    <IconArrowLeft onClick={handleSubmitNote} className={`w-5 mr-2 text-[color:var(--color-text)]`}/>
                </h3>
                {!isNoteNew ? (
                    <button onClick={handleDeleteNote} className={`${buttonStyle} text-[color:var(--color-text)]`}>Delete</button>
                ) : (
                    <button onClick={handleSubmitNote} className={`${buttonStyle} text-[color:var(--color-text)]`}>Done</button>
                )}
            </div>
            <textarea
                value={newNote}
                onChange={(event) => setNewNote(event.currentTarget.value)}
                placeholder='Note here'
                className={`border-0 outline-0 py-4 px-3 w-full h-[calc(100vh-116px)] 
                resize-none active:outline-0 active:border-0 text-[color:var(--color-text)] rounded bg-transparent text-pretty`}/>
        </div>
    )
}

export default NotePage;