import { motion } from 'framer-motion'
import { ShieldCheck, Sparkles, Car } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen bg-canvas text-textPrimary flex flex-col items-center justify-center p-6 selection:bg-cobalt selection:text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full text-center space-y-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-cyan text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Aura Auto Atelier</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight text-textPrimary">
          High-End Vehicle Aesthetics &amp; Protection
        </h1>

        <p className="text-textSecondary text-base md:text-lg max-w-lg mx-auto font-body">
          Bootstrap &amp; design tokens verified. Ready for next phases of luxury automotive detailing &amp; booking experience.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-left">
          <div className="p-5 rounded-xl bg-surface border border-borderSubtle hover:border-borderHighlight transition-colors group">
            <ShieldCheck className="w-6 h-6 text-cyan mb-2 group-hover:scale-110 transition-transform" />
            <h3 className="font-display font-bold text-textPrimary">Tailwind v3 Configured</h3>
            <p className="text-sm text-textMuted mt-1">Design tokens, colors, custom scrollbars, and Syne/Jakarta fonts active.</p>
          </div>
          <div className="p-5 rounded-xl bg-surface border border-borderSubtle hover:border-borderHighlight transition-colors group">
            <Car className="w-6 h-6 text-cobalt mb-2 group-hover:scale-110 transition-transform" />
            <h3 className="font-display font-bold text-textPrimary">Motion &amp; Icons Ready</h3>
            <p className="text-sm text-textMuted mt-1">Framer Motion, Lucide React, and clsx/tailwind-merge ready for components.</p>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="button"
            className="px-6 py-3 rounded-lg bg-cobalt hover:bg-cobaltHover text-white font-medium transition-colors shadow-lg shadow-cobalt/25 inline-flex items-center gap-2"
          >
            Explore Services
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default App
