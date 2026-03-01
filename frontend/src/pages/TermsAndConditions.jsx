import React from 'react';
import { FileText } from 'lucide-react';

const TermsAndConditions = () => {
    return (
        <div className="max-w-4xl px-2 py-10 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-bold  widest text-zinc-500 dark:text-zinc-400">
                    <FileText className="size-3" />
                    Legal Agreement
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tight text-zinc-900 dark:text-white">Terms & Conditions</h1>
                <p className="text-zinc-500 dark:text-zinc-400 font-medium wide">Last updated: February 22, 2026</p>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed italic">By accessing or using Pixfolio, you agree to the following terms.</p>
            </div>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tight">1. Services</h2>
                <div className="text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-4">
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
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tight">2. User Accounts</h2>
                <div className="text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-4">
                    <p>You agree to:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Provide accurate information</li>
                        <li>Maintain account confidentiality</li>
                        <li>Not share login credentials</li>
                        <li>Not misuse the system</li>
                    </ul>
                    <p className="italic underline">Pixfolio reserves the right to suspend accounts violating policies.</p>
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tight">3. Data Storage</h2>
                <div className="text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-4">
                    <p>We store created albums on secure servers.</p>
                    <p className="font-bold">Important:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Trial albums may be deleted after a defined period.</li>
                        <li>Active plan albums are retained as per subscription terms.</li>
                        <li>We reserve the right to archive inactive accounts after extended non-use.</li>
                    </ul>
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tight">4. Subscription Plans</h2>
                <div className="text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-4">
                    <p>Pixfolio operates on a credit or subscription-based model.</p>
                    <p>Plans may include:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Monthly / Yearly</li>
                        <li>Lab-specific plans</li>
                        <li>Enterprise plans</li>
                    </ul>
                    <p>Credits are used to create albums. Unused credits may expire based on plan terms. Pixfolio may update pricing at any time.</p>
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tight">5. Payments</h2>
                <div className="text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-4">
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Payments are processed via third-party gateways.</li>
                        <li>Pixfolio does not store card details.</li>
                        <li>All payments are final unless covered under refund policy.</li>
                    </ul>
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tight">6. Intellectual Property</h2>
                <div className="text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-4">
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Platform code, design, and branding belong to Pixfolio.</li>
                        <li>Users retain ownership of uploaded images.</li>
                        <li>Users grant Pixfolio hosting rights to display albums.</li>
                    </ul>
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tight">7. Prohibited Activities</h2>
                <div className="text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-4">
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
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tight">8. Limitation of Liability</h2>
                <div className="text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-4">
                    <p>Pixfolio is not liable for:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Indirect losses / Business losses</li>
                        <li>Data loss due to user negligence</li>
                    </ul>
                    <p className="font-bold">Total liability is limited to subscription amount paid.</p>
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tight">9. Modifications</h2>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Pixfolio may update terms at any time. Continued use means acceptance.
                </p>
            </section>

            <section className="space-y-6 border-t border-zinc-100 dark:border-zinc-800 pt-12 text-center md:text-left">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tight">Questions and Concerns</h2>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    For any questions regarding these terms, please contact our legal team at <span className="text-zinc-900 dark:text-white font-bold underline cursor-pointer hover:text-zinc-500 transition-colors">legal@pixfolio.com</span>.
                </p>
            </section>
        </div>
    );
};

export default TermsAndConditions;
