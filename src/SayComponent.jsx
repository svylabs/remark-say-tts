import React, { useState } from 'react';
import './SayComponent.css';

export function SayComponent({ node, children, ...props }) {
  const text = props['data-text'] || '';
  const lang = props['data-lang'] || 'en-US';
  const rate = parseFloat(props['data-rate'] || '1.0');
  const pitch = parseFloat(props['data-pitch'] || '1.0');
  
  const [isSlowMode, setIsSlowMode] = useState(false);

  const handleSpeak = (e) => {
    e.preventDefault();
    
    if (!('speechSynthesis' in window)) {
      alert('Sorry, your browser does not support text-to-speech!');
      return;
    }

    window.speechSynthesis.cancel();

    const speakWithVoice = () => {
      const utterance = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      
      const targetVoice = voices.find(voice => voice.lang === lang);
      
      if (targetVoice) {
        utterance.voice = targetVoice;
      }
      
      utterance.lang = lang;
      utterance.rate = isSlowMode ? rate * 0.6 : rate;
      utterance.pitch = pitch;

      window.speechSynthesis.speak(utterance);
      
      setIsSlowMode(!isSlowMode);
    };

    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.addEventListener('voiceschanged', speakWithVoice, { once: true });
    } else {
      speakWithVoice();
    }
  };

  return (
    <span className="say-tts-wrapper">
      <span className="say-tts-text">{children}</span>
      <button 
        className="say-tts-button" 
        onClick={handleSpeak}
        aria-label={`Play pronunciation of ${text}`}
        title={isSlowMode ? "Click to hear at normal speed" : "Click to hear at slow speed"}
      >
        🔊
      </button>
    </span>
  );
}
