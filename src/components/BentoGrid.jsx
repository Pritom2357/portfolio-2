import { useState, useRef, useEffect } from 'react';

// Entrance animation config - blocks animate in a spiral pattern
const getAnimationConfig = (index) => {
  const configs = [
    // 0: Center card first (My Info)
    { delay: 0, from: 'translateY(10px) scale(0.96)', easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
    // Then the rest in a calmer stagger (ms)
    { delay: 450, from: 'translateX(-90%)', easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
    { delay: 650, from: 'translateY(-90%)', easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
    { delay: 850, from: 'translateX(90%)', easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
    { delay: 1050, from: 'translateY(90%)', easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
    { delay: 1250, from: 'translateX(-70%) translateY(35%)', easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
    { delay: 1450, from: 'translateX(70%) translateY(35%)', easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
  ];
  return configs[index % configs.length];
};

const BentoCard = ({ children, className = '', index = 0, colSpan = 1, rowSpan = 1, onHoverChange }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const config = getAnimationConfig(index);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, config.delay);

    return () => clearTimeout(timer);
  }, [config.delay]);

  const spanClasses = `
    ${colSpan === 2 ? 'md:col-span-2' : ''}
    ${rowSpan === 2 ? 'md:row-span-2' : ''}
  `;

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => {
        setIsHovered(true);
        if (onHoverChange) onHoverChange(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        if (onHoverChange) onHoverChange(false);
      }}
      className={`bento-card ${spanClasses} ${className} ${isHovered ? 'glitter-active' : ''}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0) translateY(0) scale(1) rotate(0deg)' : config.from,
        transition: `opacity 1s ${config.easing}, transform 1s ${config.easing}`,
      }}
    >
      {/* Glittering border container */}
      <div className="glitter-border-container">
        <div className={`glitter-point glitter-point-left ${isHovered ? 'active' : ''}`}></div>
        <div className={`glitter-point glitter-point-right ${isHovered ? 'active' : ''}`}></div>
      </div>
      
      {children}
    </div>
  );
};

const BentoGrid = ({ children }) => {
  return (
    <div className="bento-grid">
      {children}
    </div>
  );
};

export { BentoGrid, BentoCard };
