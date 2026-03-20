import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    { label: 'Years in Security Domain', value: '3' },
    { label: 'SMACK/AppArmor MAC Policy Work', value: '✓' },
    { label: 'Yocto/BitBake Custom OS Builds', value: '✓' },
    { label: 'Embedded Linux Platform Hardening', value: '✓' },
    { label: 'High Achiever Award', value: '2025' },
    { label: 'Coverity Static Analysis', value: '✓' },
  ];

  return (
    <section id="about" className="min-h-screen py-20 px-4 relative" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="terminal-font text-sm text-primary/60">
            {'>'} cat /user/identity.dat
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2">
            User <span className="text-primary text-glow">Identity</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Bio Panel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card cyber-border rounded-lg p-6"
          >
            <div className="flex items-center gap-2 mb-4 terminal-font text-sm text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-primary" />
              PROFILE_STATUS: ACTIVE
            </div>

            <div className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                Research Engineer specializing in Linux security for embedded and automotive
                platforms. I architect hardened systems using Mandatory Access Control,
                kernel-level security modules, and custom Yocto builds.
              </p>
              <p className="leading-relaxed">
                From threat modeling to vulnerability assessments, I ensure systems are
                bulletproof. Currently securing webOS and automotive infotainment systems
                at LG Soft India, contributing to open-source security initiatives.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-border">
              <div className="terminal-font text-xs text-primary/60 space-y-1">
                <p>{'>'} location: Bangalore, India</p>
                <p>{'>'} status: Research Engineer @ LG Soft India</p>
                <p>{'>'} specialization: Linux Security & Embedded Systems</p>
              </div>
            </div>
          </motion.div>

          {/* Stats Panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            <div className="bg-card cyber-border rounded-lg p-4">
              <span className="terminal-font text-xs text-muted-foreground mb-4 block">
                {'>'} user.stats.display()
              </span>

              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className="text-center p-4 bg-secondary/30 rounded-lg border border-primary/10"
                  >
                    <div className="text-2xl md:text-3xl font-bold text-primary text-glow">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="bg-card cyber-border rounded-lg p-4">
              <span className="terminal-font text-xs text-muted-foreground mb-3 block">
                {'>'} ls /skills/primary/
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  'Linux Kernel Security & Internals',
                  'Mandatory Access Control (SMACK)',
                  'AppArmor Policy Configuration',
                  'Threat Modeling / TARA',
                  'Security Auditing & Vulnerability Assessment',
                  'Yocto Project & BitBake',
                  'Linux Containers (LXC/LXD)',
                  'OS Security Hardening (DAC/MAC/Sandboxing)',
                  'Git & Patch Management',
                  'C / C++ Programming',
                  'IPtables Firewall',
                ].map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 + i * 0.05 }}
                    className="px-3 py-1 bg-primary/10 border border-primary/30 rounded text-sm text-primary"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
