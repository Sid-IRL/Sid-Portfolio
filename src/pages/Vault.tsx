import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Award,
  ExternalLink,
  FileText,
  FolderLock,
  Info,
  X,
} from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import { certificates, type Certificate } from "@/data/certificates";

const Vault = () => {
  const navigate = useNavigate();
  const [openFolder, setOpenFolder] = useState<string | null>(null);
  const [vaultUnlocked, setVaultUnlocked] = useState(false);
  const availableCount = useMemo(
    () => certificates.filter((certificate) => certificate.available).length,
    [],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => setVaultUnlocked(true), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      <AnimatedBackground />

      <div className="relative z-10">
        <motion.div
          className="fixed top-0 left-0 right-0 z-40 border-b border-border/50 bg-background/80 px-6 py-4 backdrop-blur-sm"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <motion.button
              onClick={() => navigate("/")}
              className="script-btn flex items-center gap-2 rounded-lg px-4 py-2 text-sm terminal-font"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="h-4 w-4" />
              cd ~/home
            </motion.button>
            <div className="terminal-font text-sm text-primary text-glow">
              VAULT://ACHIEVEMENTS
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {!vaultUnlocked && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-background"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <motion.div
                  animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <FolderLock className="mx-auto mb-4 h-24 w-24 text-primary" />
                </motion.div>
                <motion.p
                  className="terminal-font text-primary text-glow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0.5, 1] }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  {">"} Decrypting vault access...
                </motion.p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {vaultUnlocked && (
          <div className="px-4 pb-16 pt-24">
            <div className="mx-auto max-w-6xl">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <span className="terminal-font text-sm text-primary/60">
                  {">"} ls /vault/achievements/ --classified
                </span>
                <h1 className="mt-2 text-4xl font-bold md:text-6xl">
                  The <span className="text-primary text-glow">Vault</span>
                </h1>
                <p className="mt-3 max-w-xl text-muted-foreground">
                  Classified achievements, certifications, and proof of expertise.
                  Open a folder to view published files or see which uploads are still pending.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="mb-8 rounded-xl border border-primary/20 bg-card/80 p-4"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="terminal-font text-xs text-primary/70">
                      {">"} certificate.registry.sync()
                    </p>
                    <h2 className="mt-1 text-lg font-semibold">
                      {availableCount} of {certificates.length} achievement files are live.
                    </h2>
                  </div>
                  <div className="flex items-start gap-2 rounded-lg border border-border/60 bg-background/60 p-3 text-sm text-muted-foreground md:max-w-md">
                    <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <p>
                      To add more certificates, drop the file into <code>public/certificates</code>
                      and update <code>src/data/certificates.ts</code>.
                    </p>
                  </div>
                </div>
              </motion.div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {certificates.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                  >
                    <FolderCard
                      cert={cert}
                      isOpen={openFolder === cert.id}
                      onToggle={() => setOpenFolder(openFolder === cert.id ? null : cert.id)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const FolderCard = ({
  cert,
  isOpen,
  onToggle,
}: {
  cert: Certificate;
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <div className="relative">
    <motion.div
      onClick={onToggle}
      className={`relative cursor-pointer overflow-hidden rounded-lg bg-card transition-colors ${
        isOpen ? "ring-2 ring-primary shadow-glow-strong" : "cyber-border card-glow"
      }`}
      layout
    >
      <div className="relative">
        <div className="flex items-center gap-3 p-4 pb-3">
          <div
            className={`rounded-lg border p-2 ${
              cert.type === "award"
                ? "border-yellow-500/30 bg-yellow-500/10"
                : "border-primary/20 bg-primary/10"
            }`}
          >
            {cert.type === "award" ? (
              <Award className="h-6 w-6 text-yellow-500" />
            ) : (
              <FileText className="h-6 w-6 text-primary" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-semibold">{cert.title}</h3>
            <p className="truncate text-xs text-muted-foreground">{cert.issuer}</p>
          </div>
        </div>

        <div className="px-4 pb-3">
          <div className="terminal-font text-[10px] text-primary/50">
            {isOpen
              ? cert.available
                ? "> DECRYPTED ✓"
                : "> MANIFEST READY — upload pending"
              : "> ENCRYPTED — click to decrypt"}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="overflow-hidden border-t border-primary/20 bg-background/40"
          >
            <div className="space-y-4 p-4 pt-3">
              {cert.note && (
                <p className="text-sm leading-relaxed text-muted-foreground">{cert.note}</p>
              )}

              {cert.image && cert.available && (
                <div className="overflow-hidden rounded-lg border border-primary/20 bg-card">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="h-auto w-full object-cover"
                  />
                </div>
              )}

              <div className="flex gap-3 pt-1">
                {cert.available && cert.file ? (
                  <motion.a
                    href={cert.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="script-btn inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm terminal-font"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open file
                  </motion.a>
                ) : (
                  <div className="inline-flex items-center gap-2 rounded-lg border border-dashed border-border px-4 py-2 text-sm text-muted-foreground">
                    <Info className="h-4 w-4" />
                    Upload pending
                  </div>
                )}

                <motion.button
                  onClick={(event) => {
                    event.stopPropagation();
                    onToggle();
                  }}
                  className="rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <X className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  </div>
);

export default Vault;
