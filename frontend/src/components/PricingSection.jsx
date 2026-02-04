import PricingCard from './PricingCard'

// Config object for styling and spacing
const config = {
  colors: {
    primary: 'blue-600',
    secondary: 'gray-100',
    accent: 'blue-500'
  },
  spacing: {
    cardGap: 'gap-8',
    sectionPadding: 'py-20'
  },
  highlight: {
    ringColor: 'ring-blue-500',
    shadowColor: 'shadow-blue-100',
    scale: 'scale-105'
  }
}

const PricingSection = () => {
  const handleCtaClick = (planName) => {
    console.log(`Selected ${planName} plan`)
    // Add your CTA logic here (e.g., navigation, modal, etc.)
  }

  const freePlanFeatures = [
    '3 credits per month',
    '1 Visual Book = 1 credit',
    'Create up to 3 Visual Books',
    'Automatic QR code for each Visual Book',
    'Cloud storage included',
    'Standard support'
  ]

  const monthlyPlanFeatures = [
    'Unlimited Visual Books',
    'QR code support (downloadable)',
    'Cloud storage included',
    'Faster processing',
    'Access to new features',
    'Priority support'
  ]

  return (
    <section className={`${config.spacing.sectionPadding} bg-gradient-to-br from-blue-50 to-indigo-100`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that's right for you. All plans include our core features with no hidden fees.
          </p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 ${config.spacing.cardGap} max-w-5xl mx-auto`}>
          <PricingCard
            title="Free Plan (3 Credits)"
            price="₹0 / month"
            priceNote="Includes 3 credits"
            ctaText="Get started"
            features={freePlanFeatures}
            highlighted={false}
            onCtaClick={() => handleCtaClick('Free Plan')}
          />

          <PricingCard
            title="Monthly Plan"
            price="₹99 / month"
            priceNote="Unlimited Visual Books"
            ctaText="Get started"
            features={monthlyPlanFeatures}
            highlighted={true}
            onCtaClick={() => handleCtaClick('Monthly Plan')}
          />
        </div>
      </div>
    </section>
  )
}

export default PricingSection
