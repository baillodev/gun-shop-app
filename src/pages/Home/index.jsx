import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase.config";

const Home = () => {
    // const [users, setUsers] = useState([]);

    // // Fonction pour récupérer les utilisateurs
    // const fetchUsers = async () => {
    //     try {
    //         const querySnapshot = await getDocs(collection(db, "Utilisateurs"));
    //         const usersList = querySnapshot.docs.map((doc) => ({
    //             id: doc.id,
    //             ...doc.data(),
    //         }));
    //         setUsers(usersList);
    //     } catch (error) {
    //         console.error("Erreur lors du chargement des utilisateurs :", error);
    //     }
    // };

    // useEffect(() => {
    //     fetchUsers();
    // }, []);

    return (
        <section className="w-full max-w-7xl mx-auto min-h-screen bg-gray-900 text-gray-200 px-4 py-10 sm:px-6 md:px-8">
            <h1 className="text-4xl font-light text-center">Hi, Sign Up or Sign In</h1>
            {/* <div className="pt-10">
                <h1>Liste des Utilisateurs</h1>
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            <strong>{user.username}</strong> ({user.role})
                        </li>
                    ))}
                </ul>
            </div> */}
        </section>
    );
};

export default Home;
