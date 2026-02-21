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
                <p className="text-zinc-500 dark:text-zinc-400 font-medium tracking-wide">Last updated: February 22, 2026</p>
            </div>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">1. Refund Eligibility</h2>
                <div className="text-zinc-600 dark:text-zinc-400 space-y-3">
                    <p>Refunds may be provided if:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Technical issue prevents album creation</li>
                        <li>Billing error occurred</li>
                        <li>Subscription cancelled within 7 days AND no credits used</li>
                    </ul>
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">2. Non-Refundable Cases</h2>
                <div className="text-zinc-600 dark:text-zinc-400 space-y-3">
                    <p>Refunds will not be issued for:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Used credits</li>
                        <li>Completed album creation</li>
                        <li>Branding customization work</li>
                        <li>After 7-day period</li>
                    </ul>
                </div>
            </section>

            <section className="space-y-6 border-t border-zinc-100 dark:border-zinc-800 pt-12">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">3. Refund Process</h2>
                <div className="text-zinc-600 dark:text-zinc-400 space-y-4">
                    <p>To request a refund:</p>
                    <ul className="list-decimal pl-5 space-y-1">
                        <li>Email <span className="font-bold underline text-zinc-900 dark:text-white cursor-pointer hover:text-zinc-500 transition-colors">support@pixfolio.com</span></li>
                        <li>Provide transaction details</li>
                        <li>Explain the issue</li>
                    </ul>
                    <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-lg border border-zinc-100 dark:border-zinc-800 space-y-2">
                        <p>Refunds are reviewed within <span className="font-bold text-zinc-900 dark:text-white">5–7 business days</span>.</p>
                        <p>Approved refunds are returned via original payment method.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RefundPolicy;
