'use client';

import { useState } from 'react';

interface AudioButtonProps {
  audioUrl?: string;
  className?: string;
}

export default function AudioButton({ audioUrl, className = '' }: AudioButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(() => audioUrl ? new Audio(audioUrl) : null);

  const handlePlay = () => {
    if (!audio) return;
    
    if (isPlaying) {
      audio.pause();
      audio.currentTime = 0;
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  if (audio) {
    audio.onended = () => {
      setIsPlaying(false);
    };
  }

  if (!audioUrl) return null;

  return (
    <button
      onClick={handlePlay}
      className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${className}`}
      aria-label={isPlaying ? '停止播放' : '播放音频'}
    >
      {isPlaying ? '⏹️' : '▶️'}
    </button>
  );
} 