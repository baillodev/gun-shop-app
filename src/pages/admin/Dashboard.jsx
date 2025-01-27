import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useUser } from '../../contexts/userContext';
import { NavLink } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { db } from '../../firebase.config';
import { collection, getDocs } from 'firebase/firestore';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const { currentUser } = useUser();
    const [salesData, setSalesData] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalArticles, setTotalArticles] = useState(0);
    const [totalSales, setTotalSales] = useState(0);

    // Récupérer les données des ventes et des statistiques
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Récupérer les données de ventes
                const salesSnapshot = await getDocs(collection(db, "sales"));
                const salesList = salesSnapshot.docs.map(doc => doc.data());
                setSalesData(salesList);

                // Récupérer le nombre total d'utilisateurs
                const usersSnapshot = await getDocs(collection(db, "users"));
                setTotalUsers(usersSnapshot.size);

                // Récupérer le nombre total d'articles
                const articlesSnapshot = await getDocs(collection(db, "articles"));
                setTotalArticles(articlesSnapshot.size);

                // Récupérer les ventes totales (exemple simplifié)
                const totalSales = salesList.reduce((acc, sale) => acc + sale.price, 0);
                setTotalSales(totalSales);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    // Données pour le graphique des ventes
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'], // Mois
        datasets: [
            {
                label: 'Ventes',
                data: salesData.map(sale => sale.price),
                borderColor: '#34D399',
                backgroundColor: 'rgba(52, 211, 153, 0.2)',
                fill: true,
            },
        ],
    };

    // Options pour le graphique
    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Graphique des ventes (2025)',
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <section className="min-h-screen bg-black/90 text-gray-200">
            <div className="w-full max-w-7xl mx-auto pt-6 pb-12 px-4 sm:px-6 md:px-8">
                <Header />

                <h1 className="text-4xl font-light mt-10">
                    Welcome to your dashboard, {currentUser.username.toUpperCase()}
                </h1>

                {/* Graphique des ventes */}
                <div className="mt-12">
                    <h2 className="text-2xl font-semibold mb-6">Ventes Mensuelles</h2>
                    <div className="bg-black/90 p-6 rounded-lg shadow-lg">
                        <Line data={data} options={options} />
                    </div>
                </div>

                {/* Dashboard Cards/Widgets Section */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-black/90 p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold mb-4">Total Users</h2>
                        <p className="text-3xl">{totalUsers}</p>
                    </div>
                    <div className="bg-black/90 p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold mb-4">Total Articles</h2>
                        <p className="text-3xl">{totalArticles}</p>
                    </div>
                    <div className="bg-black/90 p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold mb-4">Total Ventes</h2>
                        <p className="text-3xl">{totalSales}</p>
                    </div>
                </div>

                {/* Quick Actions Section */}
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-black/90 p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Manage Users</h3>
                        <NavLink to="/users" className="text-blue-400 hover:underline">
                            Go to Users Management
                        </NavLink>
                    </div>
                    <div className="bg-black/90 p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Manage Articles</h3>
                        <NavLink to="/articles" className="text-blue-400 hover:underline">
                            Go to Articles Management
                        </NavLink>
                    </div>
                    <div className="bg-black/90 p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Ventes Analytics</h3>
                        <NavLink to="/ventes" className="text-blue-400 hover:underline">
                            View Sales
                        </NavLink>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
