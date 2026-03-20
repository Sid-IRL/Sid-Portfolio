import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const navItems = [
  { id: 'about', label: 'about.run' },
  { id: 'resume', label: 'resume.run' },
  { id: 'projects', label: 'projects.run' },
  { id: 'interests', label: 'interests.run' },
];

const Navigation = ({ activeSection, onNavigate }: NavigationProps) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40 py-4 px-6 bg-background/80 backdrop-blur-sm border-b border-border/30"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <motion.div
          className="font-bold text-xl text-primary text-glow cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          SID://
        </motion.div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`script-btn px-4 py-2 rounded text-sm ${
                activeSection === item.id ? 'border-primary bg-primary/10' : ''
              }`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
            </motion.button>
          ))}
          <motion.button
            onClick={() => navigate('/vault')}
            className="script-btn px-4 py-2 rounded text-sm border-primary/50 bg-primary/5"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.4 }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px hsl(var(--primary) / 0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            🔐 vault.access
          </motion.button>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-primary p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          className="md:hidden mt-4 pb-4 border-t border-border/30 pt-4 space-y-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { onNavigate(item.id); setMobileMenuOpen(false); }}
              className={`script-btn w-full px-4 py-2 rounded text-sm text-left ${
                activeSection === item.id ? 'border-primary bg-primary/10' : ''
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => { navigate('/vault'); setMobileMenuOpen(false); }}
            className="script-btn w-full px-4 py-2 rounded text-sm text-left border-primary/50 bg-primary/5"
          >
            🔐 vault.access
          </button>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navigation;
