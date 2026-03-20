import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { X, Shield, Lock, Terminal, Cpu } from 'lucide-react';

const InterestsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [expandedInterest, setExpandedInterest] = useState<string | null>(null);

  const interests = [
    {
      id: 'cybersecurity',
      title: 'Cybersecurity',
      icon: <Shield className="w-8 h-8 text-primary" />,
      description: 'Ethical hacking, vulnerability research, and building hardened systems from the ground up.',
      details: 'From penetration testing to security auditing, I focus on identifying and mitigating threats across embedded and automotive platforms. Active in CTF challenges and security research communities.',
    },
    {
      id: 'access-control',
      title: 'Access Control',
      icon: <Lock className="w-8 h-8 text-primary" />,
      description: 'Designing and enforcing MAC/DAC policies with SMACK, AppArmor, and sandbox isolation.',
      details: 'Deep expertise in Mandatory Access Control frameworks — designing SMACK label architectures, configuring AppArmor profiles, and building multi-layered access control systems for production Linux platforms.',
    },
    {
      id: 'automation',
      title: 'Automation',
      icon: <Cpu className="w-8 h-8 text-primary" />,
      description: 'Automating security workflows, build pipelines, and system hardening processes.',
      details: 'Building automated security testing pipelines, Yocto/BitBake build automation, and CI/CD workflows for embedded system deployments. Streamlining repetitive security tasks with scripts and tooling.',
    },
    {
      id: 'shell-scripting',
      title: 'Shell Scripting',
      icon: <Terminal className="w-8 h-8 text-primary" />,
      description: 'Crafting powerful Bash scripts for system administration, security automation, and DevOps.',
      details: 'Expert-level Bash scripting for kernel module management, log analysis, automated security audits, and container orchestration. Building toolchains that make security workflows reproducible and efficient.',
    },
  ];

  return (
    <section id="interests" className="min-h-screen py-20 px-4 relative" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="terminal-font text-sm text-primary/60">
            {'>'} explore /interests/ --interactive
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2">
            Interest <span className="text-primary text-glow">Matrix</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {interests.map((interest, index) => (
            <motion.div
              key={interest.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              onClick={() => setExpandedInterest(interest.id)}
              className="group bg-card cyber-border rounded-lg p-6 cursor-pointer card-glow relative overflow-hidden"
            >
              {/* Scanline hover effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5" />
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--primary) / 0.03) 2px, hsl(var(--primary) / 0.03) 4px)'
                  }}
                />
              </div>

              <div className="flex items-start gap-4 relative z-10">
                <div className="p-3 bg-primary/10 rounded-lg border border-primary/20 group-hover:shadow-glow transition-shadow">
                  {interest.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                    {interest.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {interest.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 terminal-font text-xs text-primary/40 group-hover:text-primary/70 transition-colors relative z-10">
                {'>'} click to execute {interest.id}.run
              </div>
            </motion.div>
          ))}
        </div>

        {/* Expanded Interest Modal */}
        {expandedInterest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setExpandedInterest(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-card cyber-border rounded-lg p-6 max-w-lg w-full shadow-glow-strong"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const interest = interests.find((i) => i.id === expandedInterest);
                if (!interest) return null;

                return (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <div className="terminal-font text-xs text-primary">
                        {'>'} executing {interest.id}.run...
                      </div>
                      <button
                        onClick={() => setExpandedInterest(null)}
                        className="p-1 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                        {interest.icon}
                      </div>
                      <h3 className="text-2xl font-bold">{interest.title}</h3>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">
                      {interest.details}
                    </p>

                    <div className="mt-6 pt-4 border-t border-border terminal-font text-xs text-primary">
                      {'>'} execution complete ✓
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default InterestsSection;
