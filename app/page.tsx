"use client"

import { Suspense, useRef, useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, ScrollControls, Scroll } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ArrowRight, FileText, Download } from "lucide-react"

// Import our new components
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { MoreSection } from "@/components/more-section"
import { Scene } from "@/components/scene"

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const isMobile = useMobile()
  // Updated sections to reduce scrolling
  const sections = [
    "home",
    "about",
    "skills",
    "experience",
    "education",
    "projects",
    "more", // Combined section for honors, organizations, certifications
    "contact",
  ]
  const [activeSection, setActiveSection] = useState("home")
  const [scrollProgress, setScrollProgress] = useState(0)
  const [viewingResume, setViewingResume] = useState(false)

  // Refs for each section
  const sectionRefs = useRef({})

  useEffect(() => {
    // Initialize refs for each section
    sections.forEach((section) => {
      sectionRefs.current[section] = document.getElementById(section)
    })

    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight

      // Calculate scroll progress percentage
      setScrollProgress(scrollPosition / documentHeight)

      // Determine which section is currently in view
      const currentSection = sections.find((section) => {
        const sectionElement = sectionRefs.current[section]
        if (!sectionElement) return false

        const sectionTop = sectionElement.offsetTop
        const sectionBottom = sectionTop + sectionElement.offsetHeight

        // Check if the section is in view
        return scrollPosition >= sectionTop - windowHeight / 3 && scrollPosition < sectionBottom - windowHeight / 3
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections])

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      })
    }
    setMenuOpen(false)
  }

  return (
    <main className="relative bg-[#050505] text-white">
      {/* 3D Canvas (Fixed Background) */}
      <div className="fixed top-0 left-0 h-full w-full">
        <Canvas dpr={[1, 2]}>
          <Suspense fallback={null}>
            <ScrollControls pages={8} damping={0.2}>
              <Scene activeSection={activeSection} isMobile={isMobile} scrollProgress={scrollProgress} />
              <Scroll html>
                <div className="w-screen">{/* Content will be rendered in the HTML sections below */}</div>
              </Scroll>
            </ScrollControls>
            <Environment preset="night" />
          </Suspense>
        </Canvas>
      </div>

      {/* Resume Modal */}
      <AnimatePresence>
        {viewingResume && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={() => setViewingResume(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-white text-black w-full max-w-4xl max-h-[90vh] rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Resume - Utsav Doshi</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewingResume(false)}
                  className="text-gray-500 hover:text-gray-800"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="p-6 overflow-auto max-h-[calc(90vh-60px)]">
                {/* Resume content would go here */}
                <div className="space-y-6">
                  <section>
                    <h3 className="text-lg font-semibold mb-3 text-blue-600">Professional Summary</h3>
                    <p className="text-gray-700">
                      Computer Science graduate student at NYU with expertise in AI, ML, and software development.
                      Passionate about the intersection of technology, finance, and entrepreneurship.
                    </p>
                  </section>

                  {/* Other resume sections would go here */}
                </div>
              </div>
              <div className="border-t border-gray-200 px-6 py-4 flex justify-between">
                <Button variant="outline" onClick={() => setViewingResume(false)} className="text-gray-700">
                  Close
                </Button>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={(e) => e.preventDefault()}>
                  <span className="flex items-center">
                    Download PDF
                    <Download className="ml-2 h-4 w-4" />
                  </span>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/10 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-300"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 w-full z-40 px-8 md:px-16 py-6 flex justify-between items-center backdrop-blur-md bg-gradient-to-b from-black/40 to-black/20"
      >
        <motion.div
          className="font-light text-xl tracking-wider"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <a href="#home" onClick={() => scrollToSection("home")} className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
              <div className="w-4 h-4 rounded-full bg-blue-400"></div>
            </div>
            <span className="font-medium">Utsav</span>Doshi
          </a>
        </motion.div>
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white hover:bg-white/10"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden absolute top-20 right-0 w-full bg-black/90 backdrop-blur-md p-4 border-t border-white/10 z-40"
            >
              {sections.map((section) => (
                <motion.a
                  key={section}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                  href={`#${section}`}
                  onClick={() => scrollToSection(section)}
                  className={`block py-4 px-8 capitalize ${
                    activeSection === section ? "text-blue-400" : "text-white/70"
                  } hover:text-blue-400 transition-colors`}
                >
                  {section}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="hidden md:flex gap-10">
          {sections.map((section) => (
            <motion.a
              key={section}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              href={`#${section}`}
              onClick={(e) => {
                e.preventDefault()
                scrollToSection(section)
              }}
              className={`capitalize text-sm tracking-wide ${
                activeSection === section ? "text-blue-400" : "text-white/70"
              } hover:text-blue-400 transition-colors relative group`}
            >
              {section}
              <span
                className={`absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300 ${
                  activeSection === section ? "w-full" : ""
                }`}
              ></span>
            </motion.a>
          ))}
        </div>
      </motion.nav>

      {/* Content Sections */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section id="home" className="min-h-screen w-full flex flex-col px-8 md:px-16 lg:px-32">
          <div className="container pt-32 md:pt-36 lg:pt-40 flex-grow flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-4xl"
            >
              <div className="inline-block bg-blue-500/10 px-4 py-2 rounded-full mb-6">
                <span className="text-blue-400 text-sm font-medium">AI & Finance Expert</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-8">
                <span className="block">Exploring the intersection of</span>
                <span className="text-blue-400 font-medium block mt-3">AI, Finance & Entrepreneurship</span>
              </h1>
              <p className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed">
                With a strong foundation in AI/ML research, software development, and fintech, I thrive on solving
                real-world challenges through technology and innovation.
              </p>
              <motion.div
                className="mt-12 flex flex-wrap gap-5 relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                style={{ zIndex: 50 }}
              >
                <Button
                  className="group relative overflow-hidden bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 rounded-md"
                  onClick={() => scrollToSection("projects")}
                >
                  <span className="relative z-10 flex items-center text-base">
                    View Projects
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Button>
                <Button
                  variant="outline"
                  className="group relative overflow-hidden border-blue-400 text-blue-400 hover:text-blue-300 hover:border-blue-300 px-8 py-6 rounded-md"
                  onClick={() => setViewingResume(true)}
                >
                  <span className="relative z-10 flex items-center text-base">
                    View Resume
                    <FileText className="ml-2 h-4 w-4" />
                  </span>
                  <span className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <AboutSection />

        {/* Skills Section */}
        <SkillsSection />

        {/* Experience Section */}
        <section
          id="experience"
          className="min-h-screen w-full flex flex-col justify-center px-8 md:px-16 lg:px-32 py-24 bg-gradient-to-b from-black/40 to-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-5xl mx-auto"
          >
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 px-4 py-2 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-line-chart h-4 w-4 text-blue-400"
              >
                <path d="M3 3v18h18" />
                <path d="m19 9-5 5-4-4-3 3L3 11" />
              </svg>
              <span className="text-blue-400 text-sm font-medium">Experience</span>
            </div>
            <h3 className="text-3xl md:text-5xl font-light mb-16">Professional Journey</h3>
            <div className="space-y-16">
              <motion.div
                className="relative"
                whileInView={{ opacity: [0, 1], x: [-20, 0] }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue-400/30 to-transparent"></div>
                <div className="absolute left-0 top-0 w-3 h-3 rounded-full bg-blue-400 -translate-x-1/2"></div>
                <div className="ml-12">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h4 className="text-2xl font-medium">McKinsey Forward Mentorship</h4>
                    <p className="text-blue-400 text-sm mt-2 md:mt-0 md:bg-blue-500/10 md:py-1 md:px-3 md:rounded-full">
                      Apr 2025 - Present
                    </p>
                  </div>
                  <p className="text-white text-lg mb-6">McKinsey & Company · Remote</p>
                  <div className="text-white/70 leading-relaxed max-w-3xl space-y-4">
                    <ul className="list-disc list-inside space-y-2">
                      <li>
                        Currently engaged in a 10-week program collaborating with a global cohort of professionals
                        guided by McKinsey & Company.
                      </li>
                      <li>
                        Enhancing adaptability and teamwork through collaborative exercises, applying theoretical
                        concepts to practical, workplace-relevant scenarios.
                      </li>
                    </ul>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <span className="px-3 py-1 bg-blue-500/10 text-blue-300 rounded-full text-xs">
                        Structured Problem Solving
                      </span>
                      <span className="px-3 py-1 bg-blue-500/10 text-blue-300 rounded-full text-xs">
                        Business Model Innovation
                      </span>
                      <span className="px-3 py-1 bg-blue-500/10 text-blue-300 rounded-full text-xs">
                        Digital & Data Fluency
                      </span>
                      <span className="px-3 py-1 bg-blue-500/10 text-blue-300 rounded-full text-xs">
                        Strategic Thinking
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="relative"
                whileInView={{ opacity: [0, 1], x: [-20, 0] }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue-400/30 to-transparent"></div>
                <div className="absolute left-0 top-0 w-3 h-3 rounded-full bg-blue-400 -translate-x-1/2"></div>
                <div className="ml-12">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h4 className="text-2xl font-medium">Student Software Developer, TA, RA</h4>
                    <p className="text-blue-400 text-sm mt-2 md:mt-0 md:bg-blue-500/10 md:py-1 md:px-3 md:rounded-full">
                      Dec 2021 - Jun 2024
                    </p>
                  </div>
                  <p className="text-white text-lg mb-6">SRM's Directorate of Learning and Development · Part-time</p>
                  <div className="text-white/70 leading-relaxed max-w-3xl space-y-4">
                    <ul className="list-disc list-inside space-y-2">
                      <li>
                        Developed an "AI-based Automated Descriptive Answer Evaluation System" using BERT and BM25
                        models.
                      </li>
                      <li>
                        Created a mathematical model for testing validity, implemented as a parallel entity to
                        traditional evaluations.
                      </li>
                      <li>
                        Introduced as a supplementary evaluation tool to enhance accuracy and scalability for evaluating
                        8,000 papers.
                      </li>
                      <li>Ranked 1st out of 2,800+ students in both C Programming and Object Oriented Programming.</li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="relative"
                whileInView={{ opacity: [0, 1], x: [-20, 0] }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue-400/30 to-transparent"></div>
                <div className="absolute left-0 top-0 w-3 h-3 rounded-full bg-blue-400 -translate-x-1/2"></div>
                <div className="ml-12">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h4 className="text-2xl font-medium">Web Designing and Software Development Intern</h4>
                    <p className="text-blue-400 text-sm mt-2 md:mt-0 md:bg-blue-500/10 md:py-1 md:px-3 md:rounded-full">
                      Apr 2023 - Aug 2023
                    </p>
                  </div>
                  <p className="text-white text-lg mb-6">Launchr Tech · Remote</p>
                  <div className="text-white/70 leading-relaxed max-w-3xl space-y-4">
                    <ul className="list-disc list-inside space-y-2">
                      <li>
                        Transformed and maintained client websites; guided SaaS tools for e-commerce with SEO and AI
                        features.
                      </li>
                      <li>
                        Increased traffic by 20% and client productivity by 40%, enhancing customer satisfaction and
                        online presence.
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="relative"
                whileInView={{ opacity: [0, 1], x: [-20, 0] }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue-400/30 to-transparent"></div>
                <div className="absolute left-0 top-0 w-3 h-3 rounded-full bg-blue-400 -translate-x-1/2"></div>
                <div className="ml-12">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h4 className="text-2xl font-medium">Industrial Research Mentorship</h4>
                    <p className="text-blue-400 text-sm mt-2 md:mt-0 md:bg-blue-500/10 md:py-1 md:px-3 md:rounded-full">
                      Mar 2023 - May 2023
                    </p>
                  </div>
                  <p className="text-white text-lg mb-6">Microsoft · Remote</p>
                  <div className="text-white/70 leading-relaxed max-w-3xl space-y-4">
                    <ul className="list-disc list-inside space-y-2">
                      <li>
                        Conducted Generative AI research on the GLIDE model under the Senior Director, achieving 96%
                        precision in unique image generation.
                      </li>
                      <li>
                        Designed and optimized cGAN-based models, improving image diversity by 30% through iterative
                        feedback and training over 80k steps.
                      </li>
                      <li>
                        Enhanced generative model reliability by 25%, ensuring ethical generative art with high-fidelity
                        outputs.
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="relative"
                whileInView={{ opacity: [0, 1], x: [-20, 0] }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue-400/30 to-transparent"></div>
                <div className="absolute left-0 top-0 w-3 h-3 rounded-full bg-blue-400 -translate-x-1/2"></div>
                <div className="ml-12">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h4 className="text-2xl font-medium">Software Development Intern</h4>
                    <p className="text-blue-400 text-sm mt-2 md:mt-0 md:bg-blue-500/10 md:py-1 md:px-3 md:rounded-full">
                      Nov 2022 - Apr 2023
                    </p>
                  </div>
                  <p className="text-white text-lg mb-6">Vcom Technologies Private Limited · Hybrid</p>
                  <div className="text-white/70 leading-relaxed max-w-3xl space-y-4">
                    <ul className="list-disc list-inside space-y-2">
                      <li>
                        Implemented an AI-powered SD-WAN system to enhance network performance and reduce downtime.
                      </li>
                      <li>Developed tools for efficient WAN data transmission, cut WAN costs by 15%.</li>
                      <li>
                        Reduced downtime by 25%, boosted performance by improving AI modules for real-time data
                        handling.
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="relative"
                whileInView={{ opacity: [0, 1], x: [-20, 0] }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue-400/30 to-transparent"></div>
                <div className="absolute left-0 top-0 w-3 h-3 rounded-full bg-blue-400 -translate-x-1/2"></div>
                <div className="ml-12">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h4 className="text-2xl font-medium">Machine Learning Research Team Member</h4>
                    <p className="text-blue-400 text-sm mt-2 md:mt-0 md:bg-blue-500/10 md:py-1 md:px-3 md:rounded-full">
                      Jan 2022 - Mar 2022
                    </p>
                  </div>
                  <p className="text-white text-lg mb-6">Blackbox · Remote</p>
                  <div className="text-white/70 leading-relaxed max-w-3xl space-y-4">
                    <ul className="list-disc list-inside space-y-2">
                      <li>Collaborated on Bayesian cross-validation models to enhance predictive accuracy.</li>
                      <li>
                        Refined model selection through Bayesian analysis, reducing data interpretation errors by 15%.
                      </li>
                      <li>
                        Improved classification accuracy to 80.83%, ensuring consistent results across 10-fold
                        cross-validation.
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Education Section */}
        <section
          id="education"
          className="min-h-screen w-full flex flex-col justify-center px-8 md:px-16 lg:px-32 py-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-5xl mx-auto"
          >
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 px-4 py-2 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-code h-4 w-4 text-blue-400"
              >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              <span className="text-blue-400 text-sm font-medium">Education</span>
            </div>
            <h3 className="text-3xl md:text-5xl font-light mb-16">Academic Background</h3>
            <div className="space-y-16">
              <motion.div
                className="relative"
                whileInView={{ opacity: [0, 1], x: [-20, 0] }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue-400/30 to-transparent"></div>
                <div className="absolute left-0 top-0 w-3 h-3 rounded-full bg-blue-400 -translate-x-1/2"></div>
                <div className="ml-12">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h4 className="text-2xl font-medium">Master's degree, Computer Science</h4>
                    <p className="text-blue-400 text-sm mt-2 md:mt-0 md:bg-blue-500/10 md:py-1 md:px-3 md:rounded-full">
                      Aug 2024 - May 2026
                    </p>
                  </div>
                  <p className="text-white text-lg mb-6">New York University</p>
                  <div className="text-white/70 leading-relaxed max-w-3xl space-y-4">
                    <p>Grade: 3.67/4</p>
                    <div>
                      <p className="font-medium text-white/90 mb-2">Relevant Coursework:</p>
                      <p className="mb-2">Fall 2024</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>CS-GY 6063 Software Engineering</li>
                        <li>CS-GY 6083 Principles of Database Systems</li>
                        <li>CS-GY 6513 Big Data</li>
                      </ul>
                      <p className="mt-3 mb-2">Spring 2025</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>CS-GY 6033 Design and Analysis of Algorithms I</li>
                        <li>CS-GY 6923 Machine Learning</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="relative"
                whileInView={{ opacity: [0, 1], x: [-20, 0] }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue-400/30 to-transparent"></div>
                <div className="absolute left-0 top-0 w-3 h-3 rounded-full bg-blue-400 -translate-x-1/2"></div>
                <div className="ml-12">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h4 className="text-2xl font-medium">Master's degree, Finance and Entrepreneurship</h4>
                    <p className="text-blue-400 text-sm mt-2 md:mt-0 md:bg-blue-500/10 md:py-1 md:px-3 md:rounded-full">
                      Jan 2025 - 2026
                    </p>
                  </div>
                  <p className="text-white text-lg mb-6">NYU Stern School of Business</p>
                  <div className="text-white/70 leading-relaxed max-w-3xl space-y-4">
                    <p>Pursuing M.S. in Computer Science</p>
                    <div>
                      <p className="font-medium text-white/90 mb-2">Out of Department coursework Spring 2025</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>INTA-GB 2380-20 Foundations of Fintech</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="relative"
                whileInView={{ opacity: [0, 1], x: [-20, 0] }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue-400/30 to-transparent"></div>
                <div className="absolute left-0 top-0 w-3 h-3 rounded-full bg-blue-400 -translate-x-1/2"></div>
                <div className="ml-12">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h4 className="text-2xl font-medium">
                      Bachelor of Technology - BTech, Computer Science and Engineering with AI and ML
                    </h4>
                    <p className="text-blue-400 text-sm mt-2 md:mt-0 md:bg-blue-500/10 md:py-1 md:px-3 md:rounded-full">
                      Sep 2020 - Jun 2024
                    </p>
                  </div>
                  <p className="text-white text-lg mb-6">SRM IST Chennai</p>
                  <div className="text-white/70 leading-relaxed max-w-3xl space-y-4">
                    <p>Grade: 9.5/10 CGPA</p>
                    <div>
                      <p className="font-medium text-white/90 mb-2">Activities and societies:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Part of SRM's Directorate of Learning and Development, guided by the college director</li>
                        <li>Microsoft Learn Student Ambassadors</li>
                        <li>Google Developer Student Clubs</li>
                        <li>Gen-Y Events</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-white/90 mb-2">Relevant Coursework:</p>
                      <p>
                        DSA, OOPS, Computer Organization and Architecture, Design and Analysis of Algorithm, OS,
                        Software Engineering and Project Management, Computer Communications, Computer Networks, Formal
                        Language Automata, Computer Vision, Statistical Machine Learning, DBMS, Compiler Design, AI,
                        Applied Machine Learning
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-white/90 mb-2">Achievements:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Industry Expert Lead Extra 3 Credit Course on: Node JS and React JS</li>
                        <li>Only the top 10% of the entire department were selected for the course</li>
                        <li>Department Size- 750</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="min-h-screen w-full flex flex-col justify-center px-8 md:px-16 lg:px-32 py-24 bg-gradient-to-b from-black/40 to-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-6xl mx-auto"
          >
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 px-4 py-2 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-briefcase h-4 w-4 text-blue-400"
              >
                <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
              <span className="text-blue-400 text-sm font-medium">Projects</span>
            </div>
            <h3 className="text-3xl md:text-5xl font-light mb-16">Featured Work</h3>
            <div className="space-y-16">
              <motion.div
                className="relative"
                whileInView={{ opacity: [0, 1], x: [-20, 0] }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue-400/30 to-transparent"></div>
                <div className="absolute left-0 top-0 w-3 h-3 rounded-full bg-blue-400 -translate-x-1/2"></div>
                <div className="ml-12">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h4 className="text-2xl font-medium">AI-based Automated Descriptive Answer Evaluation System</h4>
                    <p className="text-blue-400 text-sm mt-2 md:mt-0 md:bg-blue-500/10 md:py-1 md:px-3 md:rounded-full">
                      May 2022 - May 2024
                    </p>
                  </div>
                  <div className="text-white/70 leading-relaxed max-w-3xl space-y-4">
                    <ul className="list-disc list-inside space-y-2">
                      <li>
                        An in-house college project under a college faculty for BM25 and BERT NLP models and drafting a
                        research paper on "An AI-based Automated Descriptive Answer Evaluation System" using information
                        retrieval and re-ranking techniques.
                      </li>
                      <li>
                        This project is aimed at eliminating the monotonous task of the teachers reading every other
                        paragraph written by the students in their examination papers.
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="relative"
                whileInView={{ opacity: [0, 1], x: [-20, 0] }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue-400/30 to-transparent"></div>
                <div className="absolute left-0 top-0 w-3 h-3 rounded-full bg-blue-400 -translate-x-1/2"></div>
                <div className="ml-12">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h4 className="text-2xl font-medium">Computer Vision and Perception for Self Driving Cars</h4>
                    <p className="text-blue-400 text-sm mt-2 md:mt-0 md:bg-blue-500/10 md:py-1 md:px-3 md:rounded-full">
                      Jul 2022 - Aug 2023
                    </p>
                  </div>
                  <div className="text-white/70 leading-relaxed max-w-3xl space-y-4">
                    <ul className="list-disc list-inside space-y-2">
                      <li>
                        The most recent project that I finished working on is based on Perception for Self Driving Cars
                        which includes: Road Segmentation, 2D Object Detection, Object Tracking, 3D Data Visualization,
                        Multi-Task Learning, and Birds Eye View using computer vision.
                      </li>
                    </ul>
                    <div className="mt-4">
                      <a
                        href="https://github.com/Utsavd7/Computer-Vision-and-Perception-for-Self-Driving-Cars/blob/master/README.md"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-github mr-2 h-4 w-4"
                        >
                          <path d="M7.75 20.75a7 7 0 0 1-6.5-7.25 7 7 0 0 1 6.5-7.25c.95.3 1.75.9 2.35 1.75a7 7 0 0 1 1.5 7.5c-.6 1-1.4 1.65-2.35 1.75a7 7 0 0 1 6.5 7.25 7 7 0 0 1-6.5 7.25" />
                          <path d="M2 12.25a7 7 0 0 1 6.5-7.25 7 7 0 0 1 6.5 7.25 7 7 0 0 1-6.5 7.25 7 7 0 0 1-6.5-7.25" />
                          <path d="M12 14.75v-2.5" />
                          <path d="M12 17.25v-2.5" />
                        </svg>
                        View on GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="relative"
                whileInView={{ opacity: [0, 1], x: [-20, 0] }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue-400/30 to-transparent"></div>
                <div className="absolute left-0 top-0 w-3 h-3 rounded-full bg-blue-400 -translate-x-1/2"></div>
                <div className="ml-12">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h4 className="text-2xl font-medium">pix2pix: Image-to-image translation</h4>
                    <p className="text-blue-400 text-sm mt-2 md:mt-0 md:bg-blue-500/10 md:py-1 md:px-3 md:rounded-full">
                      Jun 2023 - Aug 2023
                    </p>
                  </div>
                  <div className="text-white/70 leading-relaxed max-w-3xl space-y-4">
                    <ul className="list-disc list-inside space-y-2">
                      <li>
                        This project illustrates the process of constructing and training a pix2pix conditional
                        generative adversarial network (cGAN).
                      </li>
                      <li>
                        The objective of this network is to learn how to convert input images into corresponding output
                        images.
                      </li>
                      <li>
                        The versatility of pix2pix allows it to be employed for various tasks such as producing photos
                        from label maps, adding color to grayscale images, converting Google Maps images into aerial
                        views, and changing sketches into realistic photographs.
                      </li>
                    </ul>
                    <div className="mt-4">
                      <a
                        href="https://github.com/Utsavd7/pix2pix-GANs/blob/main/README.md"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-github mr-2 h-4 w-4"
                        >
                          <path d="M7.75 20.75a7 7 0 0 1-6.5-7.25 7 7 0 0 1 6.5-7.25c.95.3 1.75.9 2.35 1.75a7 7 0 0 1 1.5 7.5c-.6 1-1.4 1.65-2.35 1.75a7 7 0 0 1 6.5 7.25 7 7 0 0 1-6.5 7.25" />
                          <path d="M2 12.25a7 7 0 0 1 6.5-7.25 7 7 0 0 1 6.5 7.25 7 7 0 0 1-6.5 7.25 7 7 0 0 1-6.5-7.25" />
                          <path d="M12 14.75v-2.5" />
                          <path d="M12 17.25v-2.5" />
                        </svg>
                        View on GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="relative"
                whileInView={{ opacity: [0, 1], x: [-20, 0] }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue-400/30 to-transparent"></div>
                <div className="absolute left-0 top-0 w-3 h-3 rounded-full bg-blue-400 -translate-x-1/2"></div>
                <div className="ml-12">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h4 className="text-2xl font-medium">Bayesian model- Cross validation using ML</h4>
                    <p className="text-blue-400 text-sm mt-2 md:mt-0 md:bg-blue-500/10 md:py-1 md:px-3 md:rounded-full">
                      Dec 2021 - Mar 2022
                    </p>
                  </div>
                  <div className="text-white/70 leading-relaxed max-w-3xl space-y-4">
                    <ul className="list-disc list-inside space-y-2">
                      <li>
                        Developed a Gaussian Naïve Bayes Classifier model to predict whether a person makes over 50K a
                        year.
                      </li>
                      <li>
                        The model yields a very good performance as indicated by the model accuracy which was found to
                        be 0.8083.
                      </li>
                    </ul>
                    <div className="mt-4">
                      <a
                        href="https://github.com/Utsavd7/Bayesian_model_Cross_validation_Machine-Learning/blob/main/README.md"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-github mr-2 h-4 w-4"
                        >
                          <path d="M7.75 20.75a7 7 0 0 1-6.5-7.25 7 7 0 0 1 6.5-7.25c.95.3 1.75.9 2.35 1.75a7 7 0 0 1 1.5 7.5c-.6 1-1.4 1.65-2.35 1.75a7 7 0 0 1 6.5 7.25 7 7 0 0 1-6.5 7.25" />
                          <path d="M2 12.25a7 7 0 0 1 6.5-7.25 7 7 0 0 1 6.5 7.25 7 7 0 0 1-6.5 7.25 7 7 0 0 1-6.5-7.25" />
                          <path d="M12 14.75v-2.5" />
                          <path d="M12 17.25v-2.5" />
                        </svg>
                        View on GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="relative"
                whileInView={{ opacity: [0, 1], x: [-20, 0] }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue-400/30 to-transparent"></div>
                <div className="absolute left-0 top-0 w-3 h-3 rounded-full bg-blue-400 -translate-x-1/2"></div>
                <div className="ml-12">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h4 className="text-2xl font-medium">Diabetes Prediction using Machine Learning</h4>
                    <p className="text-blue-400 text-sm mt-2 md:mt-0 md:bg-blue-500/10 md:py-1 md:px-3 md:rounded-full">
                      Dec 2021 - Dec 2021
                    </p>
                  </div>
                  <div className="text-white/70 leading-relaxed max-w-3xl space-y-4">
                    <ul className="list-disc list-inside space-y-2">
                      <li>
                        Diabetes Prediction was the first project I started working on in the domain of Machine Learning
                        and the medical field.
                      </li>
                      <li>
                        It uses a Support Vector Machine Algorithm and plots a hyperplane separated by 2 data: diabetic
                        and non-diabetic.
                      </li>
                      <li>
                        Once we feed something to the model it tries to add something in either of two. Several
                        information of patients were used such BMI, Blood Glucose Level, Insulin Level etc to calculate
                        the training and testing accuracy score.
                      </li>
                    </ul>
                    <div className="mt-4">
                      <a
                        href="https://github.com/Utsavd7/Diabetes-Prediction-using-Machine-Learning/blob/main/Diabetes%20Prediction%20using%20Machine%20Learning.ipynb"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-github mr-2 h-4 w-4"
                        >
                          <path d="M7.75 20.75a7 7 0 0 1-6.5-7.25 7 7 0 0 1 6.5-7.25c.95.3 1.75.9 2.35 1.75a7 7 0 0 1 1.5 7.5c-.6 1-1.4 1.65-2.35 1.75a7 7 0 0 1 6.5 7.25 7 7 0 0 1-6.5 7.25" />
                          <path d="M2 12.25a7 7 0 0 1 6.5-7.25 7 7 0 0 1 6.5 7.25 7 7 0 0 1-6.5 7.25 7 7 0 0 1-6.5-7.25" />
                          <path d="M12 14.75v-2.5" />
                          <path d="M12 17.25v-2.5" />
                        </svg>
                        View on GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* More Section (Collapsible Honors, Organizations, Certifications) */}
        <MoreSection />

        {/* Contact Section */}
        <section
          id="contact"
          className="min-h-screen w-full flex flex-col justify-center px-8 md:px-16 lg:px-32 py-24 bg-gradient-to-b from-black/40 to-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-5xl mx-auto"
          >
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 px-4 py-2 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-mail h-4 w-4 text-blue-400"
              >
                <rect width="22" height="16" x="1" y="4" rx="2" ry="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span className="text-blue-400 text-sm font-medium">Contact</span>
            </div>
            <h3 className="text-3xl md:text-5xl font-light mb-16">Get In Touch</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <p className="text-white/70 mb-10 leading-relaxed text-lg">
                  Interested in collaborating or have a project in mind? Feel free to reach out through any of the
                  channels below or use the contact form.
                </p>
                <div className="space-y-8">
                  <motion.a
                    href="mailto:contact@utsavdoshi.com"
                    className="flex items-center group"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-400/10 flex items-center justify-center mr-6 group-hover:bg-blue-500/30 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-mail h-5 w-5 text-blue-400"
                      >
                        <rect width="22" height="16" x="1" y="4" rx="2" ry="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </div>
                    <span className="text-white/70 group-hover:text-blue-400 transition-colors text-lg">
                      contact@utsavdoshi.com
                    </span>
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/in/utsavdoshi"
                    className="flex items-center group"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-400/10 flex items-center justify-center mr-6 group-hover:bg-blue-500/30 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-linkedin h-5 w-5 text-blue-400"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect width="4" height="12" x="2" y="9" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </div>
                    <span className="text-white/70 group-hover:text-blue-400 transition-colors text-lg">
                      linkedin.com/in/utsavdoshi
                    </span>
                  </motion.a>
                  <motion.a
                    href="https://github.com/Utsavd7"
                    className="flex items-center group"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-400/10 flex items-center justify-center mr-6 group-hover:bg-blue-500/30 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-github h-5 w-5 text-blue-400"
                      >
                        <path d="M7.75 20.75a7 7 0 0 1-6.5-7.25 7 7 0 0 1 6.5-7.25c.95.3 1.75.9 2.35 1.75a7 7 0 0 1 1.5 7.5c-.6 1-1.4 1.65-2.35 1.75a7 7 0 0 1 6.5 7.25 7 7 0 0 1-6.5 7.25" />
                        <path d="M2 12.25a7 7 0 0 1 6.5-7.25 7 7 0 0 1 6.5 7.25 7 7 0 0 1-6.5 7.25 7 7 0 0 1-6.5-7.25" />
                        <path d="M12 14.75v-2.5" />
                        <path d="M12 17.25v-2.5" />
                      </svg>
                    </div>
                    <span className="text-white/70 group-hover:text-blue-400 transition-colors text-lg">
                      github.com/Utsavd7
                    </span>
                  </motion.a>
                </div>
              </div>
              <div>
                <form className="space-y-8">
                  <div>
                    <label htmlFor="name" className="block text-sm text-white/70 mb-3">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full p-4 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm text-white/70 mb-3">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full p-4 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                      placeholder="Your email"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm text-white/70 mb-3">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full p-4 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white py-6 rounded-lg text-base">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-8 md:px-16 lg:px-32 border-t border-white/10 bg-gradient-to-b from-black/60 to-black/80 backdrop-blur-md">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-8 md:mb-0">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-blue-300"></div>
              </div>
              <span className="text-xl font-light">
                <span className="font-medium">Utsav</span>Doshi
              </span>
            </div>
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              {sections.map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(section)
                  }}
                  className="text-white/50 hover:text-blue-400 transition-colors"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              ))}
            </div>
            <div className="flex space-x-4 mt-8 md:mt-0">
              <a
                href="https://github.com/Utsavd7"
                className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-400/10 flex items-center justify-center text-blue-400 hover:bg-blue-500/30 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-github h-5 w-5"
                >
                  <path d="M7.75 20.75a7 7 0 0 1-6.5-7.25 7 7 0 0 1 6.5-7.25c.95.3 1.75.9 2.35 1.75a7 7 0 0 1 1.5 7.5c-.6 1-1.4 1.65-2.35 1.75a7 7 0 0 1 6.5 7.25 7 7 0 0 1-6.5 7.25" />
                  <path d="M2 12.25a7 7 0 0 1 6.5-7.25 7 7 0 0 1 6.5 7.25 7 7 0 0 1-6.5 7.25 7 7 0 0 1-6.5-7.25" />
                  <path d="M12 14.75v-2.5" />
                  <path d="M12 17.25v-2.5" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/utsavdoshi"
                className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-400/10 flex items-center justify-center text-blue-400 hover:bg-blue-500/30 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-linkedin h-5 w-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="mailto:contact@utsavdoshi.com"
                className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-400/10 flex items-center justify-center text-blue-400 hover:bg-blue-500/30 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-mail h-5 w-5"
                >
                  <rect width="22" height="16" x="1" y="4" rx="2" ry="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
            </div>
          </div>
          <div className="text-center text-white/30 text-sm mt-12">
            <p>© {new Date().getFullYear()} Utsav Doshi. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </main>
  )
}
