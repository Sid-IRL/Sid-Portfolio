import { motion } from 'framer-motion';

const ExperienceBadge = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className="fixed top-20 right-4 z-40 hidden md:block"
    >
      <div className="bg-card/90 backdrop-blur-sm cyber-border rounded-lg p-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-2xl font-bold text-primary text-glow">3</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Years</div>
          </div>
          <div className="w-px h-10 bg-primary/30" />
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
              Experience Includes
            </div>
            <div className="flex items-center gap-2">
              {/* LG Logo */}
              <div className="bg-white rounded px-1.5 py-0.5">
                <svg
                  viewBox="0 0 100 50"
                  className="h-4 w-8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="25" cy="25" r="20" fill="#A50034" />
                  <path
                    d="M18 18v14h10v-3h-6v-11h-4z"
                    fill="white"
                  />
                  <circle cx="25" cy="22" r="3" fill="white" />
                  <text
                    x="55"
                    y="32"
                    fontSize="18"
                    fontWeight="bold"
                    fill="#A50034"
                    fontFamily="Arial, sans-serif"
                  >
                    LG
                  </text>
                </svg>
              </div>
              <span className="text-xs text-foreground font-medium">Soft India</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExperienceBadge;
