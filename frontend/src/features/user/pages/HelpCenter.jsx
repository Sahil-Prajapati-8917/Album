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
            q: "How do I create my first Pixfolio?",
            a: "Simply click on 'Create New' in the sidebar. Choose a title, upload your photos, and pick a template. Your pixfolio will be ready in seconds!"
        },
        {
            q: "Can I password protect my albums?",
            a: "Yes! In the album settings, you can enable password protection so only people with the code can view your work."
        },
        {
            q: "What is the 'System' theme?",
            a: "The System theme automatically detects your device's preference (Light or Dark mode) and adjusts the application's appearance accordingly."
        },
        {
            q: "How do sharing links work?",
            a: "Every pixfolio gets a unique, shareable URL. You can copy this link and send it via email, social media, or even generate a QR code for physical prints."
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


