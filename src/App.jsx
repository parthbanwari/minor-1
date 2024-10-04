import Home from './pages/Home/Home'
import Editor from './pages/Editor/Editor'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import CodeEditor from './pages/Editor/CodeEditor'
import { EditorProvider } from './Providers/EditorProvider'

function App() {
    return (
        <>
        {/* <Box minH="100vh" bg='#282e43' color='grey.500' px={6} pu={8}>
          <CodeEditor/>
        </Box> */}
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
          </Routes>
        </BrowserRouter>
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
