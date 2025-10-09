
'use client'

import { useState } from 'react'
import { logout } from '../login/actions'


export default function LogoutButton() {
    const [loading, setLoading] = useState(false)

    const handleLogout = async () => {
        setLoading(true)
        try {
            await logout()
        } catch (error) {
            console.error('Logout failed:', error)
            setLoading(false)
        }
    }

    return (
        <button
            onClick={handleLogout}
            disabled={loading}
            className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400/70"
        >
            {loading ? 'Signing Out...' : 'Sign Out'}
        </button>
    )
}