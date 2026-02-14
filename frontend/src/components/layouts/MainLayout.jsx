import React from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navigation />
            <main className="flex-grow pt-[73px]"> {/* Offset for fixed header */}
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default MainLayout
