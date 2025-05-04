"use client"

import { motion } from "framer-motion"
import { Cpu } from "lucide-react"

export function SkillsSection() {
  // Define skill categories
  const skillCategories = [
    {
      title: "Languages",
      skills: ["Python", "Java", "C", "C++", "JavaScript", "HTML", "CSS", "R", "SQL", "PL/SQL"],
    },
    {
      title: "AI & ML",
      skills: [
        "TensorFlow",
        "PyTorch",
        "Keras",
        "Scikit-learn",
        "Hugging Face",
        "Deep Learning",
        "Computer Vision",
        "OpenCV",
        "NLP",
      ],
    },
    {
      title: "Data Science",
      skills: ["NumPy", "Pandas", "Matplotlib", "SciPy", "Data Analytics", "Big Data", "Statistical Analysis"],
    },
    {
      title: "Web & Mobile",
      skills: ["React.js", "Node.js", "Django", "Tkinter", "RESTful APIs", "Responsive Design"],
    },
    {
      title: "Finance & FinTech",
      skills: ["Financial Modeling", "Quantitative Analysis", "Risk Assessment", "Algorithmic Trading"],
    },
    {
      title: "DevOps & Cloud",
      skills: ["AWS", "Docker", "Git", "GitHub", "CI/CD", "Microservices"],
    },
    {
      title: "Databases",
      skills: ["MongoDB", "MySQL", "Oracle SQL", "NoSQL", "Database Design"],
    },
    {
      title: "Creative & UX",
      skills: ["Adobe Suite", "Figma", "Photography", "SEO", "UI/UX Design"],
    },
  ]

  return (
    <section id="skills" className="min-h-screen w-full flex flex-col justify-center px-8 md:px-16 lg:px-32 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto"
      >
        <div className="inline-flex items-center space-x-2 bg-blue-500/10 px-4 py-2 rounded-full mb-4">
          <Cpu className="h-4 w-4 text-blue-400" />
          <span className="text-blue-400 text-sm font-medium">Skills</span>
        </div>
        <h3 className="text-3xl md:text-5xl font-light mb-12">Technical Expertise</h3>

        <div className="space-y-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="space-y-4">
              <h4 className="text-xl font-medium text-blue-400">{category.title}</h4>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    className="px-4 py-2 bg-blue-500/10 text-white/80 rounded-full text-sm hover:bg-blue-500/20 transition-colors cursor-pointer"
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
