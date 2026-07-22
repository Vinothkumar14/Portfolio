import React, { useEffect, useRef, useState } from "react";
import {
  Mail, Phone, Linkedin, Github, ExternalLink, MapPin,
  Menu, X, ArrowUpRight, Code2, Cloud, Bot, Award, GraduationCap,
  Volume2, VolumeX, Sun, Moon, User
} from "lucide-react";

/* ---------------------------------------------------------
   DATA
--------------------------------------------------------- */
const ROLES = ["AI Full Stack Developer"];

const SKILLS = [
  { cat: "Languages", items: ["Java", "Python", "SQL", "JavaScript", "TypeScript"] },
  { cat: "Frontend", items: ["React.js", "HTML5/CSS3", "Bootstrap", "Tailwind CSS", "Material UI", "Dashboard Design"] },
  { cat: "Backend & APIs", items: ["Spring Boot", "FastAPI", "REST APIs", "Microservices"] },
  { cat: "Cloud & Identity", items: ["Azure", "Azure AD B2C", "Entra ID", "IAM", "Blob Storage", "AI Gateway", "API Mgmt", "Functions", "ACS"] },
  { cat: "DevOps & Infra", items: ["Docker", "Kubernetes", "Jenkins", "Nginx", "GitLab", "Grafana", "CI/CD", "Prod Deploy"] },
  { cat: "Auth & Security", items: ["OAuth 2.0", "OpenID Connect", "JWT", "SSO"] },
  { cat: "AI & Automation", items: ["LLM Integration", "IVA", "Voicebot/Chatbot", "ElevenLabs", "Prompt Engineering", "AI Agents", "MCP", "n8n"] },
  { cat: "Communication APIs", items: ["SendGrid", "Twilio", "Vapi", "Slack API", "MS Teams", "Outlook/Graph", "Etisalat", "Vobiz"] },
  { cat: "Data & Messaging", items: ["MongoDB", "PostgreSQL", "Redis", "Kafka", "RabbitMQ"] },
];

const EXPERIENCE = [
  "Delivered full-stack enterprise applications end-to-end using Java, Python (FastAPI), Spring Boot and React.js — system design, backend APIs, frontend UI and production release.",
  "Designed and implemented enterprise identity solutions using Azure AD B2C, Microsoft Entra ID and IAM, enabling SSO and OAuth2/OpenID Connect authentication with JWT-based sessions.",
  "Containerized and deployed microservices with Docker and Kubernetes; built CI/CD pipelines in GitLab and Jenkins, configured Nginx as reverse proxy, and monitored production with Grafana.",
  "Built LLM-powered voicebots and chatbots integrating OpenAI, Claude, Grok and Vertex AI via API keys, combined with ElevenLabs voice synthesis, delivering multilingual IVA experiences.",
  "Integrated enterprise channels — Slack, Microsoft Teams, Outlook (Graph API), SendGrid, Twilio, Vapi, Azure Communication Services, Etisalat SMS/OTP and Vobiz telephony — for notifications and voice/SMS delivery.",
  "Automated business processes and dynamic workspace orchestration using n8n and AI agents, reducing manual effort across recurring enterprise workflows.",
  "Managed GitLab repository governance — user access provisioning, branch protection and permission workflows across engineering teams.",
  "Completed a two-week onsite engagement at Early Childhood Authority (UAE), supporting production deployment, Azure AD B2C troubleshooting and enterprise issue resolution.",
  "Built numerous additional proof-of-concept (POC) projects exploring LLM automation, voice AI and enterprise integrations beyond the projects listed below.",
];

