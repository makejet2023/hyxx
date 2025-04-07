'use client';

import { useState, useEffect } from 'react';
import { scenes } from '@/data/scenes';
import { Dialogue } from '@/types/scene';
import PracticeCard from '@/components/PracticeCard';
import LoadingSpinner from '@/components/LoadingSpinner';

type PracticeType = 'translation' | 'listening' | 'speaking' | 'matching';

export default function PracticePage() {
  const [currentDialogue, setCurrentDialogue] = useState<Dialogue | null>(null);
  const [selectedType, setSelectedType] = useState<PracticeType | null>(null);

  useEffect(() => {
    if (selectedType) {
      const allDialogues = scenes.flatMap(scene => scene.dialogues);
      const randomIndex = Math.floor(Math.random() * allDialogues.length);
      setCurrentDialogue(allDialogues[randomIndex]);
    }
  }, [selectedType]);

  const handleTypeSelect = (type: PracticeType) => {
    setSelectedType(type);
  };

  const handleNext = () => {
    const allDialogues = scenes.flatMap(scene => scene.dialogues);
    let randomIndex;
    let nextDialogue;

    do {
      randomIndex = Math.floor(Math.random() * allDialogues.length);
      nextDialogue = allDialogues[randomIndex];
    } while (nextDialogue.id === currentDialogue?.id);

    setCurrentDialogue(nextDialogue);
  };

  if (!selectedType) {
    return (
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Practice</h1>
          <p className="text-xl text-gray-600">Select a practice type to begin</p>
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
                Translation Practice
              </button>
              <button
                onClick={() => handleTypeSelect('listening')}
                className={`p-4 rounded-lg ${
                  selectedType === 'listening'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Listening Practice
              </button>
              <button
                onClick={() => handleTypeSelect('speaking')}
                className={`p-4 rounded-lg ${
                  selectedType === 'speaking'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Speaking Practice
              </button>
              <button
                onClick={() => handleTypeSelect('matching')}
                className={`p-4 rounded-lg ${
                  selectedType === 'matching'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Matching Practice
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentDialogue) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <PracticeCard
        dialogue={currentDialogue}
        onNext={handleNext}
        practiceType={selectedType}
      />
    </div>
  );
} 