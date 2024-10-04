import { useRef, useState } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react"
import Language from "./Language";
import { CODE_SNIPPETS } from "../../constants";
import Output from "./Output";


const CodeEditor = () => {
    const editorRef = useRef()
    const[value, setValue] = useState('')
    const[language, setLanguage] = useState('python');

    const onMount = (editor) => {
        editorRef.current = editor;
        editor.focus();
    }
    const onSelect = (language) => {
        setLanguage(language);
        setValue(CODE_SNIPPETS[language]);
    };

    return(
        <Box>
        <HStack spacing={4}>
            <Box w='50%'>
                <Language language={language} onSelect={onSelect}/>
                <Editor height="75vh"
                language={language}
                defaultValue={CODE_SNIPPETS[language]}
                onMount={onMount}
                theme="vs-dark"
                value={value}
                onChange={
                    (value, event) => setValue(value)
                }>
                </Editor>
            </Box>
            <Output editorRef={editorRef} language={language} />
        </HStack>
        </Box>
    );
};
export default CodeEditor;