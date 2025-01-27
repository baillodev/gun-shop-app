import { useState } from 'react';
import { useUser } from '../contexts/userContext';
import logo from '../assets/images/logo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../firebase.config';
import { signOut } from 'firebase/auth';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline'

const Header = () => {
  const { toggleModals, currentUser } = useUser();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);  // Manage the menu state

  const logOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch {
      alert("For some reason, we can't disconnect. Please check your internet connection and retry.");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full max-w-7xl mx-auto bg-white/5 backdrop-blur-sm shadow-lg shadow-black rounded-full flex items-center justify-between gap-5 py-2 px-4 sm:px-6 md:px-8">
      <img src={logo} alt="Gun Shop logo" className="w-16 h-16 rounded-full animate-pulse duration-1000" />

      <nav className="flex items-center gap-2">
        {!currentUser ? (
          // Si l'utilisateur n'est pas connecté
          <>
            <button
              className="bg-blue-500 rounded-full px-4 py-2 text-lg text-gray-200 cursor-pointer hover:bg-blue-600 transition-bg duration-300"
              onClick={() => toggleModals('signUp')}
            >
              Sign Up
            </button>
            <button
              className="bg-blue-500 rounded-full px-4 py-2 text-lg text-gray-200 cursor-pointer hover:bg-blue-600 transition-bg duration-300"
              onClick={() => toggleModals('signIn')}
            >
              Sign In
            </button>
          </>
        ) : (
          // Si l'utilisateur est connecté
          <>
            <img
              // onClick={() => navigate("/profile")} à vérifier
              src={currentUser.picture}
              alt="Profile"
              className="w-10 h-10 rounded-full mr-2 cursor-pointer"
            />
            <button
              onClick={logOut}
              className="bg-gradient-to-r from-red-500 from-40% to-yellow-500 rounded-full px-4 py-2 text-lg text-gray-200 cursor-pointer"
            >
              Log Out
            </button>

            {/* Menu spécifique pour un admin */}
            {currentUser.role === 'admin' && (
              <button
                className="text-white"
                onClick={toggleMenu}
              >
                {isMenuOpen ? (
                  <XMarkIcon className="w-11 h-11 hover:text-gray-600 transition duration-300 cursor-pointer" />
                ) : (
                  <Bars3Icon className="w-11 h-11 hover:text-gray-600 transition duration-300 cursor-pointer" />
                )}
              </button>
            )}

            {/* Menu Admin déroulant */}
            {isMenuOpen && (
              <div className="absolute -bottom-48 left-0 right-0 bg-black/95 p-5 rounded-md flex flex-col gap-4 z-10">
                <NavLink to="/dashboard" className="text-gray-200 hover:text-white" activeClassName="text-yellow-500">Dashboard</NavLink>
                <NavLink to="/users" className="text-gray-200 hover:text-white" activeClassName="text-yellow-500">Users</NavLink>
                <NavLink to="/articles" className="text-gray-200 hover:text-white" activeClassName="text-yellow-500">Articles</NavLink>
                <NavLink to="/ventes" className="text-gray-200 hover:text-white" activeClassName="text-yellow-500">Ventes</NavLink>
              </div>
            )}
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
