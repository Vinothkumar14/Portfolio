import React, { useEffect, useRef, useState } from "react";
import {
  Mail, Phone, Linkedin, Github, ExternalLink, MapPin,
  Menu, X, ArrowUpRight, Code2, Cloud, Bot, Award, GraduationCap,
  Volume2, Sun, Moon
} from "lucide-react";

/* ===========================================================
   DATA
=========================================================== */
const ROLES = ["Full Stack Developer", "AI Engineer", "Cloud & DevOps Engineer", "Software Engineer"];

const SKILLS = [
  { cat: "Languages", items: ["Java", "Python", "SQL", "JavaScript", "TypeScript"] },
  { cat: "Frontend", items: ["React.js", "HTML5/CSS3", "Bootstrap", "Tailwind CSS", "Material UI", "Dashboard Design"] },
  { cat: "Backend & APIs", items: ["Spring Boot", "FastAPI", "Node.js", "REST APIs", "Microservices"] },
  { cat: "Cloud & Identity", items: ["Azure", "Azure AD B2C", "Entra ID", "IAM", "Blob Storage", "AI Gateway", "API Mgmt", "Functions", "ACS"] },
  { cat: "DevOps & Infra", items: ["Docker", "Kubernetes", "Jenkins", "Nginx", "GitLab", "Grafana", "CI/CD", "Prod Deploy"] },
  { cat: "Auth & Security", items: ["OAuth 2.0", "OpenID Connect", "JWT", "SSO"] },
  { cat: "AI & Automation", items: ["LLM Integration", "RAG", "AI Agents", "MCP", "OpenAI", "Claude", "Gemini", "Groq", "OpenRouter", "ElevenLabs", "Prompt Engineering", "n8n"] },
  { cat: "Communication APIs", items: ["SendGrid", "Twilio", "Vapi", "Slack API", "MS Teams", "Outlook/Graph", "Etisalat", "Vobiz"] },
  { cat: "Data & Messaging", items: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Qdrant", "Kafka", "RabbitMQ"] },
];

const EXPERIENCE = [
  "Delivered full-stack enterprise applications end-to-end using Java, Python (FastAPI), Spring Boot and React.js — system design, backend APIs, frontend UI and production release.",
  "Designed and implemented enterprise identity solutions using Azure AD B2C, Microsoft Entra ID and IAM, enabling SSO and OAuth2/OpenID Connect authentication with JWT-based sessions.",
  "Containerized and deployed microservices with Docker and Kubernetes; built CI/CD pipelines in GitLab and Jenkins, configured Nginx as reverse proxy, and monitored production with Grafana.",
  "Built LLM-powered voicebots, chatbots and RAG-based AI agents integrating OpenAI, Claude, Gemini, Groq and OpenRouter, combined with ElevenLabs voice synthesis, delivering multilingual IVA experiences.",
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
  { icon: Award, label: "Service Excellence Award", sub: "Cavin Infotech · 2026" },
  { icon: Award, label: "2nd Prize, Internal Hackathon", sub: "Cavin Infotech · 2026" },
  { value: 12, suffix: "+", icon: Award, label: "Google Cloud Skill Badges", sub: "GCP" },
  { value: 13, suffix: "", icon: Award, label: "Salesforce Super Badges", sub: "Salesforce" },
];

const NAV = ["About", "Skills", "Experience", "Projects", "Contact"];

// Intro script — each stage's spoken lines are paired with the hero role they narrate.
const INTRO_STAGES = [
  {
    role: "Full Stack Developer",
    lines: [
      "Hi, I'm Vinothkumar Palanisamy AI portfolio assistant.",
      "Vinothkumar is a Full Stack Software Engineer, building scalable, production-ready applications.",
    ],
  },
  {
    role: "AI Engineer",
    lines: ["He also builds A I powered applications, agents, RAG systems, and LLM workflows."],
  },
  {
    role: "Cloud & DevOps Engineer",
    lines: ["He works with cloud platforms, containers, CI CD, and scalable infrastructure."],
  },
  {
    role: "Software Engineer",
    lines: [
      "He designs and builds production-ready software systems.",
      "Explore the portfolio to learn more about his work.",
    ],
  },
];

const QUICK_ACTIONS = [
  {
    label: "About Me",
    reply: "Vinothkumar is a Full Stack Software Engineer with over two years of experience building enterprise applications and AI powered systems.",
  },
  {
    label: "AI Projects",
    reply: "His AI work includes LLM applications, RAG systems, AI agents, MCP integrations, voice AI, and workflow automation.",
  },
  {
    label: "Tech Stack",
    reply: "His core stack includes Python, FastAPI, Java, Spring Boot, React, TypeScript, Azure, Docker, Kubernetes, MongoDB, PostgreSQL, Kafka, and Redis.",
  },
  {
    label: "Experience",
    reply: "He has worked on enterprise authentication, cloud applications, AI platforms, workflow automation, and production systems.",
  },
  {
    label: "Contact",
    reply: "You can connect with Vinothkumar through LinkedIn, GitHub, or the contact section below.",
  },
];

/* ===========================================================
   REVEAL (scroll-triggered fade/slide-in)
=========================================================== */
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

/* ===========================================================
   COUNT UP
=========================================================== */
function CountUp({ value, suffix = "", className = "" }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const duration = 900;
            const start = performance.now();
            const tick = (now) => {
              const progress = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - progress, 3);
              setN(Math.round(eased * value));
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {n}
      {suffix}
    </span>
  );
}

