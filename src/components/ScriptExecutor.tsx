import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface ScriptExecutorProps {
  scriptName: string;
  isExecuting: boolean;
  onComplete: () => void;
}

const getScriptSteps = (scriptName: string) => [
  `boot ${scriptName}`,
  'sync navigation target',
  'prime viewport renderer',
  'execute smooth scroll',
];

const ScriptExecutor = ({ scriptName, isExecuting, onComplete }: ScriptExecutorProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = useMemo(() => getScriptSteps(scriptName), [scriptName]);
  const totalDuration = 720;
  const stepDuration = totalDuration / steps.length;

  useEffect(() => {
    if (!isExecuting) {
      setActiveStep(0);
      return;
    }

    setActiveStep(0);

    const timers = steps.map((_, index) =>
      window.setTimeout(() => {
        setActiveStep(index);
      }, index * stepDuration),
    );

    const completionTimer = window.setTimeout(() => {
      onComplete();
    }, totalDuration + 140);

    return () => {
      timers.forEach(window.clearTimeout);
      window.clearTimeout(completionTimer);
    };
  }, [isExecuting, onComplete, stepDuration, steps, totalDuration]);

  return (
    <AnimatePresence>
      {isExecuting && (
        <motion.div
          className="pointer-events-none fixed inset-x-0 top-20 z-50 flex justify-center px-4"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
        >
          <div className="w-full max-w-xl overflow-hidden rounded-full border border-primary/30 bg-background/85 shadow-glow-strong backdrop-blur-md">
            <motion.div
              className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-transparent via-primary/25 to-transparent"
              initial={{ x: '-30%' }}
              animate={{ x: '520%' }}
              transition={{ duration: 0.55, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.08 }}
            />

            <div className="relative flex items-center gap-4 px-4 py-3">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <motion.div
                  className="h-2.5 w-2.5 rounded-full bg-primary shadow-glow"
                  animate={{ scale: [1, 1.35, 1], opacity: [0.65, 1, 0.65] }}
                  transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                </motion.div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.24em] text-primary/80">
                    <span className="truncate">{scriptName}</span>
                    <span>{Math.min(activeStep + 1, steps.length)}/{steps.length}</span>
                  </div>

                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-primary/10">
                    <motion.div
                      className="h-full rounded-full bg-primary"
                      initial={{ width: '0%' }}
                      animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                      transition={{ duration: stepDuration / 1000, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              </div>

              <div className="hidden font-mono text-[11px] text-primary/70 sm:block">
                {steps[activeStep]}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScriptExecutor;