const PROJECTS = [
  {
    title: "ECA SSO", tag: "Identity", icon: Cloud,
    desc: "Centralized SSO on Azure AD B2C and IAM — secure auth, user lifecycle and access across enterprise apps; live in production.",
    links: [
      { label: "Live App", url: "https://app.parentfriendlylabel.ae" },
      { label: "Research Portal", url: "https://portal.researchgrants.eca.gov.ae/" },
    ],
  },
  {
    title: "Nebula", tag: "AI Assistant", icon: Bot,
    desc: "Enterprise AI assistant using LLM integration for semantic search, document retrieval, meeting summarization and workflow automation.",
    links: [{ label: "Live Agent", url: "https://mistynebula.com/agents/my/onedrive-email/session" }],
  },
  {
    title: "TALKDock", tag: "Voice AI", icon: Bot,
    desc: "IVA / voice platform combining LLM conversation, ElevenLabs synthesis, Vobiz + Etisalat telephony and ACS for multilingual real-time voicebots.",
    links: [{ label: "Live Demo", url: "https://talkdock-dev.ckdigital.in/signin" }],
  },
  {
    title: "MyWorkspace", tag: "Automation", icon: Code2,
    desc: "AI-powered dynamic workspace automating workflows via intelligent agents and n8n-based orchestration pipelines.",
    links: [{ label: "Live Demo", url: "https://myworkspacedev.ckdigital.in/" }],
  },
  {
    title: "GitHub–Slack AI Assistant", tag: "DevOps AI", icon: Bot,
    desc: "AI assistant that monitors Jira tickets and GitHub commits, summarizes them using an LLM, and automatically posts updates to the relevant Slack channel.",
    links: [{ label: "GitHub Repo", url: "https://github.com/Vinothkumar14/github-slack-mcp-server-ai" }],
  },
  {
    title: "Outlook-to-Slack Webhook", tag: "Automation", icon: Code2,
    desc: "Cron-based automation that processes incoming Outlook emails against configurable rules and routes matching messages into the right Slack channel in real time.",
    links: [],
  },
  {
    title: "SalesCode", tag: "Biometric", icon: Code2,
    desc: "Facial-recognition attendance and identity verification for secure workforce login/logout.",
    links: [{ label: "Live Demo", url: "https://salescodeuat.ckdigital.in/facedetection/docs" }],
  },
  {
    title: "Sanchu Animal Hospital", tag: "Full-Stack", icon: Code2,
    desc: "Full-stack hospital management — registration, scheduling, records, billing and admin operations.",
    links: [{ label: "Live Site", url: "https://sanchuanimalhospital.com/" }],
  },
];

const ACHIEVEMENTS = [
  { label: "Service Excellence Award", sub: "Cavin Infotech · 2026" },
  { label: "2nd Prize, Internal Hackathon", sub: "Cavin Infotech · 2026" },
  { label: "12+ GCP Skill Badges", sub: "Google Cloud" },
  { label: "13 Super Badges", sub: "Salesforce" },
];

const NAV = ["About", "Skills", "Experience", "Projects", "Contact"];

const SUMMARY_SENTENCES = [
  "Hi, I'm Vinothkumar Palanisamy, an A I Full Stack Developer.",
  "I have two plus years of experience building enterprise applications with Java, Python FastAPI, Spring Boot, and React.",
  "I work across cloud identity with Azure A D B2C, Entra I D, and I A M.",
  "I handle DevOps with Docker, Kubernetes, GitLab, Jenkins, Nginx, and Grafana.",
  "And I build A I systems — L L M integration, voicebots, intelligent virtual assistants, and n8n automation.",
  "I've also built several proof of concept projects across A I automation and enterprise integrations.",
  "I'm comfortable owning a project end to end, from the frontend and backend, to cloud infrastructure and production support.",
];

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
   TALKING AVATAR (animated while narrating)
