import React, { useEffect, useRef, useState } from "react";
import {
  Mail, Phone, Linkedin, Github, ExternalLink, MapPin, Menu, X,
  ArrowUpRight, Code2, Cloud, Bot, Award, GraduationCap, Sun, Moon
} from "lucide-react";

const ROLES = [
  "Full Stack Developer",
  "AI Engineer",
  "Cloud & DevOps Engineer",
  "Software Engineer",
];

const SKILLS = [
  { cat: "Languages", items: ["Java", "Python", "SQL", "JavaScript", "TypeScript"] },
  { cat: "Frontend", items: ["React.js", "Next.js", "HTML5/CSS3", "Tailwind CSS", "Material UI"] },
  { cat: "Backend & APIs", items: ["Spring Boot", "FastAPI", "REST APIs", "Microservices"] },
  {
    cat: "Cloud & Identity",
    items: [
      "Microsoft Azure", "Azure AD B2C", "Microsoft Entra ID", "IAM",
      "Azure Blob Storage", "Azure Functions", "API Management", "ACS"
    ]
  },
  {
    cat: "DevOps & Infrastructure",
    items: ["Docker", "Kubernetes", "Jenkins", "Nginx", "GitLab", "Grafana", "CI/CD"]
  },
  {
    cat: "Auth & Security",
    items: ["OAuth 2.0", "OpenID Connect", "JWT", "SSO"]
  },
  {
    cat: "AI, LLM & Voice AI",
    items: [
      "LLM Integration", "RAG", "AI Agents", "MCP",
      "OpenAI", "DeepSeek", "Vapi", "Sarvam AI", 'Claude', "Groq","Gemini", "ElevenLabs", 
      "Prompt Engineering", "n8n"
    ]
  },
  {
    cat: "Communication & Integrations",
    items: [
      "Twilio", "Slack API", "Microsoft Teams", "Outlook Graph API",
      "SendGrid", "Etisalat", "Vobiz", "SMTP"
    ]
  },
  {
    cat: "Data & Messaging",
    items: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Kafka", "RabbitMQ"]
  },
  {
    cat: "Engineering",
    items: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "System Design",
      "Design Patterns",
      "Git"
    ]
  },
];

const EXPERIENCE = [
  "Delivered full-stack enterprise applications using Java, Python, FastAPI, Spring Boot and React.js across backend services, APIs and frontend interfaces.",
  "Designed and implemented enterprise identity solutions using Azure AD B2C, Microsoft Entra ID and IAM with SSO, OAuth 2.0, OpenID Connect and JWT-based authentication.",
  "Worked with Docker, Kubernetes, GitLab, Jenkins and Nginx across cloud-native application environments and engineering workflows.",
  "Built LLM-powered voicebots, chatbots, RAG applications and AI agents using modern AI platforms and model integrations.",
  "Worked with OpenAI, DeepSeek, Vapi, Sarvam AI, MCP and n8n for AI, voice and workflow automation use cases.",
  "Integrated Slack, Microsoft Teams, Outlook Graph API, SendGrid, Twilio, ACS, Etisalat SMS/OTP and Vobiz telephony.",
  "Automated recurring business processes and dynamic workspace workflows using n8n and AI agents.",
  "Managed GitLab repository governance including access provisioning, branch protection and engineering permissions.",
  "Completed a two-week onsite engagement with the Early Childhood Authority in the UAE, supporting Azure AD B2C troubleshooting and enterprise issue resolution.",
  "Built additional proof-of-concept projects across AI automation, voice AI and enterprise integrations.",
];

