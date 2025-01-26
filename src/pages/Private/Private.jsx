import React from 'react'
import { useUser } from '../../contexts/userContext'
import { Navigate, Outlet } from 'react-router-dom'

const Private = () => {
    const {currentUser} = useUser()
    console.log("PRIVATE", currentUser)

    if (!currentUser) {
        return <Navigate to='/' />
    }
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default Private
