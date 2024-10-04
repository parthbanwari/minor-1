import { Box, Button, Text } from '@chakra-ui/react';
import React from 'react';

const Output = ({editorRef, language}) => {
    const  runCode = async() => {
        const sourceCode = editorRef.current.gerValue();
        if (!sourceCode) return;
        try{

        }catch(error){
            
        }
    }
  return (
    <Box w='50%'>
      <Text mb={2} fontSize='lg'>Output</Text>
      <Button
        variant={'outline'}
        colorScheme="green"
        mb={4}
      >
        Run Code
      </Button>
      <Box 
            h='75vh'
            p={2}
            border='1px solid'
            borderRadius={4}
            borderColor="#333"
            bg="#1f1f1e"
      >TESTING</Box>
    </Box>
  );
}

export default Output;
