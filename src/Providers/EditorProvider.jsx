import { createContext, useEffect, useState } from 'react'
import { v4 } from 'uuid'

export const EditorContext = createContext()

const initialSetup = [
    {
        id: v4(),
        title: 'Python',
        files: [
            {
                id: v4(),
                title: 'hello',
                lang: 'py',
                code: `print("hello world")`
            },
            {
                id: v4(),
                title: 'pattern',
                lang: 'py',
                code: `# Function to print inverted half pyramid pattern
def inverted_half_pyramid(n):
    for i in range(n, 0, -1):
        for j in range(1, i + 1):
            print("* ", end="")
        print("")

# Example: Inverted Half Pyramid with n = 5
n = 5
inverted_half_pyramid(n)
`,
            },
        ],
    },
]

export const EditorProvider = ({ children }) => {
    const [folders, setFolders] = useState(() => {
        const storedFolders = localStorage.getItem('dataFolders')
        return storedFolders ? JSON.parse(storedFolders) : initialSetup
    })

    useEffect(() => {
        localStorage.setItem('dataFolders', JSON.stringify(folders))
    }, [folders])

    return (
        <EditorContext.Provider value={{ folders, setFolders }}>
            {children}
        </EditorContext.Provider>
    )
}
