import React, { useState } from 'react';
import Modal from '../components/Modals'; // Ensure this component is correctly implemented

const Card = ({ file, folderId, setFolders }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState(''); // "edit", "delete"
    const [fileName, setFileName] = useState('');
    const [fileLang, setFileLang] = useState(''); // State for file language

    const openModal = (action) => {
        setModalAction(action);
        if (action === 'edit') {
            setFileName(file.title); // Set the file name for editing
            setFileLang(file.lang);   // Set the file lang for editing
        }
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setFileName('');
        setFileLang(''); // Reset language input on close
    };

    const handleSave = () => {
        if (modalAction === 'edit' && fileName && fileLang) {
            // Logic to edit the file
            setFolders((prevFolders) =>
                prevFolders.map((folder) =>
                    folder.id === folderId
                        ? {
                              ...folder,
                              files: folder.files.map((f) =>
                                  f.id === file.id
                                      ? { ...f, title: fileName, lang: fileLang } // Update both title and lang
                                      : f
                              ),
                          }
                        : folder
                )
            );
            console.log(`File with ID ${file.id} renamed to:`, fileName, `with language: ${fileLang}`);
        } else if (modalAction === 'delete') {
            // Logic to delete the file
            setFolders((prevFolders) =>
                prevFolders.map((folder) =>
                    folder.id === folderId
                        ? {
                              ...folder,
                              files: folder.files.filter(
                                  (f) => f.id !== file.id
                              ),
                          }
                        : folder
                )
            );
            console.log(`File with ID ${file.id} deleted`);
        }
        closeModal();
    };

    return (
        <div>
            <div className='bg-dusk p-3 rounded flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow'>
                <div>
                    <h2 className='text-pale-blue text-sm font-semibold'>
                        {file.title}.{file.lang}
                    </h2>
                </div>
                <div className='flex justify-end mt-2'>
                    <button
                        aria-label='Edit file'
                        className='flex items-center bg-light-purple-alt text-night-blue px-2 py-1 rounded mr-1 hover:bg-opacity-75'
                        onClick={() => openModal('edit')}
                    >
                        <i className='fas fa-edit text-xs mr-1'></i>
                    </button>
                    <button
                        aria-label='Delete file'
                        className='flex items-center bg-red text-white px-2 py-1 rounded hover:bg-opacity-75'
                        onClick={() => openModal('delete')}
                    >
                        <i className='fas fa-trash text-xs mr-1'></i>
                    </button>
                </div>
            </div>

            {/* Modal for Edit and Delete Actions */}
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={
                    modalAction === 'delete' ? 'Confirm Deletion' : 'Edit File'
                }
                onSave={handleSave}
            >
                {modalAction === 'delete' ? (
                    <p>Are you sure you want to delete this file?</p>
                ) : (
                    <div>
                        <input
                            type='text'
                            value={fileName}
                            onChange={(e) => setFileName(e.target.value)}
                            placeholder='File Name'
                            className='border border-gray-300 rounded p-2 w-full mb-2'
                        />
                        <input
                            type='text'
                            value={fileLang}
                            onChange={(e) => setFileLang(e.target.value)}
                            placeholder='File Language'
                            className='border border-gray-300 rounded p-2 w-full'
                        />
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Card;
