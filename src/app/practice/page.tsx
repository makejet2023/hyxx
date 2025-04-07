'use client';

import { useState, useEffect } from 'react';
import { Scene, Dialogue } from '@/types/scene';
import PracticeCard from '@/components/PracticeCard';
import PracticeTypeSelector from '@/components/PracticeTypeSelector';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function PracticePage() {
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [currentDialogue, setCurrentDialogue] = useState<Dialogue | null>(null);
  const [selectedType, setSelectedType] = useState('translation');
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
        
        // 随机选择一个对话作为第一个练习
        const allDialogues = data.flatMap((scene: Scene) => scene.dialogues);
        const randomIndex = Math.floor(Math.random() * allDialogues.length);
        setCurrentDialogue(allDialogues[randomIndex]);
      } catch (error) {
        console.error('Error loading scenes:', error);
        setError('Failed to load practice content. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadScenes();
  }, []);

  const handleNextQuestion = () => {
    const allDialogues = scenes.flatMap(scene => scene.dialogues);
    const randomIndex = Math.floor(Math.random() * allDialogues.length);
    setCurrentDialogue(allDialogues[randomIndex]);
  };

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    // 当切换练习类型时,重新选择一个对话
    const allDialogues = scenes.flatMap(scene => scene.dialogues);
    const randomIndex = Math.floor(Math.random() * allDialogues.length);
    setCurrentDialogue(allDialogues[randomIndex]);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
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
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <LoadingSpinner size="lg" text="Loading practice content..." />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Practice Chinese Phrases
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Choose a practice type and test your knowledge
          </p>
        </div>

        <div className="mb-8">
          <PracticeTypeSelector
            selectedType={selectedType}
            onSelectType={handleTypeSelect}
          />
        </div>

        {currentDialogue && (
          <PracticeCard 
            dialogue={currentDialogue} 
            onNext={handleNextQuestion}
            practiceType={selectedType}
          />
        )}
      </div>
    </div>
  );
} 