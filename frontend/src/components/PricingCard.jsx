import { Check } from 'lucide-react'

const PricingCard = ({
  title,
  price,
  priceNote,
  ctaText,
  features,
  highlighted = false,
  onCtaClick
}) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onCtaClick?.()
    }
  }

  return (
    <div
      className={`
        relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border p-8
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:shadow-xl
        ${highlighted
          ? 'ring-2 ring-blue-500 shadow-blue-100 scale-105'
          : 'border-gray-200'
        }
        focus-within:ring-2 focus-within:ring-blue-500
        @media (prefers-reduced-motion: reduce) {
          transform: none !important;
          transition: none !important;
        }
      `}
      tabIndex="0"
      onKeyDown={handleKeyDown}
      role="region"
      aria-label={`${title} pricing card`}
    >
      {highlighted && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-3 py-1 text-xs font-semibold rounded-full">
          Most popular
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
        <div className="mb-1">
          <span className="text-4xl font-bold text-gray-900">{price}</span>
        </div>
        <p className="text-sm text-gray-600">{priceNote}</p>
      </div>

      <button
        onClick={onCtaClick}
        className={`
          w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          ${highlighted
            ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
            : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300'
          }
        `}
        aria-label={`Select ${title} plan`}
      >
        {ctaText}
      </button>

      <ul className="mt-6 space-y-3" role="list">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start" role="listitem">
            <Check
              className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <span className="text-gray-700 text-left">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PricingCard
