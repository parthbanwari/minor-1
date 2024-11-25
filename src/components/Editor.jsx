import React, { useRef, useEffect, useState } from 'react';
import { basicSetup } from 'codemirror';

import { oneDark } from '@codemirror/theme-one-dark';
import { dracula, amy, barf, coolGlow } from 'thememirror';

import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { defaultKeymap, insertTab } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';

const themes = {
    oneDark,
    dracula,
    amy,
    barf,
    coolGlow,
};

const Editor = ({ language, theme, socket, roomId }) => {
    const editorContainer = useRef();
    const [code, setCode] = useState('Greetings.');
    const editorView = useRef(null);

    // Listener for editor updates
    const onUpdate = EditorView.updateListener.of((v) => {
        if (v.docChanged) {
            const newCode = v.state.doc.toString();
            setCode(newCode);

            if (socket) {
                socket.emit('code_change', { roomId, code: newCode });
            } else {
                console.error('Socket is not initialized properly or is undefined.');
            }
        }
    });

    // Map language to its CodeMirror extension
    const getLanguageExtension = (lang) => {
        switch (lang) {
            case 'javascript':
                return javascript();
            case 'text':
                return basicSetup;
            case 'python':
                return python();
            default:
                return basicSetup;
        }
    };

    // Initialize CodeMirror editor
    useEffect(() => {
        const state = EditorState.create({
            doc: code,
            extensions: [
                basicSetup,
                keymap.of([
                    ...defaultKeymap,
                    {
                        key: 'Tab',
                        preventDefault: true,
                        run: insertTab,
                    },
                ]),
                themes[theme] || oneDark,
                onUpdate,
                getLanguageExtension(language),
                EditorView.lineWrapping,
            ],
        });

        editorView.current = new EditorView({
            state,
            parent: editorContainer.current,
        });

        return () => {
            if (editorView.current) {
                editorView.current.destroy();
            }
        };
    }, [language, theme, socket]);

    // Socket event listeners
    useEffect(() => {
        if (socket) {
            socket.on('code_update', ({ code }) => {
                const state = EditorState.create({
                    doc: code,
                    extensions: [
                        basicSetup,
                        keymap.of([
                            ...defaultKeymap,
                            {
                                key: 'Tab',
                                preventDefault: true,
                                run: insertTab,
                            },
                        ]),
                        themes[theme] || oneDark,
                        onUpdate,
                        getLanguageExtension(language),
                        EditorView.lineWrapping,
                    ],
                });
                editorView.current.setState(state);
            });
        }

        return () => {
            if (socket) {
                socket.off('code_update');
            }
        };
    }, [language, theme, socket]);

    // Focus editor when container is clicked
    const handleClick = () => {
        if (editorView.current) {
            editorView.current.focus();
        }
    };

    return (
        <div
            onClick={handleClick}
            className="editor-container"
            style={{
                width: '100%',
                height: '540px', // Set desired height
                overflow: 'auto', // Enable scrolling
                border: '1px solid #111',
                backgroundColor: '#1e1e1e', // Match the theme
            }}
        >
            <div ref={editorContainer} style={{ height: '100%' }}></div>
        </div>
    );
};

export default Editor;
