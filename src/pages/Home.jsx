import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play, ArrowRight } from 'lucide-react'
import UploadDemoModal from '../components/UploadDemoModal'
import ScrollReveal from '../components/ScrollReveal';
import { LampDemo } from '../components/Lamp'
import { SparklesCore } from '../ui/sparkles'
import { CardStack } from '@/components/ui/card-stack'
import { Cover } from '@/components/ui/cover'
import { ContainerTextFlip } from '@/components/ui/container-text-flip'
import { SparklesText } from '@/components/ui/sparkles-text'
import { GoogleGeminiEffect } from '@/components/ui/google-gemini-effect'
import { Modal, ModalProvider } from '@/components/ui/animated-modal'
import { ContainerScroll } from '@/components/ui/container-scroll-animation'
import { FlipWords } from '@/components/ui/flip-words'
import { TypewriterEffect } from '@/components/ui/typewriter-effect'
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button'
import IntroAnimation from '@/components/ui/scroll-morph-hero'
import { ZoomParallax } from '@/components/ui/zoom-parallax'
import { OrbitingCircles } from '@/components/ui/orbiting-circles'
import { FeaturesSectionWithHoverEffects } from '@/components/blocks/feature-section-with-hover-effects'
import { TextHoverEffect } from '@/components/ui/text-hover-effect'
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials'
import { MagneticText } from '@/components/ui/morphing-cursor'
import { Accordion } from '@radix-ui/react-accordion'
import VisualBookViewer from '../components/VisualBookViewer'
import { Accordion05 } from '@/components/ui/accordion-05'
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
// import FlowingMenu from '../components/FlowingMenu'

const parallaxImages = [
    {
      src: 'https://plus.unsplash.com/premium_photo-1706485734742-4a4153f34d2f?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Modern architecture building',
    },
    {
      src: 'https://images.unsplash.com/photo-1698082671072-179b90cb845b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Urban cityscape at sunset',
    },
    {
      src: 'https://plus.unsplash.com/premium_photo-1674581929981-a1b400089900?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Abstract geometric pattern',
    },
    {
      src: 'https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Mountain landscape',
    },
    {
      src: 'https://images.unsplash.com/photo-1647541706970-8e530dedc02c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Minimalist design elements',
    },
    {
      src: 'https://plus.unsplash.com/premium_photo-1670430623154-24626c42fb33?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Ocean waves and beach',
    },
    {
      src: 'https://images.unsplash.com/photo-1591700331354-f7eea65d1ce8?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Forest trees and sunlight',
    },
  ];


  const faqs = [
    {
      question: "What is Pixora?",
      answer: "Pixora is an online Visual Book creator that helps photographers and studios present their albums in a modern, interactive format. You can even add your own branding."
    },
    {
      question: "How does Pixora work?",
      answer: "You upload your album photos, and Pixora automatically converts them into a smooth, interactive Visual Book. You can share it with clients using a simple link."
    },
    {
      question: "What are Pixora's monthly plans?",
      answer: "Pixora offers simple and affordable plans:\n\nFree Plan → Create up to 3 Visual Books\n\nPremium Plan ₹99/month → Create unlimited Visual Books anytime"
    },
    {
      question: "Can I add branding or social media links in Pixora?",
      answer: "Yes. Pixora allows you to add:\n\n• Studio / Photographer Name\n• Website link\n• All social media profiles\n• Contact Number\n• Location\n\nYour Visual Books will display your identity professionally."
    },
    {
      question: "Can I add or change music in Pixora?",
      answer: "Yes. You can add or update background music to match the mood of your album. This improves the overall viewing experience."
    },
    {
      question: "Kya Pixora me mera data surakshit rahega?",
      answer: "Bilkul. Pixora advanced security use karta hai:\n\n• Encrypted storage\n• Secure servers\n• Automated backups\n• No data sharing with third parties\n\nAapke Visual Books hamesha safe rehte hain."
    },
    {
      question: "Can I edit Visual Books after creation?",
      answer: "Yes. You can make changes anytime unless the Visual Book is deleted."
    },
    {
      question: "Does Pixora work offline?",
      answer: "No. Pixora is a cloud-based platform and requires an internet connection to create or view Visual Books."
    },
    {
      question: "Pixora albums kitne time tak store rahengi?",
      answer: "Pixora albums long-term store hoti hain.\nAgar aapka plan expire ho jaye:\n\n• Your albums will continue to open\n• Only branding features may pause\n• The moment you reactivate a plan, branding restores\n\nYour albums never disappear unexpectedly."
    },
    {
      question: "Kya Printing & Design Labs ke liye Pixora ka koi special version hai?",
      answer: "Yes. Pixora offers a Lab Mode designed for high-volume album creation:\n\n• Faster processing for bulk Visual Books\n• Custom pricing models\n• Labs can create Visual Books for photographers\n• If photographer's personal plan is inactive, branding will not appear\n• Photographer needs personal login to enable their branding"
    },
    {
      question: "Kya Pixora ka free trial available hai?",
      answer: "Yes. Pixora offers a free trial for new users:\n\n• Create up to 3 free Visual Books\n• Explore all features\n• No payment needed"
    }
  ]

