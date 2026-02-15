import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    <section className="bg-pearl dark:bg-ebony py-24 px-6 md:px-20 font-display transition-colors duration-300">
      <div className="max-w-7xl mx-auto text-center mb-12 md:mb-20">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[#181611] dark:text-white mb-6 leading-tight">
          Investment & <span className="italic">Plans</span>
        </h2>
        <p className="text-[10px] sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gold font-semibold">
          Tailored solutions for your digital legacy
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Free Plan */}
        <div className="bg-white dark:bg-[#2a261d] p-10 rounded-2xl border border-gold/10 hover:border-gold/30 transition-all group">
          <h3 className="font-serif text-2xl mb-2 text-black dark:text-white">Trial Collection</h3>
          <p className="text-gold text-xs uppercase tracking-widest font-bold mb-8">Complementary</p>
          <div className="mb-10">
            <span className="text-4xl font-serif text-black dark:text-white">₹0</span>
            <span className="text-gray-400 text-sm ml-2 italic">/ entry</span>
          </div>
          <ul className="space-y-4 mb-10 text-sm text-gray-500 dark:text-gray-400 font-light">
            <li className="flex items-center gap-3"><span className="material-symbols-outlined text-gold text-lg">check</span> 3 Premium Credits</li>
            <li className="flex items-center gap-3"><span className="material-symbols-outlined text-gold text-lg">check</span> standard Processing</li>
            <li className="flex items-center gap-3"><span className="material-symbols-outlined text-gold text-lg">check</span> Cloud Archiving</li>
          </ul>
          <Link to="/signup" className="block w-full text-center border border-gold/30 py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gold hover:text-white transition-all group-hover:border-gold">
            Begin Journey
          </Link>
        </div>

        {/* Pro Plan */}
        <div className="bg-ebony dark:bg-gold p-10 rounded-2xl border border-gold shadow-2xl md:scale-105 relative z-10">
          <div className="absolute top-0 right-10 -translate-y-1/2 bg-gold dark:bg-ebony text-white dark:text-gold px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
            Recommended
          </div>
          <h3 className="font-serif text-2xl mb-2 text-white dark:text-ebony">Signature Elite</h3>
          <p className="text-gold dark:text-ebony/60 text-xs uppercase tracking-widest font-bold mb-8">Unlimited Access</p>
          <div className="mb-10">
            <span className="text-4xl font-serif text-white dark:text-ebony">₹149</span>
            <span className="text-gray-300 dark:text-ebony/60 text-sm ml-2 italic">/ month</span>
          </div>
          <ul className="space-y-4 mb-10 text-sm text-gray-300 dark:text-ebony/80 font-light">
            <li className="flex items-center gap-3"><span className="material-symbols-outlined text-gold dark:text-ebony text-lg">check</span> Unlimited Visual Books</li>
            <li className="flex items-center gap-3"><span className="material-symbols-outlined text-gold dark:text-ebony text-lg">check</span> Priority Concierge</li>
            <li className="flex items-center gap-3"><span className="material-symbols-outlined text-gold dark:text-ebony text-lg">check</span> High Fidelity Assets</li>
            <li className="flex items-center gap-3"><span className="material-symbols-outlined text-gold dark:text-ebony text-lg">check</span> Custom Branding</li>
          </ul>
          <Link to="/signup" className="block w-full text-center bg-gold dark:bg-ebony text-white dark:text-gold py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all">
            Elevate Now
          </Link>
        </div>

        {/* Pay per use */}
        <div className="bg-white dark:bg-[#2a261d] p-10 rounded-2xl border border-gold/10 hover:border-gold/30 transition-all group">
          <h3 className="font-serif text-2xl mb-2 text-black dark:text-white">A La Carte</h3>
          <p className="text-gold text-xs uppercase tracking-widest font-bold mb-8">Casual Creation</p>
          <div className="mb-10">
            <span className="text-4xl font-serif text-black dark:text-white">₹19</span>
            <span className="text-gray-400 text-sm ml-2 italic">/ album</span>
          </div>
          <ul className="space-y-4 mb-10 text-sm text-gray-500 dark:text-gray-400 font-light">
            <li className="flex items-center gap-3"><span className="material-symbols-outlined text-gold text-lg">check</span> Pay-as-you-go</li>
            <li className="flex items-center gap-3"><span className="material-symbols-outlined text-gold text-lg">check</span> No Commitment</li>
            <li className="flex items-center gap-3"><span className="material-symbols-outlined text-gold text-lg">check</span> standard Features</li>
          </ul>
          <Link to="/signup" className="block w-full text-center border border-gold/30 py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gold hover:text-white transition-all group-hover:border-gold">
            Single Entry
          </Link>
        </div>
      </div>
    </section>
  );
}
;
