import React, { useState } from 'react';
import Card from '../components/Card';
import Modal from '../components/Modals';
import { v4 } from 'uuid';

const Folder = ({ folder, onEdit, onDelete, setFolders }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState('');
    const [fileName, setFileName] = useState('');
    const [fileLang, setFileLang] = useState('');
    const [selectedFileId, setSelectedFileId] = useState(null);

    const openModal = (action, fileId = null) => {
        setModalAction(action);
        setSelectedFileId(fileId);
        if (action === 'edit') {
            const selectedFile = folder.files.find((file) => file.id === fileId);
            setFileName(selectedFile.title);
            setFileLang(selectedFile.lang);
        } else {
            setFileName('');
            setFileLang('');
        }
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setFileName('');
        setFileLang('');
        setSelectedFileId(null);
    };

    const handleSave = () => {
        if (modalAction === 'create' && fileName && fileLang) {
            const newFile = {
                id: v4(),
                title: fileName,
                lang: fileLang,
                code: `start coding here`,
            };
            setFolders((prevFolders) =>
                prevFolders.map((folderItem) =>
                    folderItem.id === folder.id
                        ? {
                              ...folderItem,
                              files: [...folderItem.files, newFile],
                          }
                        : folderItem
                )
            );
        } else if (modalAction === 'edit' && fileName && fileLang) {
            setFolders((prevFolders) =>
                prevFolders.map((folderItem) =>
                    folderItem.id === folder.id
                        ? {
                              ...folderItem,
                              files: folderItem.files.map((file) =>
                                  file.id === selectedFileId
                                      ? { ...file, title: fileName, lang: fileLang }
                                      : file
                              ),
                          }
                        : folderItem
                )
            );
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
            );
        }
        closeModal();
    };

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
                        />
                        <input
                            type='text'
                            value={fileLang}
                            onChange={(e) => setFileLang(e.target.value)}
                            placeholder='Language'
                            className='border border-gray-300 rounded p-2 w-full'
                        />
                    </>
                )}
            </Modal>
        </div>
    );
};

export default Folder;
