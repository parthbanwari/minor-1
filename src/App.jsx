import Home from './pages/Home/Home'
import Editor from './pages/Editor/Editor'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { EditorProvider } from './Providers/EditorProvider'

function App() {
    return (
        <>
            <EditorProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Home />}></Route>
                        <Route
                            path='/editor/:folderId/:fileId'
                            element={<Editor folders={{}} />}
                        ></Route>
                    </Routes>
                </BrowserRouter>
            </EditorProvider>
        </>
    )
}

export default App
