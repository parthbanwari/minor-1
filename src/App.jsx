import Home from './pages/Home/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import CodeEditor from './pages/Editor/CodeEditor'

function App() {
    return (
        <>
        <Box minH="100vh" bg='#282e43' color='grey.500' px={6} pu={8}>
          <CodeEditor/>
        </Box>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
          </Routes>
        </BrowserRouter>
        </>
    )
}

export default App
