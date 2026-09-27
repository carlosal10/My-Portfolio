import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowDown,
  ArrowRight,
  ArrowLeft,
  Menu,
  X,
  Github,
  Code2,
  Cpu,
  Camera,
  Network,
  Sun,
  UsersRound,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Sprout,
  Plus,
  Check,
  Copy,
} from "lucide-react";
import {
  deliverySteps,
  profile,
  projects,
  services,
  whatsappLink,
  type Project,
} from "./content";

const asset = (name: string) => `${import.meta.env.BASE_URL}photos/${name}`;
const navigation = [
  ["expertise", "Services"],
  ["process", "How I work"],
  ["work", "Work"],
  ["about", "About"],
] as const;

const serviceIcons = {
  security: Camera,
  network: Network,
  solar: Sun,
  code: Code2,
};

function EngineeringArt() {
  return (
    <div className="engineering-art" aria-hidden="true">
      <div className="art-caption">
        <span>CONNECTED THINKING.</span>
        <span>HANDS-ON DELIVERY.</span>
      </div>
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="orbit orbit-three" />
      <div className="axis axis-x" />
      <div className="axis axis-y" />
      <div className="core">
        <span className="core-symbol">
          t<span>.</span>
        </span>
        <span className="core-label">CONNECT. INSTALL. INTEGRATE.</span>
      </div>
      <div className="satellite satellite-code">
        <Camera aria-hidden="true" size={24} />
        <span>SECURITY</span>
      </div>
      <div className="satellite satellite-engineer">
        <Network aria-hidden="true" size={24} />
        <span>NETWORKS</span>
      </div>
      <div className="satellite satellite-solar">
        <Sun aria-hidden="true" size={24} />
        <span>SOLAR</span>
      </div>
      <div className="orbit-dot dot-one" />
      <div className="orbit-dot dot-two" />
      <span className="art-coordinate coordinate-top">
        + NAIROBI / KENYA
      </span>
      <span className="art-coordinate coordinate-bottom">
        PHYSICAL SYSTEMS. DIGITAL POSSIBILITIES. +
      </span>
    </div>
  );
}

function IrrigationArt() {
  return (
    <div
      className="irrigation-art"
      aria-label="Concept diagram: sensor to controller to irrigation"
    >
      <div className="plant-orbit">
        <Sprout aria-hidden="true" size={70} strokeWidth={1} />
        <i />
        <i />
      </div>
      <div className="system-flow">
        <span>SENSE</span>
        <span className="flow-line" />
        <Cpu aria-hidden="true" size={22} />
        <span className="flow-line" />
        <span>RESPOND</span>
      </div>
      <span className="concept-label">CONNECTED SYSTEMS / CONCEPT</span>
    </div>
  );
}

