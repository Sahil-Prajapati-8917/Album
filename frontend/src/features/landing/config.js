// Site Configuration
// Pixfolio - Luxury Photography Platform

export const siteConfig = {
    language: "en",
    siteTitle: "Pixfolio - Premium Digital Albums for Wedding Photographers",
    siteDescription: "Pixfolio helps photographers create, manage, and deliver premium digital albums with elegance and precision.",
};

// Hero Section
export const heroConfig = {
    backgroundText: "TIMELESS",
    heroImage: "/images/hero-bride.png",
    heroImageAlt: "Elegant bride in wedding gown",
    overlayText: "Where Every Moment Becomes a Timeless Visual Story",
    brandName: "Pixfolio",
    navLinks: [
        { label: "Features", href: "#features" },
        { label: "How It Works", href: "#how-it-works" },
        { label: "Pricing", href: "#pricing" },
        { label: "Contact", href: "#contact" },
    ],
};

// Intro Grid Section - Value Proposition

export const introGridConfig = {
    titleLine1: "",
    titleLine2: "",
    accentText: "",
    description: "Pixfolio empowers wedding photographers to transform their captured moments into elegant, immersive digital experiences that clients cherish forever.",
    portfolioImages: [
        { src: "/images/portfolio-1.jpg", alt: "Premium digital album presentation" },
        { src: "/images/portfolio-2.jpg", alt: "Elegant wedding reception table" },
        { src: "/images/portfolio-3.jpg", alt: "Beautiful bridal bouquet detail" },
        { src: "/images/portfolio-4.jpg", alt: "Wedding ceremony aisle" },
        { src: "/images/portfolio-5.jpg", alt: "Couple first dance" },
    ],
};

// Featured Projects Section - Product Showcase

export const featuredProjectsConfig = {
    subtitle: "Product Showcase",
    titleRegular: "Interactive",
    titleItalic: "Digital Albums",
    viewAllText: "Explore All Features",
    viewAllHref: "#features",
    viewProjectText: "Learn More",
    projects: [
        {
            id: 1,
            title: "Visual Book Viewer",
            category: "Core Feature",
            year: "2024",
            image: "/images/product-album-2.jpg",
            description: "Immersive page-flip animation with premium layout control. Create cinematic viewing experiences that feel like holding a real album.",
        },
        {
            id: 2,
            title: "Studio Management",
            category: "Workflow",
            year: "2024",
            image: "/images/feature-studio.jpg",
            description: "Organize clients, albums, and deliveries in one elegant workspace. Streamline your entire photography business with precision.",
        },
        {
            id: 3,
            title: "Mobile Experience",
            category: "Responsive",
            year: "2024",
            image: "/images/feature-mobile.jpg",
            description: "Beautiful viewing experience on any device. Your clients can relive their special moments anywhere, anytime.",
        },
        {
            id: 4,
            title: "Secure Client Galleries",
            category: "Private Delivery",
            year: "2024",
            image: "/images/product-album-2.jpg",
            description: "Share albums through secure, branded galleries with private access links and watermark protection.",
        },
    ],
};

// Services Section - Core Value Proposition

export const servicesConfig = {
    subtitle: "WHAT WE OFFER",
    titleLine1: "Everything You Need",
    titleLine2Italic: "To Tell Your Story",
    description: "From album creation to client delivery, Pixfolio provides the tools professional photographers need to showcase their work with elegance.",
    services: [
        {
            iconName: "Camera",
            title: "Elegant Digital Albums",
            description: "Design cinematic albums that feel timeless with customizable layouts and premium templates.",
        },
        {
            iconName: "Diamond",
            title: "Studio Management",
            description: "Organize clients, albums, and workflows in one beautiful, intuitive workspace.",
        },
        {
            iconName: "Users",
            title: "Mobile Experience",
            description: "Deliver beautiful viewing experiences on any device with responsive, touch-optimized galleries.",
        },
        {
            iconName: "Sparkles",
            title: "Custom Branding",
            description: "Make every album uniquely yours with logo placement, color schemes, and typography control.",
        },
    ],
};

// Why Choose Me Section - Experience & Stats

export const whyChooseMeConfig = {
    subtitle: "WHY PIXFOLIO",
    titleRegular: "Designed for",
    titleItalic: "Excellence",
    statsLabel: "BY THE NUMBERS",
    stats: [
        { value: 500, suffix: "+", label: "Professional Studios" },
        { value: 50, suffix: "K+", label: "Albums Created" },
        { value: 99, suffix: "%", label: "Client Satisfaction" },
        { value: 24, suffix: "/7", label: "Support Available" },
    ],
    featureCards: [
        {
            image: "/images/portfolio-1.jpg",
            imageAlt: "Wedding photography",
            title: "Precision & Control",
            description: "Every detail matters. From layout spacing to color grading, control every aspect of your album presentation.",
        },
        {
            image: "/images/portfolio-3.jpg",
            imageAlt: "Bridal details",
            title: "Elegant Simplicity",
            description: "Powerful features wrapped in an intuitive interface. Create stunning albums without the learning curve.",
        },
    ],
    wideImage: "/images/wide-experience.jpg",
    wideImageAlt: "Couple walking in garden",
    wideTitle: "Crafted for Photographers Who Value Storytelling",
    wideDescription: "We understand that every wedding is a unique story. Pixfolio gives you the tools to tell it beautifully.",
};

// Testimonials Section

