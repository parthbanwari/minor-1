import { useRef, useState, useCallback } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import Language from "./Language";
import { CODE_SNIPPETS } from "../../constants";
import Output from "./Output";
const CodeEditor = () => {
    const editorRef = useRef(null);
    const [value, setValue] = useState(CODE_SNIPPETS['python']);
    const [language, setLanguage] = useState('python');

    // Editor onMount function to set the editorRef
    const onMount = useCallback((editor) => {
        editorRef.current = editor;
        editor.focus();
    }, []);

    // Language select handler
    const onSelect = useCallback((newLanguage) => {
        setLanguage(newLanguage);
        setValue(CODE_SNIPPETS[newLanguage]);
    }, []);

    return (
        <Box>
            <HStack spacing={4}>
                {/* Code editor section */}
                <Box w="50%">
                    <Language language={language} onSelect={onSelect} />
                    <Editor
                        height="75vh"
                        language={language}
                        value={value}
                        onMount={onMount}
                        theme="vs-dark"
                        onChange={(newValue) => setValue(newValue)}
                    />
                </Box>

                {/* Output section */}
                <Output editorRef={editorRef} language={language} />
            </HStack>
        </Box>
    );
};

export default CodeEditor;
