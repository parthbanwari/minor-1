import Home from './pages/Home/Home'
import CodeEditor from './pages/Editor/CodeEditor'
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
                            element={<CodeEditor folders={{}} />}
                        ></Route>
                    </Routes>
                </BrowserRouter>
            </EditorProvider>
        </>
    )
}

export default App
