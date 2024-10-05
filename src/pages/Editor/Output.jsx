import { Box, Button, Text, useToast } from '@chakra-ui/react'
import React, { useState, useCallback } from 'react'
import { executeCode } from './api'

const Output = ({ editorRef, language, folderId, fileId, setFolders }) => {
    const toast = useToast()
    const [output, setOutput] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const saveFileToLocalStorage = useCallback(
        (updatedCode) => {
            setFolders((prevFolders) => {
                const updatedFolders = prevFolders.map((folder) => {
                    if (folder.id === folderId) {
                        return {
                            ...folder,
                            files: folder.files.map((file) =>
                                file.id === fileId
                                    ? { ...file, code: updatedCode }
                                    : file
                            ),
                        }
                    }
                    return folder
                })

                // Save the updated folders to localStorage
                localStorage.setItem(
                    'dataFolders',
                    JSON.stringify(updatedFolders)
                )
                return updatedFolders
            })
        },
        [folderId, fileId, setFolders]
    )

    const runCode = useCallback(async () => {
        const sourceCode = editorRef.current?.getValue()
        if (!sourceCode) return

        // Save the current code to localStorage
        saveFileToLocalStorage(sourceCode)

        try {
            setIsLoading(true)
            const { run: result } = await executeCode(language, sourceCode)

            // If there is an error output in stderr, mark as error
            if (result.stderr) {
                setIsError(true)
                setOutput(result.stderr.split('\n'))
            } else {
                setIsError(false)
                setOutput(result.output.split('\n'))
            }
        } catch (error) {
            console.error(error)
            toast({
                title: 'An error occurred.',
                description: error.message || 'Unable to run the code.',
                status: 'error',
                duration: 6000,
                isClosable: true,
            })
        } finally {
            setIsLoading(false)
        }
    }, [language, editorRef, toast, saveFileToLocalStorage])

    return (
        <Box w='50%'>
            <Text mb={2} fontSize='lg' color='#bb9af7'>
                Output
            </Text>
            <Button
                backgroundColor='#ff757f'
                color='#000'
                mb={4}
                isLoading={isLoading}
                onClick={runCode}
            >
                Run Code
            </Button>

            <Box
                h='75vh'
                p={2}
                borderColor={isError ? 'red.500' : '#333'}
                bg='#1e1e1e'
                color={isError ? 'red.400' : 'white'}
                overflowY='auto'
            >
                {output
                    ? output.map((line, i) => <Text key={i}>{line}</Text>)
                    : 'Click "Run Code" to see the output here'}
            </Box>
        </Box>
    )
}

export default Output
