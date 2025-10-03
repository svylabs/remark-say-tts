import React from 'react';
import './SayComponent.css';

export function SayComponent({ node, children, ...props }) {
  const text = props['data-text'] || '';
  const lang = props['data-lang'] || 'en-US';
  const rate = parseFloat(props['data-rate'] || '1.0');
  const pitch = parseFloat(props['data-pitch'] || '1.0');

  const handleSpeak = (e) => {
    e.preventDefault();
    
    if (!('speechSynthesis' in window)) {
      alert('Sorry, your browser does not support text-to-speech!');
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    utterance.pitch = pitch;

    window.speechSynthesis.speak(utterance);
  };

  return (
    <span className="say-tts-wrapper">
      <span className="say-tts-text">{children}</span>
      <button 
        className="say-tts-button" 
        onClick={handleSpeak}
        aria-label={`Play pronunciation of ${text}`}
        title="Click to hear pronunciation"
      >
        🔊
      </button>
    </span>
  );
}
