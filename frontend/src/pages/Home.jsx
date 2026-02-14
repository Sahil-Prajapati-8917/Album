import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ThemeToggle } from '../components/ThemeToggle'

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
    <div className="font-sans min-h-screen bg-background text-foreground selection:bg-primary/20 transition-colors duration-300">

      {/* Navigation - Sticky, minimal */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled ? 'bg-background/80 backdrop-blur-md border-border' : 'bg-transparent border-transparent'}`}>
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-6 bg-foreground text-background flex items-center justify-center rounded-[4px]">
              <span className="font-serif font-bold text-sm">P</span>
            </div>
            <span className="font-bold text-sm tracking-tight">Pixfolio</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground/70">
            <a href="#product" className="hover:text-foreground transition-colors">Product</a>
            <a href="#showcase" className="hover:text-foreground transition-colors">Showcase</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="h-4 w-[1px] bg-border hidden sm:block"></div>
            <Link to="/login" className="hidden sm:block text-sm font-medium hover:text-primary transition-colors">Log in</Link>
            <Link to="/signup" className="bg-foreground text-background px-4 py-2 rounded-[4px] text-sm font-medium hover:opacity-90 transition-opacity">
              Get Pixfolio free
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20">

        {/* Hero Section - Notion Style: Left Aligned, Plain */}
        <section className="max-w-[1200px] mx-auto px-6 mb-32 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="space-y-8">
            {/* Product Statement */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] text-foreground">
              Your portfolio, <br />
              <span className="text-primary">reimagined.</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/60 leading-relaxed max-w-lg font-medium">
              The all-in-one workspace for your creative legacy. Curate, manage, and showcase your work with architectural precision.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link to="/signup" className="inline-flex items-center justify-center h-12 px-8 rounded-[4px] bg-primary text-white font-semibold text-lg hover:bg-primary/90 transition-all">
                Start your gallery
              </Link>
              <Link to="#showcase" className="inline-flex items-center justify-center h-12 px-8 rounded-[4px] bg-secondary text-secondary-foreground font-semibold text-lg hover:bg-secondary/80 transition-all">
                View showcase
              </Link>
            </div>

            <div className="pt-8 text-sm text-foreground/40 font-medium">
              Trusted by visual artists from 140+ countries
            </div>
          </div>

          {/* Right-side Product Visual */}
          <div className="relative">
            <div className="border border-border shadow-2xl rounded-lg overflow-hidden bg-card">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqguRwf9gP4L7wjPbX8CHz0c7R0DG0bjBW2eQvn8aTvlxyvvvADs4E0G3L6eZ6_9bYq93z2cpqwLnZ55akn7cXoQygYpfGkrkzqd0EzGDjGk5anDSMaSOHvkGcabIyZ6Y3IroK1s_d6dzla8C844yn8UrZxFQ6gpYz2TgUF3GwYRzmD_yUsGILGSsAdJp1jSeRAwzfsAuzQkXJP-sw0iMzj0qb0REeQQ8kZveNfxeK_m3V7qyiNqPKaGqyy6rfQTpmuSUHZHw2U4hW"
                alt="Pixfolio Dashboard Interface"
                className="w-full h-auto block dark:opacity-90"
              />
            </div>
            {/* Decorative Elements - Subtle */}
            <div className="absolute -z-10 top-12 -right-12 w-64 h-64 bg-primary/20 rounded-full blur-[100px]"></div>
          </div>
        </section>

        {/* Product Explanation Section */}
        <section className="max-w-[1000px] mx-auto px-6 mb-32 text-center" id="product">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Millions run on Pixfolio every day.</h2>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto mb-16">
            Powering everything from freelance portfolios to agency archives. A reliable, fast, and structured home for your creativity.
          </p>

          {/* Feature Grid - Strictly Grid, Icon + Text */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-6 bg-secondary/50 rounded-lg border border-transparent hover:border-primary/20 transition-colors">
              <span className="material-symbols-outlined text-3xl mb-4 text-primary">grid_view</span>
              <h3 className="text-lg font-bold mb-2">Wiki-like Organization</h3>
              <p className="text-foreground/70 leading-relaxed">Everything is an album. Nest albums inside albums. Structure your archive exactly how you think.</p>
            </div>
            <div className="p-6 bg-secondary/50 rounded-lg border border-transparent hover:border-primary/20 transition-colors">
              <span className="material-symbols-outlined text-3xl mb-4 text-primary">bolt</span>
              <h3 className="text-lg font-bold mb-2">Lightning Fast</h3>
              <p className="text-foreground/70 leading-relaxed">Built for speed. No lag, no loaders. Your high-res assets load instantly, global CDN included.</p>
            </div>
            <div className="p-6 bg-secondary/50 rounded-lg border border-transparent hover:border-primary/20 transition-colors">
              <span className="material-symbols-outlined text-3xl mb-4 text-primary">lock_open</span>
              <h3 className="text-lg font-bold mb-2">Private by Default</h3>
              <p className="text-foreground/70 leading-relaxed">Share only what you want. Create password-protected links for clients or public galleries for fans.</p>
            </div>
            <div className="p-6 bg-secondary/50 rounded-lg border border-transparent hover:border-primary/20 transition-colors">
              <span className="material-symbols-outlined text-3xl mb-4 text-primary">edit_note</span>
              <h3 className="text-lg font-bold mb-2">Contextual Notes</h3>
              <p className="text-foreground/70 leading-relaxed">Add stories, technical details, or license info right next to your images. Context matters.</p>
            </div>
            <div className="p-6 bg-secondary/50 rounded-lg border border-transparent hover:border-primary/20 transition-colors">
              <span className="material-symbols-outlined text-3xl mb-4 text-primary">extension</span>
              <h3 className="text-lg font-bold mb-2">Custom Domains</h3>
              <p className="text-foreground/70 leading-relaxed">Map your own domain in seconds. SSL included. Your brand, front and center.</p>
            </div>
            <div className="p-6 bg-secondary/50 rounded-lg border border-transparent hover:border-primary/20 transition-colors">
              <span className="material-symbols-outlined text-3xl mb-4 text-primary">analytics</span>
              <h3 className="text-lg font-bold mb-2">Audience Analytics</h3>
              <p className="text-foreground/70 leading-relaxed">Know who is viewing your work. Track engagement, location, and most popular pieces.</p>
            </div>
          </div>
        </section>

        {/* Visual Showcase - Large Blocks */}
        <section className="bg-foreground text-background py-32" id="showcase">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="mb-20">
              {/* Notion-style divider */}
              <div className="w-12 h-1 bg-primary mb-8"></div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Curated workflows.</h2>
              <p className="text-xl text-background/70 max-w-2xl">
                Don't just store images. Create a narrative. Pixfolio adapts to your specific needs.
              </p>
            </div>

            <div className="space-y-32">
              {/* Block 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="order-2 md:order-1">
                  <div className="aspect-[4/3] bg-background/10 rounded-lg overflow-hidden border border-background/20 relative group">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1bSHLUNou_gzHknhGVdyyfwySQoGW7DpIx1AkwjSGjpgr_MYxxVjGtZUgXywL8G8atq8HUcw1tIA_BIcYj2SgotvOItFllBFVV0h1nm4ceMz68O5g0Foa206pUAjMDlpgD90muPKgz11EOUIi45mlzphcWdR_HcttMhpg9YfC809ZogsOVNungFBAqLI30MyeFfTSAcQtRAFnPJLfQAO2OXBM5Tx1ti-KAc53mTllMtXPjQY3PGR8A4THLgUK64b6DWNrrUuLHTLc"
                      alt="Project Management"
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">For Freelancers</span>
                  <h3 className="text-3xl font-bold mb-4">Client Proofing made simple.</h3>
                  <p className="text-lg text-background/60 leading-relaxed mb-8">
                    Create private collections for clients. Let them select favorites, leave comments, and approve edits directly on the image. No more email chains.
                  </p>
                  <Link to="/signup" className="text-primary font-medium hover:underline flex items-center gap-1">
                    Try Client Proofing <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>

              {/* Block 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div>
                  <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">For Studios</span>
                  <h3 className="text-3xl font-bold mb-4">Centralized Asset Library.</h3>
                  <p className="text-lg text-background/60 leading-relaxed mb-8">
                    Tag, filter, and search your entire history. Give your team access with granular permissions. Keep your brand assets consistent.
                  </p>
                  <Link to="/signup" className="text-primary font-medium hover:underline flex items-center gap-1">
                    Explore Team Features <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
                <div>
                  <div className="aspect-[4/3] bg-background/10 rounded-lg overflow-hidden border border-background/20 relative group">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7Ysx9q0HSaxg8C0Mxc2EtspjzZEeiIF36v2ngmpWRwEEdq3RSPevKeqGU6ROknl_IR-jz1_El-9GeqLo7vmefUWl6hNvNcJxr9zS1125gWRHEVDPmf9qaQ2T5luHesGPYpYQIcB8o36_mm6gC60q6qom6s5-q_kNqZvmJSt5k_t4nki-rNA-ct7P9Xz3DVXraKl5rUec8JIw8kCBTWfDEFnmyuDC61ysLJAAKWTgcWnGpytOhuzZnPt3t-z1_HZypLTnpKuERYzPL"
                      alt="Asset Management"
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quote / Testimonial */}
        <section className="py-32 px-6 text-center border-b border-border">
          <div className="max-w-4xl mx-auto">
            <span className="text-6xl text-primary font-serif">"</span>
            <h2 className="text-3xl md:text-5xl font-serif italic mb-8 leading-tight">
              Pixfolio gave us the structure we needed to scale from a solo operation to a full-service agency. It's the brain of our visual operations.
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="size-12 rounded-full bg-secondary flex items-center justify-center font-bold text-lg">
                AK
              </div>
              <div className="text-left">
                <div className="font-bold">Amara Kalu</div>
                <div className="text-sm text-foreground/60">Creative Director, Kalu Studios</div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-32 px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">Get started for free.</h2>
          <p className="text-xl text-foreground/60 mb-12">Play with it first. Pay only when you need the power features.</p>
          <div className="flex gap-4 justify-center">
            <Link to="/signup" className="h-12 px-8 rounded-[4px] bg-primary text-white font-semibold text-lg hover:bg-primary/90 transition-all flex items-center">
              Try Pixfolio free
            </Link>
            <Link to="/login" className="h-12 px-8 rounded-[4px] bg-transparent text-primary font-semibold text-lg hover:bg-secondary transition-all flex items-center">
              Request a demo
            </Link>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border bg-secondary/30 text-sm">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="size-5 bg-foreground text-background flex items-center justify-center rounded-[3px]">
                <span className="font-serif font-bold text-xs">P</span>
              </div>
              <span className="font-bold tracking-tight">Pixfolio</span>
            </div>
            <p className="text-foreground/50 max-w-xs mb-4">
              The digital sanctuary for modern creators.
            </p>
            <div className="text-foreground/40">
              © 2024 Pixfolio Inc.
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-foreground/60">
              <li><a href="#" className="hover:text-primary">Showcase</a></li>
              <li><a href="#" className="hover:text-primary">Pricing</a></li>
              <li><a href="#" className="hover:text-primary">Enterprise</a></li>
              <li><a href="#" className="hover:text-primary">Affiliates</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-foreground/60">
              <li><a href="#" className="hover:text-primary">About</a></li>
              <li><a href="#" className="hover:text-primary">Careers</a></li>
              <li><a href="#" className="hover:text-primary">Legal</a></li>
              <li><a href="#" className="hover:text-primary">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-foreground/60">
              <li><a href="#" className="hover:text-primary">Community</a></li>
              <li><a href="#" className="hover:text-primary">Help Center</a></li>
              <li><a href="#" className="hover:text-primary">API Docs</a></li>
              <li><a href="#" className="hover:text-primary">Status</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
