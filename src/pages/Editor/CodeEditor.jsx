import { useLocation } from 'react-router-dom'
import { useRef, useState, useCallback, useEffect, useContext } from 'react'
import { Box, HStack } from '@chakra-ui/react'
import { Editor } from '@monaco-editor/react'
import { EditorContext } from '../../Providers/EditorProvider' // Import the EditorContext
import Language from './Language'
import { CODE_SNIPPETS } from '../../constants'
import Output from './Output'

const CodeEditor = () => {
    const editorRef = useRef(null)
    const location = useLocation()
    const { folderId, file } = location.state || {} // Access the passed state

    const [value, setValue] = useState(file?.code || CODE_SNIPPETS['python'])
    const [language, setLanguage] = useState(file?.lang || 'python')

    const { folders, setFolders } = useContext(EditorContext) // Access setFolders from the context

    // Editor onMount function to set the editorRef
    const onMount = useCallback((editor) => {
        editorRef.current = editor
        editor.focus()
    }, [])

    // Language select handler
    const onSelect = useCallback(
        (newLanguage) => {
            setLanguage(newLanguage)
            setValue(CODE_SNIPPETS[file?.code || newLanguage])
        },
        [file]
    )

    return (
        <Box minH='100vh' bg='#282e43' color='grey.500' px={6} pu={8}>
            <HStack spacing={4}>
                {/* Code editor section */}
                <Box w='50%'>
                    <Language language={language} onSelect={onSelect} />
                    <Editor
                        height='75vh'
                        language={language}
                        value={value}
                        onMount={onMount}
                        theme='vs-dark'
                        onChange={(newValue) => setValue(newValue)}
                    />
                </Box>

                {/* Output section */}
                <Output
                    editorRef={editorRef}
                    language={language}
                    folderId={folderId}
                    fileId={file.id}
                    setFolders={setFolders} // Pass setFolders from the context
                />
            </HStack>
        </Box>
    )
}

export default CodeEditor
