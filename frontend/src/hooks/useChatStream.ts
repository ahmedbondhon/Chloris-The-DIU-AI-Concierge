import { useState, useCallback, useRef, useEffect } from 'react';

export const useChatStream = () => {
  const [streamedText, setStreamedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Ref to store the timer ID so we can stop it if the user leaves the page
  const typingRef = useRef<number | null>(null);

  const streamResponse = useCallback((fullText: string, speed: number = 30) => {
    setIsTyping(true);
    setStreamedText(''); // Reset text
    let index = 0;

    const typeCharacter = () => {
      if (index < fullText.length) {
        setStreamedText((prev) => prev + fullText.charAt(index));
        index++;
        // Schedule the next character
        typingRef.current = window.setTimeout(typeCharacter, speed);
      } else {
        // Finished typing
        setIsTyping(false);
      }
    };

    // Start the loop
    typeCharacter();
  }, []);

  // Cleanup: Stop typing if the component is destroyed
  useEffect(() => {
    return () => {
      if (typingRef.current) {
        clearTimeout(typingRef.current);
      }
    };
  }, []);

  return { streamedText, isTyping, streamResponse };
};