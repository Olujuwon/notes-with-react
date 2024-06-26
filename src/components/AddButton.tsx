import { Link } from 'react-router-dom'
import { IconPlus } from '@tabler/icons-react';


const AddButton = () => {
    return (
        <Link to="new"
              className={`absolute bottom-6 right-4 border-0 w-[60px] h-[60px] rounded-full flex items-center 
              justify-center cursor-pointer bg-[color:var(--color-main)]`}>
            <IconPlus size={48} className={`text-[color:var(--color-white)]`}/>
        </Link>
    )
}

export default AddButton