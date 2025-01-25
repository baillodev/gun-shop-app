import React from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useUser } from '../contexts/userContext'

const Login = () => {
    const { modalState, toggleModals } = useUser()

    return (
        <>
            {modalState.signInModal && (
                <div
                    className='fixed top-0 left-0 w-full h-screen bg-black/75 flex items-center justify-center z-10'
                    onClick={() => toggleModals('close')}
                >
                    <div 
                        className='w-full max-w-sm bg-white/5 backdrop-blur-md text-gray-200 rounded-lg shadow-lg shadow-black'
                        onClick={e => e.stopPropagation()}
                    >
                        <div className='flex justify-between items-center border-b-2 border-gray-200 p-5'>
                            <h2 className='text-4xl font-semibold'>Sign In</h2>
                            <XMarkIcon 
                                className='w-6 h-6 cursor-pointer text-gray-200 hover:text-gray-400' 
                                role="button"
                                tabIndex={0}
                                aria-label="Close modal"
                                onClick={() => toggleModals('close')}
                            />
                        </div>
                        <form className='p-5 flex flex-col gap-3'>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="email">Email Address</label>
                                <input
                                    className='border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300'
                                    type="email"
                                    id='email'
                                    name='email'
                                />
                                <div className='text-sm text-red-500'></div>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="password">Password</label>
                                <input
                                    className='border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300'
                                    type="password"
                                    id='password'
                                    name='password'
                                />
                                <div className='text-sm text-red-500'></div>
                            </div>
                            <button className='w-full bg-blue-500 border border-blue-500 rounded-lg mt-2 py-2 text-lg text-gray-200 cursor-pointer hover:bg-blue-600 transition-bg duration-300'>
                                Sign In
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default Login
