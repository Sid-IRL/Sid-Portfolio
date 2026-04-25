import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AnimatedBackground from "@/components/AnimatedBackground";
import { certificates, type Certificate } from "@/data/certificates";

const repeatedCertificates = [...certificates, ...certificates];

const Vault = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <AnimatedBackground />

      <div className="relative z-10">
        <motion.header
          className="fixed left-0 right-0 top-0 z-40 border-b border-border/50 bg-background/80 px-4 py-4 backdrop-blur-sm sm:px-6"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
            <motion.button
              type="button"
              onClick={() => navigate("/")}
              className="script-btn inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm terminal-font"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              aria-label="Return to home"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              cd ~/home
            </motion.button>
            <p className="terminal-font text-xs text-primary/80 text-glow sm:text-sm">
              CERTIFICATES
            </p>
          </div>
        </motion.header>

        <main className="px-4 pb-14 pt-28 sm:px-6 sm:pb-20 sm:pt-32">
          <section className="mx-auto grid min-h-[calc(100vh-9rem)] max-w-6xl items-center gap-10 lg:grid-cols-[0.86fr_1.14fr]">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <p className="terminal-font text-sm text-primary/70">
                {">"} credentials.list()
              </p>
              <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Certificate <span className="text-primary text-glow">Vault</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                A focused record of completed courses, internships, awards, and technical
                sessions.
              </p>
              <p className="mt-8 terminal-font text-sm text-primary/80">
                {certificates.length} verified entries
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="relative overflow-hidden rounded-lg border border-primary/20 bg-card/55 shadow-[var(--shadow-card)] backdrop-blur-sm"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-card via-card/85 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-card via-card/85 to-transparent" />

              <div
                className="certificates-marquee h-[34rem] max-h-[62vh] min-h-[28rem] overflow-hidden focus-within:[--marquee-state:paused] hover:[--marquee-state:paused]"
                tabIndex={0}
                aria-label="Auto-scrolling certificate list"
              >
                <ul className="certificates-marquee-track divide-y divide-border/50">
                  {repeatedCertificates.map((certificate, index) => (
                    <CertificateRow
                      certificate={certificate}
                      key={`${certificate.name}-${certificate.issuer}-${index}`}
                    />
                  ))}
                </ul>
              </div>
            </motion.div>
          </section>
        </main>
      </div>
    </div>
  );
};

const CertificateRow = ({ certificate }: { certificate: Certificate }) => (
  <li className="flex min-h-24 flex-col justify-center gap-2 px-5 py-5 sm:px-7">
    <h2 className="text-lg font-semibold leading-snug text-foreground sm:text-xl">
      {certificate.name}
    </h2>
    <p className="text-sm font-medium text-muted-foreground">{certificate.issuer}</p>
  </li>
);

export default Vault;
