import React from 'react';
import { FileText } from 'lucide-react';

const TermsAndConditions = () => {
    return (
        <div className="max-w-4xl px-2 py-10 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                    <FileText className="size-3" />
                    Legal Agreement
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">Terms & Conditions</h1>
                <p className="text-zinc-500 dark:text-zinc-400 font-medium tracking-wide">Last updated: February 19, 2026</p>
            </div>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">1. Agreement to Terms</h2>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    By accessing or using Pixfolio, you agree to be bound by these Terms & Conditions. If you do not agree to these terms, please do not use our services. These terms apply to all photographers, studios, and clients who access the platform.
                </p>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">2. Intellectual Property</h2>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Photographers retain all copyrights to the images they upload to Pixfolio. By using the platform, you grant Pixfolio a non-exclusive license to host and display your content solely for the purpose of providing the service to you and your clients.
                </p>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">3. User Obligations</h2>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree not to use the platform for any illegal or unauthorized purpose, including violating copyright or privacy laws.
                </p>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">4. Limitation of Liability</h2>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Pixfolio shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use the service, including but not limited to loss of data or loss of business opportunity.
                </p>
            </section>

            <section className="space-y-6 border-t border-zinc-100 dark:border-zinc-800 pt-12">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">Questions and Concerns</h2>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    For any questions regarding these terms, please contact our legal team at <span className="text-zinc-900 dark:text-white font-bold underline cursor-pointer hover:text-zinc-500 transition-colors">legal@pixfolio.com</span>.
                </p>
            </section>
        </div>
    );
};

export default TermsAndConditions;
