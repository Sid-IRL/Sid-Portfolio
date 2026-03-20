export type CertificateType = "certificate" | "award";

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  type: CertificateType;
  file?: string;
  image?: string;
  available: boolean;
  note?: string;
}

const withBasePath = (assetPath: string) => `${import.meta.env.BASE_URL}${assetPath}`;

export const certificates: Certificate[] = [
  {
    id: "high-achiever",
    title: "High Achiever Award 2025",
    issuer: "LG Soft India",
    type: "award",
    file: withBasePath("certificates/high-achiever.pdf"),
    available: true,
    note: "Uploaded and ready to view.",
  },
  {
    id: "linux-privesc",
    title: "Advanced Linux Privilege Escalation",
    issuer: "Udemy / Hack The Box",
    type: "certificate",
    available: false,
    note: "Add linux-privilege-escalation.pdf to public/certificates to publish this certificate.",
  },
  {
    id: "aws",
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    type: "certificate",
    available: false,
    note: "Add aws-certificate.pdf to public/certificates to publish this certificate.",
  },
  {
    id: "ibm-ai",
    title: "IBM AI Foundations",
    issuer: "Coursera / IBM",
    type: "certificate",
    available: false,
    note: "Add coursera-ibm-ai.pdf to public/certificates to publish this certificate.",
  },
  {
    id: "python",
    title: "Python for Everybody",
    issuer: "Coursera",
    type: "certificate",
    available: false,
    note: "Add coursera-python.pdf to public/certificates to publish this certificate.",
  },
  {
    id: "cybersecurity-cisco",
    title: "Cybersecurity Essentials",
    issuer: "Cisco / NASSCOM",
    type: "certificate",
    available: false,
    note: "Add cybersecurity-cisco.pdf to public/certificates to publish this certificate.",
  },
  {
    id: "cybersecurity-mobility",
    title: "Cybersecurity & Mobility",
    issuer: "Coursera",
    type: "certificate",
    available: false,
    note: "Add cybersecurity-mobility.pdf to public/certificates to publish this certificate.",
  },
  {
    id: "google-ux",
    title: "Google UX Design",
    issuer: "Google / Coursera",
    type: "certificate",
    available: false,
    note: "Add google-ux-design.pdf to public/certificates to publish this certificate.",
  },
  {
    id: "alfa-zyrus",
    title: "Automotive Cybersecurity",
    issuer: "Alfa Zyrus",
    type: "certificate",
    available: false,
    note: "Add alfa-zyrus.pdf to public/certificates to publish this certificate.",
  },
  {
    id: "web-dev",
    title: "Web Development Training",
    issuer: "Internshala",
    type: "certificate",
    available: false,
    note: "Add web-development.jpg to public/certificates to publish this certificate.",
  },
];
