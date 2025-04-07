'use client';

import { useState } from 'react';
import { Dialogue } from '@/types/scene';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';
import AudioButton from './AudioButton';

interface DialogueCardProps {
  dialogue: Dialogue;
  onToggleFavorite: (dialogue: Dialogue) => void;
  isFavorite: boolean;
}

export default function DialogueCard({ dialogue, onToggleFavorite, isFavorite }: DialogueCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayAudio = () => {
    if (dialogue.audioUrl) {
      setIsPlaying(true);
      const audio = new Audio(dialogue.audioUrl);
      audio.onended = () => setIsPlaying(false);
      audio.play();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5 transition-all duration-300 hover:border-blue-500 dark:hover:border-blue-400">
      <div className="flex flex-col h-full">
        <div className="flex justify-end space-x-2 mb-4">
          <AudioButton audioUrl={dialogue.audioUrl} />
          <FavoriteButton 
            dialogue={dialogue} 
            onToggleFavorite={onToggleFavorite}
            isFavorite={isFavorite}
          />
          <ShareButton dialogue={dialogue} />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{dialogue.chinese}</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">{dialogue.english}</p>
          <p className="text-base text-gray-500 dark:text-gray-400">{dialogue.pinyin}</p>
        </div>
      </div>
    </div>
  );
} 