import {
    Search,
    Book,
    Video,
    MessageSquare,
    ArrowRight,
    HelpCircle,
    FileText,
    Shield,
    Terminal,
    LifeBuoy,
    MessageCircle,
    Phone
} from 'lucide-react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function HelpCenter() {
    const faqs = [
        {
            q: "1. What is Pixfolio?",
            a: (
                <div className="space-y-2">
                    <p>Pixfolio is a digital visual book platform that allows photographers, studios, and labs to create immersive, interactive page-flipping albums and share them securely with clients online.</p>
                    <p>It transforms static images into realistic, animated visual books with branding, music, and secure sharing options.</p>
                </div>
            )
        },
        {
            q: "2. How Does Pixfolio Work?",
            a: (
                <ul className="list-disc pl-5 space-y-1">
                    <li>Create an account (Photographer or Lab)</li>
                    <li>Upload album images</li>
                    <li>Customize layout, branding, and optional music</li>
                    <li>Publish the visual book</li>
                    <li>Share link or QR code with clients</li>
                    <p className="mt-2 pt-2 border-t border-muted/50">Albums are hosted securely and accessible through any modern browser.</p>
                </ul>
            )
        },
        {
            q: "3. Who Can Use Pixfolio?",
            a: (
                <ul className="list-disc pl-5 space-y-1">
                    <li>Independent Photographers</li>
                    <li>Wedding Studios</li>
                    <li>Printing & Design Labs</li>
                    <li>Event Creators</li>
                    <li>Content Creators</li>
                </ul>
            )
        },
        {
            q: "4. Can I Add Branding?",
            a: (
                <div className="space-y-2">
                    <p>Yes. Pixfolio allows:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Studio name</li>
                        <li>Logo</li>
                        <li>Website link</li>
                        <li>Social media links</li>
                        <li>Contact details</li>
                    </ul>
                    <p className="text-sm italic mt-2 text-muted-foreground">Branding visibility depends on your active subscription.</p>
                </div>
            )
        },
        {
            q: "5. Can I Edit Albums After Creation?",
            a: (
                <div className="space-y-2">
                    <p>Yes. Albums can be edited as long as:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>The album is active</li>
                        <li>Your subscription is valid</li>
                        <li>The album has not been permanently deleted</li>
                    </ul>
                </div>
            )
        },
        {
            q: "6. Does Pixfolio Work Offline?",
            a: "No. Pixfolio is a cloud-based platform and requires internet access to view albums."
        },
        {
            q: "7. Is My Data Safe?",
            a: (
                <div className="space-y-2">
                    <p>Yes. Pixfolio uses:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Encrypted data transmission (HTTPS)</li>
                        <li>Secure JWT authentication</li>
                        <li>Hashed passwords using bcrypt</li>
                        <li>Rate limiting protection</li>
                        <li>Secure server infrastructure</li>
                    </ul>
                    <p className="mt-2 font-medium">We do not sell or misuse your data.</p>
                </div>
            )
        },
        {
            q: "8. What Happens If My Plan Expires?",
            a: (
                <ul className="list-disc pl-5 space-y-1">
                    <li>Your albums remain stored.</li>
                    <li>Public viewing may remain active depending on plan.</li>
                    <li>Branding and editing features may be restricted.</li>
                    <li>Reactivating your plan restores full features.</li>
                </ul>
            )
        },
        {
            q: "9. Is There a Free Trial?",
            a: (
                <div className="space-y-2">
                    <p>Pixfolio may offer:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Limited credit-based trial</li>
                        <li>Time-limited free access</li>
                        <li>Feature-limited demo accounts</li>
                    </ul>
                    <p className="text-sm italic mt-2 text-muted-foreground">Trial albums may be removed after a certain period if no plan is activated.</p>
                </div>
            )
        }
    ]

    return (
        <div className="flex-1 space-y-6 pb-12 transition-all duration-500 animate-in fade-in slide-in-from-bottom-2">
            {/* Page Header - Matches Dashboard.jsx */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Help Center</h1>
                    <p className="text-muted-foreground mt-1">Explore our guides and reach out for personalized assistance.</p>
                </div>
            </div>

            {/* Support Channels Grid */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3 px-6 pt-6">
                        <div className="flex items-center justify-between mb-4">
                            <CardTitle className="text-xl font-bold">Documentation</CardTitle>
                            <Book className="h-5 w-5 text-muted-foreground opacity-70" />
                        </div>
                        <CardDescription className="text-sm">
                            Comprehensive guides on how to use every feature of Pixfolio.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="px-6 pb-6">
                        <Button variant="outline" className="w-full gap-2 group border-muted">
                            Browse Docs <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </CardContent>
                </Card>

                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3 px-6 pt-6">
                        <div className="flex items-center justify-between mb-4">
                            <CardTitle className="text-xl font-bold">Priority Support</CardTitle>
                            <MessageCircle className="h-5 w-5 text-emerald-500 opacity-70" />
                        </div>
                        <CardDescription className="text-sm">
                            Our team is available 24/7 to help you with any issues.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="px-6 pb-6">
                        <Button variant="outline" className="w-full gap-2 group border-muted">
                            Send a message <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* FAQs Section Wrapped in Card */}
            <Card>
                <CardHeader className="px-6 pt-6 pb-2">
                    <CardTitle className="text-xl font-bold">Frequently Asked Questions</CardTitle>
                    <CardDescription>Quick answers to the most common questions.</CardDescription>
                </CardHeader>
                <CardContent className="px-6 pb-8">
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, i) => (
                            <AccordionItem
                                key={i}
                                value={`item-${i}`}
                                className="border-b last:border-0"
                            >
                                <AccordionTrigger className="text-left font-semibold text-base py-4 hover:no-underline">
                                    {faq.q}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                                    {faq.a}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>

            {/* Still Stuck Section Wrapped in Card */}
            <Card className="bg-muted/30 border-dashed">
                <CardContent className="p-8 text-center flex flex-col items-center gap-4">
                    <LifeBuoy className="h-10 w-10 text-primary opacity-30" />
                    <div className="space-y-1">
                        <h3 className="text-lg font-bold">Still stuck?</h3>
                        <p className="text-muted-foreground text-sm max-w-md mx-auto">
                            Don't worry, we're here to help. Reach out to our team at{" "}
                            <span className="text-foreground font-semibold underline cursor-pointer hover:text-primary transition-colors">
                                support@pixfolio.com
                            </span>.
                        </p>
                    </div>
                    <Button className="mt-2 px-8 font-bold rounded-md">
                        Get Instant Help
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}


