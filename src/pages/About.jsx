import { ModalProvider, Modal, ModalBody, ModalContent, ModalFooter, ModalTrigger } from '@/components/ui/animated-modal'
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials'
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards'
import { OrbitingCircles } from '@/components/ui/orbiting-circles'
import { PixelImage } from '@/components/ui/pixel-image'
import { ScrollVelocityContainer, ScrollVelocityRow } from '@/components/ui/scroll-based-velocity'
import { StickyScroll } from '@/components/ui/sticky-scroll-reveal'
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Target, Award, Heart, Camera, Lightbulb, TrendingUp, ChevronDown } from 'lucide-react'
import { IconArrowWaveRightUp, IconBoxAlignRightFilled, IconBoxAlignTopLeft, IconClipboardCopy, IconFileBroken, IconSignature, IconTableColumn, } from "@tabler/icons-react"
import { useState } from 'react'
import { TextHoverEffect } from '@/components/ui/text-hover-effect'
import { Accordion } from '@/components/ui/accordion'
import {
  // Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Accordion05 } from '@/components/ui/accordion-05'
import { ZoomParallax } from '@/components/ui/zoom-parallax'
import { MagneticText } from '@/components/ui/morphing-cursor'
import TextArcEffect from '@/components/ui/text-arc-effect'
export function BentoGridDemo() {
  return (
    <BentoGrid className="max-w-4xl mx-auto">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={i === 3 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}

const faqs = [
  {
    question: "What is Pixora?",
    answer:
      "Pixora is an online Visual Book creator that helps photographers and studios present their albums in a modern, interactive format. You can even add your own branding.",
  },
  {
    question: "How does Pixora work?",
    answer:
      "You upload your album photos, and Pixora automatically converts them into a smooth, interactive Visual Book. You can share it with clients using a simple link.",
  },
  {
    question: "What are Pixora's monthly plans?",
    answer:
      "Pixora offers simple and affordable plans:\n\nFree Plan → Create up to 3 Visual Books\n\nPremium Plan ₹99/month → Create unlimited Visual Books anytime",
  },
  {
    question: "Can I add branding or social media links in Pixora?",
    answer:
      "Yes. Pixora allows you to add:\n\n• Studio / Photographer Name\n• Website link\n• All social media profiles\n• Contact Number\n• Location\n\nYour Visual Books will display your identity professionally.",
  },
  {
    question: "Can I add or change music in Pixora?",
    answer:
      "Yes. You can add or update background music to match the mood of your album. This improves the overall viewing experience.",
  },
  {
    question: "Kya Pixora me mera data surakshit rahega?",
    answer:
      "Bilkul. Pixora advanced security use karta hai:\n\n• Encrypted storage\n• Secure servers\n• Automated backups\n• No data sharing with third parties\n\nAapke Visual Books hamesha safe rehte hain.",
  },
  {
    question: "Can I edit Visual Books after creation?",
    answer:
      "Yes. You can make changes anytime unless the Visual Book is deleted.",
  },
  {
    question: "Does Pixora work offline?",
    answer:
      "No. Pixora is a cloud-based platform and requires an internet connection to create or view Visual Books.",
  },
  {
    question: "Pixora albums kitne time tak store rahengi?",
    answer:
      "Pixora albums long-term store hoti hain.\nAgar aapka plan expire ho jaye:\n\n• Your albums will continue to open\n• Only branding features may pause\n• The moment you reactivate a plan, branding restores\n\nYour albums never disappear unexpectedly.",
  },
  {
    question: "Kya Printing & Design Labs ke liye Pixora ka koi special version hai?",
    answer:
      "Yes. Pixora offers a Lab Mode designed for high-volume album creation:\n\n• Faster processing for bulk Visual Books\n• Custom pricing models\n• Labs can create Visual Books for photographers\n• If photographer's personal plan is inactive, branding will not appear\n• Photographer needs personal login to enable their branding",
  },
  {
    question: "Kya Pixora ka free trial available hai?",
    answer:
      "Yes. Pixora offers a free trial for new users:\n\n• Create up to 3 free Visual Books\n• Explore all features\n• No payment needed",
  },
];


const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);
const items = [
  {
    title: "A New Way to Create",
    description: "Pixora began as a simple idea to make photo presentations feel more modern and interactive. We're focused on building something fresh for visual storytelling.",
    header: <img src="https://images.unsplash.com/photo-1517697471339-4aa32003c11a?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Creative design workspace" className="rounded-lg w-full h-32 object-cover" />,
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Built for Modern Creators",
    description: "Pixora is designed to help photographers and filmmakers create visual books easily, without complex tools or heavy workflows.",
    header: <img src="https://images.unsplash.com/photo-1545242640-7c9e9cc07d23?q=80&w=841&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Modern creative workspace" className="rounded-lg w-full h-32 object-cover" />,
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Why Pixora Exists",
    description: "We believe images should feel engaging, not static. Pixora helps creators present their visuals in a more interactive and meaningful way.",
    header: <img src="https://images.unsplash.com/photo-1533088339408-74fcf62b8e6a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Engaging visual storytelling" className="rounded-lg w-full h-32 object-cover" />,
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Early Growth",
    description: "Pixora is growing step by step as more creators explore new ways to share their photos, albums, and visual stories.",
    header: <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop" alt="Business growth and analytics" className="rounded-lg w-full h-32 object-cover" />,
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Visual Books in Progress",
    description: "Creators are actively building visual books, experimenting with layouts, and shaping how Pixora evolves.",
    header: <img src="https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Book creation and design process" className="rounded-lg w-full h-32 object-cover" />,
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
  },
];

const content = [
  {
    title: "Innovation",
    description:
      "Pixora is built on a simple belief: creators deserve tools that feel modern, intuitive, and powerful. We continuously refine our technology to bring photographers and filmmakers new ways to design albums, craft visual books, and present their stories. Every feature is designed to elevate your workflow and unlock creative possibilities that weren’t accessible before.",
  },
  {
    title: "Passion for Creativity",
    description:
      "Photography is more than images — it’s emotion, memory, and storytelling. Pixora is crafted to support that artistic journey. Whether you're editing wedding moments, building cinematic albums, or designing portrait showcases, we give you the creative freedom to shape your vision. Our goal is to help every creator turn their ideas into beautiful, meaningful visual experiences.",
  },
  {
    title: "Community First",
    description:
      "Pixora isn’t just a tool — it’s a creative space. We’re committed to building a supportive community of photographers, videographers, editors, and designers. A place where creators can learn, share, inspire, and grow together. From feedback to collaboration, Pixora helps strengthen the relationships that bring great visual stories to life.",
  },
  {
    title: "Excellence",
    description:
      "We believe professional work deserves professional tools. That’s why Pixora is shaped with precision, quality, and reliability at its core. From high-resolution album exporting to smooth user experience and premium layouts, every detail is crafted to help creators deliver their best. Excellence isn’t an option for us — it’s the standard.",
  },
];
const Icons = {
  gitHub: () => (
    <svg width="100" height="100" viewBox="0 0 438.549 438.549">
      <path
        fill="currentColor"
        d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
      />
    </svg>
  ),
  notion: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.017 4.313l55.333 -4.087c6.797 -0.583 8.543 -0.19 12.817 2.917l17.663 12.443c2.913 2.14 3.883 2.723 3.883 5.053v68.243c0 4.277 -1.553 6.807 -6.99 7.193L24.467 99.967c-4.08 0.193 -6.023 -0.39 -8.16 -3.113L3.3 79.94c-2.333 -3.113 -3.3 -5.443 -3.3 -8.167V11.113c0 -3.497 1.553 -6.413 6.017 -6.8z"
        fill="#ffffff"
      />
      <path
        d="M61.35 0.227l-55.333 4.087C1.553 4.7 0 7.617 0 11.113v60.66c0 2.723 0.967 5.053 3.3 8.167l13.007 16.913c2.137 2.723 4.08 3.307 8.16 3.113l64.257 -3.89c5.433 -0.387 6.99 -2.917 6.99 -7.193V20.64c0 -2.21 -0.873 -2.847 -3.443 -4.733L74.167 3.143c-4.273 -3.107 -6.02 -3.5 -12.817 -2.917zM25.92 19.523c-5.247 0.353 -6.437 0.433 -9.417 -1.99L8.927 11.507c-0.77 -0.78 -0.383 -1.753 1.557 -1.947l53.193 -3.887c4.467 -0.39 6.793 1.167 8.54 2.527l9.123 6.61c0.39 0.197 1.36 1.36 0.193 1.36l-54.933 3.307 -0.68 0.047zM19.803 88.3V30.367c0 -2.53 0.777 -3.697 3.103 -3.893L86 22.78c2.14 -0.193 3.107 1.167 3.107 3.693v57.547c0 2.53 -0.39 4.67 -3.883 4.863l-60.377 3.5c-3.493 0.193 -5.043 -0.97 -5.043 -4.083zm59.6 -54.827c0.387 1.75 0 3.5 -1.75 3.7l-2.91 0.577v42.773c-2.527 1.36 -4.853 2.137 -6.797 2.137 -3.107 0 -3.883 -0.973 -6.21 -3.887l-19.03 -29.94v28.967l6.02 1.363s0 3.5 -4.857 3.5l-13.39 0.777c-0.39 -0.78 0 -2.723 1.357 -3.11l3.497 -0.97v-38.3L30.48 40.667c-0.39 -1.75 0.58 -4.277 3.3 -4.473l14.367 -0.967 19.8 30.327v-26.83l-5.047 -0.58c-0.39 -2.143 1.163 -3.7 3.103 -3.89l13.4 -0.78z"
        fill="#000000"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  ),
  openai: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-black dark:fill-white"
    >
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
    </svg>
  ),
  googleDrive: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 87.3 78"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z"
        fill="#0066da"
      />
      <path
        d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z"
        fill="#00ac47"
      />
      <path
        d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z"
        fill="#ea4335"
      />
      <path
        d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z"
        fill="#00832d"
      />
      <path
        d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z"
        fill="#2684fc"
      />
      <path
        d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z"
        fill="#ffba00"
      />
    </svg>
  ),
  whatsapp: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 175.216 175.552"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="b"
          x1="85.915"
          x2="86.535"
          y1="32.567"
          y2="137.092"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#57d163" />
          <stop offset="1" stopColor="#23b33a" />
        </linearGradient>
        <filter
          id="a"
          width="1.115"
          height="1.114"
          x="-.057"
          y="-.057"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="3.531" />
        </filter>
      </defs>
      <path
        d="m54.532 138.45 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.523h.023c33.707 0 61.139-27.426 61.153-61.135.006-16.335-6.349-31.696-17.895-43.251A60.75 60.75 0 0 0 87.94 25.983c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.558zm-40.811 23.544L24.16 123.88c-6.438-11.154-9.825-23.808-9.821-36.772.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954zm0 0"
        fill="#b3b3b3"
        filter="url(#a)"
      />
      <path
        d="m12.966 161.238 10.439-38.114a73.42 73.42 0 0 1-9.821-36.772c.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954z"
        fill="#ffffff"
      />
      <path
        d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.559 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.524h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.929z"
        fill="url(#linearGradient1780)"
      />
      <path
        d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.313-6.179 22.558 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.517 31.126 8.523h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.928z"
        fill="url(#b)"
      />
      <path
        d="M68.772 55.603c-1.378-3.061-2.828-3.123-4.137-3.176l-3.524-.043c-1.226 0-3.218.46-4.902 2.3s-6.435 6.287-6.435 15.332 6.588 17.785 7.506 19.013 12.718 20.381 31.405 27.75c15.529 6.124 18.689 4.906 22.061 4.6s10.877-4.447 12.408-8.74 1.532-7.971 1.073-8.74-1.685-1.226-3.525-2.146-10.877-5.367-12.562-5.981-2.91-.919-4.137.921-4.746 5.979-5.819 7.206-2.144 1.381-3.984.462-7.76-2.861-14.784-9.124c-5.465-4.873-9.154-10.891-10.228-12.73s-.114-2.835.808-3.751c.825-.824 1.838-2.147 2.759-3.22s1.224-1.84 1.836-3.065.307-2.301-.153-3.22-4.032-10.011-5.666-13.647"
        fill="#ffffff"
        fillRule="evenodd"
      />
    </svg>
  ),
}
const About = () => {
  const stats = [
    { label: "Active Users", value: "50,000+", icon: <Users className="h-6 w-6" /> },
    { label: "Flipbooks Created", value: "2M+", icon: <Camera className="h-6 w-6" /> },
    { label: "Countries Served", value: "120+", icon: <TrendingUp className="h-6 w-6" /> },
    { label: "Uptime", value: "99.9%", icon: <Award className="h-6 w-6" /> }
  ]

  const values = [
    {
      icon: <Lightbulb className="h-8 w-8 text-blue-600" />,
      title: "Innovation",
      description: "We constantly push the boundaries of what's possible with interactive media."
    },
    {
      icon: <Heart className="h-8 w-8 text-blue-600" />,
      title: "Passion for Creativity",
      description: "We believe in empowering creators to tell their stories in new and exciting ways."
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Community First",
      description: "Building a supportive community of photographers, designers, and content creators."
    },
    {
      icon: <Target className="h-8 w-8 text-blue-600" />,
      title: "Excellence",
      description: "Delivering the highest quality tools and experiences for our users."
    }
  ]

  const team = [
    {
      name: "Alex Rivera",
      role: "CEO & Founder",
      bio: "Former professional photographer with 15+ years experience in digital media.",
      avatar: "AR"
    },
    {
      name: "Sarah Chen",
      role: "Head of Product",
      bio: "Product leader passionate about user experience and innovative design solutions.",
      avatar: "SC"
    },
    {
      name: "Marcus Johnson",
      role: "Lead Developer",
      bio: "Full-stack developer with expertise in modern web technologies and performance optimization.",
      avatar: "MJ"
    },
    {
      name: "Lisa Wong",
      role: "Design Director",
      bio: "Creative director specializing in user interface design and brand strategy.",
      avatar: "LW"
    }
  ]

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


  const testimonials = [
  {
    quote:
      "Every wedding moment carries emotion, color, and story. Pixora helps you preserve these memories in beautiful, timeless visual books built for couples who want more than just photos.",
  },
  {
    quote:
      "Great photography deserves a clear and elegant way to be shared. Pixora organizes your portraits and sessions into clean, modern layouts that highlight expression, detail, and mood.",
  },
  {
    quote:
      "Your camera work is shaped by precision and vision. Pixora keeps that quality intact by presenting each frame with true clarity, sharpness, and professional depth.",
  },
  {
    quote:
      "Cinematography is more than sequences—it's storytelling through light, motion, and atmosphere. Pixora arranges your cinematic frames into visually connected chapters that feel immersive.",
  },
  {
    quote:
      "Pixora transforms your images and videos into polished visual books. Built for photographers, filmmakers, and creators who want a premium way to showcase their craft with impact and style.",
  },
];


  const parallaxImages = [
    {
      src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
      alt: 'Modern architecture building',
    },
    {
      src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
      alt: 'Urban cityscape at sunset',
    },
    {
      src: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
      alt: 'Abstract geometric pattern',
    },
    {
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
      alt: 'Mountain landscape',
    },
    {
      src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
      alt: 'Minimalist design elements',
    },
    {
      src: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
      alt: 'Ocean waves and beach',
    },
    {
      src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
      alt: 'Forest trees and sunlight',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Pixora
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're on a mission to revolutionize how photographers and content creators showcase their work.
              Founded by creators, for creators.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Modal Demo Section */}
      <section className="py-20 bg-white">
        {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Interactive Modal Demo
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience our animated modal component in action
            </p>
          </div> */}
          <AnimatedModalDemo />
        {/* </div> */}
      </section>
     
        <section className="flex justify-center items-center bg-white">
          <PixelImage
          src="https://images.unsplash.com/photo-1644695316087-88b7dffba339?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          customGrid={{ rows: 4, cols: 6 }}
          grayscaleAnimation
          pixelFadeInDuration={2000}
          maxAnimationDelay={2400}
          colorRevealDelay={2600}
    />
</section>

     
      <section className="bg-white">
        <div className="h-[40rem] flex items-center justify-center">
          <TextHoverEffect text="Our Story" />
        </div>
        <BentoGridDemo />
      </section>

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
       <section className="bg-white">
        <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
      <OrbitingCircles iconSize={40}>
        <Icons.whatsapp />
        <Icons.notion />
        <Icons.openai />
        <Icons.googleDrive />
        <Icons.whatsapp />
      </OrbitingCircles>
      <OrbitingCircles iconSize={30} radius={100} reverse speed={2}>
        <Icons.whatsapp />
        <Icons.notion />
        <Icons.openai />
        <Icons.googleDrive />
      </OrbitingCircles>
    </div>
      </section>
      
<section>
  <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
</section>

<section className="py-20 bg-white">
  {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Scroll Velocity Demo
      </h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Experience our scroll-based velocity animation component
      </p>
    </div> */}
    <ScrollBasedVelocityDemo />
  {/* </div> */}
</section>
      <section className="bg-white">
          <div className="w-full py-4">
            <StickyScroll content={content} />
          </div>
      </section>

       
            <section className="bg-white">
              <AnimatedTestimonials/>
            </section>
      {/* Team Section */}

      {/* Magnetic Text Demo Section */}
      {/* <section className="py-32 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Interactive Magnetic Text
          </h2>
          <p className="text-lg text-gray-600 mb-8">Hover over the text to see the magnetic effect</p>
        </div>
        <div className="flex flex-col items-center gap-12">
          <MagneticText text="CREATE" hoverText="ELEVATE" />
          <MagneticText text="VISION" hoverText="DESIGN" />
        </div>
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500 italic">Try moving your cursor around the text</p>
        </div>
      </section> */}

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

 <section className="py-20 bg-gray-50 text-nowrap max-w-full bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Ask Questions
            </h2>
            {/* <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Designer and creative developer sharing insights and experiences
            </p> */}
          </div>
          <Accordion05 />
        </div>
      </section>

      <TextArcEffect />
    </div>
  )
}

