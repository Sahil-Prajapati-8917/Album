import React from 'react';
import { FileText, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Term = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 selection:bg-black/10">
            {/* Minimal Header */}
            <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
                <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="size-6 text-black">
                            <svg className="w-full h-full" fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"></path>
                            </svg>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-black">Pixfolio</span>
                    </div>
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-black transition-colors"
                    >
                        <ArrowLeft className="size-4" />
                        Back to Signup
                    </button>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-16 border border-slate-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <div className="space-y-4 mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                            <FileText className="size-3" />
                            Legal Agreement
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">Terms & Conditions</h1>
                        <p className="text-slate-500 font-medium">Last updated: February 22, 2026</p>
                        <p className="text-slate-600 leading-relaxed italic border-l-2 border-slate-200 pl-4 py-1">
                            By accessing or using Pixfolio, you agree to the following terms.
                        </p>
                    </div>

                    <div className="space-y-12">
                        <section className="space-y-6">
                            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">1. Services</h2>
                            <div className="text-slate-600 leading-relaxed space-y-4">
                                <p>Pixfolio provides:</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Web-based digital album creation</li>
                                    <li>Interactive visual book rendering</li>
                                    <li>Secure hosting and sharing</li>
                                    <li>Account management tools</li>
                                    <li>Role-based dashboards for photographers and labs</li>
                                </ul>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">2. User Accounts</h2>
                            <div className="text-slate-600 leading-relaxed space-y-4">
                                <p>You agree to:</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Provide accurate information</li>
                                    <li>Maintain account confidentiality</li>
                                    <li>Not share login credentials</li>
                                    <li>Not misuse the system</li>
                                </ul>
                                <p className="p-4 bg-slate-50 rounded-xl text-sm italic border border-slate-100">
                                    Pixfolio reserves the right to suspend accounts violating policies.
                                </p>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">3. Data Storage</h2>
                            <div className="text-slate-600 leading-relaxed space-y-4">
                                <p>We store created albums on secure servers.</p>
                                <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100">
                                    <p className="font-bold text-slate-900 mb-4">Important:</p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>Trial albums may be deleted after a defined period.</li>
                                        <li>Active plan albums are retained as per subscription terms.</li>
                                        <li>We reserve the right to archive inactive accounts after extended non-use.</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">4. Subscription Plans</h2>
                            <div className="text-slate-600 leading-relaxed space-y-4">
                                <p>Pixfolio operates on a credit or subscription-based model.</p>
                                <p>Plans may include:</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Monthly / Yearly</li>
                                    <li>Lab-specific plans</li>
                                    <li>Enterprise plans</li>
                                </ul>
                                <p className="text-sm bg-black text-white px-6 py-4 rounded-2xl inline-block mt-4">
                                    Credits are used to create albums. Unused credits may expire based on plan terms. Pixfolio may update pricing at any time.
                                </p>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">5. Payments</h2>
                            <ul className="list-disc pl-5 space-y-2 text-slate-600">
                                <li>Payments are processed via third-party gateways.</li>
                                <li>Pixfolio does not store card details.</li>
                                <li>All payments are final unless covered under refund policy.</li>
                            </ul>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">6. Intellectual Property</h2>
                            <ul className="list-disc pl-5 space-y-2 text-slate-600">
                                <li>Platform code, design, and branding belong to Pixfolio.</li>
                                <li>Users retain ownership of uploaded images.</li>
                                <li>Users grant Pixfolio hosting rights to display albums.</li>
                            </ul>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">7. Prohibited Activities</h2>
                            <div className="text-slate-600 leading-relaxed space-y-4">
                                <p>Users must not:</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Upload illegal or copyrighted material without permission</li>
                                    <li>Attempt hacking or system abuse</li>
                                    <li>Create fake accounts for free trial misuse</li>
                                    <li>Reverse engineer the system</li>
                                </ul>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">8. Limitation of Liability</h2>
                            <div className="text-slate-600 leading-relaxed space-y-4">
                                <p>Pixfolio is not liable for:</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Indirect losses / Business losses</li>
                                    <li>Data loss due to user negligence</li>
                                </ul>
                                <p className="font-bold text-slate-900">Total liability is limited to subscription amount paid.</p>
                            </div>
                        </section>

                        <section className="space-y-6 border-t border-slate-100 pt-12">
                            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">9. Modifications</h2>
                            <p className="text-slate-600 leading-relaxed">
                                Pixfolio may update terms at any time. Continued use means acceptance.
                            </p>
                        </section>

                        <section className="mt-16 text-center">
                            <h3 className="text-xl font-bold text-slate-900 mb-4">Questions and Concerns</h3>
                            <p className="text-slate-500 mb-8">
                                For any questions regarding these terms, please contact our legal team.
                            </p>
                            <a
                                href="mailto:legal@pixfolio.com"
                                className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white rounded-2xl font-semibold hover:bg-black transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-slate-200"
                            >
                                legal@pixfolio.com
                            </a>
                        </section>
                    </div>
                </div>
            </div>

            <footer className="py-12 text-center text-slate-400 text-xs">
                © 2026 Pixfolio. All rights reserved.
            </footer>
        </div>
    );
};

export default Term;
