import { createContext, useEffect, useState } from 'react';
import { v4 } from 'uuid';

export const EditorContext = createContext();

const initialSetup = [
    {
        id: v4(),
        title: 'DSA',
        files: [
            {
                id: v4(),
                title: 'stack',
                lang: 'cpp',
                code: `start coding here`,
            },
            {
                id: v4(),
                title: 'linkedlist',
                lang: 'cpp',
                code: `start coding here`,
            },
        ],
    },
    {
        id: v4(),
        title: 'PRACTICE',
        files: [
            {
                id: v4(),
                title: 'index',
                lang: 'js',
                code: `start coding here`,
            },
        ],
    },
];

export const EditorProvider = ({ children }) => {
    const [folders, setFolders] = useState(() => {
        const storedFolders = localStorage.getItem('dataFolders');
        return storedFolders ? JSON.parse(storedFolders) : initialSetup;
    });

    useEffect(() => {
        localStorage.setItem('dataFolders', JSON.stringify(folders));
    }, [folders]);

    return (
        <EditorContext.Provider value={{ folders, setFolders }}>
            {children}
        </EditorContext.Provider>
    );
};
