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
    LifeBuoy
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
        <div className="max-w-4xl mx-auto py-16 px-4 space-y-16">
            <div className="text-center space-y-6">
                <Badge variant="secondary" className="px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-[0.2em] mb-4">Support Center</Badge>
                <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-tight">
                    Need a <span className="text-primary italic">hand?</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
                    Explore our guides, FAQs, and reach out to our team if you need personalized assistance.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                <Card className="border-none shadow-xl bg-gradient-to-br from-primary/5 to-primary/10 hover:shadow-primary/5 transition-all">
                    <CardHeader>
                        <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center mb-2 shadow-lg shadow-primary/20">
                            <Book className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <CardTitle className="text-2xl">Documentation</CardTitle>
                        <CardDescription className="text-base">Comprehensive guides on how to use every feature of Pixfolio.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="link" className="px-0 h-auto text-primary font-bold group">
                            Browse Docs <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-xl bg-gradient-to-br from-muted/50 to-muted hover:shadow-lg transition-all">
                    <CardHeader>
                        <div className="h-12 w-12 rounded-2xl bg-foreground flex items-center justify-center mb-2 shadow-lg shadow-black/10">
                            <MessageSquare className="h-6 w-6 text-background" />
                        </div>
                        <CardTitle className="text-2xl">Contact Support</CardTitle>
                        <CardDescription className="text-base">Our team is available 24/7 to help you with any issues.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="link" className="px-0 h-auto text-foreground font-bold group">
                            Send a message <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <Separator />

            <div className="space-y-10">
                <div className="text-center md:text-left space-y-2">
                    <h2 className="text-3xl font-black tracking-tight">Frequently Asked Questions</h2>
                    <p className="text-muted-foreground text-lg">Quick answers to the most common questions.</p>
                </div>

                <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqs.map((faq, i) => (
                        <AccordionItem
                            key={i}
                            value={`item-${i}`}
                            className="border rounded-2xl px-6 bg-muted/20 hover:bg-muted/30 transition-colors"
                        >
                            <AccordionTrigger className="text-left font-bold text-lg py-6 hover:no-underline">
                                {faq.q}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                                {faq.a}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>

            <div className="rounded-3xl bg-primary p-10 text-primary-foreground text-center space-y-6 shadow-2xl shadow-primary/20">
                <LifeBuoy className="h-16 w-16 mx-auto opacity-50" />
                <h2 className="text-4xl font-black tracking-tight">Still stuck?</h2>
                <p className="text-primary-foreground/80 text-lg font-medium max-w-xl mx-auto">
                    Don't worry, we're here to help. Our support agents are ready to jump in and solve your problem.
                </p>
                <Button variant="secondary" size="lg" className="px-12 h-14 text-lg font-black rounded-full shadow-xl">
                    Get Instant Help
                </Button>
            </div>
        </div>
    )
}
