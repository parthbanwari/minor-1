import { useNavigate } from 'react-router-dom'

// Inside your Card component
const Card = ({ file, folderId, onEdit, onDelete, setFolders }) => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/editor/${folderId}/${file.id}`)
    }

    const handleEdit = (event) => {
        event.stopPropagation() // Prevent the click event from bubbling up
        onEdit()
    }

    const handleDelete = (event) => {
        event.stopPropagation() // Prevent the click event from bubbling up
        onDelete()
    }

    return (
        <div onClick={handleClick} className='cursor-pointer'>
            <div className='bg-dusk p-3 rounded flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow'>
                <div>
                    <h2 className='text-pale-blue text-sm font-semibold'>
                        {file.title}.{file.lang}
                    </h2>
                </div>
                <div className='flex justify-end mt-2'>
                    <button
                        className='flex items-center bg-light-purple-alt text-night-blue px-2 py-1 rounded mr-1 hover:bg-opacity-75'
                        onClick={handleEdit}
                    >
                        <i className='fas fa-edit text-xs mr-1'></i>
                    </button>
                    <button
                        className='flex items-center bg-red text-white px-2 py-1 rounded hover:bg-opacity-75'
                        onClick={handleDelete}
                    >
                        <i className='fas fa-trash text-xs mr-1'></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card
