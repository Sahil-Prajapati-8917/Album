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
                <p className="text-zinc-500 dark:text-zinc-400 font-medium tracking-wide">Last updated: February 22, 2026</p>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed italic">Your privacy matters.</p>
            </div>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">1. Information We Collect</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <h3 className="font-bold text-zinc-900 dark:text-white">Personal Data:</h3>
                        <ul className="list-disc pl-5 space-y-1 text-zinc-600 dark:text-zinc-400">
                            <li>Name</li>
                            <li>Email</li>
                            <li>Mobile number</li>
                            <li>Studio name</li>
                            <li>Payment details (processed via gateway)</li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="font-bold text-zinc-900 dark:text-white">Technical Data:</h3>
                        <ul className="list-disc pl-5 space-y-1 text-zinc-600 dark:text-zinc-400">
                            <li>IP address</li>
                            <li>Browser type</li>
                            <li>Usage logs</li>
                            <li>Device type</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">2. How We Use Data</h2>
                <div className="text-zinc-600 dark:text-zinc-400 space-y-3">
                    <p>We use data to:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Provide and improve services</li>
                        <li>Process payments</li>
                        <li>Authenticate users</li>
                        <li>Prevent fraud</li>
                        <li>Provide customer support</li>
                    </ul>
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">3. Data Security</h2>
                <div className="text-zinc-600 dark:text-zinc-400 space-y-3">
                    <p>Pixfolio implements:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>HTTPS encryption</li>
                        <li>JWT authentication</li>
                        <li>Password hashing (bcrypt)</li>
                        <li>Rate limiting</li>
                        <li>Secure cloud storage</li>
                    </ul>
                    <p className="italic bg-zinc-50 dark:bg-zinc-900 p-4 rounded-lg border border-zinc-100 dark:border-zinc-800">
                        No system is 100% secure, but we follow industry best practices.
                    </p>
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">4. Data Sharing</h2>
                <div className="text-zinc-600 dark:text-zinc-400 space-y-3">
                    <p className="font-bold text-zinc-900 dark:text-white underline">We do NOT sell user data.</p>
                    <p>We may share data with:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Payment providers</li>
                        <li>Cloud hosting providers</li>
                        <li>Legal authorities (if required by law)</li>
                    </ul>
                </div>
            </section>

            <section className="space-y-6 border-t border-zinc-100 dark:border-zinc-800 pt-12">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">5. User Rights</h2>
                <div className="text-zinc-600 dark:text-zinc-400 space-y-4">
                    <p>You can:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Access your data</li>
                        <li>Update your profile</li>
                        <li>Request account deletion</li>
                        <li>Opt-out of promotional emails</li>
                    </ul>
                    <div className="pt-4">
                        <p className="font-bold text-zinc-900 dark:text-white">
                            Contact: <span className="underline cursor-pointer hover:text-zinc-500 transition-colors">support@pixfolio.com</span>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
