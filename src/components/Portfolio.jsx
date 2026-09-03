import { useEffect, useRef, useState } from 'react';
import { BentoCard } from './BentoGrid';
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
import { FaUnity, FaFileAlt } from 'react-icons/fa';
import { DiPostgresql } from 'react-icons/di';
import { SiLangchain, SiMongodb, SiN8N, SiNeo4J } from 'react-icons/si';
import byeHand from '../assets/bye.png';
import brainIcon from '../assets/brain.png';
import me from '../assets/me-landing.png';

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
    <div className="whoami-icon-stack">
      <div className={`whoami-icon-layer ${showHand ? 'hidden-down' : 'visible'}`}>
        <UserIcon className="w-full h-full" />
      </div>
      <div className={`whoami-icon-layer ${showHand ? 'visible' : 'hidden-up'}`}>
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
            <span className="block text-mustard text-[clamp(0.65rem,1.4vw,0.9rem)] font-bold uppercase tracking-[0.12em]">Student</span>
            <span className="block text-paper text-[clamp(0.95rem,2.6vw,1.4rem)] font-display">Level 2, term 1</span>
          </div>
        );
      case 'developer':
        return (
          <div key="developer" className="whatido-stage-content">
            <span className="block text-mustard text-[clamp(0.65rem,1.4vw,0.9rem)] font-bold uppercase tracking-[0.12em]">Software Developer</span>
            <span className="block text-paper text-[clamp(0.95rem,2.6vw,1.4rem)] font-display">part-time work at Free Pixel Games LTD.</span>
          </div>
        );
      case 'ml':
        return (
          <div key="ml" className="whatido-stage-content">
            <span className="block text-mustard text-[clamp(0.65rem,1.4vw,0.9rem)] font-bold uppercase tracking-[0.12em]">ML Enthusiast</span>
            <span className="block text-paper text-[clamp(0.95rem,2.6vw,1.4rem)] font-display">Currently learning regression and stuffs.</span>
          </div>
        );
      default:
        return (
          <div key="static" className="whatido-stage-content">
            <span className="block text-mustard text-[clamp(0.6rem,1.2vw,0.75rem)] font-bold uppercase tracking-[0.15em]">Student &</span>
            <span className="block text-paper text-[clamp(1rem,3vw,1.75rem)] font-display">Software</span>
            <span className="block text-paper text-[clamp(0.875rem,2vw,1.25rem)]">Developer</span>
            <span className="block text-lavender text-[clamp(0.7rem,1.5vw,0.875rem)] font-semibold mt-2">+ ML Enthusiast</span>
          </div>
        );
    }
  };

  const techGrid = [
    { icon: <PythonIcon />, name: 'Python', level: 82, color: 'hover:bg-mustard' },
    { icon: <ViteIcon />, name: 'JavaScript', level: 78, color: 'hover:bg-lavender' },
    { icon: <ReactIcon />, name: 'React', level: 75, color: 'hover:bg-orange hover:text-paper' },
    { icon: <NodeIcon />, name: 'Node.js', level: 70, color: 'hover:bg-navy hover:text-paper' },
    { icon: <TailwindIcon />, name: 'Tailwind CSS', level: 77, color: 'hover:bg-lavender' },
    { icon: <GitIcon />, name: 'Git', level: 74, color: 'hover:bg-orange hover:text-paper' },
    { icon: <SiMongodb />, name: 'MongoDB', level: 68, color: 'hover:bg-mustard' },
    { icon: <DiPostgresql />, name: 'PostgreSQL', level: 65, color: 'hover:bg-navy hover:text-paper' },
  ];

  const techModalSections = [
    {
      title: 'Languages',
      items: [
        { name: 'Python', icon: <PythonIcon />, level: 82 },
        { name: 'JavaScript', icon: <ViteIcon />, level: 78 },
        { name: 'Java', icon: <span className="text-[0.65rem] font-bold tracking-wide">JAVA</span>, level: 60 },
        { name: 'C', icon: <span className="text-[0.8rem] font-bold">C</span>, level: 58 },
        { name: 'C++', icon: <span className="text-[0.7rem] font-bold">C++</span>, level: 55 },
        { name: 'HTML', icon: <span className="text-[0.65rem] font-bold tracking-wide">HTML</span>, level: 85 },
        { name: 'CSS', icon: <span className="text-[0.65rem] font-bold tracking-wide">CSS</span>, level: 82 },
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
        { name: 'Express', icon: <span className="text-[0.7rem] font-bold tracking-wide">ex</span>, level: 68 },
        { name: 'Next.js', icon: <span className="text-[0.7rem] font-bold tracking-wide">N</span>, level: 64 }
      ],
    },
    {
      title: 'Game Dev',
      items: [
        { name: 'Unity 2D', icon: <FaUnity />, level: 50 },
        { name: 'C#', icon: <span className="text-[0.75rem] font-bold">C#</span>, level: 55 },
        { name: 'Animation Design', icon: <span className="text-[0.7rem] font-bold tracking-wide">AN</span>, level: 48 },
        { name: 'Player Mechanics', icon: <span className="text-[0.7rem] font-bold tracking-wide">PM</span>, level: 52 },
      ],
    },
    {
      title: 'Databases',
      items: [
        { name: 'MongoDB', icon: <SiMongodb />, level: 68 },
        { name: 'PostgreSQL', icon: <DiPostgresql />, level: 65 },
        { name: 'QdrantDB', icon: <span className="text-sm font-bold">QD</span>, level: 58 },
        { name: 'Neo4j', icon: <SiNeo4J />, level: 54 },
        { name: 'mem0', icon: <span className="text-sm font-bold">mem0</span>, level: 50 },
      ],
    },
    {
      title: 'AI / Orchestration',
      items: [
        { name: 'LangChain', icon: <SiLangchain />, level: 62 },
        { name: 'LangGraph', icon: <span className="text-[0.7rem] font-bold tracking-wide">LG</span>, level: 58 },
        { name: 'n8n', icon: <SiN8N />, level: 55 },
      ],
    },
  ];

  return (
    <>
      <div className="min-h-screen md:h-screen bg-cream px-4 pb-4 pt-20 md:p-6 lg:p-8 overflow-y-auto md:overflow-hidden flex items-start md:items-center justify-center">
        <div className="nb-dots" aria-hidden="true"></div>

        <div className="w-full max-w-6xl mx-auto relative z-10">
          {/* Custom Bento Grid - 3 columns, fits viewport */}
          <div className="bento-portfolio-grid">

          {/* WHO AM I */}
          <BentoCard index={1} className="who-am-i group bg-paper" onHoverChange={setWhoHovered}>
            <div className="flex items-start gap-3 md:gap-4 h-full">
              <div className="flex-shrink-0 aspect-square w-[15%] min-w-[2.5rem] max-w-[3.5rem] rounded-xl border-2 border-ink bg-lavender p-1.5 flex items-center justify-center text-ink group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 overflow-hidden">
                <WhoAmIIconSwap isHovered={whoHovered} />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg md:text-xl lg:text-2xl text-ink mb-2">Who am I?</h2>
                <p className="whoami-copy text-ink/85 leading-relaxed text-xs md:text-sm line-clamp-4 md:line-clamp-none transition-all duration-300">
                  Hey! I'm a passionate <span className="text-navy font-bold whoami-underline">Software Developer</span> and
                  <span className="text-violet font-bold whoami-underline"> ML Enthusiast</span> from Bangladesh.
                  I love building intelligent systems and crafting beautiful web experiences.
                  Currently diving deep into machine learning while creating awesome software solutions.
                </p>
              </div>
            </div>
            {/* Decorative corner */}
            <div className="absolute top-3 right-3 w-[20%] max-w-[4rem] aspect-square border-t-[3px] border-r-[3px] border-ink rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </BentoCard>

          {/* CURRENTLY LEARNING */}
          <BentoCard index={6} className="currently-learning group bg-lavender">
            <div className="h-full flex flex-col">
              <h3 className="text-[clamp(0.875rem,2vw,1.125rem)] text-ink mb-2 flex items-center gap-2">
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
                  <div key={i} className="flex items-center gap-2">
                    <span className="inline-block w-2.5 h-2.5 bg-ink rounded-sm flex-shrink-0"></span>
                    <span className="text-ink font-semibold text-[clamp(0.625rem,1.2vw,0.875rem)]">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* WHAT DO I DO */}
          <BentoCard index={2} className="what-i-do group bg-navy text-paper" onHoverChange={setWhatHovered}>
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="relative mb-3">
                <BriefcaseIcon className="w-[clamp(2rem,8vw,3rem)] h-[clamp(2rem,8vw,3rem)] text-mustard group-hover:scale-110 group-hover:-rotate-6 transition-transform" />
              </div>
              <div className="space-y-1 whatido-stage">
                {renderWhatStage()}
              </div>
            </div>
          </BentoCard>

          {/* MY INFO (center) - animate first */}
          <BentoCard index={0} className="my-info group bg-mustard">
            <div className="flex flex-col items-center justify-center h-full text-center">
              {/* Profile Picture */}
              <div className="relative mb-[clamp(0.5rem,2vh,1rem)]">
                <div className="w-[clamp(4.5rem,18vw,7.5rem)] aspect-square rounded-full overflow-hidden border-[3px] border-ink bg-paper shadow-nb group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300">
                  <img
                    src={me}
                    alt="Pritom Biswas"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Name */}
              <a
                href="https://github.com/Pritom2357"
                target="_blank"
                rel="noreferrer"
                className="font-display text-[clamp(1.25rem,4vw,2rem)] text-ink mb-2 leading-tight"
                aria-label="Open GitHub profile"
              >
                Pritom Biswas
              </a>

              {/* Contact Links */}
              <div className="flex flex-wrap justify-center gap-[clamp(0.35rem,0.8vw,0.5rem)]">
                <a href="mailto:pritombiswas9999@gmail.com" className="contact-pill" title="Email" aria-label="Email">
                  <MailIcon className="w-4 h-4" />
                </a>
                <a href="https://github.com/Pritom2357" target="_blank" rel="noreferrer" className="contact-pill" title="GitHub" aria-label="GitHub">
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a href="https://www.linkedin.com/in/pritom-biswas-11b098315" target="_blank" rel="noreferrer" className="contact-pill" title="LinkedIn" aria-label="LinkedIn">
                  <LinkedInIcon className="w-4 h-4" />
                </a>
                <a href="https://blogging.pritombiswas.com/" target="_blank" rel="noreferrer" className="contact-pill" title="Blog" aria-label="Blog">
                  <BlogIcon className="w-4 h-4" />
                </a>
                <a href="/Pritom_Biswas_CV.pdf" target="_blank" rel="noreferrer" className="contact-pill" title="CV" aria-label="Open my CV">
                  <FaFileAlt className="w-4 h-4" />
                </a>
              </div>
            </div>
          </BentoCard>

          {/* QUOTES */}
          <BentoCard index={3} className="quotes group bg-orange text-paper">
            <div className="flex flex-col justify-center h-full relative">
              <QuoteIcon className="w-[clamp(1.5rem,4vw,2.5rem)] h-[clamp(1.5rem,4vw,2.5rem)] text-ink mb-2 group-hover:-rotate-6 transition-transform" />
              <blockquote className="font-display text-[clamp(0.875rem,2vw,1.25rem)] text-paper leading-snug">
                "Stay hungry, stay foolish."
              </blockquote>
              <p className="text-ink font-bold mt-2 text-[clamp(0.625rem,1.2vw,0.875rem)]">— Steve Jobs</p>
            </div>
          </BentoCard>

          {/* TECHNOLOGIES */}
          <BentoCard index={4} className="technologies group bg-paper">
            <h3 className="text-[clamp(0.8rem,1.6vw,1.05rem)] text-ink mb-3 flex items-center gap-2 whitespace-nowrap">
              <CodeIcon className="w-[clamp(1rem,2vw,1.25rem)] h-[clamp(1rem,2vw,1.25rem)] text-navy flex-shrink-0" />
              Techs I know
              <button
                type="button"
                className="ml-auto nb-btn-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTechModal(true);
                }}
              >
                Details
              </button>
            </h3>
            <div className="grid grid-cols-4 grid-rows-[repeat(2,minmax(0,1fr))] gap-[clamp(0.5rem,1vw,0.75rem)] flex-1 min-h-0 items-center justify-items-center content-center">
              {techGrid.map((tech, i) => (
                <div key={i} className={`tech-icon ${tech.color}`}>
                  <span className="tech-icon__glyph">{tech.icon}</span>
                  <span className="tech-tooltip">{tech.name}</span>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* EDUCATION */}
          <BentoCard index={5} className="education group bg-paper">
            <div className="h-full flex flex-col">
              <div className="flex items-center gap-2">
                <AcademicIcon className="w-[clamp(1rem,2vw,1.25rem)] h-[clamp(1rem,2vw,1.25rem)] text-orange" />
                <span className="text-ink font-display text-[clamp(0.875rem,2vw,1.125rem)]">Where I've been</span>
                <button
                  type="button"
                  className="ml-auto nb-btn-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowEducationModal(true);
                  }}
                >
                  Details
                </button>
              </div>

              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 content-center">
                <div className="education-item">
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-ink/70 text-xs font-bold uppercase tracking-wider">Education</div>
                    <span className="nb-chip">2024 - Ongoing</span>
                  </div>
                  <div className="text-ink font-bold text-sm mt-1">Bangladesh University of Engineering and Technology (BUET)</div>
                </div>

                <div className="education-item">
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-ink/70 text-xs font-bold uppercase tracking-wider">Experience</div>
                    <span className="nb-chip">05/01/2025 - Ongoing</span>
                  </div>
                  <div className="text-ink font-bold text-sm mt-1 truncate">Free Pixel Games Ltd.</div>
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
                <CodeIcon className="w-5 h-5 text-navy" />
                <span className="font-display text-base text-ink">Tech Stack Details</span>
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
                <div className="tech-modal__items text-sm text-ink leading-6">
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
                <AcademicIcon className="w-5 h-5 text-orange" />
                <span className="font-display text-base text-ink">Education & Experience</span>
              </div>
              <button
                className="tech-modal__close"
                aria-label="Close"
                onClick={() => setShowEducationModal(false)}
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="tech-modal__section">
                <h4 className="tech-modal__title">Education</h4>
                <div className="space-y-3">
                  <div className="education-item">
                    <div className="flex justify-between items-start gap-2 flex-wrap">
                      <h4 className="text-ink font-bold text-sm text-wrap">Bangladesh University of Engineering and Technology (BUET)</h4>
                      <span className="nb-chip">2024 - Ongoing</span>
                    </div>
                    <p className="text-ink/70 text-xs mt-0.5 font-semibold">Computer Science and Engineering (CSE)</p>
                  </div>

                  <div className="education-item">
                    <div className="flex justify-between items-start gap-2 flex-wrap">
                      <h4 className="text-ink font-bold text-sm">Notre Dame College</h4>
                      <span className="nb-chip">2022 - 2023</span>
                    </div>
                  </div>

                  <div className="education-item">
                    <div className="flex justify-between items-start gap-2 flex-wrap">
                      <h4 className="text-ink font-bold text-sm">Satkhira Govt. High School</h4>
                      <span className="nb-chip">2013 - 2022</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tech-modal__section">
                <h4 className="tech-modal__title">Experience</h4>
                <div className="space-y-3">
                  <div className="education-item">
                    <div className="flex justify-between items-start gap-2 flex-wrap">
                      <h4 className="text-ink font-bold text-sm">Free Pixel Games Ltd.</h4>
                      <span className="nb-chip">05/01/2025 - Ongoing</span>
                    </div>
                    <p className="text-ink/70 text-xs mt-0.5 font-semibold">Junior Software Developer</p>
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
