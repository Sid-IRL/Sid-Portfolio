import { motion } from 'framer-motion';
import { Linkedin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const socials = [
    { icon: Linkedin, href: 'https://www.linkedin.com/in/sidharth-nambiar010101', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:sidnambiar11@gmail.com', label: 'Email' },
    { icon: Phone, href: 'tel:+917338388116', label: 'Phone' },
  ];

  return (
    <footer className="py-12 px-4 border-t border-border/50">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="font-bold text-xl text-primary text-glow mb-2">SIDHARTH://</div>
            <p className="text-sm text-muted-foreground terminal-font">
              {'>'} kernel.secure() // Linux Security Engineer
            </p>
          </div>

          <div className="flex items-center gap-4">
            {socials.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                className="p-3 bg-card cyber-border rounded-lg text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
                whileHover={{ scale: 1.1, boxShadow: '0 0 20px hsl(var(--primary) / 0.3)' }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/30 text-center">
          <p className="text-xs text-muted-foreground terminal-font">
            © {new Date().getFullYear()} Sidharth Nambiar • Securing systems, one kernel at a time
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
