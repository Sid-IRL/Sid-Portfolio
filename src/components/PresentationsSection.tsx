import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mic, ChevronDown, ChevronUp } from 'lucide-react';

const PresentationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const presentations = [
    {
      id: 'tara-demo',
      title: 'Threat Analysis & Risk Assessment (TARA) Framework',
      type: 'Technical Presentation',
      audience: 'Cross-functional engineering teams',
      description: 'Presented the TARA methodology and its application to automotive platform security. Demonstrated live threat modeling workflows and risk prioritization matrices.',
    },
    {
      id: 'mac-training',
      title: 'Mandatory Access Control Deep Dive',
      type: 'Internal Training Program',
      audience: 'Security & Platform teams',
      description: 'Delivered hands-on training on SMACK and AppArmor policy configuration. Covered label architecture design, profile creation, and integration with embedded Linux build systems.',
    },
    {
      id: 'exec-demo',
      title: 'Platform Security Architecture Overview',
      type: 'Executive Demo',
      audience: 'Senior leadership & stakeholders',
      description: 'Executive-level presentation showcasing the security architecture of the embedded Linux platform. Highlighted threat mitigation strategies, compliance achievements, and security posture improvements.',
    },
    {
      id: 'container-talk',
      title: 'Linux Container Security & Isolation',
      type: 'Technical Demo',
      audience: 'DevOps & Infrastructure teams',
      description: 'Demonstrated LXC/LXD container setup with security-hardened profiles. Covered namespace isolation, cgroup restrictions, and integration with host MAC policies.',
    },
    {
      id: 'yocto-workshop',
      title: 'Yocto Build System & Custom Security Layers',
      type: 'Workshop',
      audience: 'Platform engineering teams',
      description: 'Interactive workshop on building custom Yocto layers with BitBake recipes. Focused on integrating security modules, kernel hardening patches, and automated security testing into the build pipeline.',
    },
  ];

  return (
    <section id="presentations" className="py-20 px-4 relative" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="terminal-font text-sm text-primary/60">
            {'>'} ls /presentations/ --timeline
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2">
            Presentations & <span className="text-primary text-glow">Demos</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-primary/20" />

          <div className="space-y-6">
            {presentations.map((pres, index) => (
              <motion.div
                key={pres.id}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="relative pl-16 md:pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-6 top-4 w-4 h-4 bg-card border-2 border-primary rounded-full shadow-glow z-10" />

                {/* Mic icon */}
                <div className="absolute left-0 top-2.5 w-8 h-8 flex items-center justify-center">
                  <Mic className="w-4 h-4 text-primary/50" />
                </div>

                <div
                  className="bg-card cyber-border rounded-lg p-5 cursor-pointer card-glow"
                  onClick={() => setExpandedId(expandedId === pres.id ? null : pres.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="terminal-font text-xs text-primary/60 mb-1">{pres.type}</div>
                      <h3 className="text-lg font-semibold mb-1">{pres.title}</h3>
                      <div className="text-xs text-muted-foreground">
                        Audience: {pres.audience}
                      </div>
                    </div>
                    <div className="text-muted-foreground mt-1">
                      {expandedId === pres.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedId === pres.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-muted-foreground mt-4 pt-4 border-t border-border leading-relaxed">
                          {pres.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PresentationsSection;