/* ===========================================================
   DYNAMIC ROLE — continuously rotating hero title
=========================================================== */
function DynamicRole({ dark }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % ROLES.length), 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ minHeight: "2.75rem" }} className="flex items-center justify-center lg:justify-start">
      <span
        key={index}
        className="role-enter inline-flex items-center px-4 py-1.5 rounded-full text-lg sm:text-xl font-semibold border"
        style={{
          color: dark ? "#60a5fa" : "#1d4ed8",
          borderColor: dark ? "rgba(96,165,250,0.4)" : "rgba(29,78,216,0.25)",
          background: dark ? "rgba(96,165,250,0.08)" : "rgba(29,78,216,0.05)",
        }}
        aria-live="off"
      >
        {ROLES[index]}
      </span>
      <span className="sr-only">
        Roles: {ROLES.join(", ")}
      </span>
    </div>
  );
}

/* ===========================================================
   TECHNICAL BACKGROUND — subtle animated architecture diagram
=========================================================== */
function TechBackground({ dark }) {
  const nodes = ["User", "AI Agent", "LLM", "RAG", "MCP", "APIs", "Databases", "Cloud"];
  const stroke = dark ? "rgba(96,165,250,0.35)" : "rgba(29,78,216,0.22)";
  const dot = dark ? "rgba(45,212,191,0.9)" : "rgba(13,148,136,0.7)";
  const spacing = 100 / (nodes.length + 1);

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ opacity: dark ? 0.35 : 0.22 }}
    >
      {nodes.slice(0, -1).map((_, i) => {
        const x = spacing * (i + 1);
        const x2 = spacing * (i + 2);
        return (
          <line
            key={i}
            x1={x} y1="50" x2={x2} y2="50"
            stroke={stroke} strokeWidth="0.3" strokeDasharray="1.5 1.5"
            className="tech-line"
          />
        );
      })}
      {nodes.map((n, i) => {
        const x = spacing * (i + 1);
        return (
          <g key={n}>
            <circle cx={x} cy="50" r="1.6" fill={dot} className="tech-node" style={{ animationDelay: `${i * 0.3}s` }} />
            <text x={x} y="58" fontSize="2.6" textAnchor="middle" fill={stroke}>{n}</text>
          </g>
        );
      })}
    </svg>
  );
}

