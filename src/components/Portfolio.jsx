import { useEffect, useRef, useState } from 'react';
import { BentoGrid, BentoCard } from './BentoGrid';
import { 
  CodeIcon, 
  UserIcon, 
  BriefcaseIcon, 
  AcademicIcon, 
  QuoteIcon,
  MailIcon,
  GithubIcon,
  LinkedInIcon,
  ReactIcon,
  TailwindIcon,
  NodeIcon,
  PythonIcon,
  GitIcon,
  ViteIcon
} from './Icons';
import { FaUnity } from 'react-icons/fa';
import { DiPostgresql } from 'react-icons/di';
import { SiLangchain, SiMongodb, SiN8N, SiNeo4J } from 'react-icons/si';
import byeHand from '../assets/bye.png';
import brainIcon from '../assets/brain.png';
import me from '../assets/me.png';

// Add more icons for contacts
const KaggleIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.071.358"/>
  </svg>
);

const TwitterIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const BlogIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
  </svg>
);

// Icon swapper for the Who Am I card
const WhoAmIIconSwap = ({ isHovered }) => {
  const [showHand, setShowHand] = useState(false);
  const [isWaving, setIsWaving] = useState(false);
  const timersRef = useRef([]);

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  useEffect(() => clearTimers, []);

  useEffect(() => {
    clearTimers();

    if (isHovered) {
      setIsWaving(false);

      const entryDelay = setTimeout(() => {
        setShowHand(true);
        setIsWaving(true);

        const waveStop = setTimeout(() => setIsWaving(false), 1200);
        const revert = setTimeout(() => {
          if (isHovered) setShowHand(false);
        }, 1700);

        timersRef.current.push(waveStop, revert);
      }, 180);

      timersRef.current.push(entryDelay);
    } else {
      setIsWaving(false);
      setShowHand(false);
    }
  }, [isHovered]);

  return (
    <div 
      className={`whoami-icon-stack ${showHand ? '' : ''}`}
      style={showHand ? { background: 'transparent', borderColor: 'transparent', boxShadow: 'none' } : {}}
    >
      <div
        className={`whoami-icon-layer ${showHand ? 'hidden-down' : 'visible'}`}
      >
        <UserIcon className="w-full h-full" />
      </div>
      <div
        className={`whoami-icon-layer ${showHand ? 'visible' : 'hidden-up'}`}
      >
        <img 
          src={byeHand} 
          alt="Waving hand" 
          className={`whoami-hand-img ${isWaving ? 'animate-hand-wave' : ''}`}
        />
      </div>
    </div>
  );
};