const PROJECTS = [
  {
    title: "Early Childhood Authority (ECA) — Abu Dhabi",
    tag: "Enterprise Azure / SSO",
    icon: Cloud,
    desc: "Enterprise identity and SSO solution for the Early Childhood Authority, Abu Dhabi.",
    details:
      "Worked on Azure AD B2C custom policies, Microsoft Entra ID, Azure Functions, Azure API Management, Azure Communication Services, custom SMS and OTP integrations, and secure authentication flows across enterprise portals. Completed a two-week onsite engagement in the UAE supporting Azure identity troubleshooting and enterprise issue resolution.",
    links: [
      { label: "Parent Friendly Label", url: "https://app.parentfriendlylabel.ae" },
      { label: "Research Grants Portal", url: "https://portal.researchgrants.eca.gov.ae/" }
    ]
  },
  {
    title: "Nebula",
    tag: "AI Assistant",
    icon: Bot,
    desc: "Enterprise AI assistant for semantic search, document retrieval, meeting summarization and workflow automation.",
    details:
      "Built an AI assistant experience using LLM integrations and intelligent workflows to help users search enterprise information, retrieve relevant documents, summarize content and automate knowledge-based tasks.",
    links: [
      { label: "Live Agent", url: "https://mistynebula.com/agents/my/onedrive-email/session" }
    ]
  },
  {
    title: "TALKDock",
    tag: "Voice AI",
    icon: Bot,
    desc: "Voice AI platform for conversational voice experiences and telephony workflows.",
    details:
      "Worked on voice AI workflows and telephony integrations to support real-time conversational experiences, intelligent voice interactions and automated communication workflows.",
    links: [
      { label: "Live Demo", url: "https://talkdock-dev.ckdigital.in/signin" }
    ]
  },
  {
    title: "MyWorkspace",
    tag: "Automation",
    icon: Code2,
    desc: "AI-powered workspace for intelligent agents and workflow automation.",
    details:
      "Designed an automation-focused workspace where AI agents and n8n workflows orchestrate dynamic business processes and connect multiple services to automate repetitive tasks.",
    links: [
      { label: "Live Demo", url: "https://myworkspacedev.ckdigital.in/" }
    ]
  },
  {
    title: "GitHub–Slack AI Assistant",
    tag: "AI Automation",
    icon: Bot,
    desc: "AI assistant connecting GitHub activity, Jira updates and Slack communication.",
    details:
      "Built an AI automation workflow that monitors development activity, processes relevant GitHub and Jira updates, summarizes information and sends useful updates to the appropriate Slack channels.",
    links: [
      { label: "GitHub Repo", url: "https://github.com/Vinothkumar14/github-slack-mcp-server-ai" }
    ]
  },
  {
    title: "Outlook-to-Slack Webhook",
    tag: "Automation",
    icon: Code2,
    desc: "Rule-based email automation that routes matching Outlook messages into Slack.",
    details:
      "Created an integration workflow that processes Outlook emails against configurable rules and forwards matching messages to the correct Slack channel for faster communication and notification automation.",
    links: []
  },
  {
    title: "SalesCode",
    tag: "Biometric",
    icon: Code2,
    desc: "Facial-recognition attendance and identity verification platform.",
    details:
      "Developed a biometric workflow for secure workforce identity verification and attendance management using facial recognition capabilities.",
    links: [
      { label: "Live Demo", url: "https://salescodeuat.ckdigital.in/facedetection/docs" }
    ]
  },
  {
    title: "Sanchu Animal Hospital",
    tag: "Full Stack",
    icon: Code2,
    desc: "Full-stack hospital management platform for veterinary operations.",
    details:
      "Built application workflows covering registration, appointment scheduling, pet records, billing and administrative operations using full-stack web technologies.",
    links: [
      { label: "Live Site", url: "https://sanchuanimalhospital.com/" }
    ]
  }
];

const ACHIEVEMENTS = [
  { icon: Award, label: "Service Excellence Award", sub: "Cavin Infotech · 2026" },
  { icon: Award, label: "2nd Prize, Internal Hackathon", sub: "Cavin Infotech · 2026" },
  { value: 12, suffix: "+", label: "Google Cloud Skill Badges", sub: "Google Cloud" },
  { value: 13, suffix: "", label: "Salesforce Super Badges", sub: "Salesforce" },
];

const INTRO_STAGES = [
  {
    lines: [
      "Hi, I'm Vinothkumar's AI portfolio assistant.",
      "Let me give you a quick overview of his work."
    ]
  },
  {
    lines: [
      "Vinothkumar is a Full Stack Developer who builds modern web applications using Java, Python, React, Spring Boot and FastAPI."
    ]
  },
  {
    lines: [
      "He also works on AI applications involving large language models, retrieval augmented generation, AI agents, MCP and voice AI."
    ]
  },
  {
    lines: [
      "His AI technology experience includes OpenAI, DeepSeek, Vapi, Sarvam AI and n8n."
    ]
  },
  {
    lines: [
      "He is also passionate about data structures and algorithms, problem solving, cloud technologies and DevOps."
    ]
  },
  {
    lines: [
      "Explore the portfolio to learn more about his experience, projects, skills and achievements."
    ]
  },
];

