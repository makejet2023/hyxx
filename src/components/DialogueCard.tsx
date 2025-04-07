'use client';

import { useState } from 'react';
import { Dialogue } from '@/types/scene';

interface DialogueCardProps {
  dialogue: Dialogue;
}

export default function DialogueCard({ dialogue }: DialogueCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handlePlayAudio = () => {
    if (dialogue.audioUrl) {
      const audio = new Audio(dialogue.audioUrl);
      audio.play();
      setIsPlaying(true);
      audio.onended = () => setIsPlaying(false);
    }
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <p className="text-xl font-semibold">{dialogue.chinese}</p>
            <p className="text-gray-600">{dialogue.pinyin}</p>
            <p className="text-gray-800">{dialogue.english}</p>
          </div>
          <button
            onClick={handleToggleFavorite}
            className={`text-2xl ${isFavorite ? 'text-red-500' : 'text-gray-400'} hover:text-red-600 transition-colors`}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>

        {dialogue.audioUrl && (
          <button
            onClick={handlePlayAudio}
            disabled={isPlaying}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
          >
            {isPlaying ? '播放中...' : '播放音频'}
          </button>
        )}
      </div>
    </div>
  );
} 