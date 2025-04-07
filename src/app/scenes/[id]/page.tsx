'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { scenes } from '@/data/scenes';
import { Scene } from '@/types/scene';
import DialogueCard from '@/components/DialogueCard';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function ScenePage() {
  const params = useParams();
  const [scene, setScene] = useState<Scene | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadScene = async () => {
      try {
        const sceneId = params.id as string;
        const foundScene = scenes.find(s => s.id === sceneId);
        if (foundScene) {
          setScene(foundScene);
        } else {
          setError('Scene not found');
        }
      } catch (err) {
        setError('Failed to load scene');
      } finally {
        setLoading(false);
      }
    };

    loadScene();
  }, [params.id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !scene) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error || 'Scene not found'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-4">
          <span className="text-4xl">{scene.icon}</span>
          <h1 className="text-4xl font-bold">{scene.titleEn}</h1>
        </div>
        <p className="text-2xl text-gray-600">{scene.titleZh}</p>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">{scene.descriptionEn}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {scene.dialogues.map((dialogue) => (
          <DialogueCard key={dialogue.id} dialogue={dialogue} />
        ))}
      </div>
    </div>
  );
} 