const QUICK_ACTIONS = [
  {
    label: "About Me",
    reply: "Vinothkumar is a Full Stack Developer with over two years of experience building enterprise applications, AI applications and modern software systems."
  },
  {
    label: "AI Projects",
    reply: "His AI work includes LLM applications, RAG, AI agents, MCP integrations, voice AI, DeepSeek, Vapi, Sarvam AI and workflow automation."
  },
  {
    label: "Tech Stack",
    reply: "His core stack includes Python, FastAPI, Java, Spring Boot, React, TypeScript, Azure, Docker, Kubernetes, MongoDB, PostgreSQL, Kafka and Redis."
  },
  {
    label: "DSA",
    reply: "He is actively strengthening data structures and algorithms across arrays, strings, linked lists, stacks, queues, trees, graphs, recursion, dynamic programming and problem solving."
  },
  {
    label: "Contact",
    reply: "You can connect with Vinothkumar through LinkedIn, GitHub, email or the contact section below."
  },
];

function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const timer = setTimeout(() => setShown(true), delay);
        io.unobserve(el);
        return () => clearTimeout(timer);
      }
    }, { threshold: 0.12 });

    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function CountUp({ value, suffix = "", className = "" }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;

      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min(1, (now - start) / 900);
        setN(Math.round((1 - Math.pow(1 - progress, 3)) * value));

        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
      io.unobserve(el);
    }, { threshold: 0.4 });

    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {n}{suffix}
    </span>
  );
}

function DynamicRole({ dark }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % ROLES.length),
      3200
    );

    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-[2.75rem] flex items-center justify-center lg:justify-start">
      <span
        key={index}
        className="role-enter inline-flex px-4 py-1.5 rounded-full text-lg sm:text-xl font-semibold border"
        style={{
          color: dark ? "#60a5fa" : "#1d4ed8",
          borderColor: dark
            ? "rgba(96,165,250,.4)"
            : "rgba(29,78,216,.25)",
          background: dark
            ? "rgba(96,165,250,.08)"
            : "rgba(29,78,216,.05)"
        }}
      >
        {ROLES[index]}
      </span>
    </div>
  );
}

function TechBackground({ dark }) {
  const nodes = [
    "User", "AI Agent", "LLM", "RAG",
    "MCP", "Voice AI", "APIs", "Cloud"
  ];

  const stroke = dark
    ? "rgba(96,165,250,.35)"
    : "rgba(29,78,216,.2)";

  const dot = dark
    ? "rgba(45,212,191,.9)"
    : "rgba(13,148,136,.65)";

  const spacing = 100 / (nodes.length + 1);

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ opacity: dark ? .35 : .2 }}
    >
      {nodes.slice(0, -1).map((_, i) => (
        <line
          key={i}
          x1={spacing * (i + 1)}
          y1="50"
          x2={spacing * (i + 2)}
          y2="50"
          stroke={stroke}
          strokeWidth=".3"
          strokeDasharray="1.5 1.5"
          className="tech-line"
        />
      ))}

      {nodes.map((node, i) => (
        <g key={node}>
          <circle
            cx={spacing * (i + 1)}
            cy="50"
            r="1.6"
            fill={dot}
            className="tech-node"
            style={{ animationDelay: `${i * .3}s` }}
          />
          <text
            x={spacing * (i + 1)}
            y="58"
            fontSize="2.6"
            textAnchor="middle"
            fill={stroke}
          >
            {node}
          </text>
        </g>
      ))}
    </svg>
  );
}

