import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const projects = [
    {
      title: 'Threat Analysis & Risk Assessment (TARA)',
      description: 'Comprehensive threat modeling framework for automotive and embedded platforms. Identified attack vectors and prioritized security mitigations at platform level.',
      tags: ['TARA', 'Threat Modeling', 'Risk Assessment', 'Automotive Security'],
      contributions: [
        'Led threat identification and attack surface analysis',
        'Developed risk prioritization matrix for platform vulnerabilities',
        'Created mitigation strategies for identified attack vectors',
        'Collaborated with cross-functional teams for security implementation',
      ],
      highlighted: true,
    },
    {
      title: 'Mandatory Access Control Implementation',
      description: 'Implemented and configured MAC policies using SMACK and AppArmor to enforce fine-grained access controls across system components on embedded Linux platforms.',
      tags: ['SMACK', 'AppArmor', 'MAC', 'Linux Kernel', 'Security Modules'],
      contributions: [
        'Designed and implemented SMACK label architecture',
        'Configured AppArmor profiles for system daemons',
        'Integrated MAC policies with Yocto build system',
        'Performed security validation and policy testing',
      ],
    },
    {
      title: 'Application Sandboxing Framework',
      description: 'Developed robust app sandboxing mechanisms to enforce strict access control and isolation on webOS platform, preventing unauthorized resource access.',
      tags: ['Sandboxing', 'DAC', 'Isolation', 'webOS', 'Security'],
      contributions: [
        'Architected sandbox isolation boundaries',
        'Implemented DAC policies for application confinement',
        'Integrated with platform security framework',
        'Validated isolation effectiveness through penetration testing',
      ],
    },
    {
      title: 'IPtables Firewall Configuration',
      description: 'Designed and implemented network security rules using IPtables for embedded Linux systems, controlling traffic flow and protecting against network-based attacks.',
      tags: ['IPtables', 'Firewall', 'Network Security', 'Linux'],
      contributions: [
        'Designed firewall rule architecture for embedded platforms',
        'Implemented traffic filtering and port management',
        'Created automated rule deployment scripts',
        'Documented security policies and configurations',
      ],
    },
    {
      title: 'Company-wide Platform Security Assessment',
      description: 'Large-scale security assessment initiative involving multiple internal and external stakeholders. Performed comprehensive vulnerability assessments across platform components.',
      tags: ['Security Audit', 'Vulnerability Assessment', 'Coverity', 'Stakeholder Management'],
      contributions: [
        'Coordinated with internal and external security teams',
        'Performed static analysis using Coverity',
        'Identified and triaged critical vulnerabilities',
        'Presented findings to executive leadership',
      ],
    },
    {
      title: 'Linux Containers (LXC/LXD) Setup & Isolation Platform',
      description: 'Built and managed Linux container infrastructure for isolated and cloud-native application environments with strong security boundaries.',
      tags: ['LXC', 'LXD', 'Containers', 'Isolation', 'Cloud-Native'],
      contributions: [
        'Designed container architecture for platform services',
        'Implemented security profiles for container isolation',
        'Integrated containers with host security policies',
        'Optimized container performance and resource allocation',
      ],
    },
  ];

  return (
    <section id="projects" className="min-h-screen py-20 px-4 relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="font-mono text-sm text-primary/60">
            {'>'} ls /projects/ --detailed
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2">
            Project <span className="text-primary text-glow">Archive</span>
          </h2>
        </motion.div>

        {/* NDA Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 p-4 bg-primary/5 border border-primary/20 rounded-lg"
        >
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0 animate-pulse" />
            <div>
              <p className="text-sm text-muted-foreground">
                <span className="text-primary font-semibold">⚠️ Disclaimer:</span> These projects are under Non-Disclosure Agreement. Please reach out for more information. Meanwhile, get a brief insight for each project below.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className={`group bg-card cyber-border rounded-lg overflow-hidden card-glow relative ${
                project.highlighted ? 'ring-2 ring-primary/50 shadow-[0_0_30px_rgba(255,45,45,0.3)]' : ''
              }`}
            >
              {project.highlighted && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 py-1 text-center">
                  <span className="text-xs font-mono text-primary font-bold">★ HIGHLIGHTED PROJECT ★</span>
                </div>
              )}

              <div className={`p-6 ${project.highlighted ? 'pt-10' : ''}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="font-mono text-xs text-primary/60">
                    project_{String(index + 1).padStart(2, '0')}.exe
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-4">
                  {project.description}
                </p>

                {/* My Contributions */}
                <div className="mb-4">
                  <div className="font-mono text-xs text-primary/60 mb-2">{'>'} my_contributions.log</div>
                  <ul className="space-y-1">
                    {project.contributions.map((contribution, i) => (
                      <li key={i} className="text-xs text-muted-foreground/80 flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        {contribution}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-primary/10 border border-primary/20 rounded text-xs text-primary/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Animated border glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
