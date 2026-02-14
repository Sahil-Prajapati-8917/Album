import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ThemeToggle } from '../components/ThemeToggle'
import {
  LayoutGrid,
  Sparkles,
  DraftingCompass,
  BadgeCheck,
  ArrowRight,
  Lock,
  Globe,
  CheckCircle2,
  Quote,
  Highlighter
} from 'lucide-react'

const Home = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="font-sans min-h-screen bg-background text-foreground selection:bg-primary/30 transition-colors duration-300">
      {/* Minimalist Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-border/5 ${scrolled ? 'bg-background/80 backdrop-blur-md border-border/10 shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 flex items-center justify-center bg-foreground text-background rounded-sm">
              <LayoutGrid className="size-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tighter uppercase">Pixfolio</h1>
          </div>
          <nav className="hidden md:flex items-center gap-12 text-sm font-medium tracking-widest uppercase">
            <a className="hover:text-primary transition-colors" href="#gallery">Gallery</a>
            <a className="hover:text-primary transition-colors" href="#features">Curate</a>
            <a className="hover:text-primary transition-colors" href="#process">Process</a>
            <a className="hover:text-primary transition-colors" href="#pricing">Pricing</a>
          </nav>
          <div className="flex items-center gap-6">
            <ThemeToggle />
            <Link to="/login" className="hidden sm:block text-sm font-semibold border-b border-foreground hover:border-primary transition-all">Log In</Link>
            <Link to="/signup" className="bg-primary text-primary-foreground px-6 py-2.5 rounded-sm text-sm font-bold uppercase tracking-wider hover:bg-foreground hover:text-background transition-all shadow-lg shadow-primary/10">
              Request Access
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        {/* Hero Section */}
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <img
              alt="Luxury Wedding Photography"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDya7lsBOJPBpYMqjKDtbq-BAzVC97Pps5V_si_l6haguZbu2uzAUiXmT1K2Kndu4m_P-V9f6JNPcfuwXWG9mna4Yyf5X744hqgg6R7JuLSbEQC2d9RbNMKTXS1d6_nnR-s0_a5sFd5C9pGdcEecP_fIcOuMx8h7wSx6aQq6BV8Jqud4Ngs59psOUCATGhj_HysQblAYSbMDlJiSR5hjR-iHofEbfbfeIu5DLgUjY1OgDvXqYd3b-NflEt1NOLWzhkimBHwBwBGxvsB"
            />
          </div>
          <div className="relative z-20 text-center px-4 max-w-4xl animate-in fade-in zoom-in-95 duration-1000">
            <h1 className="text-white text-5xl md:text-8xl font-extrabold tracking-tight mb-6 font-serif">
              Your Vision, <span className="italic font-light">Elevated.</span>
            </h1>
            <p className="text-white/90 text-lg md:text-2xl font-light mb-10 max-w-2xl mx-auto leading-relaxed">
              The ultimate digital stage for world-class photographers and cinematic storytellers.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link to="/gallery" className="bg-primary text-white px-10 py-4 rounded-lg text-base font-bold tracking-widest hover:scale-105 transition-transform uppercase">
                Explore the Gallery
              </Link>
              <Link to="/manifesto" className="border border-white text-white px-10 py-4 rounded-lg text-base font-bold tracking-widest backdrop-blur-sm hover:bg-white hover:text-primary transition-all uppercase">
                Our Manifesto
              </Link>
            </div>
          </div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white animate-bounce">
            <span className="material-symbols-outlined text-4xl">expand_more</span>
          </div>
        </section>

        {/* Value Prop */}
        <section className="py-32 bg-background">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-6 block">The Philosophy</span>
            <h2 className="font-serif text-4xl md:text-5xl mb-12 max-w-3xl mx-auto leading-tight">
              Moving away from standard SaaS clutter toward a luxury brand aesthetic.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-left mt-24">
              <div className="space-y-4">
                <Sparkles className="text-primary size-10" />
                <h3 className="text-xl font-bold uppercase tracking-tight">Curation Over Collection</h3>
                <p className="text-muted-foreground leading-relaxed">We provide tools that encourage selective showcasing, ensuring your best work always takes center stage.</p>
              </div>
              <div className="space-y-4">
                <DraftingCompass className="text-primary size-10" />
                <h3 className="text-xl font-bold uppercase tracking-tight">Architectural Flow</h3>
                <p className="text-muted-foreground leading-relaxed">Our layouts are built on classic design principles of balance and rhythm, not generic templates.</p>
              </div>
              <div className="space-y-4">
                <BadgeCheck className="text-primary size-10" />
                <h3 className="text-xl font-bold uppercase tracking-tight">Verified Provenance</h3>
                <p className="text-muted-foreground leading-relaxed">Every piece in your gallery is presented with high-fidelity metadata and secure authentication layers.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Showcase */}
        <section className="py-24 bg-muted/30 overflow-hidden" id="gallery">
          <div className="max-w-7xl mx-auto px-6 mb-16 flex items-end justify-between">
            <div>
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">The Gallery</span>
              <h2 className="font-serif text-5xl italic">Curated Works</h2>
            </div>
            <Link to="/signup" className="text-sm font-bold uppercase tracking-[0.2em] flex items-center gap-2 hover:text-primary transition-colors">
              Enter the Vault <ArrowRight className="size-4" />
            </Link>
          </div>
          {/* Asymmetrical Grid */}
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-7 aspect-[4/3] relative group overflow-hidden rounded-lg">
              <img alt="Architecture" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1bSHLUNou_gzHknhGVdyyfwySQoGW7DpIx1AkwjSGjpgr_MYxxVjGtZUgXywL8G8atq8HUcw1tIA_BIcYj2SgotvOItFllBFVV0h1nm4ceMz68O5g0Foa206pUAjMDlpgD90muPKgz11EOUIi45mlzphcWdR_HcttMhpg9YfC809ZogsOVNungFBAqLI30MyeFfTSAcQtRAFnPJLfQAO2OXBM5Tx1ti-KAc53mTllMtXPjQY3PGR8A4THLgUK64b6DWNrrUuLHTLc" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity p-8 flex flex-col justify-end">
                <p className="text-white text-xs font-bold tracking-widest uppercase mb-1">Architecture</p>
                <h4 className="text-white font-serif text-2xl italic">The Void Within</h4>
              </div>
            </div>
            <div className="col-span-12 md:col-span-5 aspect-[3/4] relative group overflow-hidden rounded-lg">
              <img alt="Sculpture" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0X4QBb1jHd_lC-scw7qg4h1NLgBFg27Ikn5yHQ1kzvS3C-qBeMxPeSM7mfxkV1EotTRQsyZ9cCz6FCNlm3353wo8t2eALJPt4jpdpb3IriyHeruYeC1-a1YNR0GHrLtBFTsbcwcabFoa3AC36VVZpkix5k1yQtc4HHvV8LN1DWhppbmCY30ejb6cc2T_3H2RZD3cOll8MLihBEd2m09iBLma39I3aRSo1Ne65hzZSx5NR2Mq3H-fmJ2VxzIwHYw1KlbNUHTgpz-cc" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity p-8 flex flex-col justify-end">
                <p className="text-white text-xs font-bold tracking-widest uppercase mb-1">3D Art</p>
                <h4 className="text-white font-serif text-2xl italic">Fluidity of Being</h4>
              </div>
            </div>
            <div className="col-span-12 md:col-span-4 aspect-square relative group overflow-hidden rounded-lg">
              <img alt="Portrait" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEZuKMkI9h9rYEnGNhXhARsJdtirWmGiB-4qJZ3eS8a5L1y7aRrl3vRPvQl0nIscrvs3k01kzuYM6ePFD2z64cnueWPOF1L31LAKjcg-52uOxkt-bxZ-Lc45lp8kJE2UN_Oovg4fJqEMniImLM9MqBHlS2wtJe1MZvn_J3h2uHZV75Z-goTCGhgQ0w2wSbVqYxRDCrK1h2oZ0fr1yq_yqjKWTplYfDKwccR-icUd5SNpN8zyzHw5yVCPUB75edb0Pca7AOOxRDg-uZ" />
            </div>
            <div className="col-span-12 md:col-span-8 aspect-[21/9] relative group overflow-hidden rounded-lg">
              <img alt="Gallery" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7Ysx9q0HSaxg8C0Mxc2EtspjzZEeiIF36v2ngmpWRwEEdq3RSPevKeqGU6ROknl_IR-jz1_El-9GeqLo7vmefUWl6hNvNcJxr9zS1125gWRHEVDPmf9qaQ2T5luHesGPYpYQIcB8o36_mm6gC60q6qom6s5-q_kNqZvmJSt5k_t4nki-rNA-ct7P9Xz3DVXraKl5rUec8JIw8kCBTWfDEFnmyuDC61ysLJAAKWTgcWnGpytOhuzZnPt3t-z1_HZypLTnpKuERYzPL" />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-32 bg-foreground text-background" id="features">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div>
                <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-6 block">Features</span>
                <h2 className="font-serif text-5xl mb-8 leading-tight">Masterfully Crafted for Perfectionists.</h2>
                <ul className="space-y-12">
                  <li className="flex gap-6 group">
                    <Highlighter className="text-primary size-8 transition-transform group-hover:scale-110" />
                    <div>
                      <h4 className="text-xl font-bold mb-2 tracking-tight">High-Res Rendering</h4>
                      <p className="opacity-50">Display your work in breathtaking detail with our proprietary engine that preserves color accuracy across all displays.</p>
                    </div>
                  </li>
                  <li className="flex gap-6 group">
                    <Lock className="text-primary size-8 transition-transform group-hover:scale-110" />
                    <div>
                      <h4 className="text-xl font-bold mb-2 tracking-tight">Private Collections</h4>
                      <p className="opacity-50">Securely share exclusive previews with your most valued collectors using password-protected, time-limited galleries.</p>
                    </div>
                  </li>
                  <li className="flex gap-6 group">
                    <Globe className="text-primary size-8 transition-transform group-hover:scale-110" />
                    <div>
                      <h4 className="text-xl font-bold mb-2 tracking-tight">Custom Domains</h4>
                      <p className="opacity-50">Your brand, your identity. Host your gallery on a sophisticated custom URL with full SSL encryption.</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="aspect-[3/4] bg-background/10 rounded-2xl p-1 shadow-2xl overflow-hidden">
                  <img alt="Interface Preview" className="w-full h-full object-cover rounded-xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqguRwf9gP4L7wjPbX8CHz0c7R0DG0bjBW2eQvn8aTvlxyvvvADs4E0G3L6eZ6_9bYq93z2cpqwLnZ55akn7cXoQygYpfGkrkzqd0EzGDjGk5anDSMaSOHvkGcabIyZ6Y3IroK1s_d6dzla8C844yn8UrZxFQ6gpYz2TgUF3GwYRzmD_yUsGILGSsAdJp1jSeRAwzfsAuzQkXJP-sw0iMzj0qb0REeQQ8kZveNfxeK_m3V7qyiNqPKaGqyy6rfQTpmuSUHZHw2U4hW" />
                </div>
                <div className="absolute -top-12 -right-12 size-48 bg-primary/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-12 -left-12 size-48 bg-primary/10 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-32 bg-background" id="process">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-24">
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">The Process</span>
              <h2 className="font-serif text-5xl italic">How It Works</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative">
              {/* Connector line */}
              <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-foreground/5 -z-10"></div>

              <div className="p-12 text-center group">
                <div className="size-24 bg-background border border-foreground/5 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:border-primary transition-colors">
                  <span className="font-serif text-3xl">01</span>
                </div>
                <h4 className="text-lg font-bold uppercase tracking-widest mb-4">Curate</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">Select your most impactful pieces and upload them in raw, high-fidelity formats.</p>
              </div>
              <div className="p-12 text-center group">
                <div className="size-24 bg-background border border-foreground/5 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:border-primary transition-colors">
                  <span className="font-serif text-3xl">02</span>
                </div>
                <h4 className="text-lg font-bold uppercase tracking-widest mb-4">Design</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">Choose from editorial layouts that prioritize whitespace and typography over clutter.</p>
              </div>
              <div className="p-12 text-center group">
                <div className="size-24 bg-background border border-foreground/5 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:border-primary transition-colors">
                  <span className="font-serif text-3xl">03</span>
                </div>
                <h4 className="text-lg font-bold uppercase tracking-widest mb-4">Launch</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">Go live with a bespoke domain and invite your select audience to a private viewing.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-32 bg-muted/30 border-y border-foreground/5">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <Quote className="text-primary size-12 opacity-30 mx-auto mb-8" />
            <p className="font-serif text-3xl md:text-4xl italic leading-relaxed mb-12">
              "Pixfolio has completely transformed how I present my work. It’s no longer just a website; it’s a destination that mirrors the prestige of my physical gallery shows."
            </p>
            <div className="flex items-center justify-center gap-4">
              <img alt="Artist" className="size-16 rounded-full object-cover border-2 border-primary" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBR8zr8V0GfmlTHws9L7DgjcrBzOfIzFHY826GeMTPcJ_1rkax2ZldeuA2uu4YzhYK-Zm_HzFP7vHuxHcap8L5g46ZYowvaLfKSOF4yGEDDg7mNUpCPtg9jJ8e6Kj8iLtUvfQSNQniv0P7ZLV-ntBfLaSUc0RgLI_XLphFsS7MGOjcHpDO73MAa66CQ_CnBcmCZn1S6-voa7DbCUHBy2AuRqmbFREuLLOElYehEybiiJ5bhXVJUv37F5aCARK4QvjrXUezViF20fSJA" />
              <div className="text-left">
                <p className="font-bold uppercase tracking-widest text-sm">Amara Kalu</p>
                <p className="text-muted-foreground text-xs uppercase tracking-widest font-medium">Visual Artist & Director</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-32 bg-background" id="pricing">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-24">
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Membership</span>
              <h2 className="font-serif text-5xl italic">Investment in Excellence</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* The Artist */}
              <div className="border border-foreground/5 rounded-2xl p-10 flex flex-col h-full hover:border-primary/30 transition-all group">
                <h3 className="text-xl font-bold uppercase tracking-tighter mb-2">The Artist</h3>
                <p className="text-muted-foreground text-sm mb-8">For individual creators starting their journey.</p>
                <div className="mb-8 flex items-baseline gap-1">
                  <span className="font-serif text-5xl font-bold">$0</span>
                  <span className="text-muted-foreground text-sm font-medium">/mo</span>
                </div>
                <ul className="space-y-4 mb-12 flex-grow text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="text-primary size-5" />
                    Up to 12 curated works
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="text-primary size-5" />
                    Editorial templates
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="text-primary size-5" />
                    Standard analytics
                  </li>
                </ul>
                <button className="w-full py-4 border border-foreground text-foreground rounded-lg text-sm font-bold uppercase tracking-widest group-hover:bg-foreground group-hover:text-background transition-all">
                  Choose Plan
                </button>
              </div>
              {/* The Collector */}
              <div className="bg-foreground text-background rounded-2xl p-10 flex flex-col h-full shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-[0.2em] px-6 py-2 rotate-45 translate-x-10 translate-y-4">
                  Most Selected
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tighter mb-2">The Collector</h3>
                <p className="opacity-40 text-sm mb-8 text-primary font-semibold uppercase tracking-widest">Premium Professional</p>
                <div className="mb-8 flex items-baseline gap-1">
                  <span className="font-serif text-5xl font-bold">$29</span>
                  <span className="opacity-40 text-sm font-medium">/mo</span>
                </div>
                <ul className="space-y-4 mb-12 flex-grow text-sm">
                  <li className="flex items-center gap-2">
                    <BadgeCheck className="text-primary size-5" />
                    Unlimited curated collections
                  </li>
                  <li className="flex items-center gap-2">
                    <BadgeCheck className="text-primary size-5" />
                    Custom Domain with SSL
                  </li>
                  <li className="flex items-center gap-2">
                    <BadgeCheck className="text-primary size-5" />
                    Password Protected Viewing
                  </li>
                  <li className="flex items-center gap-2">
                    <BadgeCheck className="text-primary size-5" />
                    Advanced Engagement Stats
                  </li>
                </ul>
                <button className="w-full py-4 bg-primary text-primary-foreground rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-background hover:text-foreground transition-all">
                  Ascend to Pro
                </button>
              </div>
              {/* The Gallery */}
              <div className="border border-foreground/5 rounded-2xl p-10 flex flex-col h-full hover:border-primary/30 transition-all group">
                <h3 className="text-xl font-bold uppercase tracking-tighter mb-2">The Gallery</h3>
                <p className="text-muted-foreground text-sm mb-8">For studios and collective organizations.</p>
                <div className="mb-8 flex items-baseline gap-1">
                  <span className="font-serif text-5xl font-bold">$99</span>
                  <span className="text-muted-foreground text-sm font-medium">/mo</span>
                </div>
                <ul className="space-y-4 mb-12 flex-grow text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="text-primary size-5" />
                    Multi-Artist Management
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="text-primary size-5" />
                    White-label Interface
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="text-primary size-5" />
                    API Access & Integrations
                  </li>
                </ul>
                <button className="w-full py-4 border border-foreground text-foreground rounded-lg text-sm font-bold uppercase tracking-widest group-hover:bg-foreground group-hover:text-background transition-all">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-40 bg-background text-foreground">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="font-serif text-6xl md:text-8xl mb-12 italic">Your Art Deserves <br /> a Sanctuary.</h2>
            <Link to="/signup" className="bg-primary text-primary-foreground px-16 py-8 rounded-full font-bold text-lg uppercase tracking-[0.2em] shadow-2xl hover:bg-foreground hover:text-background transition-all scale-100 hover:scale-105 inline-block">
              Apply for an Invite
            </Link>
            <p className="mt-12 text-muted-foreground text-sm font-medium uppercase tracking-widest">Limited slots available for the Winter MMXXIV cohort.</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-background/50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2 space-y-6">
              <div className="flex items-center gap-2 text-background">
                <div className="size-6 bg-primary rounded-sm flex items-center justify-center">
                  <LayoutGrid className="size-4 text-primary-foreground" />
                </div>
                <h1 className="text-lg font-bold tracking-tighter uppercase">Pixfolio</h1>
              </div>
              <p className="max-w-xs text-sm leading-relaxed">
                Redefining the digital portfolio for creators who believe that how you present is just as important as what you present.
              </p>
            </div>
            <div>
              <h5 className="text-background text-xs font-bold uppercase tracking-[0.2em] mb-6">Gallery</h5>
              <ul className="space-y-4 text-sm">
                <li><a className="hover:text-primary transition-colors" href="#">Featured Artists</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Showcase</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">The Vault</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Curation Guide</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-background text-xs font-bold uppercase tracking-[0.2em] mb-6">Support</h5>
              <ul className="space-y-4 text-sm">
                <li><a className="hover:text-primary transition-colors" href="#">Membership</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Privacy</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Terms of Exhibit</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/5 pt-10 flex flex-col md:row items-center justify-between gap-6 text-[10px] uppercase tracking-[0.2em] font-bold">
            <p>© MMXXIV Pixfolio International. All Rights Reserved.</p>
            <div className="flex gap-8">
              <a className="hover:text-background transition-colors" href="#">Instagram</a>
              <a className="hover:text-background transition-colors" href="#">Behance</a>
              <a className="hover:text-background transition-colors" href="#">Dribbble</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
