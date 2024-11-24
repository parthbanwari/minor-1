import React, { useEffect, useRef, useState } from 'react'
import * as monaco from 'monaco-editor'

const Editor = ({ language, theme, socket, roomId }) => {
    const editorContainer = useRef(null)
    const editorInstance = useRef(null)
    const [code, setCode] = useState('Greetings.')

    useEffect(() => {
        // Initialize Monaco editor
        editorInstance.current = monaco.editor.create(editorContainer.current, {
            value: code,
            language: language || 'javascript',
            theme: theme || 'vs-dark',
            automaticLayout: true,
        })

        // Listen to editor changes
        const model = editorInstance.current.getModel()
        const disposable = model.onDidChangeContent(() => {
            const newCode = model.getValue()
            setCode(newCode)
            console.log(newCode)
            if (socket) {
                socket.emit('code_change', { roomId, code: newCode })
            } else {
                console.error(
                    'Socket is not initialized properly or is undefined.'
                )
            }
        })

        return () => {
            // Cleanup editor on unmount
            disposable.dispose()
            if (editorInstance.current) {
                editorInstance.current.dispose()
            }
        }
    }, [language, theme, socket])

    useEffect(() => {
        // Update Monaco editor theme and language dynamically
        if (editorInstance.current) {
            monaco.editor.setTheme(theme || 'vs-dark')
            const model = editorInstance.current.getModel()
            monaco.editor.setModelLanguage(model, language || 'javascript')
        }
    }, [language, theme])

    useEffect(() => {
        // Listen to "code_update" from socket
        if (socket) {
            socket.on('code_update', ({ code }) => {
                const model = editorInstance.current.getModel()
                model.setValue(code)
            })
        }

        return () => {
            if (socket) {
                socket.off('code_update')
            }
        }
    }, [socket])

    const handleClick = () => {
        if (editorInstance.current) {
            editorInstance.current.focus()
        }
    }

    return (
        <div
            onClick={handleClick}
            className='w-full h-full'
            ref={editorContainer}
            style={{ height: '100%', width: '100%' }}
        ></div>
    )
}

export default Editor
