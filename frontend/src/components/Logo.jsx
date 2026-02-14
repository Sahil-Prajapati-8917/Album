import React from 'react'

const Logo = ({ className = "h-8 w-auto" }) => {
    return (
        <svg
            className={className}
            viewBox="0 0 400 400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
        >
            {/* Outer Album Frame */}
            <rect x="60" y="60" width="280" height="280" rx="50"
                stroke="#C6A75E"
                strokeWidth="6" />

            {/* Camera Lens Circle */}
            <circle cx="200" cy="200" r="75"
                stroke="#111111"
                strokeWidth="8" />

            {/* Aperture Blades */}
            <g fill="#111111">
                <path d="M200 135 L225 175 L200 175 Z" />
                <path d="M265 200 L225 225 L225 200 Z" />
                <path d="M200 265 L175 225 L200 225 Z" />
                <path d="M135 200 L175 175 L175 200 Z" />
            </g>

            {/* Subtle Inner Gold Ring */}
            <circle cx="200" cy="200" r="45"
                stroke="#E8D8B3"
                strokeWidth="4" />
        </svg>
    )
}

export default Logo
