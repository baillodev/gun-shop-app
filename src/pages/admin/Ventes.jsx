import { useEffect, useState } from 'react';
import { db } from '../../firebase.config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Header from '../../components/Header';

const Sales = () => {
    const [sales, setSales] = useState([]);

    // Récupérer les ventes depuis Firestore
    useEffect(() => {
        const fetchSales = async () => {
            try {
                const salesSnapshot = await getDocs(collection(db, 'sales')); // Remplacez 'sales' par le nom exact de votre collection Firestore
                const salesList = salesSnapshot.docs.map(doc => ({
                    id: doc.id, // Inclure l'ID du document
                    ...doc.data(), // Inclure les données du document
                }));
                setSales(salesList); // Met à jour l'état avec les ventes récupérées
            } catch (error) {
                console.error("Error fetching sales: ", error);
            }
        };

        fetchSales();
    }, []);

    // Supprimer une vente
    const deleteSale = async (id) => {
        try {
            await deleteDoc(doc(db, 'sales', id)); // Supprime la vente dans Firestore
            setSales(sales.filter(sale => sale.id !== id)); // Met à jour la liste des ventes après suppression
        } catch (error) {
            console.error("Error deleting sale: ", error);
        }
    };

    // Convertir une date Firestore en format lisible
    const formatDate = (timestamp) => {
        if (!timestamp) return 'Unknown';
        if (timestamp.seconds && timestamp.nanoseconds) {
            return new Date(timestamp.seconds * 1000).toLocaleDateString(); // Convertir en millisecondes
        }
        return timestamp; // Si ce n'est pas un objet Timestamp, retournez tel quel
    };

    return (
        <section className="min-h-screen bg-black/90 text-gray-200">
            <div className="w-full max-w-7xl mx-auto pt-6 pb-12 px-4 sm:px-6 md:px-8">
                <Header />
                <h1 className="text-4xl font-light mt-10">Sales Management</h1>

                {/* Liste des ventes */}
                <div className="mt-12 bg-black/90 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-6">All Sales</h2>
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-left">Product</th>
                                <th className="px-4 py-2 text-left">Payment Method</th>
                                <th className="px-4 py-2 text-left">Quantity</th>
                                <th className="px-4 py-2 text-left">Date</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sales.length > 0 ? (
                                sales.map(sale => (
                                    <tr key={sale.id} className="border-b border-gray-700">
                                        <td className="px-4 py-2">{sale.articleName || 'N/A'}</td>
                                        <td className="px-4 py-2">{sale.paymentMethod || 'N/A'}</td>
                                        <td className="px-4 py-2">{sale.quantity || '0'}</td>
                                        <td className="px-4 py-2">{formatDate(sale.date)}</td>
                                        <td className="px-4 py-2">
                                            <button
                                                onClick={() => deleteSale(sale.id)}
                                                className="bg-red-500 text-white px-4 py-2 rounded"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-4 py-2 text-center">No sales found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default Sales;
