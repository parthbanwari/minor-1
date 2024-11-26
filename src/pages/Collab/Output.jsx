import { Box, Button, Text, useToast } from '@chakra-ui/react'
import React, { useState, useCallback } from 'react'
import { executeCode } from '../../pages/Editor/Api'

const Output = ({ editorRef, language,scode }) => {
    const toast = useToast()
    const [output, setOutput] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)


    const runCode = useCallback(async () => {
        const sourceCode = scode

        console.log(scode)
        if (!sourceCode) return

        try {
            setIsLoading(true)
            const result = await executeCode(language, sourceCode)
            
            //console.log('API Response:', result)

            // Handle compilation errors or runtime errors
            if (result.stderr) {
                setIsError(true)
                setOutput(result.stderr.split('\n'))
            } else {
                setIsError(false)
                setOutput(result.stdout?.split('\n') || ['No output']) // Handle case where stdout might be undefined
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
    }, [language, editorRef])

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
                isDisabled={isLoading} // Disable button while loading
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
                aria-live='polite' // Accessibility feature
            >
                <pre>
                    {output
                        ? output.map((line, i) => <Text key={i}>{line}</Text>)
                        : 'Click "Run Code" to see the output here'}
                </pre>
            </Box>
        </Box>
    )
}

export default Output
