import React from 'react'
import { Outlet } from 'react-router-dom'
import { GridPattern } from "@/components/ui/grid-pattern" // Assuming this exists or will be created/mocked
import { cn } from "@/lib/utils"

const AuthLayout = () => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-background relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent pointer-events-none" />
                {/* If GridPattern is not available, this fallback div works fine */}
                <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            </div>

            <div className="relative z-10 w-full max-w-md animate-in zoom-in-95 duration-500">
                <Outlet />
            </div>
        </div>
    )
}

export default AuthLayout
