import React, { useContext, useState, useRef, useEffect } from 'react';
import { EditorContext } from '../../Providers/EditorProvider';
import Folder from '../../components/Folder';
import Modal from '../../components/Modals';
import { v4 } from 'uuid';

const Explorer = () => {
  const { folders, setFolders } = useContext(EditorContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(''); // "create", "edit", "delete"
  const [folderName, setFolderName] = useState('');
  const [selectedFolderId, setSelectedFolderId] = useState(null);

  const inputRef = useRef(null); // Step 1: Create a ref for the input field

  const openModal = (action, folderId = null) => {
    setModalAction(action);
    setSelectedFolderId(folderId);
    setFolderName(
      action === 'edit'
        ? folders.find((folder) => folder.id === folderId).title
        : ''
    );
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFolderName('');
    setSelectedFolderId(null);
  };

  const handleSave = () => {
    if (modalAction === 'create' && folderName) {
      const newFolder = {
        id: v4(),
        title: folderName,
        files: [],
      };
      setFolders((prevFolders) => [...prevFolders, newFolder]);
      console.log('New folder created:', folderName);
    } else if (modalAction === 'edit' && folderName) {
      setFolders((prevFolders) =>
        prevFolders.map((folder) =>
          folder.id === selectedFolderId
            ? { ...folder, title: folderName }
            : folder
        )
      );
      console.log(
        `Folder with ID ${selectedFolderId} renamed to:`,
        folderName
      );
    } else if (modalAction === 'delete') {
      setFolders((prevFolders) =>
        prevFolders.filter((folder) => folder.id !== selectedFolderId)
      );
      console.log(`Folder with ID ${selectedFolderId} deleted`);
    }
    closeModal();
  };

  // Step 3: Focus on input when modal opens
  useEffect(() => {
    if (isModalOpen && modalAction === 'create') {
      inputRef.current?.focus();
    }
  }, [isModalOpen, modalAction]);

  // Step 4: Handle "Enter" key for creating or editing folder
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <div className='p-5 bg-night-blue text-light-purple'>
      <div className='flex justify-between py-2 border-b-2 border-charcoal'>
        <h1 className='text-light-purple'>Explorer</h1>
        <button
          className='flex justify-center items-center bg-coral text-night-blue px-3 py-2 rounded hover:bg-opacity-75'
          onClick={() => openModal('create')}
        >
          <i className='fas fa-folder-plus mr-2'></i>
          <span>New Folder</span>
        </button>
      </div>

      <div className='overflow-auto h-[625px] hide-scrollbar'>
        {folders.map((folder) => (
          <Folder
            key={folder.id}
            folder={folder}
            onEdit={() => openModal('edit', folder.id)}
            onDelete={() => openModal('delete', folder.id)}
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
            ? 'Edit Folder'
            : 'Create New Folder'
        }
        onSave={handleSave}
        buttonLabel={modalAction === 'delete' ? 'Delete' : 'Save'} // Dynamically set the button label
      >
        {modalAction === 'delete' ? (
          <p>Are you sure you want to delete this folder?</p>
        ) : (
          <input
            type='text'
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder='Folder Name'
            className='border border-gray-300 rounded p-2 w-full'
            ref={inputRef} // Step 2: Attach ref to input
            onKeyDown={handleKeyDown} // Step 4: Trigger save on "Enter"
          />
        )}
      </Modal>
    </div>
  );
};

export default Explorer;
