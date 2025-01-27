import { useEffect, useState } from 'react';
import { db } from '../../firebase.config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Header from '../../components/Header';

const Articles = () => {
    const [articles, setArticles] = useState([]);

    // Fetch articles from Firestore
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const articlesSnapshot = await getDocs(collection(db, 'articles')); // Replace 'articles' with your collection name
                const articlesList = articlesSnapshot.docs.map(doc => ({
                    id: doc.id, // Include document ID
                    ...doc.data(), // Include document data
                }));
                setArticles(articlesList); // Update state with articles
            } catch (error) {
                console.error("Error fetching articles: ", error);
            }
        };

        fetchArticles();
    }, []);

    // Delete an article
    const deleteArticle = async (id) => {
        try {
            await deleteDoc(doc(db, 'articles', id)); // Delete the article from Firestore
            setArticles(articles.filter(article => article.id !== id)); // Update the list after deletion
        } catch (error) {
            console.error("Error deleting article: ", error);
        }
    };

    return (
        <section className="min-h-screen bg-black/90 text-gray-200">
            <div className="w-full max-w-7xl mx-auto pt-6 pb-12 px-4 sm:px-6 md:px-8">
                <Header />
                <h1 className="text-4xl font-light mt-10">Article Management</h1>

                {/* List of articles */}
                <div className="mt-12 bg-black/90 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-6">All Articles</h2>
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Type</th>
                                <th className="px-4 py-2 text-left">Quantité</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {articles.length > 0 ? (
                                articles.map(article => (
                                    <tr key={article.id} className="border-b border-gray-700">
                                        <td className="px-4 py-2">{article.name}</td>
                                        <td className="px-4 py-2">{article.type}</td>
                                        <td className="px-4 py-2">{article.quantity || 'Uncategorized'}</td>
                                        <td className="px-4 py-2">
                                            <button
                                                onClick={() => deleteArticle(article.id)}
                                                className="bg-red-500 text-white px-4 py-2 rounded"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-4 py-2 text-center">No articles found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default Articles;
