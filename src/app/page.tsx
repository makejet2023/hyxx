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
    // 选择前三个场景
    setSelectedScenes(scenes.slice(0, 3));
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

      <div className="grid grid-cols-1 gap-8">
        {selectedScenes.map((scene) => (
          <div key={scene.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-4xl">{scene.icon}</span>
              <div>
                <h2 className="text-2xl font-semibold">{scene.titleEn}</h2>
                <p className="text-xl text-gray-600">{scene.titleZh}</p>
              </div>
            </div>
            <p className="text-gray-600 mb-6">{scene.descriptionEn}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {scene.dialogues.map((dialogue) => (
                <div key={dialogue.id} className="bg-gray-50 rounded-lg p-4 min-w-0">
                  <div className="space-y-2">
                    <p className="text-lg font-semibold truncate">{dialogue.chinese}</p>
                    <p className="text-gray-600 text-sm truncate">{dialogue.pinyin}</p>
                    <p className="text-gray-800 text-sm truncate">{dialogue.english}</p>
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
