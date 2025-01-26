import React from "react";
import Header from '../../components/Header'
import { ReactTyped } from "react-typed";

const Home = () => {
    // bg-gray-900 
    return (
        <section className="min-h-screen bg-[url(/src/assets/images/snipper.jpg)] bg-center bg-cover">
            <div className="w-full max-w-7xl mx-auto text-gray-200 pt-6 px-4 sm:px-6 md:px-8">
                <Header />
                <h1 className="text-4xl font-light mt-10 px-4 sm:px-6 md:px-8">
                    <ReactTyped
                        strings={[
                            "Hi, Sign Up or Sign In",
                            "Welcome to the Gun Shop",
                            "Enjoy your experience!",
                        ]}
                        typeSpeed={50} // Vitesse d'écriture
                        backSpeed={30} // Vitesse d'effacement
                        backDelay={1000} // Temps d'attente avant effacement
                        loop // Répéter l'animation
                    />
                </h1>
            </div>
        </section>
    );
};

export default Home;
