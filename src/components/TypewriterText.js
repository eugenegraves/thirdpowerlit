import React, { useState, useEffect } from 'react';

const TypewriterText = ({ text, speed = 50, className = '', delay = 0, breakLines = false, wordsPerLine = 3 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startAnimation, setStartAnimation] = useState(false);

  // Format text with line breaks if needed
  const formattedText = breakLines ? 
    text.split(' ').reduce((result, word, index, array) => {
      if (index > 0 && index % wordsPerLine === 0) {
        return `${result} ${word}<br/>`;
      }
      return `${result} ${word}`;
    }, '').trim() 
    : text;

  // Handle initial delay before starting the animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  // Handle the typewriter effect
  useEffect(() => {
    if (!startAnimation) return;
    
    if (currentIndex < formattedText.length) {
      const timer = setTimeout(() => {
        setDisplayText(prevText => prevText + formattedText[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, formattedText, speed, startAnimation]);

  // Render with HTML for line breaks
  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{
        __html: displayText + (currentIndex < formattedText.length ? '<span class="animate-pulse">|</span>' : '')
      }}
    />
  );
};

export default TypewriterText; 