const Home = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)


  const CARDS = [
  {
    id: 0,
    name: "Interactive Flipbooks",
    designation: "Flipbook Feature",
    content: (
      <p>
        Turn photos into smooth, realistic flipbooks with natural page turns,
        clean transitions, and a premium viewing flow that feels modern and easy to explore.
      </p>
    ),
  },
  {
    id: 1,
    name: "Customizable Templates",
    designation: "Design Feature",
    content: (
      <p>
        Access a wide range of ready-made layouts and customize colors, fonts,
        spacing, and structure to match your personal or client branding.
      </p>
    ),
  },
  {
    id: 2,
    name: "Mobile Optimized",
    designation: "Compatibility Feature",
    content: (
      <p>
        Each flipbook automatically adjusts pages, spacing, and images to fit
        any device, ensuring a consistent and smooth reading experience.
      </p>
    ),
  },
  {
    id: 3,
    name: "Easy Sharing",
    designation: "Sharing Feature",
    content: (
      <p>
        Instantly generate shareable links and embed codes so you can publish
        projects anywhere without extra setup.
      </p>
    ),
  },
  {
    id: 4,
    name: "Secure & Private",
    designation: "Security Feature",
    content: (
      <p>
        All projects are protected with encrypted storage and controlled access,
        keeping personal and client work safe at every step.
      </p>
    ),
  },
  {
    id: 5,
    name: "Lightning Fast",
    designation: "Performance Feature",
    content: (
      <p>
        Pages load quickly and handle large image sets smoothly thanks to
        performance-focused rendering and smart caching.
      </p>
    ),
  },
  {
    id: 6,
    name: "Professional Quality",
    designation: "Quality Feature",
    content: (
      <p>
        Images stay crisp and high-resolution across devices, making your flipbooks
        ideal for portfolios, presentations, and client previews.
      </p>
    ),
  },
  {
    id: 7,
    name: "User-Friendly Interface",
    designation: "Usability Feature",
    content: (
      <p>
        A clean layout with drag-and-drop tools makes Visual Book creation simple
        for beginners while staying efficient for advanced users.
      </p>
    ),
  },
];

const words = ["refined", "premium", "elegant", "professional", "exquisite", "signature", "prestige"];

