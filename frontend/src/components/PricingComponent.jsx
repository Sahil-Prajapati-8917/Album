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

      <div className="max-w-7xl mx-auto mb-16 px-4">
        {/* Photographer Plans Section */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-serif text-[#181611] dark:text-white mb-2">Photographer Plans</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Essential tools for independent creators</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Pay Per Album */}
            <Card className="bg-white dark:bg-[#2a261d] p-0 rounded-2xl border border-gold/10 hover:border-gold/30 transition-all flex flex-col h-full">
              <CardHeader className="p-8 pb-4">
                <CardTitle className="font-serif text-xl mb-1 text-black dark:text-white">Pay Per Album</CardTitle>
                <p className="text-gray-500 dark:text-gray-400 text-xs mb-4 h-8">Ideal for occasional users.</p>
                <div className="flex items-baseline mb-2">
                  <span className="text-4xl font-serif text-black dark:text-white">₹19</span>
                  <span className="text-gray-400 text-sm ml-2 italic">/ album</span>
                </div>
              </CardHeader>
              <CardContent className="p-8 pt-0 flex-1">
                <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-start gap-3"><Check className="text-gold h-4 w-4 shrink-0 mt-0.5" /> <span>1 Album = ₹19</span></li>
                  <li className="flex items-start gap-3"><Check className="text-gold h-4 w-4 shrink-0 mt-0.5" /> <span>All essential features</span></li>
                  <li className="flex items-start gap-3"><Check className="text-gold h-4 w-4 shrink-0 mt-0.5" /> <span>QR code included</span></li>
                  <li className="flex items-start gap-3"><Check className="text-gold h-4 w-4 shrink-0 mt-0.5" /> <span>Secure sharing link</span></li>
                </ul>
              </CardContent>
              <CardFooter className="p-8 pt-4 border-t border-gray-100 dark:border-gray-800">
                <Button asChild variant="outline" className="w-full text-sm font-semibold tracking-wide border-gold/50 text-gold hover:bg-gold hover:text-white transition-all h-12">
                  <Link to="/signup">Start Now</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Monthly Plan */}
            <Card className="bg-white dark:bg-[#2a261d] p-0 rounded-2xl border border-gold/10 hover:border-gold/30 transition-all flex flex-col h-full">
              <CardHeader className="p-8 pb-4">
                <CardTitle className="font-serif text-xl mb-1 text-black dark:text-white">Monthly Plan</CardTitle>
                <p className="text-gray-500 dark:text-gray-400 text-xs mb-4 h-8">Perfect for regular photographers.</p>
                <div className="flex items-baseline mb-2">
                  <span className="text-4xl font-serif text-black dark:text-white">₹149</span>
                  <span className="text-gray-400 text-sm ml-2 italic">/ month</span>
                </div>
              </CardHeader>
              <CardContent className="p-8 pt-0 flex-1">
                <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-start gap-3"><Check className="text-gold h-4 w-4 shrink-0 mt-0.5" /> <span>15–20 albums per month</span></li>
                  <li className="flex items-start gap-3"><Check className="text-gold h-4 w-4 shrink-0 mt-0.5" /> <span>Basic analytics</span></li>
                  <li className="flex items-start gap-3"><Check className="text-gold h-4 w-4 shrink-0 mt-0.5" /> <span>Standard support</span></li>
                  <li className="flex items-start gap-3"><Check className="text-gold h-4 w-4 shrink-0 mt-0.5" /> <span>Watermark protection</span></li>
                </ul>
              </CardContent>
              <CardFooter className="p-8 pt-4 border-t border-gray-100 dark:border-gray-800">
                <Button asChild variant="outline" className="w-full text-sm font-semibold tracking-wide border-gold/50 text-gold hover:bg-gold hover:text-white transition-all h-12">
                  <Link to="/signup">Buy Monthly</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Yearly Plan */}
            <Card className="bg-ebony dark:bg-gold p-0 rounded-2xl border-2 border-gold shadow-xl md:-translate-y-4 relative z-10 flex flex-col h-full">
              <div className="absolute top-0 inset-x-0 -translate-y-1/2 flex justify-center">
                <Badge className="bg-gold dark:bg-ebony text-white dark:text-gold px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border-none shadow-sm">
                  Most Popular
                </Badge>
              </div>
              <CardHeader className="p-8 pb-4">
                <CardTitle className="font-serif text-xl mb-1 text-white dark:text-black mt-2">Yearly Plan</CardTitle>
                <p className="text-gray-300 dark:text-gray-800 text-xs mb-4 h-8">Best value for active professionals.</p>
                <div className="flex items-baseline mb-2">
                  <span className="text-4xl font-serif text-white dark:text-black">₹1299</span>
                  <span className="text-gray-400 dark:text-gray-700 text-sm ml-2 italic">/ year</span>
                </div>
              </CardHeader>
              <CardContent className="p-8 pt-0 flex-1">
                <ul className="space-y-4 text-sm text-gray-300 dark:text-gray-800">
                  <li className="flex items-start gap-3"><Check className="text-gold dark:text-black h-4 w-4 shrink-0 mt-0.5" /> <span>200+ albums per year</span></li>
                  <li className="flex items-start gap-3"><Check className="text-gold dark:text-black h-4 w-4 shrink-0 mt-0.5" /> <span>Advanced analytics</span></li>
                  <li className="flex items-start gap-3"><Check className="text-gold dark:text-black h-4 w-4 shrink-0 mt-0.5" /> <span>Priority support</span></li>
                  <li className="flex items-start gap-3"><Check className="text-gold dark:text-black h-4 w-4 shrink-0 mt-0.5" /> <span>Best savings option</span></li>
                </ul>
              </CardContent>
              <CardFooter className="p-8 pt-4 border-t border-gray-800 dark:border-white/20">
                <Button asChild className="w-full text-sm font-bold tracking-wide bg-gold hover:bg-gold/90 text-white dark:bg-black dark:hover:bg-black/90 dark:text-gold transition-all h-12">
                  <Link to="/signup">Buy Yearly</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Lab Plans Section */}
        <div>
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-serif text-[#181611] dark:text-white mb-2">For Photo Labs</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Scalable solutions for teams and studios</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Lab Starter */}
            <Card className="bg-white dark:bg-[#2a261d] p-0 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-gold/30 transition-all flex flex-col h-full">
              <CardHeader className="p-8 pb-4">
                <CardTitle className="font-serif text-xl mb-1 text-black dark:text-white">Lab Starter</CardTitle>
                <div className="flex items-baseline mt-4 mb-2">
                  <span className="text-4xl font-serif text-black dark:text-white">₹999</span>
                  <span className="text-gray-400 text-sm ml-2 italic">/ month</span>
                </div>
              </CardHeader>
              <CardContent className="p-8 pt-0 flex-1">
                <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-start gap-3"><Check className="text-gray-400 h-4 w-4 shrink-0 mt-0.5" /> <span>200 albums per month</span></li>
                  <li className="flex items-start gap-3"><Check className="text-gray-400 h-4 w-4 shrink-0 mt-0.5" /> <span>2 team members</span></li>
                  <li className="flex items-start gap-3"><Check className="text-gray-400 h-4 w-4 shrink-0 mt-0.5" /> <span>Multi-photographer support</span></li>
                  <li className="flex items-start gap-3"><Check className="text-gray-400 h-4 w-4 shrink-0 mt-0.5" /> <span>Basic credit management</span></li>
                </ul>
              </CardContent>
              <CardFooter className="p-8 pt-4 border-t border-gray-100 dark:border-gray-800">
                <Button asChild variant="outline" className="w-full text-sm font-semibold tracking-wide border-gray-300 hover:bg-gray-50 text-gray-700 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 transition-all h-12">
                  <Link to="/signup">Get Lab Starter</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Lab Pro */}
            <Card className="bg-white dark:bg-[#2a261d] p-0 rounded-2xl border-2 border-indigo-500/30 dark:border-indigo-400/50 shadow-lg relative flex flex-col h-full">
              <div className="absolute top-0 right-8 -translate-y-1/2">
                <Badge className="bg-indigo-500 text-white px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest border-none">
                  Best for Growing Labs
                </Badge>
              </div>
              <CardHeader className="p-8 pb-4">
                <CardTitle className="font-serif text-xl mb-1 text-black dark:text-white">Lab Pro</CardTitle>
                <div className="flex items-baseline mt-4 mb-2">
                  <span className="text-4xl font-serif text-black dark:text-white">₹2499</span>
                  <span className="text-gray-400 text-sm ml-2 italic">/ month</span>
                </div>
              </CardHeader>
              <CardContent className="p-8 pt-0 flex-1">
                <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-start gap-3"><Check className="text-indigo-500 h-4 w-4 shrink-0 mt-0.5" /> <span>800 albums per month</span></li>
                  <li className="flex items-start gap-3"><Check className="text-indigo-500 h-4 w-4 shrink-0 mt-0.5" /> <span>5 team members</span></li>
                  <li className="flex items-start gap-3"><Check className="text-indigo-500 h-4 w-4 shrink-0 mt-0.5" /> <span>Credit distribution system</span></li>
                  <li className="flex items-start gap-3"><Check className="text-indigo-500 h-4 w-4 shrink-0 mt-0.5" /> <span>Advanced analytics</span></li>
                  <li className="flex items-start gap-3"><Check className="text-indigo-500 h-4 w-4 shrink-0 mt-0.5" /> <span>Priority support</span></li>
                </ul>
              </CardContent>
              <CardFooter className="p-8 pt-4 border-t border-gray-100 dark:border-gray-800">
                <Button asChild className="w-full text-sm font-semibold tracking-wide bg-indigo-600 hover:bg-indigo-700 text-white transition-all h-12">
                  <Link to="/signup">Get Lab Pro</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      <div className="text-center mt-12">
        <p className="text-sm text-gray-500 dark:text-gray-400 italic">No hidden charges. Upgrade anytime.</p>
      </div>
    </section>
  );
}
;
