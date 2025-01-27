import { useEffect, useState } from 'react';
import { db } from '../../firebase.config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Header from '../../components/Header';

const Users = () => {
    const [users, setUsers] = useState([]);

    // Récupérer les utilisateurs depuis Firestore
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersSnapshot = await getDocs(collection(db, 'users'));
                const usersList = usersSnapshot.docs
                    .filter(doc => doc.data().role !== "admin") // Filtrer les utilisateurs qui ne sont pas admins
                    .map(doc => ({
                        id: doc.id, // Ajouter l'ID du document
                        ...doc.data(), // Ajouter les données du document
                    }));
                setUsers(usersList);
            } catch (error) {
                console.error("Error fetching users: ", error);
            }
        };

        fetchUsers();
    }, []);

    // Supprimer un utilisateur
    const deleteUser = async (id) => {
        try {
            await deleteDoc(doc(db, 'users', id));
            setUsers(users.filter(user => user.id !== id)); // Mettre à jour la liste des utilisateurs
        } catch (error) {
            console.error("Error deleting user: ", error);
        }
    };

    return (
        <section className="min-h-screen bg-black/90 text-gray-200">
            <div className="w-full max-w-7xl mx-auto pt-6 pb-12 px-4 sm:px-6 md:px-8">
                <Header />
                <h1 className="text-4xl font-light mt-10">User Management</h1>

                {/* Liste des utilisateurs */}
                <div className="mt-12 bg-black/90 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-6">All Users</h2>
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-left">Id</th>
                                <th className="px-4 py-2 text-left">Username</th>
                                <th className="px-4 py-2 text-left">Role</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} className="border-b border-gray-700">
                                    <td className="px-4 py-2">{user.id}</td>
                                    <td className="px-4 py-2">{user.username}</td>
                                    <td className="px-4 py-2">{user.role}</td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => deleteUser(user.id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default Users;
