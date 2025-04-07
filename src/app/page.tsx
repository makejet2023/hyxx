'use client';

import { useState, useEffect } from 'react';
import { scenes } from "@/data/scenes";
import { Scene } from '@/types/scene';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Home() {
  const [selectedScenes, setSelectedScenes] = useState<Scene[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setSelectedScenes(scenes);
    setLoading(false);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Essential Chinese for Travelers</h1>
        <p className="text-xl text-gray-600">Learn essential Chinese phrases for common travel situations in China</p>
      </div>

      <div className="space-y-12">
        {selectedScenes.map((scene) => (
          <div key={scene.id} className="space-y-6">
            <div className="flex items-center space-x-4">
              <span className="text-4xl">{scene.icon}</span>
              <div>
                <h2 className="text-2xl font-semibold">{scene.titleEn}</h2>
                <p className="text-xl text-gray-600">{scene.titleZh}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {scene.dialogues.map((dialogue) => (
                <div key={dialogue.id} className="bg-white rounded-lg shadow p-4">
                  <div className="space-y-2">
                    <p className="text-lg font-medium">{dialogue.chinese}</p>
                    <p className="text-gray-600">{dialogue.english}</p>
                    <p className="text-gray-500 text-sm">{dialogue.pinyin}</p>
                    <div className="flex justify-between items-center mt-4">
                      <button className="text-blue-500 hover:text-blue-600">
                        <span className="sr-only">Play audio</span>
                        ▶
                      </button>
                      <button className="text-gray-500 hover:text-gray-600">
                        <span className="sr-only">Share</span>
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
