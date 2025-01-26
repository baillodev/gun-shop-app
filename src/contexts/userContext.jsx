import { createContext, useContext, useState, useEffect } from "react";
import { auth } from '../firebase.config'
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged
} from 'firebase/auth'

const UserContext = createContext()

export const UserProvider = ({children}) => {
    // User
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    const signUp = (email, password) => createUserWithEmailAndPassword(auth, email, password)
    const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password)

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setCurrentUser(currentUser)
            setLoading(false)
        })

        return unSubscribe
    }, [])

    // Modal
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
        <UserContext.Provider value={{modalState, toggleModals, signUp, signIn, currentUser}}>
            {!loading && children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)