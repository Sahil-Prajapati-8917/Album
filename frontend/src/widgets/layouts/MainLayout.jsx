import { Outlet } from 'react-router-dom'
import LandingHeader from '@/widgets/layouts/LandingHeader'
import Footer from '@/widgets/layouts/Footer'

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <LandingHeader />
            <main className="flex-grow pt-20"> {/* Offset for fixed header h-20 */}
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default MainLayout
