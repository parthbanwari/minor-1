import { useLocation } from 'react-router-dom'
import { useRef, useState, useCallback, useContext } from 'react'
import { Box, HStack } from '@chakra-ui/react'
import { Editor } from '@monaco-editor/react'
import { EditorContext } from '../../Providers/EditorProvider'
import Language from './Language'
import { CODE_SNIPPETS } from '../../constants'
import Output from './Output'

const CodeEditor = () => {
    const editorRef = useRef(null)
    const location = useLocation()
    const { folderId, file } = location.state || {}

    const [value, setValue] = useState(file?.code || CODE_SNIPPETS['python'])
    const [language, setLanguage] = useState(file?.lang || 'python')
    
    const { folders, setFolders } = useContext(EditorContext)

    const onMount = useCallback((editor) => {
        editorRef.current = editor
        editor.focus()
    }, [])

    // Updated language select handler to properly sync with Monaco
    const onSelect = useCallback((newLanguage) => {
        setLanguage(newLanguage)
        
        // If there's a file code use that, otherwise use the snippet for the new language
        const newCode = file?.code || CODE_SNIPPETS[newLanguage]
        setValue(newCode)

        // Update Monaco editor's language model if editor is mounted
        if (editorRef.current) {
            const model = editorRef.current.getModel()
            if (model) {
                monaco.editor.setModelLanguage(model, newLanguage)
            }
        }
    }, [file])

    // Function to get the correct Monaco language identifier
    const getMonacoLanguage = (lang) => {
        // Map common language names to Monaco identifiers
        const languageMap = {
            'python': 'python',
            'javascript': 'javascript',
            'typescript': 'typescript',
            'java': 'java',
            'cpp': 'cpp',
            'c': 'c',
            'csharp': 'csharp',
            'php': 'php',
            'ruby': 'ruby',
            'go': 'go',
            'rust': 'rust',
            'html': 'html',
            'css': 'css',
            // Add more mappings as needed
        }
        return languageMap[lang.toLowerCase()] || lang.toLowerCase()
    }

    return (
        <Box minH='100vh' bg='#282e43' color='grey.500' px={6} pu={8}>
            <HStack spacing={4}>
                <Box w='50%'>
                    <Language language={language} onSelect={onSelect} />
                    <Editor
                        height='75vh'
                        language={getMonacoLanguage(language)}
                        value={value}
                        onMount={onMount}
                        theme='vs-dark'
                        onChange={(newValue) => setValue(newValue)}
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            scrollBeyondLastLine: false,
                            wordWrap: "on",
                            automaticLayout: true,
                            tabSize: 4,
                            lineNumbers: 'on',
                            roundedSelection: false,
                            cursorStyle: 'line',
                        }}
                    />
                </Box>

                <Output
                    editorRef={editorRef}
                    language={language}
                    folderId={folderId}
                    fileId={file?.id}
                    setFolders={setFolders}
                />
            </HStack>
        </Box>
    )
}

export default CodeEditor