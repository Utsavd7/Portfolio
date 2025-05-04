"use client"

import { motion } from "framer-motion"
import { Code } from "lucide-react"

export function AboutSection() {
  return (
    <section
      id="about"
      className="min-h-screen w-full flex flex-col justify-center px-8 md:px-16 lg:px-32 py-24 bg-gradient-to-b from-black/40 to-black/60 backdrop-blur-sm"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 px-4 py-2 rounded-full mb-4">
            <Code className="h-4 w-4 text-blue-400" />
            <span className="text-blue-400 text-sm font-medium">About</span>
          </div>
          <h3 className="text-3xl md:text-5xl font-light mb-12">My Background</h3>
          <div className="space-y-8 text-white/80">
            <p className="text-lg leading-relaxed">
              👋 Hi, I'm Utsav Doshi — a Computer Science graduate student at NYU, driven by a passion for Software, AI,
              ML, Finance, and Entrepreneurship. From developing self-driving car perception systems to GAN-based image
              translation models, I love turning complex ideas into impactful, real-world solutions through code and
              innovation. My work blends deep technical expertise with a curiosity for how systems shape industries.
            </p>
            <p className="text-lg leading-relaxed">
              💡 As I dive deeper into the world of finance, I'm bridging Software with financial/legal systems through
              coursework at NYU Stern, including Foundations of FinTech. I'm especially interested in AI-driven fintech,
              quantitative trading, and algorithmic innovations that push the boundaries of what's possible in modern
              finance. This unique intersection allows me to tackle financial challenges with a data-driven, innovative
              mindset.
            </p>
            <p className="text-lg leading-relaxed">
              🚀 Whether it's building intelligent systems, exploring startup ideas, or tackling real-time data
              challenges, I'm always seeking collaborative opportunities that blend deep tech with strategic thinking. I
              thrive in fast-paced, cross-functional environments where technology meets business impact. Let's connect
              and build something that makes a difference.
            </p>

            <div className="pt-8">
              <div className="inline-flex items-center p-1 px-2 bg-white/5 rounded-md border border-white/10">
                <span className="text-blue-400 font-mono text-xs mr-2">$</span>
                <span className="text-white/90 font-mono text-xs">learn more --about utsavdoshi</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
