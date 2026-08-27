import { useState, useEffect, useRef } from 'react';
import { GithubIcon, LinkedInIcon, MailIcon, BriefcaseIcon } from './Icons';
import me from '../assets/me-contact.png';
import emailjs from '@emailjs/browser';
const KaggleIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.071.358"/>
  </svg>
);

const BlogIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
  </svg>
);

const BentoCard = ({ children, className = '', delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`bento-card ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.96)',
        transition: 'opacity 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      {children}
    </div>
  );
};

const contactLinks = [
  {
    icon: <MailIcon className="w-5 h-5" />,
    label: 'Email',
    value: 'pritombiswas9999@gmail.com',
    href: 'mailto:pritombiswas9999@gmail.com',
  },
  {
    icon: <GithubIcon className="w-5 h-5" />,
    label: 'GitHub',
    value: 'github.com/Pritom2357',
    href: 'https://github.com/Pritom2357',
  },
  {
    icon: <LinkedInIcon className="w-5 h-5" />,
    label: 'LinkedIn',
    value: 'linkedin.com/in/pritom-biswas',
    href: 'https://www.linkedin.com/in/pritom-biswas-11b098315',
  },
  {
    icon: <BlogIcon className="w-5 h-5" />,
    label: 'Blog',
    value: 'blogging.pritombiswas.com',
    href: 'https://blogging.pritombiswas.com/',
  },
  {
    icon: <KaggleIcon className="w-5 h-5" />,
    label: 'Kaggle',
    value: 'kaggle.com/pritom2357',
    href: 'https://www.kaggle.com/pritom2357',
  },
];

const Contact = () => {
  const formRef = useRef();
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState({ loading: false, success: false, error: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, success: false, error: '' });

    try {
      await emailjs.sendForm(
        'service_pw4xaaw',
        'template_w8wy7ug',
        formRef.current,
        'R9G_6ASJNFBfOq7p2' // Replace with your EmailJS public key
      );

      setFormStatus({ loading: false, success: true, error: '' });
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus({ loading: false, success: false, error: '' }), 3000);
    } catch {
      setFormStatus({ loading: false, success: false, error: 'Failed to send message. Please try again.' });
    }
  };

  return (
    <div className="min-h-screen bg-cream px-4 pb-8 pt-20 md:p-8 md:pt-24 overflow-y-auto">
      <div className="nb-dots" aria-hidden="true"></div>

      {/* Content */}
      <div className="w-full max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">

          {/* Profile Card - Top on mobile, left on desktop */}
          <BentoCard delay={0} className="md:col-span-2 bg-mustard">
            <div className="flex flex-col md:flex-row items-center gap-6 p-2 md:p-4">
              <div className="w-32 h-32 rounded-full overflow-hidden border-[3px] border-ink bg-paper shadow-nb flex-shrink-0">
                <img
                  src={me}
                  alt="Pritom Biswas"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl text-ink mb-2">Pritom Biswas</h1>
                <p className="inline-block text-base md:text-lg font-bold text-paper bg-navy border-2 border-ink px-3 py-1 rounded-md shadow-nb-sm">Software Developer & ML Enthusiast</p>
              </div>
            </div>
          </BentoCard>

          {/* Contact Links */}
          <BentoCard delay={200} className="bg-paper">
            <h2 className="text-xl text-ink mb-4 flex items-center gap-2">
              <MailIcon className="w-5 h-5 text-navy" />
              Contact Info
            </h2>
            <div className="space-y-3">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  className="contact-link-item"
                >
                  <span className="text-ink">{link.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[0.65rem] text-ink/70 uppercase tracking-wider font-bold">{link.label}</div>
                    <div className="text-sm text-ink font-semibold truncate">{link.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </BentoCard>

          {/* Why Hire Me */}
          <BentoCard delay={400} className="bg-lavender">
            <h2 className="text-xl text-ink mb-4 flex items-center gap-2">
              <BriefcaseIcon className="w-5 h-5 text-violet" />
              What I did previously
            </h2>
            <div className="space-y-3 text-sm text-ink leading-relaxed">
              <p>
                With <strong className="font-bold">2+ years of development experience</strong>, I bring a proven track record of delivering quality software solutions. Currently working part-time at <strong className="font-bold text-navy">Free Pixel Games Ltd.</strong> for nearly a year.
              </p>
              <p>
                I've honed my skills in <strong className="font-bold text-violet">teamwork and collaboration</strong>, working on diverse projects including:
              </p>
              <ul className="space-y-2 ml-1">
                {[
                  ['WordPress & Shopify', 'theme development'],
                  ['Analytics tools', 'development'],
                  ['AI image editor', 'application'],
                  ['n8n workflows', 'automation'],
                ].map(([bold, rest]) => (
                  <li key={bold} className="flex items-start gap-2">
                    <span className="inline-block w-2.5 h-2.5 mt-1.5 bg-ink rounded-sm flex-shrink-0"></span>
                    <span><strong className="font-bold">{bold}</strong> {rest}</span>
                  </li>
                ))}
              </ul>
              <p>
                Currently expanding my expertise into <strong className="font-bold text-navy">MCP servers</strong> and advanced <strong className="font-bold text-orange">AI integrations</strong>. I'm passionate about learning and quickly adapting to new technologies.
              </p>
            </div>
          </BentoCard>

          {/* Contact Form */}
          <BentoCard delay={600} className="md:col-span-2 bg-paper">
            <h2 className="text-xl text-ink mb-4">Send Me a Message</h2>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-ink mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    required
                    className="nb-input"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-ink mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    required
                    className="nb-input"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-ink mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  required
                  rows="5"
                  className="nb-input resize-none"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              <div className="flex items-center gap-4 pt-1">
                <button
                  type="submit"
                  disabled={formStatus.loading}
                  className="nb-btn"
                >
                  {formStatus.loading ? 'Sending...' : 'Send Message'}
                </button>
                {formStatus.success && (
                  <span className="text-sm text-navy font-bold">✓ Message sent!</span>
                )}
                {formStatus.error && (
                  <span className="text-sm text-orange font-bold">{formStatus.error}</span>
                )}
              </div>
            </form>
          </BentoCard>

        </div>
      </div>
    </div>
  );
};

export default Contact;
