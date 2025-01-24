import React from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useUser } from '../contexts/userContext'

const Register = () => {
    const {modalState, toggleModals} = useUser()

    return (
        <>
            {modalState.signUpModal && (
                <div className='fixed top-0 left-0 w-full h-screen bg-black/75 flex items-center justify-center z-10'>
                    <div className='w-full max-w-sm bg-white/5 backdrop-blur-md text-white rounded-lg shadow-lg'>
                        <div className='flex justify-between items-center border-b-2 border-white p-5'>
                            <h2 className='text-3xl font-semibold'>Sign Up</h2>
                            <XMarkIcon className='w-6 h-6 cursor-pointer text-white hover:text-gray-400' />
                        </div>
                        <form className='p-5 flex flex-col gap-3'>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="email">Email Address</label>
                                <input
                                    className='border border-white rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300'
                                    type="email"
                                    id='email'
                                    name='email'
                                />
                                <div className='text-sm text-red-500'></div>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="password">Password</label>
                                <input
                                    className='border border-white rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300'
                                    type="password"
                                    id='password'
                                    name='password'
                                />
                                <div className='text-sm text-red-500'></div>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="password">Confirm Password</label>
                                <input
                                    className='border border-white rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300'
                                    type="password"
                                    id='password'
                                    name='password'
                                />
                                <div className='text-sm text-red-500'></div>
                            </div>
                            <button className='w-full bg-blue-500 border border-blue-500 rounded-lg mt-2 py-2 text-lg text-white'>
                                Sign In
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default Register
