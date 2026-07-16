import React, { useEffect, useRef, useState } from "react";
import {
  Mail, Phone, Linkedin, Github, ExternalLink, MapPin,
  Menu, X, ArrowUpRight, Code2, Cloud, Bot, Award, GraduationCap
} from "lucide-react";

/* ---------------------------------------------------------
   DATA
--------------------------------------------------------- */
const ROLES = ["Full Stack Developer", "Cloud & DevOps Engineer", "AI Systems Engineer"];

const SKILLS = [
  { cat: "Languages", items: ["Java", "Python", "SQL", "JavaScript", "TypeScript"] },
  { cat: "Frontend", items: ["React.js", "HTML5/CSS3", "Bootstrap", "Tailwind CSS", "Material UI", "Dashboard Design"] },
  { cat: "Backend & APIs", items: ["Spring Boot", "FastAPI", "REST APIs", "Microservices", "GraphQL"] },
  { cat: "Cloud & Identity", items: ["Azure", "Azure AD B2C", "Entra ID", "IAM", "Blob Storage", "AI Gateway", "API Mgmt", "Functions", "ACS"] },
  { cat: "DevOps & Infra", items: ["Docker", "Kubernetes", "Jenkins", "Nginx", "GitLab", "Grafana", "CI/CD", "Prod Deploy"] },
  { cat: "Auth & Security", items: ["OAuth 2.0", "OpenID Connect", "JWT", "SSO", "RBAC"] },
  { cat: "AI & Automation", items: ["LLM Integration", "IVA", "Voicebot/Chatbot", "ElevenLabs", "Prompt Engineering", "AI Agents", "MCP", "n8n"] },
  { cat: "Enterprise & Data", items: ["Slack API", "MS Teams", "Outlook/Graph", "Etisalat", "Vobiz", "MongoDB", "PostgreSQL", "Redis", "Kafka", "RabbitMQ"] },
];

const EXPERIENCE = [
  "Delivered full-stack enterprise applications end-to-end using Java, Python (FastAPI), Spring Boot and React.js — system design, backend APIs, frontend UI and production release.",
  "Designed and implemented enterprise identity solutions using Azure AD B2C, Microsoft Entra ID and IAM, enabling SSO, OAuth2/OpenID Connect authentication, JWT-based sessions and RBAC.",
  "Containerized and deployed microservices with Docker and Kubernetes; built CI/CD pipelines in GitLab and Jenkins, configured Nginx as reverse proxy, and monitored production with Grafana.",
  "Built LLM-powered voicebots and chatbots integrating OpenAI, Claude, Grok and Vertex AI via API keys, combined with ElevenLabs voice synthesis, delivering multilingual IVA experiences.",
  "Integrated enterprise channels — Slack, Microsoft Teams, Outlook (Graph API), Azure Communication Services, Etisalat SMS/OTP and Vobiz telephony — for notifications and voice/SMS delivery.",
  "Automated business processes and dynamic workspace orchestration using n8n and AI agents, reducing manual effort across recurring enterprise workflows.",
  "Managed GitLab repository governance — user access provisioning, branch protection and permission workflows across engineering teams.",
  "Completed a two-week onsite engagement at Early Childhood Authority (UAE), supporting production deployment, Azure AD B2C troubleshooting and enterprise issue resolution.",
];

const PROJECTS = [
  { title: "ECA SSO", tag: "Identity", icon: Cloud, desc: "Centralized SSO on Azure AD B2C, IAM and RBAC — secure auth, user lifecycle and access across enterprise apps; live in production." },
  { title: "Nebula", tag: "AI Assistant", icon: Bot, desc: "Enterprise AI assistant using LLM integration for semantic search, document retrieval, meeting summarization and workflow automation." },
  { title: "TALKDock", tag: "Voice AI", icon: Bot, desc: "IVA / voice platform combining LLM conversation, ElevenLabs synthesis, Vobiz + Etisalat telephony and ACS for multilingual real-time voicebots." },
  { title: "MyWorkspace", tag: "Automation", icon: Code2, desc: "AI-powered dynamic workspace automating workflows via intelligent agents and n8n-based orchestration pipelines." },
  { title: "Slack AI Knowledge Assistant", tag: "Knowledge", icon: Bot, desc: "Semantic search and Q&A across Slack, Teams and Outlook data for enterprise-wide knowledge retrieval." },
  { title: "RBAC Eagle", tag: "Access Control", icon: Cloud, desc: "Centralized RBAC/IAM platform for auth, approval workflows and fine-grained permission management." },
  { title: "SalesCode", tag: "Biometric", icon: Code2, desc: "Facial-recognition attendance and identity verification for secure workforce login/logout." },
  { title: "Sanchu Animal Hospital", tag: "Full-Stack", icon: Code2, desc: "Full-stack hospital management — registration, scheduling, records, billing and admin operations." },
];

const ACHIEVEMENTS = [
  { label: "Service Excellence Award", sub: "Cavin Infotech · 2026" },
  { label: "2nd Prize, Internal Hackathon", sub: "Cavin Infotech · 2026" },
  { label: "12+ GCP Skill Badges", sub: "Google Cloud" },
  { label: "13 Super Badges", sub: "Salesforce" },
];