/* ===========================================================
   AI PORTFOLIO ASSISTANT
   States: idle | thinking | speaking | complete
=========================================================== */
function AIPortfolioAssistant({ dark }) {
  const [state, setState] = useState("idle");
  const [bubbleText, setBubbleText] = useState("Preparing your introduction...");
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [needsGesture, setNeedsGesture] = useState(false);

  // In-memory guards (NOT sessionStorage — browser storage APIs are unsupported
  // in this artifact preview; swap in real sessionStorage in your own deployment).
  const hasStartedRef = useRef(false);
  const gestureUnlockedRef = useRef(false);
  const timeoutsRef = useRef([]);

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };
  const after = (ms, fn) => {
    const id = setTimeout(fn, ms);
    timeoutsRef.current.push(id);
    return id;
  };

  const pickVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) return null;
    const byQuality = voices.find((v) => /natural|neural|online/i.test(v.name));
    const byName = voices.find((v) => /david|daniel|alex|fred|george|guy|mark/i.test(v.name));
    const anyEnglish = voices.find((v) => /en/i.test(v.lang));
    return byQuality || byName || anyEnglish || voices[0];
  };

const speakLines = (lines, onAllDone) => {
  if (!lines || lines.length === 0) {
    onAllDone?.();
    return;
  }

  const [line, ...rest] = lines;

  const utter = new SpeechSynthesisUtterance(line);

  const speak = () => {
    const voices = window.speechSynthesis.getVoices();

    const voice =
      voices.find((v) =>
        /natural|neural|online/i.test(v.name)
      ) ||
      voices.find((v) =>
        /en-US|en-GB|en-IN/i.test(v.lang)
      ) ||
      voices.find((v) =>
        /^en/i.test(v.lang)
      );

    if (voice) {
      utter.voice = voice;
    }

    utter.lang = "en-US";
    utter.rate = 0.95;
    utter.pitch = 1;

    utter.onstart = () => {
      gestureUnlockedRef.current = true;
      setNeedsGesture(false);
      setState("speaking");
    };

    utter.onend = () => {
      setTimeout(() => {
        speakLines(rest, onAllDone);
      }, 250);
    };

    utter.onerror = (event) => {
      console.warn("Speech synthesis error:", event.error);

      // Do not get stuck if speech fails.
      // Continue to the next line.
      setTimeout(() => {
        speakLines(rest, onAllDone);
      }, 300);
    };

    window.speechSynthesis.speak(utter);
  };

  // Some browsers load voices asynchronously
  const voices = window.speechSynthesis.getVoices();

  if (voices.length === 0) {
    window.speechSynthesis.addEventListener(
      "voiceschanged",
      speak,
      { once: true }
    );
  } else {
    speak();
  }
};

  const runIntroSequence = () => {
    setState("thinking");
    setBubbleText("Preparing your introduction...");

    after(900, () => {
      setState("speaking");
      let stageIdx = 0;

      const playStage = () => {
        if (stageIdx >= INTRO_STAGES.length) {
          setState("complete");
          setBubbleText("Explore my work below.");
          after(2200, () => {
            setState("idle");
            setShowQuickActions(true);
          });
          return;
        }
        const stage = INTRO_STAGES[stageIdx];
        setBubbleText(stage.lines.join(" "));
        speakLines(stage.lines, () => {
          stageIdx += 1;
          playStage();
        });
      };
      playStage();
    });
  };
