'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SCENES, Dialogue } from '@/types/scene';
import DialogueCard from '@/components/DialogueCard';

interface ScenePageProps {
  params: {
    id: string;
  };
}

export default function ScenePage({ params }: ScenePageProps) {
  const scene = SCENES.find((s) => s.id === params.id);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const handleToggleFavorite = (dialogue: Dialogue) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(dialogue.id)) {
        newFavorites.delete(dialogue.id);
      } else {
        newFavorites.add(dialogue.id);
      }
      return newFavorites;
    });
  };

  if (!scene) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Scene not found
          </h1>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Return to home
          </Link>
        </div>
      </div>
    );
  }

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
          <div className="text-6xl mb-4">{scene.icon}</div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {scene.titleEn}
          </h1>
          <h2 className="text-2xl text-gray-700 dark:text-gray-300 mb-6">
            {scene.titleZh}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {scene.descriptionEn}
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-500 mt-2">
            {scene.descriptionZh}
          </p>
        </div>

        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scene.dialogues.map((dialogue) => (
              <DialogueCard 
                key={dialogue.id} 
                dialogue={dialogue}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={favorites.has(dialogue.id)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 