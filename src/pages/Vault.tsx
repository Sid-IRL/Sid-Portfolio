import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AnimatedBackground from "@/components/AnimatedBackground";
import { certificates, type Certificate } from "@/data/certificates";

const awardCertificate = certificates.find((certificate) => certificate.award);
const featuredCertificates = certificates.filter((certificate) => certificate.featured);
const standardCertificates = certificates.filter(
  (certificate) => !certificate.featured && !certificate.award,
);
const repeatedCertificates = [...standardCertificates, ...standardCertificates];

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
          <section className="mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="max-w-3xl"
            >
              <p className="terminal-font text-sm text-primary/70">
                {">"} credentials.list()
              </p>
              <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Certificate <span className="text-primary text-glow">Vault</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                A focused record of completed courses, awards, and technical sessions.
                Certificate files are not stored in the public repository.
              </p>
            </motion.div>

            <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              {awardCertificate && (
                <motion.section
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="rounded-lg border border-primary/35 bg-primary/10 p-6 shadow-[0_0_40px_hsl(var(--primary)/0.12)]"
                  aria-labelledby="award-heading"
                >
                  <p className="terminal-font text-xs uppercase tracking-[0.22em] text-primary/75">
                    highlighted award
                  </p>
                  <h2 id="award-heading" className="mt-4 text-2xl font-bold">
                    {awardCertificate.name}
                  </h2>
                  <p className="mt-3 text-base text-muted-foreground">
                    {awardCertificate.issuer}
                  </p>
                </motion.section>
              )}

              <motion.section
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.16 }}
                className="rounded-lg border border-border/70 bg-card/55 p-5 backdrop-blur-sm"
                aria-labelledby="featured-heading"
              >
                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="terminal-font text-xs uppercase tracking-[0.22em] text-primary/75">
                      reputed credentials
                    </p>
                    <h2 id="featured-heading" className="mt-2 text-2xl font-bold">
                      Featured Highlights
                    </h2>
                  </div>
                  <p className="terminal-font text-sm text-primary/70">
                    {featuredCertificates.length} entries
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {featuredCertificates.map((certificate) => (
                    <CertificateCard certificate={certificate} key={certificate.name} />
                  ))}
                </div>
              </motion.section>
            </div>

            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="mt-6 rounded-lg border border-primary/15 bg-card/45 shadow-[var(--shadow-card)] backdrop-blur-sm"
              aria-labelledby="all-certificates-heading"
            >
              <div className="border-b border-border/50 px-5 py-4 sm:px-7">
                <p className="terminal-font text-xs uppercase tracking-[0.22em] text-primary/65">
                  complete record
                </p>
                <h2 id="all-certificates-heading" className="mt-2 text-2xl font-bold">
                  Additional Certificates
                </h2>
              </div>

              <div
                className="certificates-marquee h-[28rem] overflow-hidden focus-within:[--marquee-state:paused] hover:[--marquee-state:paused]"
                tabIndex={0}
                aria-label="Auto-scrolling additional certificate list"
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
            </motion.section>
          </section>
        </main>
      </div>
    </div>
  );
};

const CertificateCard = ({ certificate }: { certificate: Certificate }) => (
  <article className="rounded-lg border border-primary/20 bg-background/45 p-4">
    <h3 className="text-base font-semibold leading-snug text-foreground">
      {certificate.name}
    </h3>
    <p className="mt-2 text-sm font-medium text-primary/80">{certificate.issuer}</p>
  </article>
);

const CertificateRow = ({ certificate }: { certificate: Certificate }) => (
  <li className="flex min-h-20 flex-col justify-center gap-2 px-5 py-4 sm:px-7">
    <h3 className="text-base font-semibold leading-snug text-foreground sm:text-lg">
      {certificate.name}
    </h3>
    <p className="text-sm font-medium text-muted-foreground">{certificate.issuer}</p>
  </li>
);

export default Vault;
