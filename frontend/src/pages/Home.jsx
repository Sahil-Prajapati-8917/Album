
import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo' // Ensuring we reuse the Logo component if compatible, otherwise use SVG from HTML
import { ThemeToggle } from '../components/ThemeToggle'

const Home = () => {
  return (
    <div className="font-['Manrope',sans-serif] bg-pearl dark:bg-black text-charcoal dark:text-white selection:bg-primary/30 min-h-screen transition-colors duration-500">

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-black/5 dark:border-white/5 bg-white/80 dark:bg-black/80 backdrop-blur-md px-6 lg:px-20 py-6 transition-all duration-300">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-5 text-primary">
              <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"></path>
              </svg>
            </div>
            <span className="text-lg font-bold tracking-widest uppercase">Pixfolio</span>
          </div>
          <div className="hidden md:flex items-center gap-12 text-[11px] uppercase tracking-[0.3em] font-medium text-black/60 dark:text-white/60">
            <a className="hover:text-primary transition-colors" href="#gallery">Curated Gallery</a>
            <a className="hover:text-primary transition-colors" href="#features">The Vault</a>
            <Link className="hover:text-primary transition-colors" to="/pricing">Legacy</Link>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link to="/signup" className="px-6 py-2 border border-primary text-primary text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-primary hover:text-black transition-all duration-500">
              Request an Invite
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white dark:from-black dark:via-transparent dark:to-black transition-colors duration-500"></div>
          <div
            className="w-full h-full bg-center bg-cover grayscale"
            data-alt="Dark architectural shadows and high contrast light"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBWUQGZMA-KVvcksyRHScpHIxvQq-cU6ZU77CpyQT7CaMy-YsjMiyzyigQyOxPMpPFOGq2IeXUMbl7oVs4bLgy58RVyKEUP_w7XJcTH06ybgCDxuB553mKQJRqimsIlyvjbA5kvdw7RPHJxmpGoBVyjREbnsANrsSv6hTzpMNCfyNGqev1au8mowSMnl37NnC6E-VZlTEJINsNQB9f5_72mFNhpnHCAVpXyOm1MvLKHhWRxso8moHA3OP3sGIIJNsigEzJOpjesxgTT")' }}
          ></div>
        </div>
        <div className="relative z-10 text-center flex flex-col items-center max-w-4xl">
          <span className="text-primary text-xs uppercase tracking-[0.5em] mb-8 font-medium">Established MMXXIV</span>
          <h1 className="serif-hero text-6xl md:text-9xl font-light mb-8 text-black dark:text-white font-['Times_New_Roman',serif] tracking-tight">
            The Private Vault
          </h1>
          <div className="w-24 h-[1px] bg-primary mb-12"></div>
          <p className="text-black/50 dark:text-white/50 text-base md:text-lg max-w-xl font-light leading-relaxed tracking-wide uppercase text-[12px]">
            Elite portfolio management for the discreet creator. Experience absolute security in an editorial digital sanctuary.
          </p>
          <div className="mt-16 flex flex-col items-center gap-4">
            <span className="material-symbols-outlined text-primary/40 animate-bounce">expand_more</span>
          </div>
        </div>
      </section>

      {/* Features: Cinematic Visual Storytelling */}
      <section className="py-32 px-6 lg:px-20 bg-pearl dark:bg-black transition-colors duration-500" id="features">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row items-end justify-between mb-24 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-light mb-8 tracking-tight text-black dark:text-white">Cinematic Visual <br /><span className="text-primary italic font-serif">Storytelling</span></h2>
              <p className="text-black/40 dark:text-white/40 text-lg leading-relaxed">Every pixel curated to perfection within a limitless canvas. Our architectural spacing ensures your work is not just seen, but felt.</p>
            </div>
            <div className="text-right">
              <p className="text-primary font-bold text-5xl mb-2">01</p>
              <p className="text-[10px] uppercase tracking-[0.3em] text-black/30 dark:text-white/30">Feature Series</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="group cursor-pointer">
              <div className="aspect-[4/5] overflow-hidden mb-6">
                <img className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" data-alt="Minimalist modern architecture in black and white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVahAToRHTIFtwmwGl8y3u9TMTsMDPDz3NwQVvGfEVxwaca2VytJgMtcnKkodc-htX449VsM7VPDAc52gY4_P-FYDf1OC5Lu2c-pmXHHxPSrJrZM35AczVfTkIhl7IqSdaZxf89WeDdCYRbqbpODB4H28qOBNrqp-ZTMNbh2ozY8ZZLxkwufFCXmSTOsFA3p-Ar5532p6Hx9A1PrSaBJ3cUtZNlQKWmADMAdsLe7866Hhz1sNYKvqMOoG5YhT3QLBfSbjQac2eUoai" />
              </div>
              <h3 class="text-xl font-light mb-2 text-black dark:text-white">Immersive Display</h3>
              <p className="text-black/40 dark:text-white/40 text-sm font-light uppercase tracking-widest">Massive high-contrast photography that breathes.</p>
            </div>
            <div className="group pt-24 cursor-pointer">
              <div className="aspect-[4/5] overflow-hidden mb-6">
                <img className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" data-alt="Abstract dark smoke and light textures" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzmcPUKwgZ4IqiFTfrxbpP9CgLaqKq1GOsdNgJp_RGz848i9tZ1BMSQMlPOZR6cHy6MMLI7lDX0nsZ2_x8ps1XTot7uCqY3UKjPsijfRAx29snlL3P0vznda0jvJnshrQGTvlKRpHAjd27USBCCPDDYFiINDlfhqESgyrs7gtVA_hERP6K22CSWXyH-o-CHvgulumh3-uyWcrD24AmyA6bG4DD6BDe2MKDXvk0S1UFJ7hPrjGcpypfGaaavt5nbP8j1BtZJ3IMabnz" />
              </div>
              <h3 className="text-xl font-light mb-2 text-black dark:text-white">Vault Security</h3>
              <p className="text-black/40 dark:text-white/40 text-sm font-light uppercase tracking-widest">Encrypted private galleries for your eyes only.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Showcase Gallery */}
      <section className="py-32 bg-white dark:bg-black overflow-hidden transition-colors duration-500" id="gallery">
        <div className="px-6 lg:px-20 mb-20">
          <h2 className="text-center text-xs uppercase tracking-[0.6em] text-primary mb-4 font-bold">The Signature Showcase</h2>
          <p className="text-center text-black/30 dark:text-white/30 text-sm max-w-lg mx-auto uppercase tracking-widest">A curated grid of exceptional brilliance</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 px-1">
          {/* Gallery Item 1 */}
          <div className="relative aspect-square group overflow-hidden border border-primary/30">
            <img className="w-full h-full object-cover opacity-80 dark:opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110" data-alt="Dark majestic mountain range at night" src="https://lh3.googleusercontent.com/aida-public/AB6AXuATRHF3yFqD4lg3QckAdoAkpNUY0aL-G7uE5vu5b70LS3UEkwCkZSRzixiytmOyu0CeaV3xXbuHbcH4qwq13lm9gbp8LGJkspIto_5sGOGf2fuCmUIzEzVGF9CMulUewm2jULk-hQpqkv0Kg-4p9XN_8rJR5pDDBOzKmOSFyb2an8yhjVxJAbqhnB8uLYRH160KWUgaJcx9GElv4E3fb-QhCooAZP2STv6JsAgRZp7A3h6cr7C5ZQ6Ivtu5f3wKriD370RQs_GU3I5X" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/40">
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold border-b border-primary pb-1 text-white">View Archive</span>
            </div>
          </div>
          {/* Gallery Item 2 */}
          <div className="relative aspect-square group overflow-hidden border border-primary/30">
            <img className="w-full h-full object-cover opacity-80 dark:opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110" data-alt="Dramatic portrait in low light" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-q_XOlG8nOi1uDenJCcN61Cvxw2EwBqvufhChLkQ1s3AvCxnKaZl5-Fyko5n-RlSkvIHI5snra-4kUcAyBxChQPQTJsWJumLZv9PqilgA2VQrfdAy5TrP10u6McPV03mah__uV0sOkNM7GVYiSqmk4kcfMa47i8kVnMmF9noTfYsH68aYGbY6jVVFv1KNny9WnYlVMA4N2vGZDjLhFfc_xhjos3XNXvbRR_FnBQw-Ev8e22yrZHpBpXzIyVsw38u2URbPIm_K7otG" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/40">
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold border-b border-primary pb-1 text-white">View Archive</span>
            </div>
          </div>
          {/* Gallery Item 3 */}
          <div className="relative aspect-square group overflow-hidden border border-primary/30">
            <img className="w-full h-full object-cover opacity-80 dark:opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110" data-alt="Aerial view of foggy pine forest" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCA4AYle8fSY0b5fC23tks7QcIevqbCqtSLi82-DPPHznh9e1vrk19UMnK9IVr2e9dJDrnSW-22VfVXO6ETKp8gwSWg2AMjcOc1_DfnZnw_B9OardXN7aun4_xscF1EFZ9to5vt_LkA8cLk23z4YxYOJMsesSnRq_1YR423dJpKgihUiCw-0PtxFXHayXR67AToha-MTq3I5daAGMdWQBuutz8GYiWlX6rxPz7EDVoO6dPSVGixewGjbnSmkINbrhFL-HJ20gskp3-A" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/40">
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold border-b border-primary pb-1 text-white">View Archive</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 px-6 lg:px-20 bg-pearl dark:bg-[#000000] transition-colors duration-500" id="pricing">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-24">
            <h2 className="serif-hero text-5xl mb-6 text-black dark:text-white font-serif">Tiered Access</h2>
            <div className="w-12 h-[1px] bg-primary mx-auto mb-6"></div>
            <p className="text-black/40 dark:text-white/40 uppercase tracking-[0.2em] text-[11px]">Memberships tailored for the elite creative</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white dark:bg-[#0F0F0F] p-12 border border-black/5 dark:border-white/5 hover:border-primary/40 transition-all duration-500 group">
              <span className="text-primary text-[10px] uppercase tracking-[0.3em] font-bold mb-8 block">Archive</span>
              <h3 className="text-3xl font-light mb-4 text-black dark:text-white">Essential</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-2xl font-light text-primary">$</span>
                <span className="text-5xl font-light text-black dark:text-white">150</span>
                <span className="text-black/30 dark:text-white/30 text-xs uppercase tracking-widest ml-2">/ month</span>
              </div>
              <ul className="space-y-4 mb-12 text-sm text-black/50 dark:text-white/50 font-light">
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[16px] text-primary">check</span> Private Vault Access</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[16px] text-primary">check</span> 50GB Encrypted Storage</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[16px] text-primary">check</span> Editorial Layouts</li>
              </ul>
              <button className="w-full py-4 text-[10px] uppercase tracking-[0.3em] font-bold bg-black/5 dark:bg-white/5 text-black dark:text-white group-hover:bg-primary group-hover:text-black transition-all">Select Tier</button>
            </div>
            {/* Card 2: Featured */}
            <div className="bg-white dark:bg-[#0F0F0F] p-12 border border-primary scale-105 shadow-2xl relative z-10 transition-colors duration-500">
              <div className="absolute top-0 right-0 bg-primary text-black text-[9px] font-black uppercase px-3 py-1 tracking-tighter">Most Exclusive</div>
              <span className="text-primary text-[10px] uppercase tracking-[0.3em] font-bold mb-8 block">Bespoke</span>
              <h3 className="text-3xl font-light mb-4 text-black dark:text-white">Master</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-2xl font-light text-primary">$</span>
                <span className="text-5xl font-light text-black dark:text-white">450</span>
                <span className="text-black/30 dark:text-white/30 text-xs uppercase tracking-widest ml-2">/ month</span>
              </div>
              <ul className="space-y-4 mb-12 text-sm text-black/70 dark:text-white/70 font-light">
                <li className="flex items-center gap-3 text-black dark:text-white"><span className="material-symbols-outlined text-[16px] text-primary">star</span> Unlimited Vault Storage</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[16px] text-primary">check</span> Custom Domain Concierge</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[16px] text-primary">check</span> Priority Archive Support</li>
                <li className="flex items-center gap-3"><span class="material-symbols-outlined text-[16px] text-primary">check</span> Physical Print Integration</li>
              </ul>
              <button className="w-full py-4 text-[10px] uppercase tracking-[0.3em] font-bold bg-primary text-black hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">Request Entry</button>
            </div>
            {/* Card 3 */}
            <div className="bg-white dark:bg-[#0F0F0F] p-12 border border-black/5 dark:border-white/5 hover:border-primary/40 transition-all duration-500 group">
              <span className="text-primary text-[10px] uppercase tracking-[0.3em] font-bold mb-8 block">Legacy</span>
              <h3 className="text-3xl font-light mb-4 text-black dark:text-white">Enterprise</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-2xl font-light text-primary">$</span>
                <span className="text-5xl font-light italic text-black dark:text-white">Quote</span>
              </div>
              <ul className="space-y-4 mb-12 text-sm text-black/50 dark:text-white/50 font-light">
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[16px] text-primary">check</span> Studio Wide Licensing</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[16px] text-primary">check</span> White-glove Onboarding</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[16px] text-primary">check</span> API & Webhook Access</li>
              </ul>
              <button className="w-full py-4 text-[10px] uppercase tracking-[0.3em] font-bold bg-black/5 dark:bg-white/5 text-black dark:text-white group-hover:bg-primary group-hover:text-black transition-all">Consultation</button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-40 px-6 text-center bg-white dark:bg-black relative transition-colors duration-500">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="serif-hero text-4xl md:text-7xl mb-12 leading-tight text-black dark:text-white font-serif">Elevate Your Presence <br />Beyond The Noise</h2>
          <p className="text-black/40 dark:text-white/40 mb-12 uppercase tracking-[0.3em] text-[12px] font-light">Membership is strictly limited to maintain infrastructure integrity.</p>
          <button className="px-12 py-5 bg-transparent border-2 border-primary text-primary text-xs uppercase tracking-[0.5em] font-black hover:bg-primary hover:text-black transition-all duration-700 hover:shadow-[0_0_30px_rgba(198,166,93,0.3)]">
            Request an Invite
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 lg:px-20 border-t border-black/5 dark:border-white/5 bg-white dark:bg-black transition-colors duration-500">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="size-4 text-primary">
                <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"></path>
                </svg>
              </div>
              <span className="text-lg font-bold tracking-widest uppercase text-black dark:text-white">Pixfolio</span>
            </div>
            <p className="text-black/30 dark:text-white/30 text-xs leading-loose max-w-sm uppercase tracking-widest">
              The standard in editorial portfolio presentation. Designed for the few who value silence as much as beauty.
            </p>
          </div>
          <div>
            <h4 className="text-black dark:text-white text-[10px] uppercase tracking-[0.4em] mb-8 font-bold">Inquiries</h4>
            <ul className="text-black/40 dark:text-white/40 text-xs space-y-4 tracking-widest uppercase">
              <li><a className="hover:text-primary transition-colors" href="#">Support</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Press Kit</a></li>
              <li><a class="hover:text-primary transition-colors" href="#">Partner</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-black dark:text-white text-[10px] uppercase tracking-[0.4em] mb-8 font-bold">Connect</h4>
            <ul className="text-black/40 dark:text-white/40 text-xs space-y-4 tracking-widest uppercase">
              <li><a className="hover:text-primary transition-colors" href="#">Instagram</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Behance</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Journal</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto mt-20 pt-10 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] text-black/20 dark:text-white/20 uppercase tracking-[0.4em]">© 2024 Pixfolio Digital Sanctuary. All rights reserved.</p>
          <div className="flex gap-8 text-[9px] text-black/20 dark:text-white/20 uppercase tracking-[0.4em]">
            <a className="hover:text-black dark:hover:text-white transition-colors" href="#">Privacy</a>
            <a className="hover:text-black dark:hover:text-white transition-colors" href="#">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
