import React from 'react';
import { Shield } from 'lucide-react';

const PrivacyPolicy = () => {
    return (
        <div className="max-w-4xl px-2 py-10 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                    <Shield className="size-3" />
                    Security & Trust
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">Privacy Policy</h1>
                <p className="text-zinc-500 dark:text-zinc-400 font-medium tracking-wide">Last updated: February 19, 2026</p>
            </div>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">1. Introduction</h2>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    At Pixfolio, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our digital album platform designed for photographers and visual storytellers.
                </p>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">2. Information Collection</h2>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    We collect information you provide directly to us when creating an account, building albums, or communicating with our support team. This may include:
                </p>
                <ul className="list-disc list-inside space-y-3 text-zinc-600 dark:text-zinc-400 ml-4">
                    <li>Account information (name, email, profile picture)</li>
                    <li>Gallery and album content (photos, metadata, titles)</li>
                    <li>Payment information (processed securely through our payment partners)</li>
                    <li>Communication history with our studio support</li>
                </ul>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">3. Data Protection</h2>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    We implement industry-standard security measures to ensure the safety of your images and personal details. Your high-resolution files are stored in encrypted cloud environments, and sharing links are protected by advanced security tokens.
                </p>
            </section>

            <section className="space-y-6 border-t border-zinc-100 dark:border-zinc-800 pt-12">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">Contact Us</h2>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    If you have any questions regarding this Privacy Policy, please reach out to our privacy team at <span className="text-zinc-900 dark:text-white font-bold underline cursor-pointer hover:text-zinc-500 transition-colors">privacy@pixfolio.com</span>.
                </p>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
