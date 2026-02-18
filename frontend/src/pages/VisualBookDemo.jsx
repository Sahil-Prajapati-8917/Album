import React from 'react'
import VisualBookViewer from '../features/album/components/VisualBookViewer'

// Demo data with beautiful static images
const demoSpreads = [
  {
    id: 1,
    leftPage: {
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
      caption: "Mountain Sunrise"
    },
    rightPage: {
      image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1200&h=800&fit=crop",
      caption: "Ocean Waves"
    }
  },
  {
    id: 2,
    leftPage: {
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=800&fit=crop",
      caption: "Forest Path"
    },
    rightPage: {
      image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1200&h=800&fit=crop",
      caption: "Desert Landscape"
    }
  },
  {
    id: 3,
    leftPage: {
      image: "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=1200&h=800&fit=crop",
      caption: "Northern Lights"
    },
    rightPage: {
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&h=800&fit=crop",
      caption: "Tropical Beach"
    }
  },
  {
    id: 4,
    leftPage: {
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop",
      caption: "Misty Mountains"
    },
    rightPage: {
      image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&h=800&fit=crop",
      caption: "City Skyline"
    }
  },
  {
    id: 5,
    leftPage: {
      image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1200&h=800&fit=crop",
      caption: "Autumn Forest"
    },
    rightPage: {
      image: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=1200&h=800&fit=crop",
      caption: "Sunset Valley"
    }
  }
]

const VisualBookDemo = () => {
  return (
    <VisualBookViewer
      spreads={demoSpreads}
      title="Pixfolio Demo Collection"
      scale="small"
    />
  )
}

export default VisualBookDemo
