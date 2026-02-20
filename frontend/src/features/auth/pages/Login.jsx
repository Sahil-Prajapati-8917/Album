import React from 'react'
import LoginForm from '../components/LoginForm'
import { Link } from 'react-router-dom'
import { LayoutGrid } from 'lucide-react'

const Login = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted/30 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6 relative">
        <Link to="/" className="flex items-center gap-2 self-center font-bold">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <LayoutGrid className="size-4" />
          </div>
          <span className="text-xl">Pixfolio</span>
        </Link>
        <div className="flex flex-col gap-6">
          <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col p-6 space-y-1">
              <h3 className="tracking-tight text-2xl font-bold">Login</h3>
              <p className="text-sm text-muted-foreground">
                Enter your email and password below to log into your account
              </p>
            </div>
            <div className="p-6 pt-0">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