const Portfolio = () => {
  const [whoHovered, setWhoHovered] = useState(false);
  const [whatHovered, setWhatHovered] = useState(false);
  const [whatStage, setWhatStage] = useState('static');
  const whatTimersRef = useRef([]);
  const [showTechModal, setShowTechModal] = useState(false);
  const [showEducationModal, setShowEducationModal] = useState(false);

  const clearWhatTimers = () => {
    whatTimersRef.current.forEach(clearTimeout);
    whatTimersRef.current = [];
  };

  useEffect(() => clearWhatTimers, []);

  useEffect(() => {
    if (!showEducationModal) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setShowEducationModal(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showEducationModal]);

  useEffect(() => {
    clearWhatTimers();

    if (whatHovered) {
      setWhatStage('student');

      const toDeveloper = setTimeout(() => setWhatStage('developer'), 1600);
      const toML = setTimeout(() => setWhatStage('ml'), 3400);
      const toStatic = setTimeout(() => setWhatStage('static'), 6200);

      whatTimersRef.current.push(toDeveloper, toML, toStatic);
    } else {
      setWhatStage('static');
    }
  }, [whatHovered]);

  const renderWhatStage = () => {
    switch (whatStage) {
      case 'student':
        return (
          <div key="student" className="whatido-stage-content">
            <span className="block text-cyan-400 text-[clamp(0.65rem,1.4vw,0.9rem)] font-semibold uppercase tracking-[0.12em]">Student</span>
            <span className="block text-white text-[clamp(0.95rem,2.6vw,1.4rem)] font-bold">Level 2, term 1</span>
          </div>
        );
      case 'developer':
        return (
          <div key="developer" className="whatido-stage-content">
            <span className="block text-cyan-400 text-[clamp(0.65rem,1.4vw,0.9rem)] font-semibold uppercase tracking-[0.12em]">Software Developer</span>
            <span className="block text-white text-[clamp(0.95rem,2.6vw,1.4rem)] font-bold">part-time work at Free Pixel Games LTD.</span>
          </div>
        );
      case 'ml':
        return (
          <div key="ml" className="whatido-stage-content">
            <span className="block text-cyan-400 text-[clamp(0.65rem,1.4vw,0.9rem)] font-semibold uppercase tracking-[0.12em]">ML Enthusiast</span>
            <span className="block text-white text-[clamp(0.95rem,2.6vw,1.4rem)] font-bold">Currently learning regression and stuffs.</span>
          </div>
        );
      default:
        return (
          <div key="static" className="whatido-stage-content">
            <span className="block text-cyan-400 text-[clamp(0.6rem,1.2vw,0.75rem)] font-semibold uppercase tracking-[0.15em]">Student &</span>
            <span className="block text-white text-[clamp(1rem,3vw,1.75rem)] font-bold">Software</span>
            <span className="block text-white text-[clamp(0.875rem,2vw,1.25rem)]">Developer</span>
            <span className="block text-purple-400 text-[clamp(0.7rem,1.5vw,0.875rem)] font-medium mt-2">+ ML Enthusiast</span>
          </div>
        );
    }
  };

  const techGrid = [
    { icon: <PythonIcon />, name: 'Python', level: 82, color: 'hover:border-cyan-300/40 hover:bg-cyan-300/5' },
    { icon: <ViteIcon />, name: 'JavaScript', level: 78, color: 'hover:border-amber-200/40 hover:bg-amber-200/5' },
    { icon: <ReactIcon />, name: 'React', level: 75, color: 'hover:border-cyan-200/40 hover:bg-cyan-200/5' },
    { icon: <NodeIcon />, name: 'Node.js', level: 70, color: 'hover:border-emerald-200/40 hover:bg-emerald-200/5' },
    { icon: <TailwindIcon />, name: 'Tailwind CSS', level: 77, color: 'hover:border-teal-200/40 hover:bg-teal-200/5' },
    { icon: <GitIcon />, name: 'Git', level: 74, color: 'hover:border-orange-200/40 hover:bg-orange-200/5' },
    { icon: <SiMongodb />, name: 'MongoDB', level: 68, color: 'hover:border-lime-200/40 hover:bg-lime-200/5' },
    { icon: <DiPostgresql />, name: 'PostgreSQL', level: 65, color: 'hover:border-sky-200/40 hover:bg-sky-200/5' },
  ];

  const techModalSections = [
    {
      title: 'Languages',
      items: [
        { name: 'Python', icon: <PythonIcon />, level: 82 },
        { name: 'JavaScript', icon: <ViteIcon />, level: 78 },
        { name: 'Java', icon: <span className="text-[0.65rem] font-semibold tracking-wide">JAVA</span>, level: 60 },
        { name: 'C', icon: <span className="text-[0.8rem] font-semibold">C</span>, level: 58 },
        { name: 'C++', icon: <span className="text-[0.7rem] font-semibold">C++</span>, level: 55 },
        { name: 'HTML', icon: <span className="text-[0.65rem] font-semibold tracking-wide">HTML</span>, level: 85 },
        { name: 'CSS', icon: <span className="text-[0.65rem] font-semibold tracking-wide">CSS</span>, level: 82 },
      ],
    },
    {
      title: 'Frontend',
      items: [
        { name: 'React', icon: <ReactIcon />, level: 75 },
        { name: 'Tailwind CSS', icon: <TailwindIcon />, level: 77 },
      ],
    },
    {
      title: 'Backend',
      items: [
        { name: 'Node.js', icon: <NodeIcon />, level: 70 },
        { name: 'Express', icon: <span className="text-[0.7rem] font-semibold tracking-wide">ex</span>, level: 68 },
        { name: 'Next.js', icon: <span className="text-[0.7rem] font-semibold tracking-wide">N</span>, level: 64 }
      ],
    },
    {
      title: 'Game Dev',
      items: [
        { name: 'Unity 2D', icon: <FaUnity />, level: 50 },
        { name: 'C#', icon: <span className="text-[0.75rem] font-semibold">C#</span>, level: 55 },
        { name: 'Animation Design', icon: <span className="text-[0.7rem] font-semibold tracking-wide">AN</span>, level: 48 },
        { name: 'Player Mechanics', icon: <span className="text-[0.7rem] font-semibold tracking-wide">PM</span>, level: 52 },
      ],
    },
    {
      title: 'Databases',
      items: [
        { name: 'MongoDB', icon: <SiMongodb />, level: 68 },
        { name: 'PostgreSQL', icon: <DiPostgresql />, level: 65 },
        { name: 'QdrantDB', icon: <span className="text-sm">QD</span>, level: 58 },
        { name: 'Neo4j', icon: <SiNeo4J />, level: 54 },
        { name: 'mem0', icon: <span className="text-sm">mem0</span>, level: 50 },
      ],
    },
    {
      title: 'AI / Orchestration',
      items: [
        { name: 'LangChain', icon: <SiLangchain />, level: 62 },
        { name: 'LangGraph', icon: <span className="text-[0.7rem] font-semibold tracking-wide">LG</span>, level: 58 },
        { name: 'n8n', icon: <SiN8N />, level: 55 },
      ],
    },
  ];

  return (
    <>
      <div className="min-h-screen md:h-screen bg-slate-950 px-4 pb-4 pt-20 md:p-6 lg:p-8 overflow-y-auto md:overflow-hidden flex items-start md:items-center justify-center">
        {/* Animated background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.02]"
               style={{
                 backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), 
                                   linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                 backgroundSize: '50px 50px'
               }}
          ></div>
        </div>

        <div className="w-full max-w-6xl mx-auto relative z-10">
          {/* Custom Bento Grid - 3 columns, fits viewport */}
          <div className="bento-portfolio-grid">
          
          {/* WHO AM I */}
          <BentoCard index={1} className="who-am-i group" onHoverChange={setWhoHovered}>
            <div 
              className="flex items-start gap-3 md:gap-4 h-full"
            >
              <div className="flex-shrink-0 aspect-square w-[15%] min-w-[2.5rem] max-w-[3.5rem] rounded-2xl flex items-center justify-center text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-cyan-500/25 overflow-hidden">
                <WhoAmIIconSwap isHovered={whoHovered} />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">Who am I?</h2>
                <p className="whoami-copy text-slate-300 leading-relaxed text-xs md:text-sm line-clamp-4 md:line-clamp-none transition-all duration-300">
                  Hey! I'm a passionate <span className="text-cyan-400 font-semibold whoami-underline">Software Developer</span> and 
                  <span className="text-purple-400 font-semibold whoami-underline"> ML Enthusiast</span> from Bangladesh. 
                  I love building intelligent systems and crafting beautiful web experiences. 
                  Currently diving deep into machine learning while creating awesome software solutions.
                </p>
              </div>
            </div>
            {/* Decorative corner */}
            <div className="absolute top-3 right-3 w-[20%] max-w-[4rem] aspect-square border-t-2 border-r-2 border-cyan-500/20 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </BentoCard>

          {/* CURRENTLY LEARNING */}
          <BentoCard index={6} className="currently-learning group bg-slate-900/50 border-emerald-500/20">
            <div className="h-full flex flex-col">
              <h3 className="text-[clamp(0.875rem,2vw,1.125rem)] font-semibold text-white mb-2 flex items-center gap-2">
                <img
                  src={brainIcon}
                  alt="Brain"
                  className="currently-learning-brain w-[clamp(1rem,2vw,1.25rem)] h-[clamp(1rem,2vw,1.25rem)] object-contain"
                  loading="lazy"
                  decoding="async"
                />
                Currently Learning
              </h3>
              <div className="flex-1 flex flex-col justify-center gap-[clamp(0.35rem,1.5vh,0.625rem)]">
                {[
                  { name: 'Supervised Learning' },
                  { name: 'LLMs & RAG' },
                  { name: 'MCP servers' },
                ].map((item, i) => (
                  <div key={i} className="group/item">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-slate-300 text-[clamp(0.625rem,1.2vw,0.875rem)]">{item.name}</span>
                    </div>
                    
                  </div>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* WHAT DO I DO */}
          <BentoCard index={2} className="what-i-do group bg-slate-900/50 border-cyan-500/30" onHoverChange={setWhatHovered}>
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="relative mb-3">
                <BriefcaseIcon className="w-[clamp(2rem,8vw,3rem)] h-[clamp(2rem,8vw,3rem)] text-cyan-400 group-hover:scale-110 transition-transform" />
                <div className="absolute -inset-2 bg-cyan-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="space-y-1 whatido-stage">
                {renderWhatStage()}
              </div>
            </div>
          </BentoCard>

          {/* MY INFO (center) - animate first */}
          <BentoCard index={0} className="my-info group">
            <div className="flex flex-col items-center justify-center h-full text-center">
              {/* Profile Picture */}
              <div className="relative mb-[clamp(0.5rem,2vh,1rem)]">
                <div className="w-[clamp(4rem,18vw,7rem)] aspect-square rounded-full overflow-hidden border-4 border-cyan-500/30 group-hover:border-cyan-400/60 transition-all duration-500 shadow-2xl shadow-cyan-500/20">
                  <img 
                    src={me} 
                    alt="Profile"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=developer';
                    }}
                  />
                </div>
                {/* Animated ring */}
                <div className="absolute -inset-2 rounded-full border-2 border-cyan-400/20 animate-pulse"></div>
              </div>
              
              {/* Name */}
              <a
                href="https://github.com/Pritom2357"
                target="_blank"
                rel="noreferrer"
                className="text-[clamp(1.25rem,4vw,2rem)] font-bold text-slate-100 mb-1"
                aria-label="Open GitHub profile"
              >
                Pritom Biswas
              </a>
              
              {/* Contact Links */}
              <div className="flex flex-wrap justify-center gap-[clamp(0.25rem,0.8vw,0.5rem)]">
                <a
                  href="mailto:pritombiswas9999@gmail.com"
                  className="contact-pill group/contact"
                  title="Email"
                  aria-label="Email"
                >
                  <MailIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com/Pritom2357"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-pill group/contact"
                  title="GitHub"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/pritom-biswas-11b098315"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-pill group/contact"
                  title="LinkedIn"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://blogging.pritombiswas.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-pill group/contact"
                  title="Blog"
                  aria-label="Blog"
                >
                  <BlogIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://www.kaggle.com/pritom2357"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-pill group/contact"
                  title="Kaggle"
                  aria-label="Kaggle"
                >
                  <KaggleIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </BentoCard>

          {/* QUOTES */}
          <BentoCard index={3} className="quotes group bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent border-purple-500/20">
            <div className="flex flex-col justify-center h-full relative">
              <QuoteIcon className="w-[clamp(1.5rem,4vw,2.5rem)] h-[clamp(1.5rem,4vw,2.5rem)] text-purple-400/30 mb-2 group-hover:text-purple-400/50 transition-colors" />
              <blockquote className="text-[clamp(0.875rem,2vw,1.25rem)] font-medium text-white italic leading-relaxed group-hover:text-purple-100 transition-colors">
                "Stay hungry, stay foolish."
              </blockquote>
              <p className="text-slate-500 mt-2 text-[clamp(0.625rem,1.2vw,0.875rem)]">— Steve Jobs</p>
              <div className="absolute bottom-0 right-0 w-[30%] aspect-square max-w-24 bg-linear-to-tl from-purple-500/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </BentoCard>

          {/* TECHNOLOGIES */}
          <BentoCard index={4} className="technologies group">
            <h3 className="text-[clamp(0.875rem,2vw,1.125rem)] font-semibold text-white mb-2 flex items-center gap-2">
              <CodeIcon className="w-[clamp(1rem,2vw,1.25rem)] h-[clamp(1rem,2vw,1.25rem)] text-cyan-400" />
              Techs I know
              <button
                type="button"
                className="ml-auto text-xs px-2 py-1 rounded-full border border-cyan-400/50 text-cyan-200 hover:bg-cyan-500/10 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTechModal(true);
                }}
              >
                Details
              </button>
            </h3>
            <div className="grid grid-cols-4 gap-[clamp(0.35rem,1vw,0.625rem)] flex-1 content-center">
              {techGrid.map((tech, i) => (
                <div key={i} className={`tech-icon ${tech.color}`}>
                  <span className="tech-icon__glyph">{tech.icon}</span>
                  <span className="tech-tooltip">{tech.name}</span>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* EDUCATION */}
          <BentoCard index={5} className="education group">
            <div className="h-full flex flex-col">
              <div className="flex items-center gap-2">
                <AcademicIcon className="w-[clamp(1rem,2vw,1.25rem)] h-[clamp(1rem,2vw,1.25rem)] text-amber-200/90" />
                {/* <h3 className="text-[clamp(0.875rem,2vw,1.125rem)] font-semibold text-white">Education</h3> */}
                <button
                  type="button"
                  className="ml-auto text-xs px-2 py-1 rounded-full border border-amber-300/40 text-amber-100 hover:bg-amber-500/10 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowEducationModal(true);
                  }}
                >
                  Details
                </button>
              </div>

              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 content-center">
                <div className="education-item">
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-slate-300 text-xs font-semibold uppercase tracking-wider">Education</div>
                    <span className="text-slate-500 text-xs bg-slate-700/30 px-2 py-0.5 rounded-full whitespace-nowrap">2024 - Ongoing</span>
                  </div>
                  <div className="text-white font-medium text-sm mt-1">Bangladesh University of Engineering and Technology (BUET)</div>
                </div>

                <div className="education-item">
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-slate-300 text-xs font-semibold uppercase tracking-wider">Experience</div>
                    <span className="text-slate-500 text-xs bg-slate-700/30 px-2 py-0.5 rounded-full whitespace-nowrap">05/01/2025 - Ongoing</span>
                  </div>
                  <div className="text-white font-medium text-sm mt-1 truncate">Free Pixel Games Ltd.</div>
                </div>
              </div>
            </div>
          </BentoCard>

        </div>
      </div>
    </div>

      {showTechModal && (
        <div className="tech-modal-backdrop" onClick={() => setShowTechModal(false)}>
          <div className="tech-modal" onClick={(e) => e.stopPropagation()}>
            <div className="tech-modal__header">
              <div className="flex items-center gap-2">
                <CodeIcon className="w-5 h-5 text-cyan-300" />
                <span className="text-base font-semibold text-white">Tech Stack Details</span>
              </div>
              <button
                className="tech-modal__close"
                aria-label="Close"
                onClick={() => setShowTechModal(false)}
              >
                ×
              </button>
            </div>
            <div className="tech-modal__grid">
              {techModalSections.map((section) => (
                <div key={section.title} className="tech-modal__section">
                  <h4 className="tech-modal__title">{section.title}</h4>
                  <div className="tech-modal__items">
                    {section.items.map((item) => (
                      <div key={item.name} className="tech-icon">
                        <span className="tech-icon__glyph">{item.icon}</span>
                        <span className="tech-tooltip">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="tech-modal__section">
                <h4 className="tech-modal__title">Machine Learning</h4>
                <div className="tech-modal__items text-sm text-gray-200 leading-6">
                  Familiar with CNNs, RNN/LSTMs, attention mechanisms, transformers, optimization, and evaluation.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showEducationModal && (
        <div
          className="tech-modal-backdrop"
          onClick={() => {
            setShowEducationModal(false);
          }}
        >
          <div className="tech-modal" onClick={(e) => e.stopPropagation()}>
            <div className="tech-modal__header">
              <div className="flex items-center gap-2">
                <AcademicIcon className="w-5 h-5 text-amber-200" />
                <span className="text-base font-semibold text-white">Education & Experience</span>
              </div>
              <button
                className="tech-modal__close"
                aria-label="Close"
                onClick={() => setShowEducationModal(false)}
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="tech-modal__section">
                <h4 className="tech-modal__title">Education</h4>
                <div className="space-y-2">
                  <div className="education-item">
                    <div className="flex justify-between items-start gap-2 flex-wrap">
                      <h4 className="text-white font-medium text-sm text-wrap">Bangladesh University of Engineering and Technology (BUET)</h4>
                      <span className="text-slate-500 text-xs bg-slate-700/30 px-2 py-0.5 rounded-full whitespace-nowrap">2024 - Ongoing</span>
                    </div>
                    <p className="text-slate-400 text-xs mt-0.5">Computer Science and Engineering (CSE)</p>
                  </div>

                  <div className="education-item">
                    <div className="flex justify-between items-start gap-2 flex-wrap">
                      <h4 className="text-white font-medium text-sm">Notre Dame College</h4>
                      <span className="text-slate-500 text-xs bg-slate-700/30 px-2 py-0.5 rounded-full whitespace-nowrap">2022 - 2023</span>
                    </div>
                  </div>

                  <div className="education-item">
                    <div className="flex justify-between items-start gap-2 flex-wrap">
                      <h4 className="text-white font-medium text-sm">Satkhira Govt. High School</h4>
                      <span className="text-slate-500 text-xs bg-slate-700/30 px-2 py-0.5 rounded-full whitespace-nowrap">2013 - 2022</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tech-modal__section">
                <h4 className="tech-modal__title">Experience</h4>
                <div className="space-y-2">
                  <div className="education-item">
                    <div className="flex justify-between items-start gap-2 flex-wrap">
                      <h4 className="text-white font-medium text-sm">Free Pixel Games Ltd.</h4>
                      <span className="text-slate-500 text-xs bg-slate-700/30 px-2 py-0.5 rounded-full whitespace-nowrap">05/01/2025 - Ongoing</span>
                      <div className='text-center justify-center align-center'>
                        <div className="text-gray-300 text-center font-medium text-sm">(Junior Software Developer)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Portfolio;