function AIPortfolioAssistant({ dark }) {
  const [state, setState] = useState("idle");
  const [bubbleText, setBubbleText] = useState(
    "Preparing your introduction..."
  );
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [needsGesture, setNeedsGesture] = useState(false);

  const cancelledRef = useRef(false);
  const gestureUnlockedRef = useRef(false);
  const timersRef = useRef([]);

  const after = (ms, fn) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
  };

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const getIndianMaleVoice = () => {
    const voices = window.speechSynthesis.getVoices();

    if (!voices.length) return null;

    const preferred = [
      "microsoft ravi",
      "ravi",
      "google english (india)",
      "english india"
    ];

    return (
      voices.find(
        (v) =>
          v.lang.toLowerCase() === "en-in" &&
          preferred.some((n) => v.name.toLowerCase().includes(n))
      ) ||
      voices.find((v) => v.lang.toLowerCase() === "en-in") ||
      voices.find((v) => v.lang.toLowerCase().startsWith("en-in")) ||
      null
    );
  };

  const speakLines = (lines, done) => {
    if (!lines?.length) {
      done?.();
      return;
    }

    const [line, ...rest] = lines;
    const utter = new SpeechSynthesisUtterance(line);
    const voice = getIndianMaleVoice();

    if (voice) utter.voice = voice;

    utter.lang = "en-IN";
    utter.rate = .9;
    utter.pitch = .86;
    utter.volume = 1;

    utter.onstart = () => {
      gestureUnlockedRef.current = true;
      setNeedsGesture(false);
      setState("speaking");
    };

    utter.onend = () => {
      if (!cancelledRef.current) {
        after(220, () => speakLines(rest, done));
      }
    };

    utter.onerror = () => {
      if (!cancelledRef.current) {
        after(250, () => speakLines(rest, done));
      }
    };

    window.speechSynthesis.speak(utter);
  };

  const runIntroduction = () => {
    cancelledRef.current = false;
    window.speechSynthesis.cancel();
    clearTimers();

    setShowQuickActions(false);
    setState("thinking");
    setBubbleText("Preparing your introduction...");

    after(650, () => {
      if (cancelledRef.current) return;

      let stageIndex = 0;

      const playStage = () => {
        if (cancelledRef.current) return;

        if (stageIndex >= INTRO_STAGES.length) {
          setState("complete");
          setBubbleText("Explore the portfolio to learn more.");

          after(1600, () => {
            if (!cancelledRef.current) {
              setState("idle");
              setShowQuickActions(true);
            }
          });

          return;
        }

        const stage = INTRO_STAGES[stageIndex];

        setState("speaking");
        setBubbleText(stage.lines.join(" "));

        speakLines(stage.lines, () => {
          if (!cancelledRef.current) {
            stageIndex += 1;
            playStage();
          }
        });
      };

      playStage();
    });
  };

  useEffect(() => {
    if (!("speechSynthesis" in window)) {
      setState("complete");
      setBubbleText(
        "Voice introduction is not supported in this browser."
      );
      setShowQuickActions(true);
      return;
    }

    cancelledRef.current = false;

    const startTimer = setTimeout(runIntroduction, 1200);

    const unlock = () => {
      if (!gestureUnlockedRef.current) runIntroduction();
    };

    const gestureTimer = setTimeout(() => {
      if (!gestureUnlockedRef.current) {
        setNeedsGesture(true);

        document.addEventListener("click", unlock, { once: true });
        document.addEventListener("keydown", unlock, { once: true });
      }
    }, 4200);

    return () => {
      cancelledRef.current = true;
      clearTimers();
      clearTimeout(startTimer);
      clearTimeout(gestureTimer);
      window.speechSynthesis.cancel();

      document.removeEventListener("click", unlock);
      document.removeEventListener("keydown", unlock);
    };
  }, []);

  const runQuickAction = (action) => {
    cancelledRef.current = false;
    clearTimers();
    window.speechSynthesis.cancel();

    setState("speaking");
    setShowQuickActions(false);
    setBubbleText(action.reply);

    speakLines([action.reply], () => {
      setState("complete");
      setBubbleText("Anything else you would like to know?");

      after(1400, () => {
        setState("idle");
        setShowQuickActions(true);
      });
    });
  };

  const speaking = state === "speaking";
  const thinking = state === "thinking";

  const cardBg = dark
    ? "rgba(15,23,42,.58)"
    : "rgba(255,255,255,.72)";

  const cardBorder = dark
    ? "rgba(148,163,184,.18)"
    : "rgba(148,163,184,.35)";

  return (
    <div className="w-full max-w-md mx-auto lg:mx-0">
      <div className="relative w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80 mx-auto mb-8 group">
        <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 opacity-25 blur-3xl animate-pulse" />

        <div
          className={`absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 ${
            speaking ? "animate-spin-slow" : ""
          }`}
        />

        <div
          className={`relative w-full h-full rounded-full overflow-hidden border-4 transition-all duration-500 ${
            speaking
              ? "border-blue-500 shadow-2xl shadow-blue-500/50 scale-[1.02]"
              : dark
                ? "border-slate-700 shadow-2xl shadow-blue-950/40"
                : "border-white shadow-2xl shadow-slate-400/40"
          }`}
        >
          <img
            src="/images/vinoth-profile.jpg"
            alt="Vinothkumar Palanisamy"
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {thinking && (
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="thinking-dot"
                style={{
                  background: dark ? "#94a3b8" : "#64748b",
                  animationDelay: `${i * .15}s`
                }}
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
                style={{
                  background: "#3b82f6",
                  animationDelay: `${i * .1}s`
                }}
              />
            ))}
          </div>
        )}

        <div className="absolute bottom-3 right-0 sm:right-2 px-3 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-lg flex items-center gap-2 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Available
        </div>
      </div>

      <div
        aria-live="polite"
        className="rounded-2xl border px-5 py-4 text-center backdrop-blur-md transition-all duration-500"
        style={{
          background: cardBg,
          borderColor: cardBorder
        }}
      >
        <p
          key={bubbleText}
          className="bubble-text text-sm sm:text-[15px] leading-relaxed"
          style={{
            color: dark ? "#e2e8f0" : "#1e293b"
          }}
        >
          {bubbleText}
        </p>

        {needsGesture && (
          <p
            className="mt-2 text-xs"
            style={{
              color: dark ? "#93c5fd" : "#2563eb"
            }}
          >
            Click anywhere to enable the voice introduction.
          </p>
        )}
      </div>

      {showQuickActions && (
        <div className="mt-4 flex flex-wrap justify-center lg:justify-start gap-2">
          {QUICK_ACTIONS.map((a) => (
            <button
              key={a.label}
              onClick={() => runQuickAction(a)}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 hover:-translate-y-0.5"
              style={{
                color: dark ? "#93c5fd" : "#1d4ed8",
                borderColor: dark
                  ? "rgba(96,165,250,.35)"
                  : "rgba(29,78,216,.25)",
                background: dark
                  ? "rgba(30,41,59,.6)"
                  : "rgba(255,255,255,.7)"
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

export default function Portfolio() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedProject, setExpandedProject] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef(null);

  const T = dark
    ? {
        page: "bg-slate-950 text-slate-100",
        nav: scrolled
          ? "bg-slate-950/90 backdrop-blur border-b border-slate-800 shadow-sm"
          : "bg-transparent",
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
        footerBg: "bg-black"
      }
    : {
        page: "bg-slate-50 text-slate-900",
        nav: scrolled
          ? "bg-white/90 backdrop-blur border-b border-slate-200 shadow-sm"
          : "bg-transparent",
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
        footerBg: "bg-slate-900"
      };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      const h = document.documentElement;
      const scrollable = h.scrollHeight - h.clientHeight;

      if (progressRef.current) {
        progressRef.current.style.width =
          `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);

    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${T.page}`}>
      <style>{`
        html { scroll-behavior: smooth; }

        .role-enter {
          animation: roleIn .5s ease both;
        }

        @keyframes roleIn {
          0% {
            opacity: 0;
            transform: translateY(10px);
            filter: blur(6px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        .bubble-text {
          animation: bubbleIn .4s ease both;
        }

        @keyframes bubbleIn {
          0% {
            opacity: 0;
            transform: translateY(4px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-spin-slow {
          animation: spinSlow 8s linear infinite;
        }

        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .tech-node {
          animation: nodePulse 2.5s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }

        @keyframes nodePulse {
          0%, 100% {
            opacity: .35;
            transform: scale(1);
          }

          50% {
            opacity: 1;
            transform: scale(1.25);
          }
        }

        .tech-line {
          animation: lineFlow 4s linear infinite;
        }

        @keyframes lineFlow {
          from { stroke-dashoffset: 20; }
          to { stroke-dashoffset: 0; }
        }

        .thinking-dot {
          width: 7px;
          height: 7px;
          border-radius: 999px;
          animation: thinking 1s ease-in-out infinite;
        }

        @keyframes thinking {
          0%, 100% {
            opacity: .3;
            transform: translateY(0);
          }

          50% {
            opacity: 1;
            transform: translateY(-5px);
          }
        }

        .wave-bar {
          width: 4px;
          height: 8px;
          border-radius: 999px;
          animation: wave .8s ease-in-out infinite;
        }

        @keyframes wave {
          0%, 100% { height: 7px; }
          50% { height: 30px; }
        }

        .shine {
          background: linear-gradient(
            110deg,
            transparent 30%,
            rgba(255,255,255,.4) 50%,
            transparent 70%
          );
          transform: translateX(-120%);
          transition: transform .8s ease;
        }

        .group:hover .shine {
          transform: translateX(120%);
        }

        .nav-link {
          position: relative;
        }

        .nav-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -4px;
          height: 2px;
          width: 0;
          background: currentColor;
          transition: width .25s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .project-details {
          animation: projectDetailsIn .35s ease both;
        }

        @keyframes projectDetailsIn {
          from {
            opacity: 0;
            max-height: 0;
            transform: translateY(-8px);
          }

          to {
            opacity: 1;
            max-height: 300px;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: .01ms !important;
          }
        }
      `}</style>

      <div className="fixed top-0 left-0 right-0 h-[3px] z-[60]">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-blue-500 via-teal-400 to-blue-500"
          style={{
            width: "0%",
            transition: "width 150ms ease-out"
          }}
        />
      </div>

      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${T.nav}`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => scrollTo("top")}
            className={`font-bold tracking-tight text-xl ${T.heading}`}
          >
            VP<span className="text-blue-500">.</span>
          </button>

          <div
            className={`hidden md:flex items-center gap-7 text-sm font-medium ${T.navText}`}
          >
            {["About", "Skills", "Experience", "Projects", "Contact"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className="nav-link hover:text-blue-500 transition-colors"
                >
                  {item}
                </button>
              )
            )}

            <button
              onClick={() => setDark((v) => !v)}
              aria-label="Toggle dark mode"
              className="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <a
              href="mailto:palanivinoth5513@gmail.com"
              className={`px-4 py-2 rounded-full text-sm font-medium ${T.pillBtn}`}
            >
              Hire Me
            </a>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setDark((v) => !v)}
              aria-label="Toggle dark mode"
              className={T.navText}
            >
              {dark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              className={T.navText}
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div
            className={`md:hidden px-6 py-5 flex flex-col gap-4 border-t ${
              dark
                ? "bg-slate-950 border-slate-800 text-slate-300"
                : "bg-white border-slate-200 text-slate-700"
            }`}
          >
            {["About", "Skills", "Experience", "Projects", "Contact"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className="text-left hover:text-blue-500"
                >
                  {item}
                </button>
              )
            )}
          </div>
        )}
      </nav>

      <header
        id="top"
        className={`relative overflow-hidden bg-gradient-to-b ${T.heroGrad}`}
      >
        <TechBackground dark={dark} />

        {[...Array(10)].map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full pointer-events-none animate-pulse"
            style={{
              left: `${(i * 41) % 100}%`,
              bottom: `${(i * 27) % 60}%`,
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              background: "#3b82f6",
              opacity: .55,
              animationDuration: `${6 + (i % 5)}s`,
              animationDelay: `${i * .4}s`
            }}
          />
        ))}

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_.9fr] gap-12 lg:gap-20 items-center px-5 sm:px-6 pt-28 sm:pt-32 pb-16 sm:pb-24">
          <div className="text-center lg:text-left">
            <Reveal>
              <span
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border mb-6 ${T.badgeBg}`}
              >
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                Available for Software Engineering &amp; AI Opportunities
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h1
                className={`text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] ${T.heading}`}
              >
                Hi, I'm{" "}
                <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  Vinothkumar
                </span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <div className="mt-5">
                <DynamicRole dark={dark} />
              </div>
            </Reveal>

            <Reveal delay={240}>
              <p
                className={`mt-5 max-w-xl mx-auto lg:mx-0 text-base sm:text-lg leading-relaxed ${T.body}`}
              >
                Full Stack Software Engineer building scalable applications,
                AI-powered systems, intelligent agents, voice AI experiences
                and cloud-native solutions.
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
              <div
                className={`mt-5 flex items-center justify-center lg:justify-start gap-1.5 text-sm ${T.bodyMuted}`}
              >
                <MapPin size={14} />
                Chennai, India
              </div>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <AIPortfolioAssistant dark={dark} />
          </Reveal>
        </div>
      </header>

      <section id="about" className="py-16 px-5 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <span
              className={`text-xs font-bold tracking-widest uppercase ${T.eyebrow}`}
            >
              Profile
            </span>

            <h2 className={`text-3xl font-bold mt-2 mb-4 ${T.heading}`}>
              Professional Summary
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <p className={`text-lg leading-relaxed ${T.body}`}>
              Full-stack engineer with{" "}
              <strong className={T.heading}>2+ years</strong> of experience
              building enterprise applications using{" "}
              <strong className={T.heading}>
                Java, Python, FastAPI, Spring Boot and React.js
              </strong>
              . Skilled in{" "}
              <strong className={T.heading}>
                Azure identity, Docker, Kubernetes, GitLab, Jenkins, AI agents,
                RAG, LLM integrations, MCP and voice AI
              </strong>
              . Also focused on{" "}
              <strong className={T.heading}>
                data structures, algorithms and problem solving
              </strong>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <section
        id="skills"
        className={`py-16 px-5 sm:px-6 border-y ${T.sectionAlt}`}
      >
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <span
              className={`text-xs font-bold tracking-widest uppercase ${T.eyebrow}`}
            >
              Toolbox
            </span>

            <h2 className={`text-3xl font-bold mt-2 mb-8 ${T.heading}`}>
              Technical Skills
            </h2>
          </Reveal>

          <div
            className={`divide-y ${
              dark ? "divide-slate-800" : "divide-slate-100"
            }`}
          >
            {SKILLS.map((s, i) => (
              <Reveal key={s.cat} delay={i * 35}>
                <div className="grid grid-cols-1 sm:grid-cols-[210px_1fr] gap-x-6 gap-y-2 py-4">
                  <h3 className={`text-sm font-bold ${T.heading}`}>
                    {s.cat}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {s.items.map((item) => (
                      <span
                        key={item}
                        className={`px-2.5 py-1 rounded-full text-xs border ${
                          dark
                            ? "border-slate-700 bg-slate-800/70 text-slate-300"
                            : "border-slate-200 bg-white text-slate-600"
                        } transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-400`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="py-16 px-5 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <span
              className={`text-xs font-bold tracking-widest uppercase ${T.eyebrow}`}
            >
              Career
            </span>

            <h2 className={`text-3xl font-bold mt-2 mb-2 ${T.heading}`}>
              Experience
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <div
              className={`flex flex-wrap items-baseline justify-between gap-2 mb-6 pb-3 border-b ${T.border}`}
            >
              <div>
                <p className={`text-lg font-bold ${T.heading}`}>
                  Junior Engineer
                </p>

                <p className="text-blue-500 text-sm font-medium">
                  Cavin Infotech (CavinKare Group), Chennai
                </p>
              </div>

              <span className={`text-sm font-medium ${T.bodyMuted}`}>
                Jun 2024 — Present
              </span>
            </div>
          </Reveal>

          <div className={`space-y-4 border-l-2 pl-6 ${T.border}`}>
            {EXPERIENCE.map((item, i) => (
              <Reveal key={i} delay={i * 50}>
                <div className="relative">
                  <span
                    className={`absolute top-1.5 w-3 h-3 rounded-full border-2 ${T.timelineDot}`}
                    style={{ left: "-29px" }}
                  />

                  <p className={`leading-relaxed text-sm ${T.body}`}>
                    {item}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="projects"
        className={`py-16 px-5 sm:px-6 border-y ${T.sectionAlt}`}
      >
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <span
              className={`text-xs font-bold tracking-widest uppercase ${T.eyebrow}`}
            >
              Selected Work
            </span>

            <h2 className={`text-3xl font-bold mt-2 mb-8 ${T.heading}`}>
              Key Projects
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((p, i) => {
              const Icon = p.icon;
              const isExpanded = expandedProject === p.title;

              return (
                <Reveal key={p.title} delay={(i % 3) * 80}>
                  <div
                    className={`group relative overflow-hidden h-full flex flex-col p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${T.card}`}
                  >
                    <span className="shine absolute inset-0 pointer-events-none" />

                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 ${
                          dark
                            ? "bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white"
                            : "bg-blue-50 text-blue-700 group-hover:bg-blue-700 group-hover:text-white"
                        }`}
                      >
                        <Icon size={18} />
                      </div>

                      <button
                        onClick={() =>
                          setExpandedProject(
                            isExpanded ? null : p.title
                          )
                        }
                        aria-label={`View details for ${p.title}`}
                        aria-expanded={isExpanded}
                        className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${
                          isExpanded ? "rotate-90" : ""
                        } ${
                          dark
                            ? "border-slate-700 text-slate-400 hover:text-blue-400 hover:border-blue-500"
                            : "border-slate-200 text-slate-400 hover:text-blue-700 hover:border-blue-300"
                        }`}
                      >
                        <ArrowUpRight size={16} />
                      </button>
                    </div>

                    <span className="text-xs font-bold tracking-wider text-amber-500 uppercase">
                      {p.tag}
                    </span>

                    <h3 className={`text-base font-bold mt-1 mb-2 ${T.heading}`}>
                      {p.title}
                    </h3>

                    <p className={`text-sm leading-relaxed ${T.cardText}`}>
                      {p.desc}
                    </p>

                    {isExpanded && (
                      <div
                        className={`project-details mt-4 pt-4 border-t ${T.border}`}
                      >
                        <p
                          className={`text-sm leading-relaxed ${T.cardText}`}
                        >
                          {p.details}
                        </p>
                      </div>
                    )}

                    {p.links?.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {p.links.map((l) => (
                          <a
                            key={l.url}
                            href={l.url}
                            target="_blank"
                            rel="noreferrer"
                            className={`inline-flex items-center gap-1 text-xs font-semibold rounded-full px-3 py-1.5 border ${
                              dark
                                ? "text-blue-400 border-blue-500/40 hover:bg-blue-500 hover:text-white"
                                : "text-blue-700 border-blue-200 hover:bg-blue-700 hover:text-white"
                            }`}
                          >
                            {l.label}
                            <ExternalLink size={12} />
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

      <section className="py-16 px-5 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <span
              className={`text-xs font-bold tracking-widest uppercase ${T.eyebrow}`}
            >
              Recognition
            </span>

            <h2 className={`text-3xl font-bold mt-2 mb-8 ${T.heading}`}>
              Achievements &amp; Certifications
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ACHIEVEMENTS.map((a, i) => (
              <Reveal key={a.label} delay={i * 60}>
                <div
                  className={`p-5 rounded-2xl border flex flex-col gap-1.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${T.border}`}
                >
                  {a.value != null ? (
                    <CountUp
                      value={a.value}
                      suffix={a.suffix}
                      className={`text-3xl font-extrabold ${T.heading}`}
                    />
                  ) : (
                    <Award size={18} className="text-teal-500" />
                  )}

                  <p className={`font-semibold text-sm ${T.heading}`}>
                    {a.label}
                  </p>

                  <p className={`text-xs ${T.bodyMuted}`}>
                    {a.sub}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        className={`py-12 px-5 sm:px-6 border-y ${T.sectionAlt}`}
      >
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="flex items-start gap-4">
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                  dark
                    ? "bg-blue-500/10 text-blue-400"
                    : "bg-blue-50 text-blue-700"
                }`}
              >
                <GraduationCap size={20} />
              </div>

              <div>
                <p className={`font-bold ${T.heading}`}>
                  Bachelor of Technology, Information Technology
                </p>

                <p className="text-blue-500 text-sm">
                  M Kumarasamy College of Engineering
                </p>

                <p className={`text-sm mt-0.5 ${T.bodyMuted}`}>
                  2020 — 2024 · CGPA: 8.9/10
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <footer
        id="contact"
        className={`py-16 px-5 sm:px-6 text-white text-center ${T.footerBg}`}
      >
        <Reveal>
          <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">
            Get in touch
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-3">
            Let's build something together.
          </h2>

          <p className="text-slate-400 max-w-xl mx-auto mb-6">
            Open to Full Stack, AI Engineering, Cloud &amp; DevOps and Software
            Engineering opportunities.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <a
              href="mailto:palanivinoth5513@gmail.com"
              className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-sm font-semibold flex items-center gap-2"
            >
              <Mail size={15} />
              Email Me
            </a>

            <a
              href="tel:+919500868447"
              className="px-5 py-2.5 rounded-full border border-slate-700 hover:border-blue-500 text-sm font-semibold flex items-center gap-2"
            >
              <Phone size={15} />
              Call Me
            </a>

           
          </div>
        </Reveal>

        <Reveal delay={180}>
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400">
            <a
              href="https://linkedin.com/in/vinoth2003"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400"
            >
              <Linkedin size={20} />
            </a>

            <a
              href="https://github.com/Vinothkumar14"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400"
            >
              <Github size={20} />
            </a>

            <a
              href="https://leetcode.com/u/Vinoth7"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold hover:text-blue-400"
            >
              LeetCode
            </a>

          
          </div>
        </Reveal>

        <p className="mt-10 text-xs text-slate-600">
          © 2026 Vinothkumar Palanisamy. Built with React.
        </p>
      </footer>
    </div>
  );
}
