import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useUser } from '../../contexts/userContext';
import { collection, getDocs, updateDoc, doc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase.config';
import Footer from '../../components/Footer';

const Store = () => {
    const { currentUser } = useUser();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [quantityToBuy, setQuantityToBuy] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState('credit');
    const [showModal, setShowModal] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [feedbackMessage, setFeedbackMessage] = useState(null);

    const fetchArticles = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'articles'));
            const articlesData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setArticles(articlesData);
        } catch (error) {
            setError('Failed to load articles. Please try again later.');
            console.error('Error fetching articles:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBuy = (article) => {
        if (article && article.quantity > 0) {
            setSelectedArticle(article);
            setShowModal(true);
        } else {
            setError('Sorry, this item is out of stock.');
        }
    };

    const handleConfirmPurchase = async (article) => {
        if (!article) {
            showFeedbackMessage('Article is undefined.', false);
            return;
        }

        if (quantityToBuy > 0 && quantityToBuy <= article.quantity) {
            try {
                const articleRef = doc(db, 'articles', article.id);
                await updateDoc(articleRef, {
                    quantity: article.quantity - quantityToBuy,
                });

                const saleRef = doc(collection(db, 'sales'));
                await setDoc(saleRef, {
                    userId: currentUser.uid,
                    articleId: article.id,
                    articleName: article.name,
                    price: article.price * quantityToBuy,
                    quantity: Number(quantityToBuy), // Convert quantity to a number
                    paymentMethod: paymentMethod, // Add payment method
                    date: Timestamp.now(),
                });

                showFeedbackMessage(
                    `You successfully bought ${quantityToBuy} ${article.name}(s)!`,
                    true
                );

                // Update articles immediately after purchase
                setArticles((prevArticles) =>
                    prevArticles.map((item) =>
                        item.id === article.id
                            ? { ...item, quantity: item.quantity - quantityToBuy }
                            : item
                    )
                );
            } catch (error) {
                console.error('Error making purchase:', error);
                showFeedbackMessage('There was an error with your purchase. Please try again.', false);
            }
        } else {
            showFeedbackMessage('Invalid quantity selected.', false);
        }
        setShowModal(false);
    };

    const showFeedbackMessage = (message, isSuccess) => {
        setFeedbackMessage({ message, isSuccess });
        setTimeout(() => setFeedbackMessage(null), 3000); // Auto-dismiss after 3 seconds
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    return (
        <section className="min-h-screen bg-gray-900">
            <div className="w-full max-w-7xl mx-auto text-gray-200 mb-20 pt-6 px-4 sm:px-6 md:px-8">
                <Header />
                <h1 className="text-5xl font-light my-12 px-4 sm:px-6 md:px-8">
                    Welcome to Store, {`${currentUser.username.toUpperCase()}`} &#128075;
                </h1>

                {loading && !error ? (
                    <p className="text-center text-gray-400">Loading articles...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : (
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {articles.map((article) => (
                            <div
                                key={article.id}
                                className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                            >
                                {article.image ? (
                                    <img
                                        src={article.image}
                                        alt={article.name}
                                        className="w-full h-56 object-cover rounded-t-lg"
                                    />
                                ) : (
                                    <div className="w-full h-56 bg-gray-500 flex items-center justify-center text-gray-200 rounded-t-lg">
                                        No image available
                                    </div>
                                )}

                                <h2 className="text-xl font-semibold mt-4">{article.name}</h2>
                                <p className="mt-2 text-gray-400">{article.type}</p>
                                <p className="mt-2 text-gray-400">Quantity: {article.quantity}</p>
                                <p className="mt-2 text-gray-200">
                                    Price: {article.price ? `$${article.price}` : 'Price not available'}
                                </p>

                                <button
                                    onClick={() => handleBuy(article)}
                                    className="mt-4 px-8 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition duration-300"
                                >
                                    Buy
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                    <div className="bg-gray-900/75 backdrop-blur-sm p-6 rounded-lg w-96 shadow-lg">
                        <h2 className="text-2xl mb-4 text-white">Confirm Your Purchase</h2>
                        <div className="mb-4">
                            <label className="block mb-2 text-white">Quantity:</label>
                            <input
                                type="number"
                                value={quantityToBuy}
                                onChange={(e) => setQuantityToBuy(e.target.value)}
                                min="1"
                                max="10"
                                className="w-full p-2 border border-gray-300 text-white rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-white">Payment Method:</label>
                            <select
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="w-full p-2 border border-gray-300 text-white rounded-lg bg-gray-900"
                            >
                                <option value="">Select a method</option>
                                <option value="credit">Credit Card</option>
                                <option value="paypal">PayPal</option>
                                <option value="bank">Orange Money</option>
                            </select>
                        </div>
                        <button
                            onClick={() => handleConfirmPurchase(selectedArticle)}
                            className="w-full bg-blue-500 mt-2 hover:bg-blue-600 transition duration-300 text-white py-2 rounded-lg cursor-pointer"
                        >
                            Confirm Purchase
                        </button>
                    </div>
                </div>
            )}

            {feedbackMessage && (
                <div
                    className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg text-white ${
                        feedbackMessage.isSuccess ? 'bg-green-500' : 'bg-red-500'
                    }`}
                >
                    {feedbackMessage.message}
                </div>
            )}

            <Footer />
        </section>
    );
};

export default Store;
