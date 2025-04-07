'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Dialogue } from '@/types/scene';
import DialogueCard from '@/components/DialogueCard';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Dialogue[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  const handleToggleFavorite = (dialogue: Dialogue) => {
    setFavorites(prev => {
      const newFavorites = prev.filter(d => d.id !== dialogue.id);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="container mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-8"
        >
          ← Back to home
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            My Favorite Phrases
          </h1>
          <h2 className="text-2xl text-gray-700 dark:text-gray-300 mb-6">
            我收藏的短语
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          {favorites.length > 0 ? (
            <div className="space-y-4">
              {favorites.map((dialogue) => (
                <DialogueCard 
                  key={dialogue.id} 
                  dialogue={dialogue} 
                  onToggleFavorite={handleToggleFavorite}
                  isFavorite={true}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                You haven't added any phrases to your favorites yet.
              </p>
              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Browse Phrases
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 