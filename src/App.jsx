import Home from './pages/Home/Home'
import Editor from './pages/Editor/Editor'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { EditorProvider } from './Providers/EditorProvider'
import { ModalProvider } from './Providers/ModalProvider'

function App() {
    return (
        <>
            <EditorProvider>
                <ModalProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<Home />}></Route>
                            <Route path='/editor' element={<Editor />}></Route>
                        </Routes>
                    </BrowserRouter>
                </ModalProvider>
            </EditorProvider>
        </>
    )
}

export default App
