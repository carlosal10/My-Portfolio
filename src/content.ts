export const profile = {
  name: "Owuor Timon Odhiambo",
  shortName: "Timon",
  github: "https://github.com/carlosal10",
  email: "infotechhaven6@gmail.com",
  phone: "+254107240805",
  phoneDisplay: "+254 107 240 805",
  base: "Nairobi, Kenya",
  coverage:
    "Based in Nairobi, serving Kenya’s major cities and towns. Travel to other accessible locations by arrangement.",
  intro:
    "My hands-on experience spans CCTV, access control, networking and telecommunications, solar installations, and software development. I bring a practical engineering approach to connecting the systems people rely on.",
};

export function whatsappLink(
  message = "Hi Timon, I’d like to discuss an installation.",
) {
  return `https://wa.me/${profile.phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}

export type Project = {
  id: string;
  number: string;
  title: string;
  category: "Development" | "Engineering";
  description: string;
  detail: string;
  tags: string[];
  images: string[];
  github?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    id: "isp",
    number: "01",
    title: "ISP Billing & Management",
    category: "Development",
    description:
      "Connecting customer management with the networks they rely on.",
    detail:
      "A customer management and billing tool for internet service providers. The project combines a web interface with MikroTik API integration to connect account administration and network operations. This is a software project, not an installation case study.",
    tags: ["Node.js", "Express", "MikroTik API"],
    images: ["ISP004.png", "ISP001.png", "ISP002.png", "ISP003.png"],
    github: "https://github.com/carlosal10/ISP-Billing",
  },
  {
    id: "inventory",
    number: "02",
    title: "Inventory Tracker",
    category: "Development",
    description:
      "A clearer picture of stock, sales, and everything in between.",
    detail:
      "An inventory management application that brings stock levels, sales records, faulty items, and analytics into one place. Built to make everyday operations easier to understand through dynamic charts and tables.",
    tags: ["JavaScript", "Node.js", "MongoDB"],
    images: ["IT009.png", "IT008.png", "IT010.png", "IT011.png"],
    github: "https://github.com/carlosal10/inventory-tracker",
    demo: "https://carlosal10.github.io/Inventory-Tracker/",
  },
  {
    id: "irrigation",
    number: "03",
    title: "Smart Irrigation Controller",
    category: "Engineering",
    description: "Thoughtful automation, rooted in a real-world problem.",
    detail:
      "An automated irrigation project using soil moisture sensors and a microcontroller to monitor conditions and control watering. It brings together sensing, decision-making, and actuation. Project photographs and a detailed walkthrough will be added soon.",
    tags: ["Arduino", "C/C++", "Sensors"],
    images: [],
  },
];

export const services = [
  {
    number: "01",
    title: "CCTV & access control",
    description:
      "Security camera and access-control installations, with configuration shaped around your premises and how you use them.",
    skills: "CCTV / IP cameras / Recording systems / Access control",
    icon: "security",
  },
  {
    number: "02",
    title: "Networking & telecoms",
    description:
      "From data points and structured cabling to access points, routers, and switches. Practical connections for the way your space works.",
    skills: "Data points / Wi-Fi access points / Cabling / Network configuration",
    icon: "network",
  },
  {
    number: "03",
    title: "Solar installations",
    description:
      "Hands-on solar installation work, with your site, equipment, and power requirements discussed before the scope is agreed.",
    skills: "Solar panels / Inverters / Batteries / System integration",
    icon: "solar",
  },
  {
    number: "04",
    title: "Software & integration",
    description:
      "Software that supports the physical systems behind it. Web applications, management tools, and integrations for everyday operations.",
    skills: "Web applications / ISP tools / APIs / Automation",
    icon: "code",
  },
] as const;

export const deliverySteps = [
  {
    title: "Understand the job",
    description:
      "Start with your location, the systems you need, and the equipment you have. We can discuss whether a site assessment is needed.",
  },
  {
    title: "Agree the scope",
    description:
      "Clarify the work, equipment requirements, cost, and schedule before proceeding. Sourcing assistance can be discussed if needed.",
  },
  {
    title: "Organise the work",
    description:
      "Where the scope needs additional hands or specialist skills, I can arrange project-based collaborators. Staffing and responsibilities are agreed before work begins.",
  },
  {
    title: "Install, test & hand over",
    description:
      "Carry out the agreed installation, check the system’s operation, and walk you through how to use it at handover.",
  },
];

export const articles = [
  {
    title: "Why I built my own inventory system",
    category: "BUILDING",
    date: "APR 17, 2025",
    excerpt:
      "I got tired of bulky software. I needed something lean, smart, and mine. Here's how I did it.",
  },
  {
    title: "From engineering to code",
    category: "PERSPECTIVES",
    date: "MAR 25, 2025",
    excerpt:
      "How my journey in Instrumentation and Control guided me into software development. Spoiler: It changed everything.",
  },
  {
    title: "The power of side projects",
    category: "PROCESS",
    date: "FEB 10, 2025",
    excerpt:
      "If you're waiting to get hired before building something, you're missing the point. Start now.",
  },
];