const typewriterwords = [
    {
      text: "Build ",
    },
    {
      text: "Awesome ",
    },
    {
      text: " VisualBooks ",
    },
    {
      text: "With ",
    },
    {
      text: "Pixora.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  const demoSpreads = [
  {
    id: 1,
    leftPage: { 
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop", 
      caption: "Mountain Sunrise" 
    },
    rightPage: { 
      image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1200&h=800&fit=crop", 
      caption: "Ocean Waves" 
    }
  },
  {
    id: 2,
    leftPage: { 
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=800&fit=crop", 
      caption: "Forest Path" 
    },
    rightPage: { 
      image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1200&h=800&fit=crop", 
      caption: "Desert Landscape" 
    }
  },
  {
    id: 3,
    leftPage: { 
      image: "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=1200&h=800&fit=crop", 
      caption: "Northern Lights" 
    },
    rightPage: { 
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&h=800&fit=crop", 
      caption: "Tropical Beach" 
    }
  },
  {
    id: 4,
    leftPage: { 
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop", 
      caption: "Misty Mountains" 
    },
    rightPage: { 
      image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&h=800&fit=crop", 
      caption: "City Skyline" 
    }
  },
  {
    id: 5,
    leftPage: { 
      image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1200&h=800&fit=crop", 
      caption: "Autumn Forest" 
    },
    rightPage: { 
      image: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=1200&h=800&fit=crop", 
      caption: "Sunset Valley" 
    }
  }
]


  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      
      {/* hero section */}

<section>
  <div className='w-full h-[800px] overflow-hidden relative'>
  <IntroAnimation/>
  </div>
</section>
{/* <section>
   <VisualBookViewer 
        spreads={demoSpreads} 
        title="Pixora Demo Collection"
      />
</section> */}

      {/* Hero Section */}
      {/* <section className="bg-background min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
          >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Exceptional focus
          <ContainerTextFlip/>
          <SparklesText>
            Sahil 
          </SparklesText>
          </h1>
          {/* Sparkles Component */}
          {/* <div className="w-full max-w-7xl mb-8 flex justify-center">
            <div className="w-full max-w-4xl h-40 relative">
              {/* Gradients */}
              {/* <div
                className="absolute left-1/2 top-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent h-[2px] w-3/4 blur-sm" />
              <div
                className="absolute left-1/2 top-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px w-3/4" />
              <div
                className="absolute left-1/2 top-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
              <div
                className="absolute left-1/2 top-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" /> */} 

              {/* Core component */}
              {/* <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={1200}
                className="w-full h-full"
                particleColor="#3b82f6" /> */}

              {/* Radial Gradient to prevent sharp edges */}
              {/* <div
                className="absolute inset-0 w-full h-ull bg-white [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
            </div>
            
          </div> */}
          {/* <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Create stunning, interactive flipbooks from your photo collections. Perfect for photographers,
            designers, and content creators who want to showcase their work in a unique, engaging way.
          </p> */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          > */}
            {/* <button
              onClick={() => setIsUploadModalOpen(true)}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Play className="h-5 w-5" />
              Join Now
            </button> */}
              {/* <InteractiveHoverButton>
              Join Now
              </InteractiveHoverButton>
          </motion.div>
        </motion.div>
      </section> */}


{/* Zoom Parallax Section */}
      <section className="py-20 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {/* Scroll Down for Zoom Parallax */}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {/* Experience our interactive parallax effect with multiple images */}
          </p>
        </div>
        <ZoomParallax images={parallaxImages} />
      </section>
       
      {/* ScrollReveal Section */}
      <section className="bg-white flex items-center justify-center min-h-screen">
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={5}
          blurStrength={10}
        >
          Memories don't fade because time passes.
          They fade when no one preserves them.
          Pixora keeps every moment alive, exactly as it deserves to be remembered.
        </ScrollReveal>
      </section>
            {/* <section className='mb-100 mt-70'>
               <GoogleGeminiEffect/>
      </section> */}
       {/* <div className="h-[40rem] flex justify-center items-center px-4">
      <div className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
        Build
        <FlipWords words={words} /> <br />
        VisualBooks With Pixora
      </div>
    </div> */}
     {/* <section>
  <ContainerScroll
    titleComponent={
      <div className="text-center">
        <p className="text-base text-gray-300">Unleash the power of</p>
        <h1 className="text-5xl md:text-7xl font-bold text-gray-600 leading-tight">
          Scroll
          <br />
          Animations
        </h1>
      </div>
    }
    
  >
    {/* Your Image */}
    {/* <img
      src="https://images.unsplash.com/photo-1470338229081-eb5980be28c9?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="Pixora preview"
      className="mx-auto mt-10 w-full max-w-3xl rounded-xl shadow-lg"
    />
  </ContainerScroll> */}
{/* </section> */} 
    {/* <section className="py-20 bg-white">
 
  <ScrollBasedVelocityDemo/>
    </section> */}

      {/* <section>
        <ModalProvider/>
      </section> */}
      <section>
         <div className="h-[40rem] flex items-center justify-center">
                  <TextHoverEffect text="Our Vision" />
                </div>
      </section>
       <section>
              {/* <div className="min-h-screen w-full">
                  <div className="absolute top-0 left-0 w-full"> */}
                      <FeaturesSectionWithHoverEffects />
                  {/* </div> */}
              {/* </div> */}
            </section>
      {/* Features Section */}
      <section className="pb-20 bg-white pt-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LampDemo/>
           <div className="h-[40rem] flex items-center justify-center w-full mt-[-350px]">
            <CardStack items={CARDS} />
          </div>
        </div>
      </section>
      <section>
        {/* <CardStack/> */}
      </section>

        <section className="bg-white">

            <AnimatedTestimonials/>
            </section>
<section className="bg-white">
  <main className="min-h-screen bg-white flex flex-col items-center justify-center gap-16 p-8 pt-[300px]">
      <p className="text-muted-foreground text-xs tracking-[0.25em] uppercase">Hover to interact</p>

      <div className="flex flex-col items-center gap-8">
        <MagneticText text="QUERY" hoverText="REPLY" />
        <MagneticText text="GUIDE" hoverText="HELPS" />
      </div>
    </main>
</section>
      <section className="bg-white">
  <Accordion type="single" collapsible
      className="max-w-2xl mx-auto text-sm"
      defaultValue="item-1">
    {faqs.map((faq, index) => (
      <AccordionItem key={index} value={`item-${index}`}>
        <AccordionTrigger className="text-xl font-semibold">{faq.question}</AccordionTrigger>
        <AccordionContent className="text-lg">
          {faq.answer}
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
</section>
      {/* <Cover/> */}
      <section >
       <div className="flex flex-col items-center justify-center h-[40rem] bg-accent;
 ">
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
        The road to freedom starts from here
      </p>
      <TypewriterEffect words={typewriterwords} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
          Signup
        </button>
        <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
          Join now
        </button>
      </div>
    </div>
      </section>


      {/* Upload Demo Modal */}
      <UploadDemoModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </div>
  )
}

export default Home
