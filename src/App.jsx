import React from 'react';
import Home from './pages/Home/Home';
import CodeEditor from './pages/Editor/CodeEditor';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EditorProvider } from './Providers/EditorProvider';
import { Toaster } from 'react-hot-toast';
import CollabEditorPage from './pages/Collab/CollabEditorPage';
import CollabHome from './pages/Collab/CollabHome';

function App() {
    return (
        <EditorProvider>
            <BrowserRouter>
                <Routes>
                    {/* Home route */}
                    <Route path="/" element={<Home />} />

                    {/* Code Editor route */}
                    <Route
                        path="/editor/:folderId/:fileId"
                        element={<CodeEditor />}
                    />

                    {/* Collaborative Home route */}
                    <Route path="/collab" element={<CollabHome />} />

                    {/* Collaborative Editor route */}
                    <Route
                        path="/collab/:roomId"
                        element={<CollabEditorPage />}
                    />
                </Routes>
                {/* Toaster for notifications */}
                <Toaster />
            </BrowserRouter>
        </EditorProvider>
    );
}

export default App;
