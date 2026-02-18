import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Mail, MessageSquare, Phone } from 'lucide-react'

export default function HelpCenter() {
    const faqs = [
        {
            question: "How do I create a new Pixfolio?",
            answer: "Navigate to the 'Create New' page from the sidebar, fill in the event details, upload your photos, and click publish."
        },
        {
            question: "What image formats are supported?",
            answer: "We support high-quality JPG and PNG files up to 20MB each."
        },
        {
            question: "How can I share my Pixfolio?",
            answer: "Each Pixfolio has a unique shareable link. You can find it in the 'All Pixfolios' table by clicking the copy icon."
        },
        {
            question: "Can I customize the background music?",
            answer: "Yes, during the creation process, you can select from our library of royalty-free tracks."
        },
    ]

    return (
        <div className="flex-1 space-y-8">


            <div className="grid gap-8 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Frequently Asked Questions</CardTitle>
                        <CardDescription>Quick answers to common questions.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                            {faqs.map((faq, i) => (
                                <AccordionItem key={i} value={`item-${i}`}>
                                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                                    <AccordionContent>{faq.answer}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Support</CardTitle>
                            <CardDescription>We're here to help you 24/7.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <Button variant="outline" className="justify-start h-12 gap-3">
                                <Mail className="h-5 w-5 text-blue-500" />
                                <span>Email support@pixfolio.com</span>
                            </Button>
                            <Button variant="outline" className="justify-start h-12 gap-3">
                                <MessageSquare className="h-5 w-5 text-emerald-500" />
                                <span>Live Chat with an agent</span>
                            </Button>
                            <Button variant="outline" className="justify-start h-12 gap-3">
                                <Phone className="h-5 w-5 text-indigo-500" />
                                <span>Request a callback</span>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="bg-primary text-primary-foreground">
                        <CardHeader>
                            <CardTitle>Learn more</CardTitle>
                            <CardDescription className="text-primary-foreground/80">Check out our video tutorials on YouTube.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button variant="secondary" className="w-full">Watch Tutorials</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
