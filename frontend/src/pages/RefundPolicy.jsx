import React from 'react';
import { CreditCard } from 'lucide-react';

const RefundPolicy = () => {
    return (
        <div className="max-w-4xl px-2 py-10 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                    <CreditCard className="size-3" />
                    Payments & Refunds
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">Refund Policy</h1>
                <p className="text-zinc-500 dark:text-zinc-400 font-medium tracking-wide">Last updated: February 19, 2026</p>
            </div>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">1. Subscription Refunds</h2>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    We offer a 14-day money-back guarantee for all new monthly and yearly subscriptions. If you are not satisfied with Pixfolio's premium features within the first 14 days of your initial purchase, you are eligible for a full refund.
                </p>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">2. Pay-Per-Album Credits</h2>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Credits purchased for individual albums are non-refundable once they have been used to publish a digital album. Unused credits may be refunded within 30 days of purchase upon request.
                </p>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">3. Processing Time</h2>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Refund requests are typically processed within 5-7 business days. Once approved, the funds will be returned to your original payment method. Please note that your bank or credit card issuer may require additional time to post the transaction.
                </p>
            </section>

            <section className="space-y-6 border-t border-zinc-100 dark:border-zinc-800 pt-12">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">How to Request a Refund</h2>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    To initiate a refund, please contact our billing department at <span className="text-zinc-900 dark:text-white font-bold underline cursor-pointer hover:text-zinc-500 transition-colors">billing@pixfolio.com</span> with your account details and order number.
                </p>
            </section>
        </div>
    );
};

export default RefundPolicy;
