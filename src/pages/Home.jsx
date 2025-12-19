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
// import FlowingMenu from '../components/FlowingMenu'


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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      
      {/* hero section */}

<section>
  <div className='w-full h-[800px] overflow-hidden relative'>
  <IntroAnimation/>
  </div>
</section>

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
            <section className='mb-100 mt-70'>
               <GoogleGeminiEffect/>
      </section>
       <div className="h-[40rem] flex justify-center items-center px-4">
      <div className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
        Build
        <FlipWords words={words} /> <br />
        VisualBooks With Pixora
      </div>
    </div>
     <section>
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
    <img
      src="https://images.unsplash.com/photo-1470338229081-eb5980be28c9?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="Pixora preview"
      className="mx-auto mt-10 w-full max-w-3xl rounded-xl shadow-lg"
    />
  </ContainerScroll>
</section>


      {/* <section>
        <ModalProvider/>
      </section> */}
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
