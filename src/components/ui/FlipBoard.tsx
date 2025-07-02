"use client";

import { useEffect, useRef, useState } from 'react';

interface FlipBoardProps {
  text: string;
  className?: string;
  animate?: boolean;
  delay?: number;
}

export default function FlipBoard({ 
  text, 
  className = "", 
  animate = false,
  delay = 0 
}: FlipBoardProps) {
  const [isFlipping, setIsFlipping] = useState(false);
  const [displayText, setDisplayText] = useState(text);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (animate && text !== displayText) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setIsFlipping(true);
        
        setTimeout(() => {
          setDisplayText(text);
          setIsFlipping(false);
        }, 100); // Half of the flip animation duration
      }, delay);
    } else {
      setDisplayText(text);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, animate, delay, displayText]);

  const renderFlipUnits = () => {
    return displayText.split('').map((char: string, index: number) => {
      if (char === ' ') {
        return <span key={index} className="inline-block">&nbsp;</span>;
      }
      
      if (char === '\n') {
        return <br key={index} />;
      }

      return (
        <span
          key={index}
          className={`flip-unit ${isFlipping ? 'is-flipping' : ''}`}
          style={{ animationDelay: animate ? `${index * 20}ms` : '0ms' }}
        >
          <span>{char}</span>
        </span>
      );
    });
  };

  return (
    <div className={`flip-board ${className}`}>
      {renderFlipUnits()}
    </div>
  );
}

// Higher-order component for easy flip-board headings
interface FlipHeadingProps {
  children: string;
  className?: string;
  animate?: boolean;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function FlipHeading({ 
  children, 
  className = "", 
  animate = false,
  level = 1 
}: FlipHeadingProps) {
  const HeadingTag = level === 1 ? 'h1' : 
                    level === 2 ? 'h2' : 
                    level === 3 ? 'h3' : 
                    level === 4 ? 'h4' : 
                    level === 5 ? 'h5' : 'h6';
  
  return (
    <HeadingTag className={`flip-board ${className}`}>
      <FlipBoard text={children} animate={animate} />
    </HeadingTag>
  );
}