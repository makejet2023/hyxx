'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Scene } from '@/types/scene';
import SceneCard from '@/components/SceneCard';
import SearchBar from '@/components/SearchBar';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Home() {
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [searchResults, setSearchResults] = useState<Scene[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadScenes = async () => {
      try {
        const response = await fetch('/api/scenes');
        if (!response.ok) {
          throw new Error('Failed to load scenes');
        }
        const data = await response.json();
        setScenes(data);
      } catch (error) {
        console.error('Error loading scenes:', error);
        setError('Failed to load scenes. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadScenes();
  }, []);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const results = scenes.map(scene => ({
      ...scene,
      dialogues: scene.dialogues.filter(dialogue =>
        dialogue.chinese.toLowerCase().includes(query.toLowerCase()) ||
        dialogue.english.toLowerCase().includes(query.toLowerCase()) ||
        dialogue.pinyin.toLowerCase().includes(query.toLowerCase())
      ),
    })).filter(scene => scene.dialogues.length > 0);

    setSearchResults(results);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4">
        <div className="w-full">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4">
        <div className="w-full">
          <div className="text-center">
            <LoadingSpinner size="lg" text="Loading scenes..." />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4">
      <div className="w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Learn Essential Chinese Phrases
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Master common Chinese expressions for your next trip to China
          </p>
        </div>

        <div className="mb-8 max-w-2xl mx-auto">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {(searchResults.length > 0 ? searchResults : scenes).map((scene) => (
            <SceneCard key={scene.id} scene={scene} />
          ))}
        </div>

        {searchResults.length === 0 && scenes.length > 0 && (
          <div className="text-center mt-8">
            <p className="text-gray-600 dark:text-gray-400">
              No results found. Try a different search term.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
