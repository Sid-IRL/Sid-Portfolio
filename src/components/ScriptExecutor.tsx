import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScriptExecutorProps {
  scriptName: string;
  isExecuting: boolean;
  onComplete: () => void;
}

const getScriptLines = (scriptName: string) => [
  `> compiling ${scriptName}...`,
  '> loading modules...',
  '> resolving dependencies...',
  '> injecting UI components...',
  '> rendering data structures...',
  '> execution complete ✓',
];

const ScriptExecutor = ({ scriptName, isExecuting, onComplete }: ScriptExecutorProps) => {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const lines = getScriptLines(scriptName);

  useEffect(() => {
    if (!isExecuting) {
      setVisibleLines([]);
      return;
    }

    setVisibleLines([]);

    lines.forEach((_, index) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, index]);
      }, index * 250);
    });

    setTimeout(() => {
      onComplete();
    }, lines.length * 250 + 300);
  }, [isExecuting, scriptName, onComplete, lines.length]);

  return (
    <AnimatePresence>
      {isExecuting && (
        <motion.div
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-terminal-bg border border-primary/40 rounded-lg shadow-glow-strong overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 border-b border-primary/20">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-xs text-primary">{scriptName}</span>
            </div>

            <div className="p-4 font-mono text-sm space-y-1">
              {lines.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={visibleLines.includes(index) ? { opacity: 1, x: 0 } : { opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className={`text-primary/80 ${
                    index === lines.length - 1 ? 'text-green-400' : ''
                  }`}
                >
                  {line}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScriptExecutor;
