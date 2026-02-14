import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="bg-pearl dark:bg-ebony font-display text-[#181611] dark:text-white antialiased">

      <main>
        {/* Hero Section */}
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              className="w-full h-full object-cover brightness-75"
              alt="Cinematic wide shot of a luxury wedding couple in a garden"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAB64lDSZsw3WxzXesUPtwaXgCF14hh5mVZWYM0aES1VoK8hELiMDd82tsSoCui7Q1vJ5LJGlNZ6sEPrXiFB-Bpu8a3IBzHie8RuSb8K5rIZpDYtALPVhWgr6Bq8j1OC2o9XIfI-8zEV1MbNk31GExy_1vPIsuvVxkgA54psTFTSSk60MZAp_EfGUqc23NicsMzBW1zC5_Pfl4hTDNga-JWP4PLeMdxjO0-XvgRfJ7Vg23EzK13l9dIYX0d_PjN0fl8gSFsN3s5CCEG"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-pearl/20"></div>
          </div>
          <div className="relative z-10 text-center px-4 max-w-4xl">
            <h1 className="text-white text-5xl md:text-7xl font-serif leading-tight mb-8">
              Capturing the <span className="italic">Soul</span> of Every Moment
            </h1>
            <p className="text-white/90 text-lg md:text-xl font-light mb-10 max-w-2xl mx-auto leading-relaxed">
              Create stunning, interactive visual books from your photo collections. Discover an unobtrusive artistry that preserves your most precious memories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/demo" className="bg-gold text-white px-10 py-4 rounded-lg font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-xl">
                View Our Portfolio
              </Link>
              <Link to="/zoom-parallax-demo" className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-white/20 transition-all text-center">
                The Experience
              </Link>
            </div>
          </div>
        </section>

        {/* The Pixfolio Difference */}
        <section className="py-32 px-6 md:px-20 bg-pearl dark:bg-ebony">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <span className="text-gold font-bold uppercase tracking-[0.3em] text-xs block mb-4">Exclusivity</span>
              <h2 className="text-4xl md:text-5xl font-serif mb-6 text-[#181611] dark:text-white">The Pixfolio Difference</h2>
              <div className="w-24 h-px bg-gold mx-auto mb-8"></div>
              <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                We provide a bespoke experience tailored to your unique love story, focusing on luxury, artistry, and discretion.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Benefit 1 */}
              <div className="group p-8 rounded-xl border border-gold/10 bg-white dark:bg-[#2a261d] hover:border-gold/40 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                <div className="mb-6 text-gold group-hover:scale-110 transition-transform inline-block">
                  <span className="material-symbols-outlined text-4xl">movie</span>
                </div>
                <h3 className="text-xl font-serif mb-4 text-[#181611] dark:text-white">Cinematic Storytelling</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-light">
                  We craft a visual narrative that captures the raw emotion and cinematic beauty of your wedding day, using techniques inspired by grand cinema.
                </p>
              </div>
              {/* Benefit 2 */}
              <div className="group p-8 rounded-xl border border-gold/10 bg-white dark:bg-[#2a261d] hover:border-gold/40 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                <div className="mb-6 text-gold group-hover:scale-110 transition-transform inline-block">
                  <span className="material-symbols-outlined text-4xl">visibility_off</span>
                </div>
                <h3 className="text-xl font-serif mb-4 text-[#181611] dark:text-white">Unobtrusive Artistry</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-light">
                  Our photographers move like shadows, capturing authentic moments without ever interrupting the flow of your celebration.
                </p>
              </div>
              {/* Benefit 3 */}
              <div className="group p-8 rounded-xl border border-gold/10 bg-white dark:bg-[#2a261d] hover:border-gold/40 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                <div className="mb-6 text-gold group-hover:scale-110 transition-transform inline-block">
                  <span className="material-symbols-outlined text-4xl">auto_stories</span>
                </div>
                <h3 className="text-xl font-serif mb-4 text-[#181611] dark:text-white">Bespoke Art Albums</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-light">
                  Your memories deserve more than a digital screen. We create handcrafted, heirloom-quality albums made by master artisans.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Exquisite Albums Showcase */}
        <section className="py-32 bg-white dark:bg-[#15130e] overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-20">
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
              <div className="max-w-2xl">
                <span className="text-gold font-bold uppercase tracking-[0.3em] text-xs block mb-4">The Heirloom</span>
                <h2 className="text-4xl md:text-5xl font-serif text-[#181611] dark:text-white">Exquisite Albums</h2>
                <p className="mt-6 text-gray-500 dark:text-gray-400 text-lg font-light leading-relaxed">
                  Hand-bound in Italy with the finest leathers and silks. Our albums are designed to be passed down through generations—a tactile portal to your most cherished day.
                </p>
              </div>
              <Link to="/dashboard/pixfolio" className="border-b-2 border-gold text-gold pb-1 font-bold uppercase tracking-widest text-sm hover:text-gold/80 hover:border-gold/80 transition-all">
                Discover the Collection
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative group aspect-[4/3] overflow-hidden rounded-xl">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt="Luxury handcrafted leather wedding album on a marble table"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCn5WAW2NV6Ht9eRz6kwL4yfKVSLrcWxRWDlTjWRjbpETDX8EftQFRF8S7uOnN_EZk6gjRJE-8Nw0zH58FO_uFh5UX2sW5tkXYTmoe-jspHT9uhV6fQ2aOc9dsS59O73VGk08-yeCrtBf-9_W8rZl73WmTBHBuBpPVEs3w38GaYApz5mtjU0emf9vXAalWETTGLEcGb2RcfAi_RJRy-tU42hTx957AYFtLKEIe5byN5ssgh2d0AoT9ArT7GxNbAH8JhEypb3KAVIBzx"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Link to="/viewer/demo" className="text-white border border-white/40 px-6 py-2 rounded-full backdrop-blur-sm">View Details</Link>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-8">
                <div className="relative group aspect-[16/9] overflow-hidden rounded-xl">
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt="Close up of high quality paper and printing in a wedding album"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAeUNyBEY6wUulz9qunSOa_VhdBr_9LH6_MbDr8KfMW7CRWcn6mxjmMmbLpPt-lIyGJjEyoJ1wkmhmwqyUgOMc7IMw3dfRBZ4UVHGXP3pHxwmNDHndLRiWoNiNIua5HaabOs1h56PsFHyIdFJQnoKNkre2W8Nzt4uWqNwU7nCLFNg2lRSg5OOcI71o956xXOkMWzOGXpxppNDwRYq_Qhbcl4A6n7A21OeXGivxhTECc2261h2Hefl9iTnuZtV4kpQpS1Q6HwRLLMsq"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white border border-white/40 px-6 py-2 rounded-full backdrop-blur-sm">Our Paper Types</span>
                  </div>
                </div>
                <div className="relative group aspect-[16/9] overflow-hidden rounded-xl">
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt="A couple looking at their wedding album together"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAujLTg2-sKEvEQoUuEFwBd6_zPLGEhMUoE3Ofo-BRdKOXnMHr0FdchNlMBf1a7wcPQbaEvHl_FVe5Ss0DABf2OzObOj-Grf7pF_Qc0NWP-eIkOBum7skXNveEi0FQtrQHmsIl_byhWyo-kOzdxTNhmscepG2vzpJ4xwZKDwPGS2eJKVzBpGxb8xe-ROMj-8IsASYDtSCveHLsUwNynCSP32ONfTeeFDCTj86AbOvW3nG4Nn3sdqe-4oSJJLif1OhGa0bFKYRtzAM-"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white border border-white/40 px-6 py-2 rounded-full backdrop-blur-sm">The Presentation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-24 px-6 md:px-20 bg-pearl dark:bg-ebony text-center">
          <div className="max-w-4xl mx-auto">
            <span className="material-symbols-outlined text-gold text-5xl mb-8">format_quote</span>
            <p className="text-2xl md:text-3xl font-serif italic text-[#181611] dark:text-white leading-snug mb-8">
              "Pixfolio didn't just take photos; they captured the invisible threads of emotion that wove our day together. Looking through our album feels like reliving the magic all over again."
            </p>
            <div className="flex flex-col items-center">
              <div className="w-12 h-px bg-gold mb-4"></div>
              <span className="uppercase tracking-[0.2em] font-bold text-sm">Eleanor & Julian</span>
              <span className="text-xs text-gray-500 uppercase tracking-widest mt-1">Lake Como, Italy</span>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6 md:px-20">
          <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden relative min-h-[400px] flex items-center justify-center text-center">
            <img
              className="absolute inset-0 w-full h-full object-cover brightness-50"
              alt="Abstract soft focus of wedding flowers and lights"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDM2FW4sHWSfHkW9jPYhLgXwsd3pnLfdAbYhH6JpPMb2LlU3e-VLn_o5wrbK1yqTOrb8j8huSRGqsV9-Xf0tNCkfGR7s5sBFToZ2g1r_jYB6IwXOt2aSdGkH1Cos6MHE9nwyEhpyfXI_-EWrH4jIGi3YVvitFpULGplu0jlvK1eEh5-4h7VlV724sJLBTctonvem8Zgo0evqKQ9I4Zbsk3C6t59VNOuC6W7QuNnl2FSiEkzs-W8orpC-zoW7C_2TS7i0B8aRLzCuM50"
            />
            <div className="relative z-10 px-6">
              <h2 className="text-4xl md:text-6xl font-serif text-white mb-8">Begin Your Story With Us</h2>
              <p className="text-white/80 max-w-xl mx-auto mb-10 text-lg font-light">
                Our 2024 calendar is filling quickly. Reach out today to secure your date and discuss your vision.
              </p>
              <Link to="/signup" className="bg-gold text-white px-12 py-5 rounded-lg font-bold uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-2xl">
                Join Now
              </Link>
            </div>
          </div>
        </section>
      </main>

    </div>
  )
}

export default Home