const PlaneIcon = ({
  className
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M16 10h4a2 2 0 0 1 0 4h-4l-4 7h-3l2 -7h-4l-2 2h-3l2 -4l-2 -4h3l2 2h4l-2 -7h3z" />
    </svg>
  );
};

const VacationIcon = ({
  className
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M17.553 16.75a7.5 7.5 0 0 0 -10.606 0" />
      <path d="M18 3.804a6 6 0 0 0 -8.196 2.196l10.392 6a6 6 0 0 0 -2.196 -8.196z" />
      <path
        d="M16.732 10c1.658 -2.87 2.225 -5.644 1.268 -6.196c-.957 -.552 -3.075 1.326 -4.732 4.196" />
      <path d="M15 9l-3 5.196" />
      <path
        d="M3 19.25a2.4 2.4 0 0 1 1 -.25a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 1 .25" />
    </svg>
  );
};

const ElevatorIcon = ({
  className
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M5 4m0 1a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1z" />
      <path d="M10 10l2 -2l2 2" />
      <path d="M10 14l2 2l2 -2" />
    </svg>
  );
};

const FoodIcon = ({
  className
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M20 20c0 -3.952 -.966 -16 -4.038 -16s-3.962 9.087 -3.962 14.756c0 -5.669 -.896 -14.756 -3.962 -14.756c-3.065 0 -4.038 12.048 -4.038 16" />
    </svg>
  );
};

