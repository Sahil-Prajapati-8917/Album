import React from 'react'
import LoginForm from '../components/LoginForm'
import { Link } from 'react-router-dom'
import { GalleryVerticalEnd } from 'lucide-react'

const AuthContainer = ({ children }) => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted/40 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link to="/" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Shadcnblocks - Admin Kit
        </Link>
        {children}
      </div>
    </div>
  )
}

const Login = () => {
  return (
    <AuthContainer>
      <div className="w-full">
        <LoginForm />
      </div>
    </AuthContainer>
  )
}

export default Login
