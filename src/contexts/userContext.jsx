import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from '../firebase.config';
import { doc, setDoc, getDoc } from "firebase/firestore";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged
} from 'firebase/auth';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    // User state
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fonction de création de compte
    const signUp = async (email, password, additionalData = {}) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const userRef = doc(db, 'users', user.uid);

            // Enregistrer les données utilisateur dans Firestore
            await setDoc(userRef, {
                role: "user",
                username: "user",
                fullname: "",
                picture: "/images/users/avatar.jpeg",
                createdAt: new Date(),
                ...additionalData,
            });

            return user;
        } catch (error) {
            console.error("Error signing up:", error);
            throw error;
        }
    };

    // Fonction de connexion
    const signIn = async (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Récupération des données utilisateur depuis Firestore et enrichissement de currentUser
    const fetchAndSetUserData = async (user) => {
        try {
            const userRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(userRef);

            if (docSnap.exists()) {
                // Fusionner les données Firestore avec les informations de Firebase Auth
                const userData = {
                    uid: user.uid,
                    email: user.email,
                    ...docSnap.data()
                };

                setCurrentUser(userData); // Mettre à jour currentUser avec toutes les infos
            } else {
                console.log("No such document in Firestore!");
                setCurrentUser(user); // Utilisateur sans données supplémentaires
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            setCurrentUser(user); // Assurez-vous de ne pas bloquer l'état
        }
    };

    // Observer les changements d'état de l'utilisateur
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                await fetchAndSetUserData(user);
            } else {
                setCurrentUser(null); // Aucun utilisateur connecté
            }
            
            setLoading(false);
        });

        return unSubscribe;
    }, []);

    // Modal state
    const [modalState, setModalState] = useState({
        signUpModal: false,
        signInModal: false
    });

    const toggleModals = (modal) => {
        if (modal === 'signUp') {
            setModalState({ signUpModal: true, signInModal: false });
        } else if (modal === 'signIn') {
            setModalState({ signUpModal: false, signInModal: true });
        } else if (modal === 'close') {
            setModalState({ signUpModal: false, signInModal: false });
        }
    };

    return (
        <UserContext.Provider value={{
            modalState,
            toggleModals,
            signUp,
            signIn,
            currentUser // Expose currentUser enrichi
        }}>
            {!loading && children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);