export const testimonialsConfig = {
    subtitle: "Client Stories",
    titleRegular: "Loved by",
    titleItalic: "Professionals",
    testimonials: [
        {
            id: 1,
            name: "Sarah Mitchell",
            role: "Mitchell Wedding Photography",
            image: "/images/testimonial-1.jpg",
            quote: "Pixfolio has transformed the way we present wedding albums. Clients are captivated by the elegance and immersive viewing experience. It’s elevated our entire brand.",
        },
        {
            id: 2,
            name: "James Anderson",
            role: "Anderson & Co. Studios",
            image: "/images/testimonial-2.jpg",
            quote: "The precision and control within the visual book viewer is unmatched. Pixfolio gives us the flexibility to deliver albums that truly reflect our artistic identity.",
        },
        {
            id: 3,
            name: "Emily Chen",
            role: "Moments by Emily",
            image: "/images/testimonial-3.jpg",
            quote: "From workflow management to client delivery, Pixfolio saves hours while delivering a premium, unforgettable experience.",
        },
        {
            id: 4,
            name: "Sarah Mitchell",
            role: "Mitchell Wedding Photography",
            image: "/images/testimonial-1.jpg",
            quote: "Pixfolio has transformed the way we present wedding albums. Clients are captivated by the elegance and immersive viewing experience. It’s elevated our entire brand.",
        },
        {
            id: 5,
            name: "James Anderson",
            role: "Anderson & Co. Studios",
            image: "/images/testimonial-2.jpg",
            quote: "The precision and control within the visual book viewer is unmatched. Pixfolio gives us the flexibility to deliver albums that truly reflect our artistic identity.",
        },
        {
            id: 6,
            name: "Emily Chen",
            role: "Moments by Emily",
            image: "/images/testimonial-3.jpg",
            quote: "From workflow management to client delivery, Pixfolio saves hours while delivering a premium, unforgettable experience.",
        },
    ],
};

// Pricing Section
export const pricingConfig = {
    subtitle: "Pricing",
    titleRegular: "Transparent Pricing for",
    titleItalic: "Growing Studios",
    description: "Choose the plan that fits your creative journey. Every plan includes a 14-day free trial.",
    plans: [
        {
            name: 'Pay Per Album',
            price: '₹19',
            period: '/ album',
            description: 'For occasional users who need flexibility.',
            features: [
                'One high-quality album',
                'All essential features',
                'Secure sharing links',
                'Standard support',
            ],
            cta: 'Get Started',
            highlighted: false,
        },
        {
            name: 'Monthly Plan',
            price: '₹149',
            period: '/ month',
            description: 'Perfect for active photographers with regular clients.',
            features: [
                '10–20 albums per month',
                'Basic analytics',
                'Priority email support',
                'Watermark protection',
                'Standard templates',
            ],
            cta: 'Start Free Trial',
            highlighted: false,
        },
        {
            name: 'Yearly Plan',
            price: '₹1,499',
            period: '/ year',
            description: 'Best for professional studios and high-volume work.',
            features: [
                '150–200 albums per year',
                'Advanced analytics',
                'Custom branding control',
                'Priority support',
                'All premium templates',
                'Best Value for studios',
            ],
            cta: 'Start Free Trial',
            highlighted: true,
        },
    ]
};

// FAQ Section

export const faqConfig = {
    subtitle: "Common Questions",
    titleRegular: "Frequently Asked",
    titleItalic: "Questions",
    ctaText: "Still have questions?",
    ctaButtonText: "Get in Touch",
    ctaHref: "#contact",
    faqs: [
        {
            id: "1",
            question: "1️⃣ What is Pixfolio?",
            answer: "Pixfolio is an interactive digital visual book platform that allows photographers and studios to create realistic page-flipping albums and share them securely online with clients.",
        },
        {
            id: "2",
            question: "2️⃣ How does Pixfolio work?",
            answer: "Simply sign up, upload your album images, customize branding and music, publish the album, and share the secure link or QR code with your clients. No software installation required.",
        },
        {
            id: "3",
            question: "3️⃣ Is my data safe on Pixfolio?",
            answer: "Yes. Pixfolio uses secure authentication, encrypted data transmission, and protected cloud infrastructure. Your albums are stored securely and are not shared with third parties.",
        },
        {
            id: "4",
            question: "4️⃣ Can I add my own branding?",
            answer: "Yes. You can add your studio name, logo, website, social media links, and contact details. Branding visibility depends on your active subscription plan.",
        },
        {
            id: "5",
            question: "5️⃣ What happens if my subscription expires?",
            answer: "Your albums remain stored safely. However, editing features and branding visibility may be restricted until your plan is reactivated.",
        },
        {
            id: "6",
            question: "6️⃣ Is there a free trial available?",
            answer: "Yes. Pixfolio may offer a limited free trial so you can explore features and create demo albums before purchasing a subscription.",
        },
        {
            id: "7",
            question: "7️⃣ Do you offer plans for high-volume labs?",
            answer: "Yes. Pixfolio provides specialized lab plans optimized for bulk album creation and multi-photographer workflows.",
        },
    ],
};

// Footer Section

export const footerConfig = {
    logoText: "PIXFOLIO",
    contactLabel: "Contact Section",
    email: "hello@pixfolio.com",
    locationText: "San Francisco, CA\nUnited States",
    navigationLabel: "Footer Navigation",
    navLinks: [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "Testimonials", href: "#testimonials" },
        { label: "FAQ", href: "#faq" },
    ],
    socialLabel: "Follow Along",
    socialLinks: [
        { iconName: "Instagram", href: "#", label: "Instagram" },
        { iconName: "Twitter", href: "#", label: "Twitter" },
        { iconName: "Linkedin", href: "#", label: "LinkedIn" },
        { iconName: "Mail", href: "mailto:hello@pixfolio.com", label: "Email" },
    ],
    tagline: "Where Every Moment\nBecomes Timeless",
    copyright: "© 2024 Pixfolio. All rights reserved.",
    bottomLinks: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
    ],
};
