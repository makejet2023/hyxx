'use client';

import { useState, useEffect } from 'react';
import { scenes } from '@/data/scenes';
import { Dialogue } from '@/types/scene';
import PracticeCard from '@/components/PracticeCard';
import LoadingSpinner from '@/components/LoadingSpinner';

type PracticeType = 'translation' | 'listening' | 'speaking' | 'matching';

export default function PracticePage() {
  const [currentDialogue, setCurrentDialogue] = useState<Dialogue | null>(null);
  const [selectedType, setSelectedType] = useState<PracticeType>('translation');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRandomDialogue();
  }, []);

  const loadRandomDialogue = () => {
    try {
      const allDialogues = scenes.flatMap(scene => scene.dialogues);
      const randomIndex = Math.floor(Math.random() * allDialogues.length);
      setCurrentDialogue(allDialogues[randomIndex]);
      setLoading(false);
    } catch (err) {
      setError('Failed to load dialogue');
      setLoading(false);
    }
  };

  const handleTypeSelect = (type: PracticeType) => {
    setSelectedType(type);
  };

  const handleNext = () => {
    loadRandomDialogue();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !currentDialogue) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error || 'Failed to load dialogue'}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">练习</h1>
        <p className="text-xl text-gray-600">选择练习类型开始学习</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleTypeSelect('translation')}
              className={`p-4 rounded-lg ${
                selectedType === 'translation'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              翻译练习
            </button>
            <button
              onClick={() => handleTypeSelect('listening')}
              className={`p-4 rounded-lg ${
                selectedType === 'listening'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              听力练习
            </button>
            <button
              onClick={() => handleTypeSelect('speaking')}
              className={`p-4 rounded-lg ${
                selectedType === 'speaking'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              口语练习
            </button>
            <button
              onClick={() => handleTypeSelect('matching')}
              className={`p-4 rounded-lg ${
                selectedType === 'matching'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              配对练习
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <PracticeCard
            dialogue={currentDialogue}
            practiceType={selectedType}
            onNext={handleNext}
          />
        </div>
      </div>
    </div>
  );
} 