const MicIcon = ({
  className
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M15 12.9a5 5 0 1 0 -3.902 -3.9" />
      <path
        d="M15 12.9l-3.902 -3.899l-7.513 8.584a2 2 0 1 0 2.827 2.83l8.588 -7.515z" />
    </svg>
  );
};

const ParachuteIcon = ({
  className
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M22 12a10 10 0 1 0 -20 0" />
      <path
        d="M22 12c0 -1.66 -1.46 -3 -3.25 -3c-1.8 0 -3.25 1.34 -3.25 3c0 -1.66 -1.57 -3 -3.5 -3s-3.5 1.34 -3.5 3c0 -1.66 -1.46 -3 -3.25 -3c-1.8 0 -3.25 1.34 -3.25 3" />
      <path d="M2 12l10 10l-3.5 -10" />
      <path d="M15.5 12l-3.5 10l10 -10" />
    </svg>
  );
};

export function AnimatedModalDemo() {
  const images = [
    "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1668383207771-dcf6e2d520f5?q=80&w=436&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=352&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1579541689280-b0c741f6af77?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1504093376055-b3094b674dcb?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  return (
    <div className="py-40 flex items-center justify-center">
      <Modal>
        <ModalTrigger
          className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn"
        >
          <span
            className="group-hover/modal-btn:translate-x-40 text-center transition duration-500"
          >
            Click me
          </span>
          <div
            className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20"
          >
            📷
          </div>
        </ModalTrigger>

        <ModalBody>
          <ModalContent>
            <h4
              className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8"
            >
              Explore your{" "}
              <span
                className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200"
              >
                Pixora Album
              </span>{" "}
              now 📸
            </h4>

            {/* IMAGES */}
            <div className="flex justify-center items-center">
              {images.map((image, idx) => (
                <motion.div
                  key={"images" + idx}
                  style={{
                    rotate: Math.random() * 20 - 10,
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 0,
                    zIndex: 100,
                  }}
                  whileTap={{
                    scale: 1.1,
                    rotate: 0,
                    zIndex: 100,
                  }}
                  className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 shrink-0 overflow-hidden"
                >
                  <img
                    src={image}
                    alt="pixora images"
                    width="500"
                    height="500"
                    className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover shrink-0"
                  />
                </motion.div>
              ))}
            </div>

            {/* DETAILS */}
            <div className="py-10 flex flex-wrap gap-x-4 gap-y-6 items-start justify-start max-w-sm mx-auto">
              <div className="flex items-center justify-center">
                <PlaneIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  Wedding Moments
                </span>
              </div>

              <div className="flex items-center justify-center">
                <ElevatorIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  Portrait Sessions
                </span>
              </div>

              <div className="flex items-center justify-center">
                <VacationIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  Photography Shoots
                </span>
              </div>

              <div className="flex items-center justify-center">
                <FoodIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  Camera Gear
                </span>
              </div>

              <div className="flex items-center justify-center">
                <MicIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  Cinematography
                </span>
              </div>

              <div className="flex items-center justify-center">
                <ParachuteIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  Pixora Gallery
                </span>
              </div>
            </div>
          </ModalContent>

          <ModalFooter className="gap-4">
            <button
              className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28"
            >
              Close
            </button>
            {/* <button
              className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28"
            >
              View Now
            </button> */}
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}

export function ScrollBasedVelocityDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <ScrollVelocityContainer className="text-4xl font-bold tracking-[-0.02em] md:text-7xl md:leading-[5rem]">
        <ScrollVelocityRow baseVelocity={20} direction={1}>
          Wedding Stories
        </ScrollVelocityRow>
        <ScrollVelocityRow baseVelocity={20} direction={-1}>
          Cinematic Frames
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
    </div>
  )
}

export default About
