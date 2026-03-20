import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const scriptLines = [
  { text: '$ sudo ./sid_portfolio --init', delay: 0 },
  { text: '[*] Loading kernel security modules...', delay: 300 },
  { text: '    ├── smack_lsm.ko          [OK]', delay: 600 },
  { text: '    ├── apparmor_parser         [OK]', delay: 800 },
  { text: '    └── security_framework      [OK]', delay: 1000 },
  { text: '[*] Establishing secure channel...', delay: 1300 },
  { text: '    AES-256-GCM handshake complete', delay: 1600 },
  { text: '[*] Loading prompt injection payloads...', delay: 1900 },
  { text: '    → injecting identity.dat into /proc/sid', delay: 2200 },
  { text: '    → bypassing access control layers...', delay: 2500 },
  { text: '    → escalating privileges... [GRANTED]', delay: 2800 },
  { text: '[*] Scanning attack surface...', delay: 3100 },
  { text: '    CVE-2024-XXXX: patched ✓', delay: 3300 },
  { text: '    TARA threat model: loaded ✓', delay: 3500 },
  { text: '    MAC policies: enforced ✓', delay: 3700 },
  { text: '[*] Compiling interface...', delay: 4000 },
  { text: '    [████████████████████████] 100%', delay: 4300 },
  { text: '', delay: 4600 },
  { text: '⚠  WARNING: UNKNOWN PROCESS DETECTED', delay: 4800, isWarning: true },
  { text: '⚠  SIGNATURE MATCH: S.I.D [THREAT LEVEL: MAXIMUM]', delay: 5100, isWarning: true },
  { text: '', delay: 5300 },
  { text: '✗  CONTAINMENT FAILED — PAYLOAD DEPLOYED', delay: 5500, isDanger: true },
  { text: '▶  EXECUTING: sid_world.exe', delay: 5800, isDanger: true },
];

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [typingLine, setTypingLine] = useState<number | null>(null);
  const [typedChars, setTypedChars] = useState(0);
  const [showMalware, setShowMalware] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll as new lines appear
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleLines, typedChars]);

  useEffect(() => {
    scriptLines.forEach((line, index) => {
      // Start typing effect
      setTimeout(() => {
        setTypingLine(index);
        setTypedChars(0);

        const text = line.text;
        const charDelay = Math.max(15, Math.min(30, 400 / Math.max(text.length, 1)));

        // Type each character
        for (let c = 0; c <= text.length; c++) {
          setTimeout(() => {
            setTypedChars(c);
            if (c === text.length) {
              setVisibleLines(prev => [...prev, index]);
              setTypingLine(null);
            }
          }, c * charDelay);
        }
      }, line.delay);
    });

    setTimeout(() => setShowMalware(true), 6200);
    setTimeout(() => onComplete(), 8800);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-background flex items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="scanlines absolute inset-0" />

      <AnimatePresence>
        {!showMalware ? (
          <motion.div
            key="terminal"
            className="w-full max-w-3xl mx-4 p-6 bg-card border border-primary/30 rounded-lg shadow-glow"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            {/* Terminal header */}
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-primary/20">
              <div className="w-3 h-3 rounded-full bg-primary/60" />
              <div className="w-3 h-3 rounded-full bg-primary/40" />
              <div className="w-3 h-3 rounded-full bg-primary/20" />
              <span className="ml-4 terminal-font text-sm text-muted-foreground">
                sid@kali:~/portfolio
              </span>
            </div>

            {/* Scrollable terminal body */}
            <div
              ref={scrollRef}
              className="terminal-font text-sm space-y-1 h-80 overflow-y-auto pr-2"
              style={{ scrollBehavior: 'smooth' }}
            >
              {/* Fully typed lines */}
              {scriptLines.map((line, index) => {
                if (!visibleLines.includes(index) && typingLine !== index) return null;

                const isFullyTyped = visibleLines.includes(index);
                const isCurrentlyTyping = typingLine === index;

                return (
                  <div
                    key={index}
                    className={`
                      ${line.isWarning ? 'text-yellow-500 font-semibold' : ''}
                      ${line.isDanger ? 'text-primary text-glow font-bold' : ''}
                      ${!line.isWarning && !line.isDanger ? 'text-primary/80' : ''}
                      whitespace-pre
                    `}
                  >
                    {isFullyTyped ? line.text : ''}
                    {isCurrentlyTyping ? line.text.slice(0, typedChars) : ''}
                    {isCurrentlyTyping && (
                      <motion.span
                        className="inline-block w-2 h-4 bg-primary ml-0.5 align-middle"
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.4, repeat: Infinity }}
                      />
                    )}
                  </div>
                );
              })}

              {/* Blinking cursor when idle */}
              {typingLine === null && visibleLines.length > 0 && visibleLines.length < scriptLines.length && (
                <motion.span
                  className="inline-block w-2 h-4 bg-primary"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              )}
            </div>
          </motion.div>
        ) : (
          <MalwareReveal />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const MalwareReveal = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 800),
      setTimeout(() => setPhase(3), 1400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      className="relative flex items-center justify-center"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', damping: 15, stiffness: 100 }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {phase >= 1 && (
          <>
            <motion.div
              className="absolute w-96 h-96 rounded-full"
              style={{
                background: 'radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, transparent 70%)',
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 2, 1.5], opacity: [0, 1, 0.6] }}
              transition={{ duration: 0.8 }}
            />
            <motion.div
              className="absolute w-64 h-64 rounded-full bg-primary/20 blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </>
        )}
      </div>

      {phase >= 2 && (
        <motion.div
          className="relative"
          initial={{ scale: 3, opacity: 0, rotate: -20 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 12, stiffness: 80 }}
        >
          <h1
            className="text-[8rem] md:text-[12rem] font-black text-primary text-glow glitch select-none"
            data-text="SID"
          >
            SID
          </h1>

          {phase >= 3 && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/30 to-transparent"
              style={{ height: '10px' }}
              animate={{ y: ['-100%', '500%'] }}
              transition={{ duration: 1.5, repeat: 2, ease: 'linear' }}
            />
          )}
        </motion.div>
      )}

      {phase >= 2 && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              initial={{ x: '50%', y: '50%', scale: 0 }}
              animate={{
                x: `${50 + (Math.random() - 0.5) * 100}%`,
                y: `${50 + (Math.random() - 0.5) * 100}%`,
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 1.5, delay: i * 0.05, ease: 'easeOut' }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default LoadingScreen;
