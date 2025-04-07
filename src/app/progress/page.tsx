'use client';

import { useState, useEffect } from 'react';
import { Scene, Dialogue } from '@/types/scene';
import { getProgress, getCompletionRate } from '@/utils/progress';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function ProgressPage() {
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [progress, setProgress] = useState<any[]>([]);
  const [completionRate, setCompletionRate] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/api/scenes');
        if (!response.ok) {
          throw new Error('Failed to load scenes');
        }
        const data = await response.json();
        setScenes(data);
        
        const progressData = getProgress();
        setProgress(progressData);
        setCompletionRate(getCompletionRate());
      } catch (error) {
        console.error('Error loading data:', error);
        setError('Failed to load progress data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const getDialogueById = (id: string): Dialogue | undefined => {
    for (const scene of scenes) {
      const dialogue = scene.dialogues.find(d => d.id === id);
      if (dialogue) return dialogue;
    }
    return undefined;
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
            <LoadingSpinner size="lg" text="Loading progress data..." />
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
            Your Learning Progress
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your progress and see how far you've come
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Overall Progress
          </h2>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 dark:text-blue-400 bg-blue-200 dark:bg-blue-900">
                  Completion Rate
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-blue-600 dark:text-blue-400">
                  {completionRate.toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200 dark:bg-blue-900">
              <div
                style={{ width: `${completionRate}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Practice History
          </h2>
          <div className="space-y-4">
            {progress.map((p) => {
              const dialogue = getDialogueById(p.dialogueId);
              if (!dialogue) return null;

              return (
                <div
                  key={p.dialogueId}
                  className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0 last:pb-0"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {dialogue.chinese}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {dialogue.english}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Last practiced: {new Date(p.lastPracticed).toLocaleDateString()}
                      </p>
                      <div className="mt-1">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 mr-2">
                          ✓ {p.correctCount}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
                          ✗ {p.incorrectCount}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
} 