import { createContext, useState } from 'react'

export const ModalContext = createContext()

export const ModalProvider = ({ children }) => {
    return (
        <ModalContext.Provider value={{}}>
            {children}
        </ModalContext.Provider>
    )
}