function ProjectVisual({ project }: { project: Project }) {
  return (
    <div className={`project-visual visual-${project.id}`}>
      <span className="visual-label">
        {project.category === "Engineering"
          ? "HARDWARE × SOFTWARE"
          : "DESIGNED FOR THE EVERYDAY"}
      </span>
      {project.images.length ? (
        <div className="browser-frame">
          <div className="browser-bar">
            <i />
            <i />
            <i />
            <span>
              {project.id === "inventory"
                ? "inventory / analytics"
                : "isp / payment portal"}
            </span>
          </div>
          <img
            loading="lazy"
            src={asset(project.images[0])}
            alt={`${project.title} interface`}
          />
        </div>
      ) : (
        <IrrigationArt />
      )}
      <span className="visual-index">PROJECT / {project.number}</span>
      <span className="visual-open">
        <ArrowUpRight aria-hidden="true" size={22} />
      </span>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [filter, setFilter] = useState("All projects");
  const [project, setProject] = useState<Project | null>(null);
  const [enquiryService, setEnquiryService] = useState("");
  const [enquiryLocation, setEnquiryLocation] = useState("");
  const [enquiryDetails, setEnquiryDetails] = useState("");
  const [slide, setSlide] = useState(0);
  const [copied, setCopied] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const hasModal = !!project;
  const enquiryMessage = [
    "Hi Timon, I’d like to discuss a project.",
    `Service: ${enquiryService || "Several systems / advice on scope"}`,
    enquiryLocation.trim() && `Location: ${enquiryLocation.trim()}`,
    enquiryDetails.trim() && `Requirements: ${enquiryDetails.trim()}`,
  ]
    .filter(Boolean)
    .join("\n");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -55% 0px" },
    );
    document
      .querySelectorAll("main section[id]")
      .forEach((section) => observer.observe(section));
    const legacy: Record<string, string> = {
      "about.html": "about",
      "projects.html": "work",
      "contact.html": "contact",
      "blog.html": "work",
    };
    const section =
      legacy[location.pathname.split("/").pop()?.toLowerCase() ?? ""];
    if (section && !location.hash)
      document.getElementById(section)?.scrollIntoView();
    const resolveLegacyHash = () => {
      if (location.hash === "#journal") {
        history.replaceState(null, "", "#work");
        document.getElementById("work")?.scrollIntoView();
      }
    };
    resolveLegacyHash();
    window.addEventListener("hashchange", resolveLegacyHash);
    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", resolveLegacyHash);
    };
  }, []);

  useEffect(() => {
    if (hasModal) {
      dialogRef.current?.showModal();
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    }
    dialogRef.current?.close();
  }, [hasModal]);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    const closeOnWideScreen = () => {
      if (window.innerWidth > 760) setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeOnWideScreen);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeOnWideScreen);
    };
  }, [menuOpen]);

  function closeModal() {
    setProject(null);
  }
  function openProject(value: Project) {
    setSlide(0);
    setProject(value);
  }
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-inner">
          <a href="#home" className="wordmark" aria-label="Timon home">
            timon<span>.</span>
          </a>
          <nav
            className={menuOpen ? "navigation is-open" : "navigation"}
            id="navigation"
            aria-label="Main navigation"
          >
            {navigation.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className={activeSection === id ? "active" : ""}
                aria-current={activeSection === id ? "location" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
            <a
              className="nav-contact"
              href="#contact"
              onClick={() => setMenuOpen(false)}
            >
              Let’s talk <ArrowUpRight aria-hidden="true" size={16} />
            </a>
          </nav>
          <button
            ref={menuButton}
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="navigation"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </header>

      <main id="main">
        <section id="home" className="hero container">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="status-dot" /> ENGINEERING & INSTALLATION SERVICES
            </div>
            <h1>
              Security.
              <br />
              Connectivity.
              <br />
              <span>Power.</span>
            </h1>
            <p className="hero-intro">
              I’m <strong>{profile.name}</strong>. I install CCTV, access-control,
              networking, telecoms, and solar systems — with software development
              to connect the physical and digital.
            </p>
            <p className="hero-location">
              <MapPin aria-hidden="true" size={15} /> {profile.base} · Projects across Kenya
            </p>
            <div className="hero-actions">
              <a
                className="button button-dark"
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
              >
                Discuss an installation
                <MessageCircle aria-hidden="true" size={18} />
              </a>
              <a className="text-link" href="#expertise">
                Explore services <ArrowRight aria-hidden="true" size={17} />
              </a>
            </div>
          </div>
          <EngineeringArt />
          <div className="hero-bottom">
            <span>PERSONAL ACCOUNTABILITY. PROJECT-BASED TEAMWORK.</span>
            <a href="#expertise">
              SCROLL TO EXPLORE <ArrowDown aria-hidden="true" size={15} />
            </a>
          </div>
        </section>

        <div className="discipline-strip">
          <div className="container">
            <span>CCTV & access control</span>
            <Plus aria-hidden="true" />
            <span>Networking & telecoms</span>
            <Plus aria-hidden="true" />
            <span>Solar installations</span>
            <Plus aria-hidden="true" />
            <span>Software & integration</span>
          </div>
        </div>

        <section id="expertise" className="section container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                <span className="section-num">01 /</span> INSTALLATION SERVICES
              </p>
              <h2>
                Practical systems.<br />
                <span className="muted">Connected possibilities.</span>
              </h2>
            </div>
            <p>
              Engineering first. Software where it helps.
              <br className="desktop-break" /> Let’s find the right scope for your space.
            </p>
          </div>
          <div className="services">
            {services.map((service) => {
              const Icon = serviceIcons[service.icon];
              return (
                <article className="service" key={service.number}>
                  <div className="service-top">
                    <span>{service.number}</span>
                    <Icon aria-hidden="true" />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="service-skills">{service.skills}</div>
                  <a
                    className="text-link service-enquiry"
                    href="#contact"
                    onClick={() => setEnquiryService(service.title)}
                    aria-label={`Enquire about ${service.title}`}
                  >
                    Discuss this service <ArrowUpRight aria-hidden="true" size={16} />
                  </a>
                </article>
              );
            })}
          </div>
          <div className="equipment-note">
            <span className="small-label">EQUIPMENT & SCOPE</span>
            <p>
              Installation is my primary service, typically using client-provided
              equipment. If you need help sourcing equipment, we can discuss
              arrangements as part of your project.
            </p>
          </div>
        </section>

        <section id="process" className="process-section">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">
                  <span className="section-num">02 /</span> HOW I DELIVER PROJECTS
                </p>
                <h2>
                  One point of contact.<br />
                  <span className="muted">The right plan for the job.</span>
                </h2>
              </div>
              <p>
                A clear scope and agreed responsibilities,
                <br className="desktop-break" /> from our first conversation to handover.
              </p>
            </div>
            <ol className="process-steps">
              {deliverySteps.map((step, index) => (
                <li key={step.title}>
                  <span className="step-number" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
            <div className="team-note">
              <UsersRound aria-hidden="true" size={30} />
              <div>
                <h3>Personal accountability. Project-based teamwork.</h3>
                <p>
                  I remain your main point of contact. For installations that need
                  extra hands or specialist skills, I can recruit collaborators
                  for that project. Staffing and responsibilities are agreed
                  before work begins.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="section container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                <span className="section-num">03 /</span> SUPPORTING TECHNICAL WORK
              </p>
              <h2>
                Beyond the installation.
                <br />
                <span className="muted">Software & connected systems.</span>
              </h2>
            </div>
            <p>
              A selection of software and automation projects<br className="desktop-break" /> that complement my installation work.
            </p>
          </div>
          <p className="work-note">
            These are software and automation projects, not client installation
            case studies. Installation photographs and case studies are not
            published here yet.
          </p>
          <div className="filter-row" role="group" aria-label="Filter projects">
            {["All projects", "Development", "Engineering"].map((value) => (
              <button
                key={value}
                aria-pressed={filter === value}
                className={filter === value ? "filter selected" : "filter"}
                onClick={() => setFilter(value)}
              >
                {value}
                {value === "All projects" && (
                  <span>{String(projects.length).padStart(2, "0")}</span>
                )}
              </button>
            ))}
          </div>
          <div className="project-grid" aria-live="polite">
            {projects
              .filter(
                (item) => filter === "All projects" || item.category === filter,
              )
              .map((item) => (
                <button
                  className={`project-card card-${item.id}`}
                  key={item.id}
                  onClick={() => openProject(item)}
                  aria-label={`View ${item.title} project`}
                >
                  <ProjectVisual project={item} />
                  <div className="project-copy">
                    <div className="project-title">
                      <h3>{item.title}</h3>
                      <ArrowUpRight aria-hidden="true" size={22} />
                    </div>
                    <p>{item.description}</p>
                    <div className="tags">
                      {item.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
          </div>
          <a
            className="github-link text-link"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
          >
            <Github aria-hidden="true" size={18} /> More of the process lives on
            GitHub <ArrowUpRight aria-hidden="true" size={16} />
          </a>
        </section>

        <section id="about" className="about-section">
          <div className="container about-grid">
            <div className="about-art">
              <span className="small-label">A LITTLE ABOUT THE PERSON</span>
              <div className="monogram">
                TO<span>↗</span>
              </div>
              <div className="about-art-bottom">
                <span>
                  ALWAYS CURIOUS.
                  <br />
                  ALWAYS BUILDING.
                </span>
                <span className="asterisk">✳</span>
              </div>
            </div>
            <div className="about-copy">
              <p className="eyebrow">
                <span className="section-num">04 /</span> THE PERSON BEHIND THE WORK
              </p>
              <h2>
                Hands-on experience.
                <br />A practical <em>approach.</em>
              </h2>
              <p className="about-lead">
                I’m {profile.name}, an independent technical professional based
                in Nairobi.
              </p>
              <p>{profile.intro}</p>
              <p>{profile.coverage}</p>
              <p>
                Looking for someone to join your technical team? I’m also open to
                employment opportunities in engineering and related technical roles.
              </p>
              <a className="text-link" href="#contact">
                Discuss a project or opportunity{" "}
                <ArrowUpRight aria-hidden="true" size={18} />
              </a>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section container">
          <div className="contact-copy">
            <p className="eyebrow">
              <span className="section-num">05 /</span> LET’S DISCUSS YOUR PROJECT
            </p>
            <h2>
              Your next installation
              <br />
              starts with <span>a conversation.</span>
            </h2>
            <p>{profile.coverage}</p>
            <div className="contact-methods">
              <a href={whatsappLink()} target="_blank" rel="noreferrer">
                <MessageCircle aria-hidden="true" size={20} />
                <span><small>WHATSAPP</small>{profile.phoneDisplay}</span>
                <ArrowUpRight aria-hidden="true" size={18} />
              </a>
              <a href={`tel:${profile.phone}`}>
                <Phone aria-hidden="true" size={20} />
                <span><small>CALL ME</small>{profile.phoneDisplay}</span>
                <ArrowUpRight aria-hidden="true" size={18} />
              </a>
              <a href={`mailto:${profile.email}`}>
                <Mail aria-hidden="true" size={20} />
                <span><small>EMAIL</small>{profile.email}</span>
                <ArrowUpRight aria-hidden="true" size={18} />
              </a>
            </div>
            <button
              className="text-link"
              onClick={copyEmail}
              aria-label={copied ? "Email copied" : "Copy email"}
            >
              {copied ? (
                <Check aria-hidden="true" size={16} />
              ) : (
                <Copy aria-hidden="true" size={16} />
              )}
              <span role="status">{copied ? "Email copied" : "Copy email"}</span>
            </button>
          </div>
          <div className="enquiry-panel" aria-labelledby="enquiry-heading">
            <span className="small-label">A SIMPLE START</span>
            <h3 id="enquiry-heading">Tell me what you have in mind.</h3>
            <p>Optional details to help start our conversation.</p>
            <label htmlFor="enquiry-service">What do you need?</label>
            <select
              id="enquiry-service"
              value={enquiryService}
              onChange={(event) => setEnquiryService(event.target.value)}
            >
              <option value="">Help choosing a service</option>
              {services.map((service) => (
                <option key={service.number} value={service.title}>
                  {service.title}
                </option>
              ))}
              <option value="Employment or collaboration">Employment or collaboration</option>
            </select>
            <label htmlFor="enquiry-location">
              Site location <span>(optional)</span>
            </label>
            <input
              id="enquiry-location"
              type="text"
              placeholder="e.g. Westlands, Nairobi"
              maxLength={120}
              value={enquiryLocation}
              onChange={(event) => setEnquiryLocation(event.target.value)}
            />
            <label htmlFor="enquiry-details">
              A little about the job <span>(optional)</span>
            </label>
            <textarea
              id="enquiry-details"
              rows={3}
              placeholder="System type, existing equipment, and preferred timing…"
              maxLength={1000}
              value={enquiryDetails}
              onChange={(event) => setEnquiryDetails(event.target.value)}
              aria-describedby="enquiry-privacy"
            />
            <a
              className="button button-dark"
              href={whatsappLink(enquiryMessage)}
              target="_blank"
              rel="noreferrer"
              aria-describedby="enquiry-privacy"
            >
              Continue on WhatsApp <ArrowUpRight aria-hidden="true" size={18} />
            </a>
            <p className="enquiry-privacy" id="enquiry-privacy">
              Opens a WhatsApp draft; nothing is sent automatically. These details
              are not saved by this site. Please leave out passwords and sensitive
              security information.
            </p>
          </div>
        </section>
      </main>
      <footer className="site-footer container">
        <a href="#home" className="wordmark">
          timon<span>.</span>
        </a>
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <a href="#home" className="text-link">
          Back to top <ArrowUpRight aria-hidden="true" size={16} />
        </a>
      </footer>

      <dialog
        className="detail-dialog"
        ref={dialogRef}
        onCancel={closeModal}
        onClose={closeModal}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeModal();
        }}
        aria-labelledby="dialog-title"
      >
        <div className="dialog-content">
          <button
            className="dialog-close"
            onClick={closeModal}
            aria-label="Close details"
          >
            <X aria-hidden="true" />
          </button>
          {project && (
            <>
              <p className="eyebrow">
                PROJECT {project.number} / {project.category}
              </p>
              <h2 id="dialog-title">{project.title}</h2>
              <p>{project.detail}</p>
              <div className="tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              {project.images.length > 0 ? (
                <div className="gallery">
                  <img
                    src={asset(project.images[slide])}
                    alt={`${project.title}, screenshot ${slide + 1} of ${project.images.length}`}
                  />
                  <div className="gallery-controls">
                    <button
                      aria-label="Previous screenshot"
                      onClick={() =>
                        setSlide(
                          (slide - 1 + project.images.length) %
                            project.images.length,
                        )
                      }
                    >
                      <ArrowLeft aria-hidden="true" size={20} />
                    </button>
                    <span aria-live="polite">
                      {slide + 1} / {project.images.length}
                    </span>
                    <button
                      aria-label="Next screenshot"
                      onClick={() =>
                        setSlide((slide + 1) % project.images.length)
                      }
                    >
                      <ArrowRight aria-hidden="true" size={20} />
                    </button>
                  </div>
                </div>
              ) : (
                <IrrigationArt />
              )}
              <div className="dialog-actions">
                {project.github && (
                  <a
                    className="button button-dark"
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View source <Github aria-hidden="true" size={18} />
                  </a>
                )}
                {project.demo && (
                  <a
                    className="text-link"
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Explore demo <ArrowUpRight aria-hidden="true" size={18} />
                  </a>
                )}
              </div>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
