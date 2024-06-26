import {Note} from "../appTypes.ts";
import {Link} from "react-router-dom";

interface NoteListItemProps {
    note: Note
}

const getNoteTitle = (note: Note)=>{
    const title = note.body
    if (title.length > 45) {
        return title.slice(0, 45)
    }
    return title.replace(/^["'](.+(?=["']$))["']$/, '$1');
}

const getNoteTime = (note: Note)=>{
    return new Date(note.updatedAt).toLocaleDateString()
}


const getNoteContentSummary = (note: Note) => {
    let contentSummary = note.body
    contentSummary = contentSummary.replaceAll(getNoteTitle(note), '')

    if (contentSummary.length > 45) {
        return contentSummary.slice(0, 35)
    }
    return contentSummary.replace(/^["'](.+(?=["']$))["']$/, '$1');
}

const NoteListItem: React.FC<NoteListItemProps> = ({note})=>{
    return(
        <Link to={`${note.id}`}>
            <div
                className={`w-[95%] mx-auto border-b-2 border-b-[color:var(--color-bg)] text-[color:var(--color-light)] border-solid mb-2 py-4 px-2 rounded 
                hover:bg-[color:var(--color-bg)]`}>
                <h3 className={`font-semibold`}>{`${getNoteTitle(note)}`}</h3>
                <p className={`font-normal`}>
                    <span className={`mr-4 inline-block`}>{getNoteTime(note)}</span>
                    {getNoteContentSummary(note)}</p>
            </div>
        </Link>
    )
}

export default NoteListItem;