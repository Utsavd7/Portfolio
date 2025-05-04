"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Award, Users, BookOpen, ChevronDown, ChevronUp } from "lucide-react"

export function MoreSection() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null)
    } else {
      setExpandedSection(section)
    }
  }

  return (
    <section
      id="more"
      className="w-full flex flex-col justify-center px-8 md:px-16 lg:px-32 py-24 bg-gradient-to-b from-black/40 to-black/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto"
      >
        <div className="inline-flex items-center space-x-2 bg-blue-500/10 px-4 py-2 rounded-full mb-4">
          <Award className="h-4 w-4 text-blue-400" />
          <span className="text-blue-400 text-sm font-medium">More About Me</span>
        </div>
        <h3 className="text-3xl md:text-5xl font-light mb-12">Additional Information</h3>

        {/* Honors & Awards */}
        <div className="mb-8 border border-white/10 rounded-xl overflow-hidden">
          <button
            onClick={() => toggleSection("honors")}
            className="w-full flex justify-between items-center p-6 text-left bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center">
              <Award className="h-5 w-5 text-blue-400 mr-3" />
              <h4 className="text-xl font-medium text-white">Honors & Awards</h4>
            </div>
            {expandedSection === "honors" ? (
              <ChevronUp className="h-5 w-5 text-blue-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-blue-400" />
            )}
          </button>

          <AnimatePresence>
            {expandedSection === "honors" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-6 space-y-6">
                  <div className="backdrop-blur-sm bg-gradient-to-br from-white/10 to-white/5 p-6 rounded-xl border border-white/10">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                        <Award className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <h5 className="text-lg font-medium text-white">Merit Scholarship – New York University</h5>
                        <p className="text-blue-400 text-sm">NYU Tandon School of Engineering · Feb 2024</p>
                      </div>
                    </div>
                    <p className="text-white/70 leading-relaxed">
                      Honored to receive a $12,000 merit scholarship from NYU Tandon in recognition of my academic
                      excellence and achievements.
                    </p>
                  </div>

                  <div className="backdrop-blur-sm bg-gradient-to-br from-white/10 to-white/5 p-6 rounded-xl border border-white/10">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                        <Award className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <h5 className="text-lg font-medium text-white">
                          Barclays Hackathon - Top 20 out of 2500 students
                        </h5>
                        <p className="text-blue-400 text-sm">Barclays · Apr 2023</p>
                      </div>
                    </div>
                    <p className="text-white/70 leading-relaxed">
                      Achieved top 20 placement among 2500 participants in the Barclays Hackathon.
                    </p>
                  </div>

                  <div className="backdrop-blur-sm bg-gradient-to-br from-white/10 to-white/5 p-6 rounded-xl border border-white/10">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                        <Award className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <h5 className="text-lg font-medium text-white">ACM Faculty Team Hackathon - 1st Runner Up</h5>
                        <p className="text-blue-400 text-sm">Association of Computing Machinery · Mar 2022</p>
                      </div>
                    </div>
                    <p className="text-white/70 leading-relaxed">
                      Secured 1st Runner Up position in the ACM Faculty Team Hackathon.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Organizations */}
        <div className="mb-8 border border-white/10 rounded-xl overflow-hidden">
          <button
            onClick={() => toggleSection("organizations")}
            className="w-full flex justify-between items-center p-6 text-left bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center">
              <Users className="h-5 w-5 text-blue-400 mr-3" />
              <h4 className="text-xl font-medium text-white">Organizations</h4>
            </div>
            {expandedSection === "organizations" ? (
              <ChevronUp className="h-5 w-5 text-blue-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-blue-400" />
            )}
          </button>

          <AnimatePresence>
            {expandedSection === "organizations" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-6 space-y-6">
                  <div className="backdrop-blur-sm bg-gradient-to-br from-white/10 to-white/5 p-6 rounded-xl border border-white/10">
                    <h5 className="text-lg font-medium text-white mb-2">Microsoft Learn Student Ambassadors</h5>
                    <p className="text-blue-400 text-sm mb-4">Oct 2020 - Jun 2024</p>
                    <p className="text-white/70">
                      Progressed through multiple leadership roles from member to Club Advisor, mentoring peers and
                      organizing technical workshops.
                    </p>
                  </div>

                  <div className="backdrop-blur-sm bg-gradient-to-br from-white/10 to-white/5 p-6 rounded-xl border border-white/10">
                    <h5 className="text-lg font-medium text-white mb-2">Google Developer Groups</h5>
                    <p className="text-blue-400 text-sm mb-4">Mar 2021 - Sep 2023</p>
                    <p className="text-white/70">
                      Progressed from Member to Domain Lead, organizing workshops, hackathons, and tech talks.
                    </p>
                  </div>

                  <div className="backdrop-blur-sm bg-gradient-to-br from-white/10 to-white/5 p-6 rounded-xl border border-white/10">
                    <h5 className="text-lg font-medium text-white mb-2">
                      IAENG (International Association of Engineers)
                    </h5>
                    <p className="text-blue-400 text-sm mb-4">Feb 2023 - Present</p>
                    <p className="text-white/70">
                      Member of the largest non-profit international association for engineers and computer scientists.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Certifications */}
        <div className="mb-8 border border-white/10 rounded-xl overflow-hidden">
          <button
            onClick={() => toggleSection("certifications")}
            className="w-full flex justify-between items-center p-6 text-left bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center">
              <BookOpen className="h-5 w-5 text-blue-400 mr-3" />
              <h4 className="text-xl font-medium text-white">Certifications</h4>
            </div>
            {expandedSection === "certifications" ? (
              <ChevronUp className="h-5 w-5 text-blue-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-blue-400" />
            )}
          </button>

          <AnimatePresence>
            {expandedSection === "certifications" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="backdrop-blur-sm bg-gradient-to-br from-white/10 to-white/5 p-4 rounded-xl border border-white/10">
                      <h5 className="text-base font-medium text-white">Neural Networks and Deep Learning</h5>
                      <p className="text-blue-400 text-xs">DeepLearning.AI · Oct 2022</p>
                    </div>

                    <div className="backdrop-blur-sm bg-gradient-to-br from-white/10 to-white/5 p-4 rounded-xl border border-white/10">
                      <h5 className="text-base font-medium text-white">Advanced Learning Algorithms</h5>
                      <p className="text-blue-400 text-xs">Stanford University · Aug 2022</p>
                    </div>

                    <div className="backdrop-blur-sm bg-gradient-to-br from-white/10 to-white/5 p-4 rounded-xl border border-white/10">
                      <h5 className="text-base font-medium text-white">Database Foundations</h5>
                      <p className="text-blue-400 text-xs">Oracle · Mar 2023</p>
                    </div>

                    <div className="backdrop-blur-sm bg-gradient-to-br from-white/10 to-white/5 p-4 rounded-xl border border-white/10">
                      <h5 className="text-base font-medium text-white">Supervised Machine Learning</h5>
                      <p className="text-blue-400 text-xs">Stanford University · Aug 2022</p>
                    </div>

                    <div className="backdrop-blur-sm bg-gradient-to-br from-white/10 to-white/5 p-4 rounded-xl border border-white/10">
                      <h5 className="text-base font-medium text-white">R Programming</h5>
                      <p className="text-blue-400 text-xs">John Hopkins University · Jul 2022</p>
                    </div>

                    <div className="backdrop-blur-sm bg-gradient-to-br from-white/10 to-white/5 p-4 rounded-xl border border-white/10">
                      <h5 className="text-base font-medium text-white">Python for Everybody</h5>
                      <p className="text-blue-400 text-xs">University of Michigan · Jul 2020</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  )
}
