'use client';

import { useState } from 'react';
import { Dialogue } from '@/types/scene';

interface DialogueCardProps {
  dialogue: Dialogue;
  onToggleFavorite?: (dialogue: Dialogue) => void;
  isFavorite?: boolean;
}

export default function DialogueCard({ dialogue, onToggleFavorite, isFavorite = false }: DialogueCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayAudio = () => {
    if (dialogue.audioUrl) {
      const audio = new Audio(dialogue.audioUrl);
      audio.play();
      setIsPlaying(true);
      audio.onended = () => setIsPlaying(false);
    }
  };

  const handleToggleFavorite = () => {
    if (onToggleFavorite) {
      onToggleFavorite(dialogue);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-lg font-medium">{dialogue.chinese}</p>
            <p className="text-gray-600">{dialogue.english}</p>
            <p className="text-gray-500 text-sm">{dialogue.pinyin}</p>
          </div>
          {onToggleFavorite && (
            <button
              onClick={handleToggleFavorite}
              className={`text-2xl ${isFavorite ? 'text-red-500' : 'text-gray-400'} hover:text-red-600 transition-colors`}
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
          )}
        </div>
        <div className="flex justify-between items-center mt-4">
          <button 
            onClick={handlePlayAudio}
            disabled={isPlaying}
            className="text-blue-500 hover:text-blue-600"
          >
            <span className="sr-only">Play audio</span>
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          <button className="text-gray-500 hover:text-gray-600">
            <span className="sr-only">Share</span>
            Share
          </button>
        </div>
      </div>
    </div>
  );
} 