--------------------------------------------------------- */
function TalkingAvatar({ speaking, dark }) {
  return (
    <div className="relative w-20 h-20 shrink-0">
      <div
        className={`absolute inset-0 rounded-full ${speaking ? "animate-ping" : ""} ${dark ? "bg-blue-500/30" : "bg-blue-400/30"}`}
      />
      <div
        className={`relative w-20 h-20 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
          speaking
            ? dark ? "border-blue-400 bg-blue-500/20" : "border-blue-500 bg-blue-50"
            : dark ? "border-slate-700 bg-slate-800" : "border-slate-200 bg-slate-100"
        }`}
      >
        <User size={34} className={speaking ? "text-blue-500" : dark ? "text-slate-400" : "text-slate-500"} />
      </div>
      {/* mouth / waveform bars */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-end gap-[3px] h-4">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={`w-[3px] rounded-full ${speaking ? "bg-blue-500" : dark ? "bg-slate-600" : "bg-slate-300"}`}
            style={{
              height: speaking ? undefined : "4px",
              animation: speaking ? `talkbar 0.9s ease-in-out ${i * 0.12}s infinite` : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   MAIN
--------------------------------------------------------- */
export default function Portfolio() {
  const [dark, setDark] = useState(false);
  const [roleIdx, setRoleIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const queueRef = useRef([]);

  /* ---------- theme tokens (manual, since dark: variants need a build step) ---------- */
  const T = dark
    ? {
        page: "bg-slate-950 text-slate-100",
        nav: scrolled ? "bg-slate-950/90 backdrop-blur border-b border-slate-800 shadow-sm" : "bg-transparent",
        navText: "text-slate-300",
        heroGrad: "from-slate-950 to-slate-900",
        blobA: "bg-blue-500/10",
        blobB: "bg-teal-500/10",
        heading: "text-white",
        eyebrow: "text-blue-400",
        body: "text-slate-300",
        bodyMuted: "text-slate-400",
        sectionAlt: "bg-slate-900 border-slate-800",
        card: "bg-slate-900/60 border-slate-800 hover:border-blue-500/60",
        cardText: "text-slate-400",
        chip: "bg-slate-900 border-slate-700 text-slate-300",
        chipHover: "hover:border-blue-500 hover:text-blue-400",
        pillBtn: "bg-white text-slate-900 hover:bg-blue-500 hover:text-white",
        outlineBtn: "border-slate-700 text-slate-300 hover:border-blue-500 hover:text-blue-400",
        border: "border-slate-800",
        timelineDot: "bg-slate-950 border-blue-500",
        badgeBg: "bg-teal-500/10 text-teal-400 border-teal-500/30",
        footerBg: "bg-black",
      }
    : {
        page: "bg-slate-50 text-slate-900",
        nav: scrolled ? "bg-white/90 backdrop-blur border-b border-slate-200 shadow-sm" : "bg-transparent",
        navText: "text-slate-600",
        heroGrad: "from-white to-slate-50",
        blobA: "bg-blue-100",
        blobB: "bg-teal-100",
        heading: "text-slate-900",
        eyebrow: "text-blue-700",
        body: "text-slate-600",
        bodyMuted: "text-slate-400",
        sectionAlt: "bg-white border-slate-100",
        card: "bg-slate-50/40 border-slate-200 hover:border-blue-300",
        cardText: "text-slate-500",
        chip: "bg-white border-slate-200 text-slate-600",
        chipHover: "hover:border-blue-400 hover:text-blue-700",
        pillBtn: "bg-slate-900 text-white hover:bg-blue-700",
        outlineBtn: "border-slate-300 text-slate-700 hover:border-blue-700 hover:text-blue-700",
        border: "border-slate-200",
        timelineDot: "bg-white border-blue-600",
        badgeBg: "bg-teal-50 text-teal-700 border-teal-200",
        footerBg: "bg-slate-900",
      };

  // typewriter effect
  useEffect(() => {
    const full = ROLES[roleIdx];
    const speed = deleting ? 35 : 70;
    const t = setTimeout(() => {
      if (!deleting) {
        if (typed.length < full.length) setTyped(full.slice(0, typed.length + 1));
        else setTimeout(() => setDeleting(true), 1600);
      } else {
        if (typed.length > 0) setTyped(typed.slice(0, -1));
        else {
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

  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const pickVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) return null;
    // Prefer higher-quality "natural/neural/online" engines, then common male-sounding names, then any en voice.
    const byQuality = voices.find((v) => /natural|neural|online/i.test(v.name) && /male/i.test(v.name));
    const byName = voices.find((v) => /david|daniel|alex|fred|george|ravi|guy|mark/i.test(v.name));
    const byGender = voices.find((v) => /male/i.test(v.name) && /en/i.test(v.lang));
    const anyEnglish = voices.find((v) => /en/i.test(v.lang));
    return byQuality || byName || byGender || anyEnglish || voices[0];
  };

  const speakQueue = (sentences) => {
    if (!sentences.length) {
      setIsSpeaking(false);
      return;
    }
    const [next, ...rest] = sentences;
    const utter = new SpeechSynthesisUtterance(next);
    const voice = pickVoice();
    if (voice) utter.voice = voice;
    utter.pitch = 1.0;
    utter.rate = 0.96;
    utter.onend = () => speakQueue(rest);
    utter.onerror = () => setIsSpeaking(false);
    queueRef.current = rest;
    window.speechSynthesis.speak(utter);
  };

  const speakSummary = () => {
    if (!("speechSynthesis" in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    setIsSpeaking(true);
    // voices sometimes load async on first call
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = () => speakQueue(SUMMARY_SENTENCES);
    } else {
      speakQueue(SUMMARY_SENTENCES);
    }
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${T.page}`}>
      <style>{`
        @keyframes floatSlow { 0%,100%{ transform: translate(0,0);} 50%{ transform: translate(14px,-18px);} }
        @keyframes floatSlower { 0%,100%{ transform: translate(0,0);} 50%{ transform: translate(-16px,16px);} }
        .float-a { animation: floatSlow 9s ease-in-out infinite; }
        .float-b { animation: floatSlower 11s ease-in-out infinite; }
        .cursor-blink { animation: blink 1s step-end infinite; }
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes talkbar {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
      `}</style>

      {/* ================= NAV ================= */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${T.nav}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className={`font-bold tracking-tight ${T.heading}`}>VP<span className="text-blue-500">.</span></span>
          <div className={`hidden md:flex items-center gap-8 text-sm font-medium ${T.navText}`}>
            {NAV.map((n) => (
              <button key={n} onClick={() => scrollTo(n.toLowerCase())} className="hover:text-blue-500 transition-colors">
                {n}
              </button>
            ))}
            <button
              onClick={() => setDark((d) => !d)}
              aria-label="Toggle theme"
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${dark ? "border-slate-700 hover:border-blue-500" : "border-slate-300 hover:border-blue-500"}`}
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a href="mailto:palanivinoth5513@gmail.com" className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${T.pillBtn}`}>
              Hire Me
            </a>
          </div>
          <div className="md:hidden flex items-center gap-3">
            <button onClick={() => setDark((d) => !d)} className={T.navText}>
              {dark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className={T.navText} onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className={`md:hidden px-6 py-4 flex flex-col gap-4 border-t ${dark ? "bg-slate-950 border-slate-800 text-slate-300" : "bg-white border-slate-200 text-slate-700"}`}>
            {NAV.map((n) => (
              <button key={n} onClick={() => scrollTo(n.toLowerCase())} className="text-left hover:text-blue-500">
                {n}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ================= HERO ================= */}
      <header className={`relative overflow-hidden pt-28 pb-16 px-6 bg-gradient-to-b ${T.heroGrad}`}>
        <div className={`absolute -top-10 right-10 w-72 h-72 rounded-full blur-3xl opacity-60 float-a ${T.blobA}`} />
        <div className={`absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl opacity-50 float-b ${T.blobB}`} />

        <div className="relative max-w-4xl mx-auto text-center">
          <Reveal>
            <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border mb-4 ${T.badgeBg}`}>
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
              Available for new roles
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className={`text-4xl sm:text-6xl font-extrabold tracking-tight ${T.heading}`}>
              Vinothkumar Palanisamy
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-3 text-xl sm:text-2xl font-semibold text-blue-500 h-8">
              {typed}<span className="cursor-blink">|</span>
            </p>
          </Reveal>

          <Reveal delay={240}>
            <p className={`mt-4 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed ${T.body}`}>
              Full-stack engineer with 2+ years shipping enterprise software end to end — application layer,
              cloud identity, DevOps pipelines, and AI-powered automation.
            </p>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a href="mailto:palanivinoth5513@gmail.com" className={`px-6 py-3 rounded-full text-sm font-semibold transition-colors flex items-center gap-2 ${T.pillBtn}`}>
                <Mail size={16} /> Get in touch
              </a>
              <a href="https://github.com/Vinothkumar14" target="_blank" rel="noreferrer" className={`px-6 py-3 rounded-full border text-sm font-semibold transition-colors flex items-center gap-2 ${T.outlineBtn}`}>
                <Github size={16} /> View GitHub
              </a>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className={`mt-4 flex items-center justify-center gap-1.5 text-sm ${T.bodyMuted}`}>
              <MapPin size={14} /> Chennai, India
            </div>
          </Reveal>
        </div>
      </header>

      {/* ================= AI NARRATOR (shown on open) ================= */}
      <section className="px-6 -mt-4">
        <div className="max-w-3xl mx-auto">
          <Reveal delay={100}>
            <div className={`rounded-3xl border p-6 flex items-center gap-5 ${T.card} ${T.border}`}>
              <TalkingAvatar speaking={isSpeaking} dark={dark} />
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold ${T.heading}`}>AI Voice Introduction</p>
                <p className={`text-xs mt-0.5 ${T.cardText}`}>
                  {isSpeaking ? "Speaking — tap stop to end." : "Tap play to hear my profile summary narrated aloud."}
                </p>
              </div>
              <button
                onClick={speakSummary}
                className={`shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold border transition-colors ${
                  isSpeaking
                    ? "bg-blue-600 text-white border-blue-600"
                    : dark ? "bg-slate-800 text-blue-400 border-slate-700 hover:bg-slate-700" : "bg-white text-blue-700 border-blue-200 hover:bg-blue-50"
                }`}
              >
                {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
                {isSpeaking ? "Stop" : "Play"}
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section id="about" className="py-14 px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <span className={`text-xs font-bold tracking-widest uppercase ${T.eyebrow}`}>Profile</span>
            <h2 className={`text-3xl font-bold mt-2 mb-4 ${T.heading}`}>Professional Summary</h2>
          </Reveal>
          <Reveal delay={100}>
            <p className={`text-lg leading-relaxed ${T.body}`}>
              Full-stack engineer with <strong className={T.heading}>2+ years</strong> building enterprise applications with
              <strong className={T.heading}> Java, Python (FastAPI), Spring Boot</strong> and <strong className={T.heading}>React.js</strong>.
              Skilled in cloud identity (<strong className={T.heading}>Azure AD B2C, Entra ID, IAM</strong>), DevOps
              (<strong className={T.heading}>Docker, Kubernetes, GitLab, Jenkins, Nginx, Grafana</strong>), and AI engineering
              (<strong className={T.heading}>LLM integration, voicebots, IVA, n8n</strong>). Also built numerous additional
              proof-of-concept (POC) projects across AI automation and enterprise integrations. Comfortable owning a project end to
              end — frontend, backend, cloud infrastructure and production support.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= SKILLS ================= */}
      <section id="skills" className={`py-14 px-6 border-y ${T.sectionAlt}`}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <span className={`text-xs font-bold tracking-widest uppercase ${T.eyebrow}`}>Toolbox</span>
            <h2 className={`text-3xl font-bold mt-2 mb-8 ${T.heading}`}>Technical Skills</h2>
          </Reveal>
          <div className={`divide-y ${dark ? "divide-slate-800" : "divide-slate-100"}`}>
            {SKILLS.map((s, i) => (
              <Reveal key={s.cat} delay={i * 40}>
                <div className="grid grid-cols-1 sm:grid-cols-[190px_1fr] gap-x-6 gap-y-1 py-3 items-baseline">
                  <h3 className={`text-sm font-bold whitespace-nowrap ${T.heading}`}>{s.cat}</h3>
                  <p className={`text-sm leading-relaxed ${T.body}`}>{s.items.join(", ")}</p>
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
            <span className={`text-xs font-bold tracking-widest uppercase ${T.eyebrow}`}>Career</span>
            <h2 className={`text-3xl font-bold mt-2 mb-2 ${T.heading}`}>Experience</h2>
          </Reveal>
          <Reveal delay={80}>
            <div className={`flex flex-wrap items-baseline justify-between gap-2 mb-6 pb-3 border-b ${T.border}`}>
              <div>
                <p className={`text-lg font-bold ${T.heading}`}>Junior Engineer</p>
                <p className="text-blue-500 text-sm font-medium">Cavin Infotech (CavinKare Group), Chennai</p>
              </div>
              <span className={`text-sm font-medium ${T.bodyMuted}`}>Jun 2024 — Present</span>
            </div>
          </Reveal>

          <div className={`space-y-4 border-l-2 pl-6 ${T.border}`}>
            {EXPERIENCE.map((item, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="relative">
                  <span className={`absolute -left-[29px] top-1.5 w-3 h-3 rounded-full border-2 ${T.timelineDot}`} />
                  <p className={`leading-relaxed text-sm ${T.body}`}>{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROJECTS ================= */}
      <section id="projects" className={`py-14 px-6 border-y ${T.sectionAlt}`}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <span className={`text-xs font-bold tracking-widest uppercase ${T.eyebrow}`}>Selected Work</span>
            <h2 className={`text-3xl font-bold mt-2 mb-8 ${T.heading}`}>Key Projects</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.title} delay={(i % 3) * 90}>
                  <div className={`group h-full flex flex-col p-6 rounded-2xl border hover:shadow-lg transition-all ${T.card}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${dark ? "bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white" : "bg-blue-50 text-blue-700 group-hover:bg-blue-700 group-hover:text-white"}`}>
                        <Icon size={18} />
                      </div>
                      <ArrowUpRight size={16} className={`transition-colors ${dark ? "text-slate-700 group-hover:text-blue-400" : "text-slate-300 group-hover:text-blue-700"}`} />
                    </div>
                    <span className="text-[10px] font-bold tracking-wider text-amber-500 uppercase">{p.tag}</span>
                    <h3 className={`text-base font-bold mt-1 mb-2 ${T.heading}`}>{p.title}</h3>
                    <p className={`text-sm leading-relaxed flex-1 ${T.cardText}`}>{p.desc}</p>
                    {p.links && p.links.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {p.links.map((l) => (
                          <a
                            key={l.url}
                            href={l.url}
                            target="_blank"
                            rel="noreferrer"
                            className={`inline-flex items-center gap-1 text-xs font-semibold rounded-full px-3 py-1.5 border transition-colors ${
                              dark
                                ? "text-blue-400 border-blue-500/40 hover:bg-blue-500 hover:text-white hover:border-blue-500"
                                : "text-blue-700 border-blue-200 hover:bg-blue-700 hover:text-white hover:border-blue-700"
                            }`}
                          >
                            {l.label} <ExternalLink size={12} />
                          </a>
                        ))}
                      </div>
                    )}
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
            <span className={`text-xs font-bold tracking-widest uppercase ${T.eyebrow}`}>Recognition</span>
            <h2 className={`text-3xl font-bold mt-2 mb-8 ${T.heading}`}>Achievements &amp; Certifications</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ACHIEVEMENTS.map((a, i) => (
              <Reveal key={a.label} delay={i * 60}>
                <div className={`p-4 rounded-2xl border flex flex-col gap-1.5 ${T.border}`}>
                  <Award size={18} className="text-teal-500" />
                  <p className={`font-semibold text-sm ${T.heading}`}>{a.label}</p>
                  <p className={`text-xs ${T.bodyMuted}`}>{a.sub}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= EDUCATION ================= */}
      <section className={`py-10 px-6 border-y ${T.sectionAlt}`}>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="flex items-start gap-4">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${dark ? "bg-blue-500/10 text-blue-400" : "bg-blue-50 text-blue-700"}`}>
                <GraduationCap size={20} />
              </div>
              <div>
                <p className={`font-bold ${T.heading}`}>Bachelor of Technology, Information Technology</p>
                <p className="text-blue-500 text-sm">M Kumarasamy College of Engineering</p>
                <p className={`text-sm mt-0.5 ${T.bodyMuted}`}>2020 — 2024 · CGPA: 8.9/10</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= CONTACT / FOOTER ================= */}
      <footer id="contact" className={`py-16 px-6 text-white text-center ${T.footerBg}`}>
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