const NAV = ["About", "Skills", "Experience", "Projects", "Contact"];

/* ---------------------------------------------------------
   REVEAL WRAPPER (scroll-triggered fade/slide-in)
--------------------------------------------------------- */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => setShown(true), delay);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

/* ---------------------------------------------------------
   MAIN
--------------------------------------------------------- */
export default function Portfolio() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // typewriter effect for rotating role
  useEffect(() => {
    const full = ROLES[roleIdx];
    const speed = deleting ? 35 : 70;
    const t = setTimeout(() => {
      if (!deleting) {
        if (typed.length < full.length) {
          setTyped(full.slice(0, typed.length + 1));
        } else {
          setTimeout(() => setDeleting(true), 1300);
        }
      } else {
        if (typed.length > 0) {
          setTyped(typed.slice(0, -1));
        } else {
          setDeleting(false);
          setRoleIdx((i) => (i + 1) % ROLES.length);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [typed, deleting, roleIdx]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <style>{`
        @keyframes floatSlow { 0%,100%{ transform: translate(0,0);} 50%{ transform: translate(14px,-18px);} }
        @keyframes floatSlower { 0%,100%{ transform: translate(0,0);} 50%{ transform: translate(-16px,16px);} }
        .float-a { animation: floatSlow 9s ease-in-out infinite; }
        .float-b { animation: floatSlower 11s ease-in-out infinite; }
        .cursor-blink { animation: blink 1s step-end infinite; }
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>

      {/* ================= NAV ================= */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur border-b border-slate-200 shadow-sm" : "bg-transparent"}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-bold tracking-tight text-slate-900">VP<span className="text-blue-700">.</span></span>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            {NAV.map((n) => (
              <button key={n} onClick={() => scrollTo(n.toLowerCase())} className="hover:text-blue-700 transition-colors">
                {n}
              </button>
            ))}
            <a href="mailto:palanivinoth5513@gmail.com" className="px-4 py-2 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
              Hire Me
            </a>
          </div>
          <button className="md:hidden text-slate-700" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 px-6 py-4 flex flex-col gap-4 text-slate-700">
            {NAV.map((n) => (
              <button key={n} onClick={() => scrollTo(n.toLowerCase())} className="text-left hover:text-blue-700">
                {n}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ================= HERO ================= */}
      <header className="relative overflow-hidden pt-28 pb-16 px-6 bg-gradient-to-b from-white to-slate-50">
        <div className="absolute -top-10 right-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-60 float-a" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-100 rounded-full blur-3xl opacity-50 float-b" />

        <div className="relative max-w-4xl mx-auto text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold border border-teal-200 mb-4">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
              Available for new roles
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900">
              Vinothkumar Palanisamy
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-3 text-xl sm:text-2xl font-semibold text-blue-700 h-8">
              {typed}<span className="cursor-blink">|</span>
            </p>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-4 max-w-2xl mx-auto text-slate-600 text-base sm:text-lg leading-relaxed">
              Full-stack engineer with 2+ years shipping enterprise software end to end — application layer,
              cloud identity, DevOps pipelines, and AI-powered automation.
            </p>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a href="mailto:palanivinoth5513@gmail.com" className="px-6 py-3 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2">
                <Mail size={16} /> Get in touch
              </a>
              <a href="https://github.com/Vinothkumar14" target="_blank" rel="noreferrer" className="px-6 py-3 rounded-full border border-slate-300 text-slate-700 text-sm font-semibold hover:border-blue-700 hover:text-blue-700 transition-colors flex items-center gap-2">
                <Github size={16} /> View GitHub
              </a>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className="mt-4 flex items-center justify-center gap-1.5 text-slate-400 text-sm">
              <MapPin size={14} /> Chennai, India
            </div>
          </Reveal>
        </div>
      </header>

      {/* ================= ABOUT ================= */}
      <section id="about" className="py-14 px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <span className="text-xs font-bold tracking-widest text-blue-700 uppercase">Profile</span>
            <h2 className="text-3xl font-bold mt-2 mb-4 text-slate-900">Professional Summary</h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-slate-600 text-lg leading-relaxed">
              Full-stack engineer with <strong className="text-slate-900">2+ years</strong> building enterprise applications with
              <strong className="text-slate-900"> Java, Python (FastAPI), Spring Boot</strong> and <strong className="text-slate-900">React.js</strong>.
              Skilled in cloud identity (<strong className="text-slate-900">Azure AD B2C, Entra ID, IAM</strong>), DevOps
              (<strong className="text-slate-900">Docker, Kubernetes, GitLab, Jenkins, Nginx, Grafana</strong>), and AI engineering
              (<strong className="text-slate-900">LLM integration, voicebots, IVA, n8n</strong>). Comfortable owning a project end to end —
              frontend, backend, cloud infrastructure and production support.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= SKILLS ================= */}
      <section id="skills" className="py-14 px-6 bg-white border-y border-slate-100">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <span className="text-xs font-bold tracking-widest text-blue-700 uppercase">Toolbox</span>
            <h2 className="text-3xl font-bold mt-2 mb-8 text-slate-900">Technical Skills</h2>
          </Reveal>
          <div className="divide-y divide-slate-100">
            {SKILLS.map((s, i) => (
              <Reveal key={s.cat} delay={i * 40}>
                <div className="grid grid-cols-1 sm:grid-cols-[190px_1fr] gap-x-6 gap-y-1 py-3 items-baseline">
                  <h3 className="text-sm font-bold text-slate-900 whitespace-nowrap">{s.cat}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{s.items.join(", ")}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= EXPERIENCE ================= */}
      <section id="experience" className="py-14 px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <span className="text-xs font-bold tracking-widest text-blue-700 uppercase">Career</span>
            <h2 className="text-3xl font-bold mt-2 mb-2 text-slate-900">Experience</h2>
          </Reveal>
          <Reveal delay={80}>
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-6 pb-3 border-b border-slate-200">
              <div>
                <p className="text-lg font-bold text-slate-900">Junior Engineer</p>
                <p className="text-blue-700 text-sm font-medium">Cavin Infotech (CavinKare Group), Chennai</p>
              </div>
              <span className="text-sm text-slate-400 font-medium">Jun 2024 — Present</span>
            </div>
          </Reveal>

          <div className="space-y-4 border-l-2 border-slate-200 pl-6">
            {EXPERIENCE.map((item, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="relative">
                  <span className="absolute -left-[29px] top-1.5 w-3 h-3 rounded-full bg-white border-2 border-blue-600" />
                  <p className="text-slate-600 leading-relaxed text-sm">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROJECTS ================= */}
      <section id="projects" className="py-14 px-6 bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <span className="text-xs font-bold tracking-widest text-blue-700 uppercase">Selected Work</span>
            <h2 className="text-3xl font-bold mt-2 mb-8 text-slate-900">Key Projects</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.title} delay={(i % 3) * 90}>
                  <div className="group h-full p-6 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all bg-slate-50/40 hover:bg-white">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:bg-blue-700 group-hover:text-white transition-colors">
                        <Icon size={18} />
                      </div>
                      <ArrowUpRight size={16} className="text-slate-300 group-hover:text-blue-700 transition-colors" />
                    </div>
                    <span className="text-[10px] font-bold tracking-wider text-amber-600 uppercase">{p.tag}</span>
                    <h3 className="text-base font-bold text-slate-900 mt-1 mb-2">{p.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{p.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= ACHIEVEMENTS ================= */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <span className="text-xs font-bold tracking-widest text-blue-700 uppercase">Recognition</span>
            <h2 className="text-3xl font-bold mt-2 mb-8 text-slate-900">Achievements &amp; Certifications</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ACHIEVEMENTS.map((a, i) => (
              <Reveal key={a.label} delay={i * 60}>
                <div className="p-4 rounded-2xl border border-slate-200 flex flex-col gap-1.5">
                  <Award size={18} className="text-teal-600" />
                  <p className="font-semibold text-slate-900 text-sm">{a.label}</p>
                  <p className="text-xs text-slate-400">{a.sub}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= EDUCATION ================= */}
      <section className="py-10 px-6 bg-white border-y border-slate-100">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                <GraduationCap size={20} />
              </div>
              <div>
                <p className="font-bold text-slate-900">Bachelor of Technology, Information Technology</p>
                <p className="text-blue-700 text-sm">M Kumarasamy College of Engineering</p>
                <p className="text-slate-400 text-sm mt-0.5">2020 — 2024 · CGPA: 8.9/10</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= CONTACT / FOOTER ================= */}
      <footer id="contact" className="py-16 px-6 bg-slate-900 text-white text-center">
        <Reveal>
          <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">Get in touch</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-3">Let's build something together.</h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-6">
            Open to full-stack, cloud/DevOps and AI engineering roles. Reach out any time.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <a href="mailto:palanivinoth5513@gmail.com" className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 transition-colors text-sm font-semibold flex items-center gap-2">
              <Mail size={15} /> palanivinoth5513@gmail.com
            </a>
            <a href="tel:+919500868447" className="px-5 py-2.5 rounded-full border border-slate-700 hover:border-blue-500 transition-colors text-sm font-semibold flex items-center gap-2">
              <Phone size={15} /> +91 9500868447
            </a>
          </div>
        </Reveal>
        <Reveal delay={180}>
          <div className="flex items-center justify-center gap-6 text-slate-400">
            <a href="https://linkedin.com/in/vinoth2003" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors"><Linkedin size={20} /></a>
            <a href="https://github.com/Vinothkumar14" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors"><Github size={20} /></a>
            <a href="https://leetcode.com/u/Vinoth7" target="_blank" rel="noreferrer" className="text-sm font-semibold hover:text-blue-400 transition-colors">LeetCode</a>
          </div>
        </Reveal>
        <p className="mt-10 text-xs text-slate-600">© 2026 Vinothkumar Palanisamy. Built with React.</p>
      </footer>
    </div>
  );
}
