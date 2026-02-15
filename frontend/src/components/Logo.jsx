import React from 'react'

const Logo = ({ className = "h-8 w-auto" }) => {
    return (
        <img
            src="/Pixfolio_Logo.svg"
            alt="Pixfolio"
            className={className}
        />
    )
}

export default Logo
