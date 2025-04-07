'use client';

import { useState, useEffect } from 'react';
import { Dialogue } from '@/types/scene';

interface FavoriteButtonProps {
  dialogue: Dialogue;
  onToggleFavorite: (dialogue: Dialogue) => void;
  isFavorite: boolean;
}

export default function FavoriteButton({ dialogue, onToggleFavorite, isFavorite }: FavoriteButtonProps) {
  const toggleFavorite = () => {
    onToggleFavorite(dialogue);
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`p-2 rounded-full transition-colors duration-200 ${
        isFavorite
          ? 'text-yellow-500 hover:text-yellow-600'
          : 'text-gray-400 hover:text-gray-500'
      }`}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <svg
        className="w-6 h-6"
        fill={isFavorite ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
        />
      </svg>
    </button>
  );
} 