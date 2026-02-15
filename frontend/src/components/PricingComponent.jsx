import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
        {/* Trial Collection */}
        <Card className="bg-white dark:bg-[#2a261d] p-0 rounded-2xl border border-gold/10 hover:border-gold/30 transition-all group flex flex-col">
          <CardHeader className="p-10 pb-0">
            <CardTitle className="font-serif text-2xl mb-2 text-black dark:text-white">Trial Collection</CardTitle>
            <p className="text-gold text-xs uppercase tracking-widest font-bold mb-4">Complementary</p>
            <div className="flex items-baseline pt-4">
              <span className="text-4xl font-serif text-black dark:text-white">₹0</span>
              <span className="text-gray-400 text-sm ml-2 italic">/ entry</span>
            </div>
          </CardHeader>
          <CardContent className="p-10 pt-8 flex-1">
            <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400 font-light">
              <li className="flex items-center gap-3"><Check className="text-gold h-4 w-4" /> 3 Premium Credits</li>
              <li className="flex items-center gap-3"><Check className="text-gold h-4 w-4" /> standard Processing</li>
              <li className="flex items-center gap-3"><Check className="text-gold h-4 w-4" /> Cloud Archiving</li>
            </ul>
          </CardContent>
          <CardFooter className="p-10 pt-0">
            <Button asChild variant="outline" className="w-full h-14 rounded-xl text-xs font-bold uppercase tracking-widest border-gold/30 hover:bg-gold hover:text-white transition-all group-hover:border-gold">
              <Link to="/signup">Begin Journey</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Signature Elite */}
        <Card className="bg-ebony dark:bg-gold p-0 rounded-2xl border border-gold shadow-2xl md:scale-105 relative z-10 flex flex-col">
          <div className="absolute top-0 right-10 -translate-y-1/2">
            <Badge className="bg-gold dark:bg-ebony text-white dark:text-gold px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border-none">
              Recommended
            </Badge>
          </div>
          <CardHeader className="p-10 pb-0">
            <CardTitle className="font-serif text-2xl mb-2 text-white dark:text-ebony">Signature Elite</CardTitle>
            <p className="text-gold dark:text-ebony/60 text-xs uppercase tracking-widest font-bold mb-4">Unlimited Access</p>
            <div className="flex items-baseline pt-4">
              <span className="text-4xl font-serif text-white dark:text-ebony">₹149</span>
              <span className="text-gray-300 dark:text-ebony/60 text-sm ml-2 italic">/ month</span>
            </div>
          </CardHeader>
          <CardContent className="p-10 pt-8 flex-1">
            <ul className="space-y-4 text-sm text-gray-300 dark:text-ebony/80 font-light">
              <li className="flex items-center gap-3"><Check className="text-gold dark:text-ebony h-4 w-4" /> Unlimited Visual Books</li>
              <li className="flex items-center gap-3"><Check className="text-gold dark:text-ebony h-4 w-4" /> Priority Concierge</li>
              <li className="flex items-center gap-3"><Check className="text-gold dark:text-ebony h-4 w-4" /> High Fidelity Assets</li>
              <li className="flex items-center gap-3"><Check className="text-gold dark:text-ebony h-4 w-4" /> Custom Branding</li>
            </ul>
          </CardContent>
          <CardFooter className="p-10 pt-0">
            <Button asChild className="w-full h-14 rounded-xl text-xs font-bold uppercase tracking-widest bg-gold dark:bg-ebony text-white dark:text-gold hover:opacity-90 transition-all">
              <Link to="/signup">Elevate Now</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* A La Carte */}
        <Card className="bg-white dark:bg-[#2a261d] p-0 rounded-2xl border border-gold/10 hover:border-gold/30 transition-all group flex flex-col">
          <CardHeader className="p-10 pb-0">
            <CardTitle className="font-serif text-2xl mb-2 text-black dark:text-white">A La Carte</CardTitle>
            <p className="text-gold text-xs uppercase tracking-widest font-bold mb-4">Casual Creation</p>
            <div className="flex items-baseline pt-4">
              <span className="text-4xl font-serif text-black dark:text-white">₹19</span>
              <span className="text-gray-400 text-sm ml-2 italic">/ album</span>
            </div>
          </CardHeader>
          <CardContent className="p-10 pt-8 flex-1">
            <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400 font-light">
              <li className="flex items-center gap-3"><Check className="text-gold h-4 w-4" /> Pay-as-you-go</li>
              <li className="flex items-center gap-3"><Check className="text-gold h-4 w-4" /> No Commitment</li>
              <li className="flex items-center gap-3"><Check className="text-gold h-4 w-4" /> standard Features</li>
            </ul>
          </CardContent>
          <CardFooter className="p-10 pt-0">
            <Button asChild variant="outline" className="w-full h-14 rounded-xl text-xs font-bold uppercase tracking-widest border-gold/30 hover:bg-gold hover:text-white transition-all group-hover:border-gold">
              <Link to="/signup">Single Entry</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
;
