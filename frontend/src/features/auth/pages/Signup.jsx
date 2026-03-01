import React, { useState } from 'react'
import CreateAccountForm from '../components/CreateAccountForm'
import { Link } from 'react-router-dom'

const Signup = () => {
  const [accountType, setAccountType] = useState('photographer')

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-8 text-foreground selection:bg-primary/15">
      <div className="bg-card text-card-foreground rounded-3xl shadow-xl flex flex-row-reverse w-full max-w-[1200px] min-h-[700px] max-h-[90vh] overflow-hidden border">

        {/* Left Image Area (Match Login layout) */}
        <div className="hidden lg:block w-1/2 relative bg-muted">
          <img
            src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Photography Setup"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>
        </div>

        {/* Right Form Area (Scrollable to match the Login right-side form layout) */}
        <div className="w-full lg:w-1/2 flex flex-col relative z-10 overflow-y-auto ">
          <div className="p-8 md:p-12 lg:p-16 flex flex-col min-h-full">
            {/* Top Navigation Bar inside Card (Right aligned like Login) */}
            <div className="w-full flex justify-end items-center mb-6">
              <Link to="/" className="flex items-center gap-3 cursor-pointer group">
                <div className="size-6 text-foreground group-hover:scale-105 transition-transform flex items-center justify-center">
                  <svg className="w-full h-full" fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"></path>
                  </svg>
                </div>
                <span className="text-xl font-bold text-foreground">Pixfolio</span>
              </Link>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col pb-10 justify-center">
              <div className="w-full max-w-[420px] animate-in fade-in mx-auto">
                <CreateAccountForm accountType={accountType} setAccountType={setAccountType} />
              </div>
            </div>

            {/* Footer Text */}
            {/* <div className="mt-8 pt-4 border-t border-border flex justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <img className="inline-block h-6 w-6 rounded-full ring-2 ring-background object-cover" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                  <img className="inline-block h-6 w-6 rounded-full ring-2 ring-background object-cover" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                </div>
                <span className="text-sm text-muted-foreground font-medium">Join 1000+ professionals</span>
              </div>
            </div> */}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Signup