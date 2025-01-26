import React from 'react'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../../firebase.config'

const PrivateHome = () => {
    const navigate = useNavigate()

    const logOut = async () => {
        try {
            await signOut(auth)
            navigate('/')
        } catch {
            alert("For some reasons we can't deconnect, please check your internet connection and retry.")
        }
    }

    return (
        <div className="w-full max-w-7xl mx-auto text-gray-500 pt-6 px-4 sm:px-6 md:px-8">
            <h1 className="text-4xl font-light my-10">
                Home sweet Private Home
            </h1>
            <button
                onClick={logOut}
                className="bg-gradient-to-r from-red-500 from-40% to-yellow-500 rounded-full px-4 py-2 text-lg text-gray-200 cursor-pointer"
            >
                Log Out
            </button>
        </div>
    )
}

export default PrivateHome
