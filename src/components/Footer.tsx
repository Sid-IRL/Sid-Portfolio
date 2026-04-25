import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border/50 px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <div className="mb-2 text-xl font-bold text-primary text-glow">SIDHARTH://</div>
            <p className="terminal-font text-sm text-muted-foreground">
              {'>'} kernel.secure() // Linux Security Engineer
            </p>
          </div>

          <motion.a
            href="https://www.linkedin.com/in/sidharth-nambiar010101"
            className="rounded-lg bg-card p-3 text-muted-foreground transition-all cyber-border hover:border-primary/50 hover:text-primary"
            whileHover={{ scale: 1.1, boxShadow: '0 0 20px hsl(var(--primary) / 0.3)' }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </motion.a>
        </div>

        <div className="mt-8 grid gap-3 border-t border-border/30 pt-6 text-center text-sm text-muted-foreground md:grid-cols-2 md:text-left">
          <p>
            <span className="terminal-font text-primary/70">email:</span>{' '}
            sidnambiar11@gmail.com
          </p>
          <p className="md:text-right">
            <span className="terminal-font text-primary/70">phone:</span>{' '}
            +91 73383 88116
          </p>
        </div>

        <div className="mt-6 text-center">
          <p className="terminal-font text-xs text-muted-foreground">
            (c) {new Date().getFullYear()} Sidharth Nambiar - Securing systems, one kernel at a time
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
