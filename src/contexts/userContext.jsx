import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [modalState, setModalState] = useState({
        signUpModal: false,
        signInModal: false
    })

    const toggleModals = modal => {

        if (modal === 'signUp') {
            setModalState({
                signUpModal: true,
                signInModal: false
            })
        } 

        if (modal === 'signIn') {
            setModalState({
                signUpModal: false,
                signInModal: true
            })
        } 
        
        if (modal === 'close') {
            setModalState({
                signUpModal: false,
                signInModal: false
            })
        }
    }
    return (
        <UserContext.Provider value={{modalState, toggleModals}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)