useEffect(() => {
  if (!("speechSynthesis" in window)) {
    setState("complete");
    setBubbleText("Voice introduction is not supported in this browser.");
    setShowQuickActions(true);
    return;
  }

  let cancelled = false;

  const startIntroduction = () => {
    if (cancelled) return;

    window.speechSynthesis.cancel();

    setState("thinking");
    setBubbleText("Preparing your introduction...");

    setTimeout(() => {
      if (cancelled) return;

      setState("speaking");

      let stageIdx = 0;

      const playStage = () => {
        if (cancelled) return;

        if (stageIdx >= INTRO_STAGES.length) {
          setState("complete");
          setBubbleText("Explore my work below.");

          setTimeout(() => {
            if (!cancelled) {
              setState("idle");
              setShowQuickActions(true);
            }
          }, 1800);

          return;
        }

        const stage = INTRO_STAGES[stageIdx];

        // IMPORTANT:
        // Update text immediately.
        // Do not wait for voice to start.
        setBubbleText(stage.lines.join(" "));

        speakLines(stage.lines, () => {
          if (cancelled) return;

          stageIdx += 1;
          playStage();
        });
      };

      playStage();
    }, 700);
  };

  const startTimer = setTimeout(() => {
    startIntroduction();
  }, 1200);

  const gestureUnlock = () => {
    if (cancelled) return;

    window.speechSynthesis.cancel();
    startIntroduction();

    document.removeEventListener("click", gestureUnlock);
    document.removeEventListener("keydown", gestureUnlock);
  };

  // Try automatic start
  startTimer;

  // Fallback for browser autoplay restrictions
  const gestureTimer = setTimeout(() => {
    if (!gestureUnlockedRef.current) {
      setNeedsGesture(true);

      document.addEventListener("click", gestureUnlock, { once: true });
      document.addEventListener("keydown", gestureUnlock, { once: true });
    }
  }, 3500);

  return () => {
    cancelled = true;

    clearTimeout(startTimer);
    clearTimeout(gestureTimer);

    window.speechSynthesis.cancel();

    document.removeEventListener("click", gestureUnlock);
    document.removeEventListener("keydown", gestureUnlock);
  };
}, []);

  const runQuickAction = (action) => {
    window.speechSynthesis.cancel();
    setState("speaking");
    setShowQuickActions(false);
    setBubbleText(action.reply);
    speakLines([action.reply], () => {
      setState("complete");
      setBubbleText("Anything else you'd like to know?");
      after(1400, () => {
        setState("idle");
        setShowQuickActions(true);
      });
    });
  };

  const speaking = state === "speaking";
  const thinking = state === "thinking";

  const cardBg = dark ? "rgba(15,23,42,0.55)" : "rgba(255,255,255,0.65)";
  const cardBorder = dark ? "rgba(148,163,184,0.18)" : "rgba(148,163,184,0.35)";

  return (
    <div className="w-full max-w-sm mx-auto lg:mx-0">
      {/* PROFESSIONAL PROFILE IMAGE */}
      <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80 mx-auto mb-8 group">
        <div className="absolute -inset-5 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 opacity-25 blur-2xl animate-pulse" />
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 animate-spin-slow" />

        <div
          className={`relative w-full h-full rounded-full overflow-hidden border-4 ${
            speaking
              ? "border-blue-500 shadow-2xl shadow-blue-500/50"
              : dark
                ? "border-slate-700 shadow-2xl shadow-blue-950/30"
                : "border-white shadow-2xl shadow-slate-400/40"
          } transition-all duration-500`}
        >
          <img
            src="/images/vinoth-profile.jpg"
            alt="Vinothkumar Palanisamy - Full Stack and AI Engineer"
            className={`w-full h-full object-cover object-center transition-transform duration-700 ${
              speaking ? "scale-105" : "group-hover:scale-105"
            }`}
          />
        </div>

        {thinking && (
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex gap-1">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="thinking-dot"
                style={{ background: dark ? "#94a3b8" : "#64748b", animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        )}

        {speaking && (
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-end gap-1 h-8">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <span
                key={i}
                className="wave-bar"
                style={{ background: "#3b82f6", animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        )}

        <div className="absolute bottom-3 right-0 sm:right-2 px-3 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-lg flex items-center gap-2 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Available
        </div>
      </div>

      {/* Speech bubble */}
      <div
        aria-live="polite"
        className="rounded-2xl border px-5 py-4 text-center backdrop-blur-md transition-all duration-500"
        style={{ background: cardBg, borderColor: cardBorder }}
      >
        <p key={bubbleText} className="bubble-text text-sm sm:text-[15px] leading-relaxed" style={{ color: dark ? "#e2e8f0" : "#1e293b" }}>
          {bubbleText}
        </p>
        {needsGesture && (
          <p className="mt-2 text-xs" style={{ color: dark ? "#93c5fd" : "#2563eb" }}>
            Click anywhere to enable voice
          </p>
        )}
      </div>

      {/* Quick actions */}
      {showQuickActions && (
        <div className="mt-4 flex flex-wrap justify-center lg:justify-start gap-2">
          {QUICK_ACTIONS.map((a) => (
            <button
              key={a.label}
              onClick={() => runQuickAction(a)}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 hover:-translate-y-0.5"
              style={{
                color: dark ? "#93c5fd" : "#1d4ed8",
                borderColor: dark ? "rgba(96,165,250,0.35)" : "rgba(29,78,216,0.25)",
                background: dark ? "rgba(30,41,59,0.6)" : "rgba(255,255,255,0.7)",
              }}
            >
              {a.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ===========================================================
   MAIN
=========================================================== */
export default function Portfolio() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef(null);

  const T = dark
    ? {
        page: "bg-slate-950 text-slate-100",
        nav: scrolled ? "bg-slate-950/90 backdrop-blur border-b border-slate-800 shadow-sm" : "bg-transparent",
        navText: "text-slate-300",
        heroGrad: "from-slate-950 to-slate-900",
        heading: "text-white",
        eyebrow: "text-blue-400",
        body: "text-slate-300",
        bodyMuted: "text-slate-400",
        sectionAlt: "bg-slate-900 border-slate-800",
        card: "bg-slate-900/60 border-slate-800 hover:border-blue-500/60",
        cardText: "text-slate-400",
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
        heading: "text-slate-900",
        eyebrow: "text-blue-700",
        body: "text-slate-600",
        bodyMuted: "text-slate-400",
        sectionAlt: "bg-white border-slate-100",
        card: "bg-slate-50/40 border-slate-200 hover:border-blue-300",
        cardText: "text-slate-500",
        pillBtn: "bg-slate-900 text-white hover:bg-blue-700",
        outlineBtn: "border-slate-300 text-slate-700 hover:border-blue-700 hover:text-blue-700",
        border: "border-slate-200",
        timelineDot: "bg-white border-blue-600",
        badgeBg: "bg-teal-50 text-teal-700 border-teal-200",
        footerBg: "bg-slate-900",
      };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const h = document.documentElement;
      const scrollable = h.scrollHeight - h.clientHeight;
      const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      if (progressRef.current) progressRef.current.style.width = `${pct}%`;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${T.page}`}>
      <style>{`
        .role-enter { animation: roleIn 0.5s ease both; }
        @keyframes roleIn {
          0% { opacity: 0; transform: translateY(10px); filter: blur(6px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .bubble-text { animation: bubbleIn 0.4s ease both; }
        @keyframes bubbleIn { 0% { opacity: 0; transform: translateY(4px); } 100% { opacity: 1; transform: translateY(0); } }
        .avatar-breathe { animation: breathe 3.4s ease-in-out infinite; }
        @keyframes breathe { 0%,100% { transform: scale(1); } 50% { transform: scale(1.035); } }
        .avatar-ping { animation: avatarPing 1.6s ease-out infinite; }
        @keyframes avatarPing { 0% { transform: scale(0.9); opacity: 0.5; } 100% { transform: scale(1.25); opacity: 0; } }
        .eye { display:inline-block; width:7px; height:7px; border-radius:50%; animation: blink 4.5s infinite; }
        @keyframes blink { 0%,94%,100% { transform: scaleY(1); } 97% { transform: scaleY(0.12); } }
        .mouth { display:block; width:20px; height:4px; border-radius:4px; transition: height .15s ease; }
        .mouth-talk { animation: mouthTalk 0.34s ease-in-out infinite; }
        @keyframes mouthTalk { 0%,100% { height:4px; border-radius:4px; } 50% { height:13px; border-radius:8px; } }
        .thinking-dot { width:5px; height:5px; border-radius:50%; display:inline-block; animation: dotBounce 1s infinite; }
        @keyframes dotBounce { 0%,80%,100% { transform: translateY(0); opacity:.4; } 40% { transform: translateY(-4px); opacity:1; } }
        .animate-spin-slow { animation: spinSlow 8s linear infinite; }
        @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .wave-bar { width:4px; border-radius:999px; animation: talkbar 0.8s ease-in-out infinite; }
        @keyframes talkbar { 0%,100% { height:4px; } 50% { height:16px; } }
        .tech-node { animation: nodePulse 2.4s ease-in-out infinite; }
        @keyframes nodePulse { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }
        .tech-line { animation: lineFlow 3s linear infinite; }
        @keyframes lineFlow { 0% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: -6; } }
        .float-a { animation: floatSlow 9s ease-in-out infinite; }
        .float-b { animation: floatSlower 11s ease-in-out infinite; }
        @keyframes floatSlow { 0%,100%{ transform: translate(0,0);} 50%{ transform: translate(14px,-18px);} }
        @keyframes floatSlower { 0%,100%{ transform: translate(0,0);} 50%{ transform: translate(-16px,16px);} }
        .particle { animation: particleFloat linear infinite; }
        @keyframes particleFloat {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.6; } 90% { opacity: 0.6; }
          100% { transform: translateY(-140px) translateX(20px); opacity: 0; }
        }
        .shine {
          background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%);
          transform: translateX(-120%); transition: transform 0.8s ease;
        }
        .group:hover .shine { transform: translateX(120%); }
        .nav-link { position: relative; }
        .nav-link::after {
          content: ""; position: absolute; left: 0; bottom: -4px; height: 2px; width: 0;
          background: currentColor; transition: width 0.25s ease;
        }
        .nav-link:hover::after { width: 100%; }
        .sr-only {
          position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
          overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;
        }
        @media (prefers-reduced-motion: reduce) {
          .role-enter, .avatar-breathe, .avatar-ping, .eye, .mouth-talk, .thinking-dot,
          .wave-bar, .animate-spin-slow, .tech-node, .tech-line, .float-a, .float-b, .particle, .bubble-text {
            animation: none !important;
            transition: opacity 0.3s ease !important;
          }
        }
      `}</style>

      {/* SCROLL PROGRESS */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "3px", zIndex: 60 }}>
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-blue-500 via-teal-400 to-blue-500"
          style={{ width: "0%", transition: "width 150ms ease-out" }}
        />
      </div>

      {/* ================= NAV ================= */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${T.nav}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className={`font-bold tracking-tight ${T.heading}`}>VP<span className="text-blue-500">.</span></span>
          <div className={`hidden md:flex items-center gap-8 text-sm font-medium ${T.navText}`}>
            {NAV.map((n) => (
              <button key={n} onClick={() => scrollTo(n.toLowerCase())} className="nav-link hover:text-blue-500 transition-colors">
                {n}
              </button>
            ))}
            <button
              onClick={() => setDark((d) => !d)}
              aria-label="Toggle dark mode"
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12 ${dark ? "border-slate-700 hover:border-blue-500" : "border-slate-300 hover:border-blue-500"}`}
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a href="mailto:palanivinoth5513@gmail.com" className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${T.pillBtn}`}>
              Hire Me
            </a>
          </div>
          <div className="md:hidden flex items-center gap-3">
            <button onClick={() => setDark((d) => !d)} aria-label="Toggle dark mode" className={T.navText}>
              {dark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className={T.navText} aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>
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
            <a
              href="/resume/Vinothkumar_Palanisamy_Resume.pdf"
              download="Vinothkumar_Palanisamy_Resume.pdf"
              className="text-left text-blue-500 font-semibold"
            >
              Download Resume
            </a>
          </div>
        )}
      </nav>

      {/* ================= HERO ================= */}
      <header className={`relative overflow-hidden bg-gradient-to-b ${T.heroGrad}`}>
        <TechBackground dark={dark} />
        {[...Array(10)].map((_, i) => (
          <span
            key={i}
            className="particle absolute rounded-full"
            style={{
              left: `${(i * 41) % 100}%`,
              bottom: `${(i * 27) % 60}%`,
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              background: "#3b82f6",
              animationDuration: `${6 + (i % 5)}s`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center px-5 sm:px-6 pt-28 sm:pt-32 pb-16 sm:pb-24">
          {/* LEFT */}
          <div className="text-center lg:text-left">
            <Reveal>
              <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border mb-6 ${T.badgeBg}`}>
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                Available for Software Engineering &amp; AI Opportunities
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] ${T.heading}`}>
                Hi, I'm{" "}
                <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  Vinothkumar
                </span>
                <br />
                Building Intelligent Systems
                <br />
                That Actually Work.
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <div className="mt-5">
                <DynamicRole dark={dark} />
              </div>
            </Reveal>

            <Reveal delay={240}>
              <p className={`mt-5 max-w-xl mx-auto lg:mx-0 text-base sm:text-lg leading-relaxed ${T.body}`}>
                Full Stack Software Engineer building scalable applications, AI agents, LLM-powered systems,
                cloud-native infrastructure, and production-ready products.
              </p>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-7 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <button
                  onClick={() => scrollTo("projects")}
                  className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2 ${T.pillBtn}`}
                >
                  Explore My Work
                  <ArrowUpRight size={16} />
                </button>
                <a
                  href="/resume/Vinothkumar_Palanisamy_Resume.pdf"
                  download="Vinothkumar_Palanisamy_Resume.pdf"
                  className={`px-6 py-3 rounded-full border text-sm font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2 ${T.outlineBtn}`}
                >
                  Download Resume
                  <ExternalLink size={16} />
                </a>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <div className={`mt-5 flex items-center justify-center lg:justify-start gap-1.5 text-sm ${T.bodyMuted}`}>
                <MapPin size={14} /> Chennai, India
              </div>
            </Reveal>
          </div>

          {/* RIGHT — AI Assistant */}
          <Reveal delay={200}>
            <AIPortfolioAssistant dark={dark} />
          </Reveal>
        </div>
      </header>

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
              (<strong className={T.heading}>LLM integration, RAG, AI agents, MCP, n8n</strong>). Also built numerous additional
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
                  <span className={`absolute top-1.5 w-3 h-3 rounded-full border-2 ${T.timelineDot}`} style={{ left: "-29px" }} />
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
                  <div className={`group relative overflow-hidden h-full flex flex-col p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${T.card}`}>
                    <span className="shine absolute inset-0 pointer-events-none" />
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 ${dark ? "bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white" : "bg-blue-50 text-blue-700 group-hover:bg-blue-700 group-hover:text-white"}`}>
                        <Icon size={18} />
                      </div>
                      <ArrowUpRight size={16} className={`transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${dark ? "text-slate-700 group-hover:text-blue-400" : "text-slate-300 group-hover:text-blue-700"}`} />
                    </div>
                    <span className="text-xs font-bold tracking-wider text-amber-500 uppercase">{p.tag}</span>
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
                <div className={`p-4 rounded-2xl border flex flex-col gap-1.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${T.border}`}>
                  {a.value != null ? (
                    <CountUp value={a.value} suffix={a.suffix} className={`text-3xl font-extrabold ${T.heading}`} />
                  ) : (
                    <Award size={18} className="text-teal-500" />
                  )}
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
            Open to Full Stack, AI Engineering, Cloud/DevOps and Software Engineering roles. Reach out any time.
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
            <a
              href="/resume/Vinothkumar_Palanisamy_Resume.pdf"
              download="Vinothkumar_Palanisamy_Resume.pdf"
              className="px-5 py-2.5 rounded-full border border-slate-700 hover:border-blue-500 transition-colors text-sm font-semibold flex items-center gap-2"
            >
              Download Resume
            </a>
          </div>
        </Reveal>
        <Reveal delay={180}>
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400">
            <a href="https://linkedin.com/in/vinoth2003" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors"><Linkedin size={20} /></a>
            <a href="https://github.com/Vinothkumar14" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors"><Github size={20} /></a>
            <a href="https://leetcode.com/u/Vinoth7" target="_blank" rel="noreferrer" className="text-sm font-semibold hover:text-blue-400 transition-colors">LeetCode</a>
            <a href="https://portfolio-hg4e.vercel.app/" target="_blank" rel="noreferrer" className="text-sm font-semibold hover:text-blue-400 transition-colors">Live Portfolio</a>
          </div>
        </Reveal>
        <p className="mt-10 text-xs text-slate-600">© 2026 Vinothkumar Palanisamy. Built with React.</p>
      </footer>
    </div>
  );
}