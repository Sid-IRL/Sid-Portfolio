import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Globe, Users, Cpu } from 'lucide-react';

const ConferenceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="conferences" className="py-20 px-4 relative" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="terminal-font text-sm text-primary/60">
            {'>'} cat /events/conferences.log
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2">
            Conference <span className="text-primary text-glow">Log</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Event Card */}
          <div className="bg-card cyber-border rounded-lg overflow-hidden relative group">
            {/* Animated top border */}
            <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

            <div className="p-8">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Badge */}
                <motion.div
                  className="shrink-0 w-24 h-24 bg-primary/10 border border-primary/30 rounded-lg flex flex-col items-center justify-center shadow-glow"
                  animate={isInView ? {
                    boxShadow: [
                      '0 0 10px hsl(var(--primary) / 0.2)',
                      '0 0 25px hsl(var(--primary) / 0.4)',
                      '0 0 10px hsl(var(--primary) / 0.2)',
                    ]
                  } : {}}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Cpu className="w-8 h-8 text-primary mb-1" />
                  <span className="terminal-font text-[10px] text-primary/70">2026</span>
                </motion.div>

                {/* Content */}
                <div className="flex-1">
                  <div className="terminal-font text-xs text-primary/60 mb-2">EVENT_ID: AIDEVCON_2026</div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">
                    AI DevCon India <span className="text-primary">2026</span>
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Attended India's premier AI developer conference — gaining hands-on exposure to
                    real-world AI systems, cutting-edge ML infrastructure, and production-scale deployments.
                    Networked with developers, researchers, and industry professionals building the
                    future of AI-powered technology.
                  </p>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg border border-primary/10">
                      <Globe className="w-5 h-5 text-primary shrink-0" />
                      <div>
                        <div className="text-xs text-muted-foreground">Focus</div>
                        <div className="text-sm font-medium">Real-world AI Systems</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg border border-primary/10">
                      <Users className="w-5 h-5 text-primary shrink-0" />
                      <div>
                        <div className="text-xs text-muted-foreground">Networking</div>
                        <div className="text-sm font-medium">Industry Professionals</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg border border-primary/10">
                      <Cpu className="w-5 h-5 text-primary shrink-0" />
                      <div>
                        <div className="text-xs text-muted-foreground">Domain</div>
                        <div className="text-sm font-medium">AI & ML Engineering</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConferenceSection;
