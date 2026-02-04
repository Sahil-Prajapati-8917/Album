import { Check } from 'lucide-react';

function FeatureItem({ text }) {
  return (
    <>
      <div className="inline-flex items-center justify-start gap-3">
        <Check className="stroke-blue-600" />
        <p className="text-sm">
          {text}
        </p>
      </div>
    </>
  );
};

function PricingCard({ theme, name, description, price, period, features }) {
  return (
    <div
      className={`flex max-w-md flex-1 flex-col items-start justify-between gap-16 overflow-hidden rounded-2xl border border-slate-200 p-6 md:min-h-[520px] md:gap-12 ${theme === 'dark' ? 'bg-slate-950 text-white border-transparent' : 'bg-white border-slate-200'}`}
>
      <div className="inline-flex flex-col items-start justify-start gap-6">
        <div className="flex flex-col items-start justify-start gap-4">
          <p className="text-lg font-semibold">
            {name}
          </p>
          <p className="text-sm leading-tight">
            {description}
          </p>
          <p className="inline-flex items-end justify-start gap-2">
            <span className="text-center text-5xl font-medium">
              {price}
            </span>
            <span className={`text-sm leading-tight ${theme === 'dark' ? 'text-white' : 'text-slate-600'}`}>
              /{period}
            </span>
          </p>
        </div>
        <div className={`flex flex-col gap-6 ${theme === 'dark' ? 'text-white' : 'text-slate-600'}`}>
          <div className="flex flex-col items-start justify-start gap-4">
            {features.map(text => <FeatureItem key={text} text={text} />)}
          </div>
        </div>
      </div>
      <button className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
        Get started
      </button>
    </div>
  );
};

export default function PricingComponent() {
  return (
    <section
      className="flex flex-col items-center gap-12 py-12 2xl:py-16 max-w-screen-2xl m-auto w-full px-3 sm:px-8 lg:px-16 xl:px-32"
>
      <div className="flex flex-col gap-3 text-center pt-[30px]">
        <h2 className="text-4xl font-semibold text-slate-950">
          Choose your plan
        </h2>
        <p className="text-sm text-slate-600">
          Unlimited combinations for you to build better products faster.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <PricingCard
          theme="light"
          name="Free Plan (3 Credits)"
          description="Includes 3 credits"
          period="month"
          price="₹0"
          features={[
            '3 credits per month',
            '1 Visual Book = 1 credit',
            'Create up to 3 Visual Books',
            'Automatic QR code for each Visual Book',
            'Cloud storage included',
            'Standard support'
          ]}
        />
        <PricingCard
          theme="dark"
          name="Monthly Plan"
          description="Unlimited Visual Books"
          period="month"
          price="₹149"
          features={[
            'Unlimited Visual Books',
            'QR code support (downloadable)',
            'Cloud storage included',
            'Faster processing',
            'Access to new features',
            'Priority support'
          ]}
        />
        <PricingCard
          theme="light"
          name="Pay-per-Album"
          description="Perfect for occasional use"
          period="album"
          price="₹19"
          features={[
            '₹19 for 1 Visual Book (Album)',
            'No monthly commitment',
            'Automatic QR code included',
            'Cloud storage included',
            'Standard processing'
          ]}
        />
        
      </div>
    </section>
  );
};
