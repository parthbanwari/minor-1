import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { EditorContext } from '../../Providers/EditorProvider'

const Editor = () => {
    const { folderId, fileId } = useParams()
    const { folders } = useContext(EditorContext)

    // Find the folder by ID
    const folder = folders.find((f) => f.id === folderId)

    // Find the file by ID within the folder
    const file = folder ? folder.files.find((f) => f.id === fileId) : null

    return (
        <div>
            {file ? (
                <div>
                    <h1>
                        Editing: {file.title}.{file.lang}
                    </h1>
                    <textarea defaultValue={file.code}></textarea>
                    {/* Add save logic here */}
                </div>
            ) : (
                <p>File not found!</p>
            )}
        </div>
    )
}

export default Editor
