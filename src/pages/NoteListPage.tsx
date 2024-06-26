import {useEffect, useState} from "react";

import NoteListItem from "../components/NoteListItem.tsx";
import AddButton from "../components/AddButton.tsx";

import {useGetNotesQuery} from "../redux/notes.ts";
import {Note} from "../appTypes.ts";

interface NoteListPageProps {
}

const EmptyNoteComponent = ()=>{
    return(<p className={`m-4 text-[color:var(--color-text)]`}>You have no notes, please create one</p>)
}

const NoteListPage: React.FC<NoteListPageProps> = ()=>{
    const {data, isError} = useGetNotesQuery({});
    const [notes, setNotes] = useState<Note[]>([]);

    const sortNotes = (notes: Note[])=>{
        return notes.sort((a, b)=> {
            const dateA = (new Date(a.updatedAt)).valueOf();
            const dateB = (new Date(b.updatedAt)).valueOf();
            if (dateA > dateB) return -1;
            else if (dateA < dateB) return 1;
            else return 0;
        })
    }

    useEffect(() => {
        if (data){
            setNotes(()=>sortNotes([...data]));
        }
    }, [data]);

    if (isError)return <p className={`m-4 text-[color:var(--color-text)]`}>Error getting notes</p>

    return (
        <>
            <div className={`flex items-center justify-between py-2.5 px-4`}>
                <h2 className={`text-2xl font-semibold text-[color:var(--color-main)]`}>&#9782; Notes</h2>
                <p className={`text-lg text-[color:var(--color-main)]`}>{notes.length}</p>
            </div>
            <div className={`p-0 my-2.5 mx-0 h-[70vh] overflow-y-auto`}>
                { notes.length === 0 ? <EmptyNoteComponent/> : notes.map((note, index) => {
                    return  <NoteListItem note={note} key={index}/>
                })}
            </div>
            <AddButton/>
        </>
    )
}

export  default NoteListPage;