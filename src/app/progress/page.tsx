'use client';

import { useState, useEffect } from 'react';
import { scenes } from '@/data/scenes';
import { Dialogue } from '@/types/scene';
import LoadingSpinner from '@/components/LoadingSpinner';

interface ProgressItem {
  dialogueId: string;
  lastPracticed: Date;
  correctCount: number;
  incorrectCount: number;
}

export default function ProgressPage() {
  const [progress, setProgress] = useState<ProgressItem[]>([]);
  const [completionRate, setCompletionRate] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = () => {
    try {
      // 从localStorage获取进度数据
      const progressData = localStorage.getItem('progress');
      if (progressData) {
        const parsedProgress = JSON.parse(progressData).map((item: any) => ({
          ...item,
          lastPracticed: new Date(item.lastPracticed)
        }));
        setProgress(parsedProgress);
        
        // 计算完成率
        const totalAttempts = parsedProgress.reduce(
          (sum: number, item: ProgressItem) => sum + item.correctCount + item.incorrectCount,
          0
        );
        const totalCorrect = parsedProgress.reduce(
          (sum: number, item: ProgressItem) => sum + item.correctCount,
          0
        );
        setCompletionRate(totalAttempts > 0 ? (totalCorrect / totalAttempts) * 100 : 0);
      }
      setLoading(false);
    } catch (err) {
      setError('Failed to load progress');
      setLoading(false);
    }
  };

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

  const totalPhrases = scenes.reduce(
    (total, scene) => total + scene.dialogues.length,
    0
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Learning Progress</h1>
        <p className="text-xl text-gray-600">Track your learning progress and completion rate</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Overall Progress</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Completion Rate</span>
              <span className="text-2xl font-bold text-blue-500">
                {completionRate.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-blue-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Practice History</h2>
          <div className="space-y-4">
            {progress.length > 0 ? (
              progress.map((item) => {
                const dialogue = scenes
                  .flatMap(scene => scene.dialogues)
                  .find(d => d.id === item.dialogueId);

                return (
                  <div
                    key={item.dialogueId}
                    className="border-b border-gray-200 pb-4 last:border-0"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{dialogue?.chinese}</p>
                        <p className="text-gray-600">{dialogue?.english}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          Last practiced: {item.lastPracticed.toLocaleDateString()}
                        </p>
                        <p className="text-sm">
                          Correct: {item.correctCount} | Incorrect: {item.incorrectCount}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 text-center">No practice records yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 