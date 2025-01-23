import React from "react";
import { ReactTyped } from "react-typed";

const Home = () => {

    return (
        <section className="w-full max-w-7xl mx-auto min-h-screen bg-gray-900 text-gray-200 px-4 py-10 sm:px-6 md:px-8">
            <h1 className="text-4xl font-light text-center">
                <ReactTyped
                    strings={[
                        "Hi, Sign Up or Sign In",
                        "Welcome to the app",
                        "Enjoy your experience!",
                    ]}
                    typeSpeed={50} // Vitesse d'écriture
                    backSpeed={30} // Vitesse d'effacement
                    backDelay={1000} // Temps d'attente avant effacement
                    loop // Répéter l'animation
                />
            </h1>
        </section>
    );
};

export default Home;
