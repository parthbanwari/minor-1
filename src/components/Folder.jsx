import {
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Button,
    Text,
} from '@chakra-ui/react' // Import Chakra UI components
import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom' // Import useNavigate from React Router
import Card from '../components/Card'
import Modal from '../components/Modals'
import { CODE_SNIPPETS } from '../constants'
import { v4 } from 'uuid'

const Folder = ({ folder, onEdit, onDelete, setFolders }) => {
    const navigate = useNavigate()
    const [isModalOpen, setModalOpen] = useState(false)
    const [modalAction, setModalAction] = useState('')
    const [fileName, setFileName] = useState('')
    const [fileLang, setFileLang] = useState('') // File language state
    const [selectedFileId, setSelectedFileId] = useState(null)
    const inputRef = useRef(null) // Ref for the input field

    const openModal = (action, fileId = null) => {
        setModalAction(action)
        setSelectedFileId(fileId)
        if (action === 'edit') {
            const selectedFile = folder.files.find((file) => file.id === fileId)
            setFileName(selectedFile.title)
            setFileLang(selectedFile.lang)
        } else {
            setFileName('')
            setFileLang('')
        }
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false)
        setFileName('')
        setFileLang('')
        setSelectedFileId(null)
    }

    const handleSave = () => {
        if (modalAction === 'create' && fileName && fileLang) {
            const newFile = {
                id: v4(),
                title: fileName,
                lang: fileLang,
                code: CODE_SNIPPETS[fileLang] || `start coding here`,
            }
            setFolders((prevFolders) =>
                prevFolders.map((folderItem) =>
                    folderItem.id === folder.id
                        ? {
                              ...folderItem,
                              files: [...folderItem.files, newFile],
                          }
                        : folderItem
                )
            )
        } else if (modalAction === 'edit' && fileName && fileLang) {
            setFolders((prevFolders) =>
                prevFolders.map((folderItem) =>
                    folderItem.id === folder.id
                        ? {
                              ...folderItem,
                              files: folderItem.files.map((file) =>
                                  file.id === selectedFileId
                                      ? {
                                            ...file,
                                            title: fileName,
                                            lang: fileLang,
                                        }
                                      : file
                              ),
                          }
                        : folderItem
                )
            )
        } else if (modalAction === 'delete') {
            setFolders((prevFolders) =>
                prevFolders.map((folderItem) =>
                    folderItem.id === folder.id
                        ? {
                              ...folderItem,
                              files: folderItem.files.filter(
                                  (file) => file.id !== selectedFileId
                              ),
                          }
                        : folderItem
                )
            )
        }
        closeModal()
    }

    useEffect(() => {
        if (isModalOpen) {
            inputRef.current?.focus()
        }
    }, [isModalOpen])

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSave()
        }
    }

    return (
        <div className='mt-2 bg-dark-gray px-4 pb-2 rounded'>
            <div className='flex justify-between border-b border-charcoal py-2'>
                <div className='flex gap-5 items-center'>
                    <i className='fas fa-folder text-ice-blue'></i>
                    <span className='text-pale-blue'>{folder.title}</span>
                </div>
                <div className='flex gap-5 items-center'>
                    <i
                        className='fas fa-trash text-red cursor-pointer'
                        onClick={onDelete}
                    ></i>
                    <i
                        className='fas fa-edit text-light-purple-alt cursor-pointer'
                        onClick={onEdit}
                    ></i>
                    <button
                        className='bg-ice-blue text-night-blue p-2 py-1 rounded flex items-center hover:bg-opacity-75'
                        onClick={() => openModal('create')}
                    >
                        <i className='fas fa-file mr-2'></i>
                        <span>New File</span>
                    </button>
                </div>
            </div>

            <div className='mt-2 grid grid-cols-3 gap-2'>
                {folder.files.map((file) => (
                    <Card
                        key={file.id}
                        file={file}
                        onClick={() => navigate(`/editor/${file.id}`)}
                        onEdit={() => openModal('edit', file.id)}
                        onDelete={() => openModal('delete', file.id)}
                        folderId={folder.id}
                        setFolders={setFolders}
                    />
                ))}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={
                    modalAction === 'delete'
                        ? 'Confirm Deletion'
                        : modalAction === 'edit'
                        ? 'Edit File'
                        : 'Create New File'
                }
                onSave={handleSave}
            >
                {modalAction === 'delete' ? (
                    <p>Are you sure you want to delete this file?</p>
                ) : (
                    <>
                        <input
                            type='text'
                            value={fileName}
                            onChange={(e) => setFileName(e.target.value)}
                            placeholder='File Name'
                            className='border border-gray-300 rounded p-2 w-full mb-2'
                            ref={inputRef} // Attach ref for focusing input
                            onKeyDown={handleKeyDown} // Trigger save on "Enter" key
                        />

                        <Text mb={2} fontSize='lg' color='#bb9af7'></Text>
                        <Menu isLazy>
                            <MenuButton
                                as={Button}
                                backgroundColor='#ff757f'
                                color='black'
                                _hover={{ backgroundColor: '#fff' }}
                                _active={{ backgroundColor: '#c53b53' }}
                            >
                                {fileLang || 'Select Language'}
                            </MenuButton>
                            <MenuList
                                maxHeight='200px' // Set max height to limit visible items
                                overflowY='auto' // Enable vertical scroll when list exceeds maxHeight
                            >
                                {Object.keys(CODE_SNIPPETS).map((lang) => (
                                    <MenuItem
                                        key={lang}
                                        onClick={() => setFileLang(lang)}
                                    >
                                        {lang}
                                    </MenuItem>
                                ))}
                            </MenuList>
                        </Menu>
                    </>
                )}
            </Modal>
        </div>
    )
}

export default Folder
