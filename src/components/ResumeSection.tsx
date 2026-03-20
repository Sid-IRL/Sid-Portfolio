import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Download } from "lucide-react";
import { Link } from "react-router-dom";

const ResumeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const experience = [
    {
      period: "Feb 2025 - Present",
      role: "G1-1 Research Engineer (Security Scrum)",
      company: "LG Soft India Ltd",
      description:
        "Implementing MAC policies with SMACK & AppArmor. Designing Multi-Level Security frameworks. Working with kernel modules for embedded system security. Building custom Yocto binaries with BitBake.",
    },
    {
      period: "May 2023 - Feb 2025",
      role: "G1 Research Engineer (Security Scrum)",
      company: "LG Soft India Ltd",
      description:
        "Enforced DAC, MAC, and app sandboxing on webOS. Performed TARA for attack vector identification. Managed Linux containers (LXC/LXD). Contributed to open-source webOS security.",
    },
  ];

  const skills = [
    { name: "Linux Kernel / Security Modules", level: 95 },
    { name: "Mandatory Access Control (SMACK/AppArmor)", level: 92 },
    { name: "Yocto Project / BitBake", level: 88 },
    { name: "C / C++", level: 85 },
    { name: "Threat Modeling / TARA", level: 90 },
    { name: "Linux Containers (LXC/LXD)", level: 82 },
  ];

  return (
    <section id="resume" className="relative min-h-screen px-4 py-20" ref={ref}>
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-wrap items-start justify-between gap-4"
        >
          <div>
            <span className="font-mono text-sm text-primary/60">
              {">"} parse resume.output --format=visual
            </span>
            <h2 className="mt-2 text-4xl font-bold md:text-5xl">
              Career <span className="text-primary text-glow">Data</span>
            </h2>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/vault"
              className="script-btn flex items-center gap-2 rounded-lg px-5 py-2.5 font-mono text-sm"
            >
              <Download className="h-4 w-4" />
              open.vault
            </Link>
          </motion.div>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mb-4 font-mono text-xs text-muted-foreground">
              {">"} timeline.render()
            </div>

            <div className="space-y-6">
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                  className="relative border-l-2 border-primary/30 pl-6"
                >
                  <div className="absolute left-0 top-0 h-3 w-3 -translate-x-[7px] rounded-full bg-primary shadow-glow" />

                  <div className="cyber-border card-glow rounded-lg bg-card p-4">
                    <div className="mb-1 font-mono text-xs text-primary">{exp.period}</div>
                    <h3 className="text-lg font-semibold">{exp.role}</h3>
                    <div className="mb-2 text-sm text-muted-foreground">{exp.company}</div>
                    <p className="text-sm text-muted-foreground/80">{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="mb-4 font-mono text-xs text-muted-foreground">
              {">"} skills.analyze()
            </div>

            <div className="space-y-5 rounded-lg bg-card p-6 cyber-border">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                >
                  <div className="mb-2 flex justify-between">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="font-mono text-xs text-primary">{skill.level}%</span>
                  </div>
                  <div className="skill-bar h-2">
                    <motion.div
                      className="skill-bar-fill h-full"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : {}}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-6 rounded-lg bg-card p-4 cyber-border"
            >
              <div className="mb-3 font-mono text-xs text-muted-foreground">
                {">"} education.show()
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <div>
                  <h4 className="font-semibold">B.Tech in Information Science & Technology</h4>
                  <p className="text-sm text-muted-foreground">Presidency University • 2019-2023</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="mt-4 rounded-lg bg-card p-4 cyber-border"
            >
              <div className="mb-3 font-mono text-xs text-muted-foreground">
                {">"} achievements.list()
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <div>
                  <h4 className="font-semibold text-primary">🏆 LG Soft India High Achiever Award 2025</h4>
                  <p className="text-sm text-muted-foreground">Project Category - Technology Expertise</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
